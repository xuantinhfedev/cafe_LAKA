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
    var query = "SELECT count(id) as categoryCount FROM category where deleted='false'";
    connection.query(query, (err, results) => {
        console.log("Results category: ", results[0])
        if (!err) {
            categoryCount = results[0].categoryCount;
        } else {
            return res.status(500).json(err);
        }
    });
    var queryProduct = "SELECT count(id) as productCount FROM product where deleted='false'";
    connection.query(queryProduct, (err, results) => {
        console.log("Results product: ", results[0])
        if (!err) {
            productCount = results[0].productCount;
        } else {
            return res.status(500).json(err);
        }
    });
    var queryBill = "SELECT count(id) as billCount FROM bill where deleted='false'";
    connection.query(queryBill, (err, results) => {
        console.log("Results bill: ", results[0])
        if (!err) {
            billCount = results[0].billCount;
            var data = {
                category: categoryCount,
                product: productCount,
                bill: billCount
            }
            return res.status(200).json(data)
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;