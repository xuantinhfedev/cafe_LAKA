// Khai báo biến, thư viện sử dụng
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

// API thêm Category
router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res) => {

    let category = req.body;
    var query = "insert into category (name) values(?)";
    connection.query(query, [category.name], (err, results) => {
        if (!err) {
            return res.status(200).json({
                message: "Danh mục được thêm thành công."
            });
        } else {
            return res.status(500).json(err);
        }
    });
})

// API lấy danh sách Category
router.get('/get', auth.authenticateToken, (req, res) => {

    var query = "select * from category where deleted='false' order by id asc";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
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
                return res.status(404).json({
                    message: "Danh mục không được tìm thấy hoặc danh mục đã bị xóa."
                });
            } else {
                return res.status(200).json({
                    message: "Danh mục được cập nhật thành công."
                });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;