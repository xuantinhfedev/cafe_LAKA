// Khai báo biến, thư viện sử dụng
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

// API thêm Category
router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res) => {

    let category = req.body;
    var query = "insert into category (name, deleted) values(?, 'false')";
    connection.query(query, [category.name], (err, results) => {
        if (!err) {
            return res.status(200).json({
                results: {
                    responseCode: "200",
                    message: "Thêm danh mục thành công."
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
})

// API tìm kiếm danh sách Category
router.get('/search', auth.authenticateToken, (req, res) => {

    console.log(req.query);
    var queryCount = "select COUNT(*) as dataCount from category where deleted='false' and name LIKE ? order by id asc";
    let dataCount = 0;
    connection.query(queryCount, [req.query.name,  ['%' + req.query.name + '%']], (err, results) => {
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

    var query = "select * from category where deleted='false' and name LIKE ? order by id asc";
    connection.query(query, [['%' + req.query.name + '%']], (err, results) => {
        if (!err) {
            return res.status(200).json({
                results: {
                    responseCode: "200",
                    message: "Tìm kiếm danh mục thành công.",
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


// API lấy danh sách Category
router.get('/get', auth.authenticateToken, (req, res) => {

    console.log(req.query);
    var queryCount = "select COUNT(*) as dataCount from category where deleted='false' order by id asc";
    let dataCount = 0;
    connection.query(queryCount, (err, results) => {
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

    var query = "select * from category where deleted='false'  order by id asc";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json({
                results: {
                    responseCode: "200",
                    message: "Lấy danh sách danh mục thành công.",
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

// API cập nhật Category name
router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res) => {

    let category = req.body;
    var query = "update category set name=? where id=? and deleted='false'";
    connection.query(query, [category.name, category.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {    
                return res.status(200).json({
                    results: {
                        responseCode: "404",
                        message: "Danh mục không được tìm thấy hoặc danh mục đã bị xóa."
                    }
                });
            } else {
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Cập nhật tên danh mục thành công."
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

module.exports = router;