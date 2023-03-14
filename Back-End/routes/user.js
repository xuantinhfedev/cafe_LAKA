// Khai báo biến, thư viện sử dụng
const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');
// API đăng ký tài khoản
router.post('/signup', (req, res) => {

    let user = req.body;
    query = "select email,password,role,status from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
                connection.query(query, [user.name, user.contactNumber, user.email, user.password],
                    (err, results) => {
                        if (!err) {
                            return res
                                .status(200)
                                .json({ message: "Đăng ký tài khoản thành công" });
                        } else {
                            return res.status(500).json(err);
                        }
                    }
                );
            } else {
                return res.status(400).json({ message: "Tài khoản Email đã tồn tại!." });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

// API đăng nhập tài khoản
router.post('/login', (req, res) => {

    const user = req.body;
    query = "select email, password, role, status from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({
                    message: "Tài khoản hoặc mật khẩu không chính xác"
                });
            } else if (results[0].status === "false") {
                return res.status(401).json({
                    message: "Tài khoản của bạn đã dừng hoạt động. Liên hệ quản lý để kích hoạt",
                });
            } else if (results[0].password == user.password) {
                const response = {
                    email: results[0].email,
                    role: results[0].role
                };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
                    expiresIn: '8h'
                })
                res.status(200).json({
                    token: accessToken
                });
            } else {
                return res.status(400).json({
                    message: "Có lỗi xảy ra. Vui lòng thử lại sau"
                });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

// Khai báo nodemailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

// API quên mật khẩu > mật khẩu sẽ gửi về mail nhập vào 
router.post('/forgotPassword', (req, res) => {

    const user = req.body;
    query = "select email, password from user where email=?"
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(401).json({
                    message: "Tài khoản hoặc mật khẩu không chính xác"
                });
            } else {
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Mật khẩu được gửi từ Cafe manage',
                    html: '<p><b>Chi tiết đăng nhập vào hệ thống Cafe manage</b><br><b>Email: </b>' + results[0].email + '<br><b>Password: </b>' + results[0].password + '<br><a href="http://localhost:4200">Click here to login</a></p>'
                }
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Email sent: " + info.response)
                    }
                });
                return res.status(200).json({
                    message: "Mật khẩu mới đã được gửi tới tài khoản Email của bạn."
                })
            }
        }
        else {
            return res.status(500).json(err)
        }
    })
});

// API lấy danh sách user
router.get('/get', auth.authenticateToken, checkRole.checkRole, (req, res) => {

    var query = "select id, name, email, contactNumber, status from user where role = 'user'";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    });

});

// API thay đổi(cập nhật) trạng thái status của user
router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res) => {

    let user = req.body;
    var query = "update user set status = ? where id = ?";
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({
                    message: "ID của tài khoản không tồn tại."
                })
            }
            return res.status(200).json({
                message: "Cập nhật trạng thái tài khoản thành công."
            });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

// API kiểm tra Token
router.get('/checkToken', auth.authenticateToken, (req, res) => {

    return res.status(200).json({
        message: "true"
    });
});

// API thay đổi mật khẩu của user
router.post('/changePassword', auth.authenticateToken, (req, res) => {

    const user = req.body;
    const email = res.locals.email;
    var query = "select * from user where email = ? and password = ?";
    console.log("user: ", user);
    connection.query(query, [email, user.oldPassword], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(400).json({
                    message: "Mật khẩu cũ không chính xác."
                })
            }
            else if (results[0].password == user.oldPassword) {
                query = "update user set password = ? where email = ?";
                connection.query(query, [user.newPassword, email], (err, results) => {
                    if (!err) {
                        return res.status(200).json({
                            message: "Mật khẩu đã được cập nhật thành công."
                        })
                    }
                    else {
                        return res.status(500).json(err)
                    }
                });
            }
            else {
                return res.status(400).json({
                    message: "Có lỗi xảy ra. Vui lòng thử lại sau."
                })
            }
        }
        else {
            return res.status(500).json(err);
        }
    });
})

module.exports = router;
