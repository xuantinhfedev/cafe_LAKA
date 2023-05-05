// Khai báo biến, thư viện sử dụng
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


router.get('/details', auth.authenticateToken, (req, res, next) => {

    var categoryCount;
    var productCount;
    var categorySale;
    var productSale;
    var billCount;
    var userCount;
    var query = "SELECT count(id) as categoryCount FROM category where deleted='false'";
    connection.query(query, (err, results) => {
        if (!err) {
            categoryCount = results[0].categoryCount;
        } else {
            return res.status(500).json(err);
        }
    });
    var queryProduct = "SELECT count(id) as productCount FROM product where deleted='false' and status='true'";
    connection.query(queryProduct, (err, results) => {
        if (!err) {
            productCount = results[0].productCount;
        } else {
            return res.status(500).json(err);
        }
    });
    var queryUser = "SELECT count(id) as userCount FROM user where deleted='false' and status='true'";
    connection.query(queryUser, (err, results) => {
        if (!err) {
            userCount = results[0].userCount - 1;
        } else {
            return res.status(500).json(err);
        }
    });
    var queryCategorySale = "SELECT COUNT(id) as categorySale FROM categorySale where deleted=0";
    connection.query(queryCategorySale, (err, results) => {
        if (!err) {
            categorySale = results[0].categorySale;
        } else {
            return res.status(500).json(err);
        }
    });
    var queryProductSale = "SELECT COUNT(id) as productSale FROM productSale where deleted=0 AND status='true'";
    connection.query(queryProductSale, (err, results) => {
        if (!err) {
            productSale = results[0].productSale;
        } else {
            return res.status(500).json(err);
        }
    });
    var queryBill = "SELECT count(id) as billCount FROM bill where deleted='false'";
    connection.query(queryBill, (err, results) => {
        if (!err) {
            billCount = results[0].billCount;
            var data = {
                category: categoryCount,
                product: productCount,
                bill: billCount,
                user: userCount,
                categorySale: categorySale,
                productSale: productSale,
            }
            return res.status(200).json({
                results: {
                    responseCode: "200",
                    message: "Thành công",
                    data: data
                }
            })
        } else {
            return res.status(500).json(err);
        }
    });
});


// API lấy danh sách tất cả bill
router.post('/getBillDBoard', (req, res) => {

    start = req.body.start;
    end = req.body.end;

    var query = "";
    if (end == "null" && start == "null") {
        query = "SELECT * FROM bill WHERE paymentMethod='Cash' AND deleted='false' ";
        connection.query(query, (err, results) => {
            if (!err) {
                const totalByMonth = {};
                results.forEach((ele) => {
                    // Tách ra ngày/tháng/năm để lấy tháng
                    const [year, month, day] = JSON.stringify(ele.createdAt).split("-");

                    // Nếu chưa có phần tử nào cho tháng này, khởi tạo bằng 0
                    if (!totalByMonth[month]) {
                        totalByMonth[month] = 0;
                    }
                    // Cộng giá tiền vào tổng tiền của tháng
                    totalByMonth[month] += ele.total;
                });
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Thành công",
                        data: totalByMonth
                    }
                })
            }
            else {
                return res.status(500).json(err);
            }
        })
    }
    else if (end == "null") {
        query = "SELECT * FROM bill WHERE paymentMethod='Cash' AND deleted='false' AND createdAt >= ?"
        connection.query(query, [start], (err, results) => {
            if (!err) {
                const totalByMonth = {};
                results.forEach((ele) => {
                    // Tách ra ngày/tháng/năm để lấy tháng
                    const [year, month, day] = JSON.stringify(ele.createdAt).split("-");

                    // Nếu chưa có phần tử nào cho tháng này, khởi tạo bằng 0
                    if (!totalByMonth[month]) {
                        totalByMonth[month] = 0;
                    }
                    // Cộng giá tiền vào tổng tiền của tháng
                    totalByMonth[month] += ele.total;
                });
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Thành công",
                        data: totalByMonth
                    }
                })
            }
            else {
                return res.status(500).json(err);
            }
        })
    } else if (start == "null") {
        query = "SELECT * FROM bill WHERE paymentMethod='Cash' AND deleted='false' AND createdAt <= ?"
        connection.query(query, [end], (err, results) => {
            if (!err) {
                const totalByMonth = {};
                results.forEach((ele) => {
                    // Tách ra ngày/tháng/năm để lấy tháng
                    const [year, month, day] = JSON.stringify(ele.createdAt).split("-");

                    // Nếu chưa có phần tử nào cho tháng này, khởi tạo bằng 0
                    if (!totalByMonth[month]) {
                        totalByMonth[month] = 0;
                    }
                    // Cộng giá tiền vào tổng tiền của tháng
                    totalByMonth[month] += ele.total;
                });
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Thành công",
                        data: totalByMonth
                    }
                })
            }
            else {
                return res.status(500).json(err);
            }
        })
    } else {
        query = "SELECT * FROM bill WHERE paymentMethod='Cash' AND deleted='false' AND (createdAt BETWEEN ? AND ?)";
        connection.query(query, [start, end], (err, results) => {
            if (!err) {
                const totalByMonth = {};
                results.forEach((ele) => {
                    // Tách ra ngày/tháng/năm để lấy tháng
                    const [year, month, day] = JSON.stringify(ele.createdAt).split("-");

                    // Nếu chưa có phần tử nào cho tháng này, khởi tạo bằng 0
                    if (!totalByMonth[month]) {
                        totalByMonth[month] = 0;
                    }
                    // Cộng giá tiền vào tổng tiền của tháng
                    totalByMonth[month] += ele.total;
                });
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Thành công",
                        data: totalByMonth
                    }
                })
            }
            else {
                return res.status(500).json(err);
            }
        })
    }
});

router.post('/getBillCreditCard', (req, res) => {

    start = req.body.start;
    end = req.body.end;

    var query = "";
    if (end == "null" && start == "null") {
        query = "SELECT * FROM bill WHERE paymentMethod='Credit Card' AND deleted='false' ";
        connection.query(query, (err, results) => {
            if (!err) {
                const totalByMonth = {};
                results.forEach((ele) => {
                    // Tách ra ngày/tháng/năm để lấy tháng
                    const [year, month, day] = JSON.stringify(ele.createdAt).split("-");

                    // Nếu chưa có phần tử nào cho tháng này, khởi tạo bằng 0
                    if (!totalByMonth[month]) {
                        totalByMonth[month] = 0;
                    }
                    // Cộng giá tiền vào tổng tiền của tháng
                    totalByMonth[month] += ele.total;
                });
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Thành công",
                        data: totalByMonth
                    }
                })
            }
            else {
                return res.status(500).json(err);
            }
        })
    }
    else if (end == "null") {
        query = "SELECT * FROM bill WHERE paymentMethod='Credit Card' AND deleted='false' AND createdAt >= ?"
        connection.query(query, [start], (err, results) => {
            if (!err) {
                const totalByMonth = {};
                results.forEach((ele) => {
                    // Tách ra ngày/tháng/năm để lấy tháng
                    const [year, month, day] = JSON.stringify(ele.createdAt).split("-");

                    // Nếu chưa có phần tử nào cho tháng này, khởi tạo bằng 0
                    if (!totalByMonth[month]) {
                        totalByMonth[month] = 0;
                    }
                    // Cộng giá tiền vào tổng tiền của tháng
                    totalByMonth[month] += ele.total;
                });
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Thành công",
                        data: totalByMonth
                    }
                })
            }
            else {
                return res.status(500).json(err);
            }
        })
    } else if (start == "null") {
        query = "SELECT * FROM bill WHERE paymentMethod='Credit Card' AND deleted='false' AND createdAt <= ?"
        connection.query(query, [end], (err, results) => {
            if (!err) {
                const totalByMonth = {};
                results.forEach((ele) => {
                    // Tách ra ngày/tháng/năm để lấy tháng
                    const [year, month, day] = JSON.stringify(ele.createdAt).split("-");

                    // Nếu chưa có phần tử nào cho tháng này, khởi tạo bằng 0
                    if (!totalByMonth[month]) {
                        totalByMonth[month] = 0;
                    }
                    // Cộng giá tiền vào tổng tiền của tháng
                    totalByMonth[month] += ele.total;
                });
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Thành công",
                        data: totalByMonth
                    }
                })
            }
            else {
                return res.status(500).json(err);
            }
        })
    } else {
        query = "SELECT * FROM bill WHERE paymentMethod='Credit Card' AND deleted='false' AND (createdAt BETWEEN ? AND ?)";
        connection.query(query, [start, end], (err, results) => {
            if (!err) {
                const totalByMonth = {};
                results.forEach((ele) => {
                    // Tách ra ngày/tháng/năm để lấy tháng
                    const [year, month, day] = JSON.stringify(ele.createdAt).split("-");

                    // Nếu chưa có phần tử nào cho tháng này, khởi tạo bằng 0
                    if (!totalByMonth[month]) {
                        totalByMonth[month] = 0;
                    }
                    // Cộng giá tiền vào tổng tiền của tháng
                    totalByMonth[month] += ele.total;
                });
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Thành công",
                        data: totalByMonth
                    }
                })
            }
            else {
                return res.status(500).json(err);
            }
        })
    }
});


// API lấy danh sách tất cả bill
router.post('/getAllStatistic', (req, res) => {

    start = req.body.start;
    end = req.body.end;

    var query = "";
    if (end == "null" && start == "null") {
        query = "SELECT * FROM bill WHERE  deleted='false' ";
        connection.query(query, (err, results) => {
            if (!err) {
                const totalByMonth = {};
                results.forEach((ele) => {
                    // Tách ra ngày/tháng/năm để lấy tháng
                    const [year, month, day] = JSON.stringify(ele.createdAt).split("-");

                    // Nếu chưa có phần tử nào cho tháng này, khởi tạo bằng 0
                    if (!totalByMonth[month]) {
                        totalByMonth[month] = 0;
                    }
                    // Cộng giá tiền vào tổng tiền của tháng
                    totalByMonth[month] += ele.total;
                });
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Thành công",
                        data: totalByMonth
                    }
                })
            }
            else {
                return res.status(500).json(err);
            }
        })
    }
    else if (end == "null") {
        query = "SELECT * FROM bill WHERE  deleted='false' AND createdAt >= ?"
        connection.query(query, [start], (err, results) => {
            if (!err) {
                const totalByMonth = {};
                results.forEach((ele) => {
                    // Tách ra ngày/tháng/năm để lấy tháng
                    const [year, month, day] = JSON.stringify(ele.createdAt).split("-");

                    // Nếu chưa có phần tử nào cho tháng này, khởi tạo bằng 0
                    if (!totalByMonth[month]) {
                        totalByMonth[month] = 0;
                    }
                    // Cộng giá tiền vào tổng tiền của tháng
                    totalByMonth[month] += ele.total;
                });
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Thành công",
                        data: totalByMonth
                    }
                })
            }
            else {
                return res.status(500).json(err);
            }
        })
    } else if (start == "null") {
        query = "SELECT * FROM bill WHERE  deleted='false' AND createdAt <= ?"
        connection.query(query, [end], (err, results) => {
            if (!err) {
                const totalByMonth = {};
                results.forEach((ele) => {
                    // Tách ra ngày/tháng/năm để lấy tháng
                    const [year, month, day] = JSON.stringify(ele.createdAt).split("-");

                    // Nếu chưa có phần tử nào cho tháng này, khởi tạo bằng 0
                    if (!totalByMonth[month]) {
                        totalByMonth[month] = 0;
                    }
                    // Cộng giá tiền vào tổng tiền của tháng
                    totalByMonth[month] += ele.total;
                });
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Thành công",
                        data: totalByMonth
                    }
                })
            }
            else {
                return res.status(500).json(err);
            }
        })
    } else {
        query = "SELECT * FROM bill WHERE  deleted='false' AND (createdAt BETWEEN ? AND ?)";
        connection.query(query, [start, end], (err, results) => {
            if (!err) {
                const totalByMonth = {};
                results.forEach((ele) => {
                    // Tách ra ngày/tháng/năm để lấy tháng
                    const [year, month, day] = JSON.stringify(ele.createdAt).split("-");

                    // Nếu chưa có phần tử nào cho tháng này, khởi tạo bằng 0
                    if (!totalByMonth[month]) {
                        totalByMonth[month] = 0;
                    }
                    // Cộng giá tiền vào tổng tiền của tháng
                    totalByMonth[month] += ele.total;
                });
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Thành công",
                        data: totalByMonth
                    }
                })
            }
            else {
                return res.status(500).json(err);
            }
        })
    }
});


module.exports = router;