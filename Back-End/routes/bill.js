// Khai báo biến, thư viện sử dụng
const express = require('express');
const connection = require('../connection');
const router = express.Router();
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
let fs = require('fs');
var uuid = require('uuid');
var auth = require('../services/authentication');

// API tạo báo cáo
router.post('/generateReport', auth.authenticateToken, (req, res) => {
    const moonLanding = new Date();
    const generateUuid = uuid.v1();
    const orderDetails = req.body;
    var productDetailsReport = JSON.parse(orderDetails.productDetails);
    var query = "insert into bill (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy, createdAt,deleted) values(?,?,?,?,?,?,?,?,?,'false')";
    connection.query(query, [orderDetails.name, generateUuid, orderDetails.email, orderDetails.contactNumber, orderDetails.paymentMethod, orderDetails.totalAmount, orderDetails.productDetails, res.locals.email, moonLanding], (err, results) => {
        if (!err) {
            ejs.renderFile(path.join(__dirname, '', "report.ejs"), {
                productDetails: productDetailsReport,
                name: orderDetails.name,
                email: orderDetails.email,
                contactNumber: orderDetails.contactNumber,
                paymentMethod: orderDetails.paymentMethod,
                totalAmount: orderDetails.totalAmount
            }, (err, results) => {
                if (err) {
                    return res.status(500).json(err);
                }
                else {
                    pdf.create(results).toFile('./generated_pdf/' + generateUuid + ".pdf", function (err, data) {
                        if (err) {
                            return res.status(500).json(err);
                        }
                        else {
                            return res.status(200).json({
                                uuid: generateUuid
                            });
                        }
                    })
                }
            })
        }
        else {
            return res.status(500).json(err);
        }
    })
});

// API lấy ra bản pdf
router.post('/getPdf', auth.authenticateToken, (req, res) => {

    const orderDetails = req.body;
    const pdfPath = './generated_pdf/' + orderDetails.uuid + '.pdf';
    // console.log("Bước 1: ", pdfPath)
    // console.log("Bước 1.1(kiểm tra fs.existsSync(pdfPath)): ", fs.existsSync(pdfPath))
    if (fs.existsSync(pdfPath)) {
        // console.log("Bước 2: (true)")
        res.contentType("application/pdf");
        fs.createReadStream(pdfPath).pipe(res);
    } else {
        // console.log("Bước 2.1: (false)")
        var productDetailsReport = JSON.parse(orderDetails.productDetails);
        // console.log("Bước 3: ", productDetailsReport);
        ejs.renderFile(path.join(__dirname, '', "report.ejs"), {
            productDetails: productDetailsReport,
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails.contactNumber,
            paymentMethod: orderDetails.paymentMethod,
            totalAmount: orderDetails.totalAmount
        }, (err, results) => {
            if (err) {
                // console.log("Bước 4: (render fail)");
                return res.status(500).json(err);
            }
            else {
                // console.log("Bước 4.1: (render success)");
                pdf.create(results).toFile('./generated_pdf/' + orderDetails.uuid + ".pdf", function (err, data) {
                    if (err) {
                        // console.log("Bước 5.1: (create fail)");
                        return res.status(500).json(err);
                    }
                    else {
                        // console.log("Bước 5.1: (create success)");
                        res.contentType("application/pdf");
                        fs.createReadStream(pdfPath).pipe(res);
                    }
                })
            }
        })
    }
});

// API lấy danh sách tất cả bill
router.get('/getBill', auth.authenticateToken, (req, res) => {

    var query = "select * from bill where deleted='false' order by id asc";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
});

// Get bills
router.get('/getBills', auth.authenticateToken, (req, res) => {

    let valueSearch = req.query.value;
    let pageSize = Number(req.query.pageSize);
    let pageIndex = Number(req.query.pageIndex);
    let valueLimit = pageSize;
    let valueOffset = pageSize * pageIndex;

    var queryCount = "SELECT COUNT(*) as dataCount FROM bill WHERE deleted='false' and (? IS NULL or name LIKE ?) ORDER BY createdAt desc";
    let dataCount = 0;
    connection.query(queryCount, [valueSearch, ['%' + valueSearch + '%']], (err, results) => {
        if (!err) {
            dataCount = results[0];
        } else {
            return res.status(200).json({
                results: {
                    responseCode: "500",
                    message: err
                }
            });
        }
    });
    var query = "SELECT * FROM bill WHERE deleted='false' and (? IS NULL or name LIKE ?) order by createdAt desc LIMIT ? OFFSET ?";
    connection.query(query, [valueSearch, ['%' + valueSearch + '%'], valueLimit, valueOffset], (err, results) => {
        if (!err) {
            return res.status(200).json({
                results: {
                    responseCode: "200",
                    message: "Lấy danh sách hóa đơn thành công.",
                    data: results,
                    dataCount: dataCount.dataCount
                }
            });
        } else {
            return res.status(200).json({
                results: {
                    responseCode: "500",
                    message: err
                }
            });
        }
    });
});

// API xóa bill
router.delete('/delete', auth.authenticateToken, (req, res) => {
    let bill = req.query.id;
    var query = "update bill set deleted='true' where id=?";
    connection.query(query, [bill], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    results: {
                        responseCode: "404",
                        message: "Hóa đơn không được tìm thấy hoặc hóa đơn đã được chuyển vào thùng rác."
                    }
                });
            } else {
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Đã xóa hóa đơn thành công."
                    }
                });
            }
        } else {
            return res.status(200).json({
                results: {
                    responseCode: "500",
                    message: err
                }
            });
        }
    });
});

// API lấy thùng rác Bill
router.get('/trash', auth.authenticateToken, (req, res) => {

    let valueSearch = req.query.value;
    let pageSize = Number(req.query.pageSize);
    let pageIndex = Number(req.query.pageIndex);
    let valueLimit = pageSize;
    let valueOffset = pageSize * pageIndex;

    var queryCount = "SELECT COUNT(*) as dataCount FROM bill WHERE deleted='true' and (? IS NULL or name LIKE ?) ORDER BY createdAt desc";
    let dataCount = 0;
    connection.query(queryCount, [valueSearch, ['%' + valueSearch + '%']], (err, results) => {
        if (!err) {
            dataCount = results[0];
        } else {
            return res.status(200).json({
                results: {
                    responseCode: "500",
                    message: err
                }
            });
        }
    });
    var query = "SELECT * FROM bill WHERE deleted='true' and (? IS NULL or name LIKE ?) order by createdAt desc LIMIT ? OFFSET ?";
    connection.query(query, [valueSearch, ['%' + valueSearch + '%'], valueLimit, valueOffset], (err, results) => {
        if (!err) {
            return res.status(200).json({
                results: {
                    responseCode: "200",
                    message: "Lấy danh sách thùng rác thành công.",
                    data: results,
                    dataCount: dataCount.dataCount
                }
            });
        } else {
            return res.status(200).json({
                results: {
                    responseCode: "500",
                    message: err
                }
            });
        }
    });
});

module.exports = router;