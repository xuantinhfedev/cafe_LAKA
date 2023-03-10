const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

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

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

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
                    message: "Mật khẩu mới đã được gửi tới tài khoản Email của bạnnn."
                })
            }
        }
        else {
            return res.status(500).json(err)
        }
    })
});

module.exports = router;
