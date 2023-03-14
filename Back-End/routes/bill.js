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

    const generateUuid = uuid.v1();
    const orderDetails = req.body;
    var productDetailsReport = JSON.parse(orderDetails.productDetails);
    var query = "insert into bill (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) values(?,?,?,?,?,?,?,?)";
    connection.query(query, [orderDetails.name, generateUuid, orderDetails.email, orderDetails.contactNumber, orderDetails.paymentMethod, orderDetails.totalAmount, orderDetails.productDetails, res.locals.email], (err, results) => {
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
    console.log("Bước 1: ", pdfPath)
    console.log("Bước 1.1(kiểm tra fs.existsSync(pdfPath)): ", fs.existsSync(pdfPath))
    if (fs.existsSync(pdfPath)) {
        console.log("Bước 2: (true)")
        res.contentType("application/pdf");
        fs.createReadStream(pdfPath).pipe(res);
    } else {
        console.log("Bước 2.1: (false)")
        var productDetailsReport = JSON.parse(orderDetails.productDetails);
        console.log("Bước 3: ", productDetailsReport);
        ejs.renderFile(path.join(__dirname, '', "report.ejs"), {
            productDetails: productDetailsReport,
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails.contactNumber,
            paymentMethod: orderDetails.paymentMethod,
            totalAmount: orderDetails.totalAmount
        }, (err, results) => {
            if (err) {
                console.log("Bước 4: (render fail)");
                return res.status(500).json(err);
            }
            else {
                console.log("Bước 4.1: (render success)");
                pdf.create(results).toFile('./generated_pdf/' + orderDetails.uuid + ".pdf", function (err, data) {
                    if (err) {
                        console.log("Bước 5.1: (create fail)");
                        return res.status(500).json(err);
                    }
                    else {
                        console.log("Bước 5.1: (create success)");
                        res.contentType("application/pdf");
                        fs.createReadStream(pdfPath).pipe(res);
                    }
                })
            }
        })
    }
});

// API lấy danh sách tất cả bill
router.get('/getBills', auth.authenticateToken, (req, res) => {

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

// API xóa bill
router.delete('/delete/:id', auth.authenticateToken, (req, res, next) => {

    const id = req.params.id;
    console.log("Bước 1: ", id)
    var query = "update bill set deleted='true' where id=? and deleted='false'";
    console.log("Bước 2: ", query);
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                console.log("Bước 3: (kết quả 1)")
                return res.status(404).json({
                    message: "Không tìm thấy hóa đơn hoặc hóa đơn đã bị xóa."
                })
            }
            else {
                console.log("Bước 3: (kết quả 2)")
                res.status(200).json({
                    message: "Đã xóa hóa đơn thành công."
                })
            }
        }
        else {
            console.log("Bước 3: (kết quả 3)");
            return res.status(500).json({
                message: "Không tìm thấy hóa đơn hoặc hóa đơn đã bị xóa."
            });
        }
    })
});

module.exports = router;