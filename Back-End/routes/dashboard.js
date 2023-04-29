// Khai báo biến, thư viện sử dụng
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


router.get('/details', auth.authenticateToken, (req, res, next) => {

    var categoryCount;
    var productCount;
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
    var queryBill = "SELECT count(id) as billCount FROM bill where deleted='false'";
    connection.query(queryBill, (err, results) => {
        if (!err) {
            billCount = results[0].billCount;
            var data = {
                category: categoryCount,
                product: productCount,
                bill: billCount,
                user: userCount
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

module.exports = router;