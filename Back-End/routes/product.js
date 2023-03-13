// Khai báo biến, thư viện sử dụng
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

// API thêm Product
router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res) => {

    let product = req.body;
    var query = "insert into product (name, categoryId, description, price, status, deleted) values(?, ?, ?, ?, 'true', 'false')";
    connection.query(query, [product.name, product.categoryId, product.description, product.price], (err, results) => {
        if (!err) {
            return res.status(200).json({
                message: "Sản phẩm được thêm thành công."
            });
        } else {
            return res.status(500).json(err);
        }
    });
});

// API lấy danh sách Product
router.get('/get', auth.authenticateToken, (req, res, next) => {

    var query = "select p.id, p.name, p.description, p.price, p.status, c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c ON p.categoryId = c.id where p.deleted = 'false'";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// API lấy id, name của sản phẩm bằng categoryId
router.get('/getByCategory/:id', auth.authenticateToken, (req, res, next) => {

    const id = req.params.id;
    var query = "select id, name from product where categoryId = ? and status = 'true' and deleted = 'false'";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    });
});

// API lấy id, name, description, price của sản phẩm bằng id
router.get('/getById/:id', auth.authenticateToken, (req, res, next) => {

    const id = req.params.id;
    var query = "select id, name, description, price from product where id = ? and deleted = 'false'";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(404).json({
                    message: "Không tìm thấy sản phẩm hoặc sản phẩm đã bị xóa."
                });
            }
            return res.status(200).json(results[0]);
        } else {
            return res.status(500).json(err);
        }
    })
});

// API cập nhật sản phẩm dựa theo id sản phẩm
router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {

    let product = req.body;
    var query = "update product set name=?, categoryId=?, description=?, price=? where id=? and deleted='false'";
    connection.query(query, [product.name, product.categoryId, product.description, product.price, product.id], (err, results) => {
        if (!err) {
            console.log("update id: ", results);
            if (results.affectedRows == 0) {
                return res.status(404).json({
                    message: "Không tìm thấy sản phẩm hoặc sản phẩm đã bị xóa."
                });
            }
            return res.status(200).json({
                message: "Sản phẩm được cập nhật thành công."
            });
        } else {
            return res.status(500).json(err);
        }
    })
});

// API xóa sản phẩm theo id sản phẩm
router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {

    const id = req.params.id;
    // var query = "delete from product where id=?";
    var query = "update product set deleted='true' where id=? and deleted='false'";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({
                    message: "Không tìm thấy sản phẩm hoặc sản phẩm đã bị xóa."
                });
            }
            return res.status(200).json({
                message: "Sản phẩm đã được xóa thành công."
            });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.patch('/updateStatus', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {

    let user = req.body;
    var query = "update product set status=? where id=? and deleted = 'false'";
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({
                    message: "Không tìm thấy sản phẩm hoặc sản phẩm đã bị xóa."
                });
            }
            return res.status(200).json({
                message: "Trạng thái sản phẩm đã được cập nhật thành công."
            });
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;