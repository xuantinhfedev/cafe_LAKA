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
                                .json({
                                    results: {
                                        responseCode: "200",
                                        message: "Đăng ký tài khoản thành công",
                                    }
                                });
                        } else {
                            return res.status(500).json(err);
                        }
                    }
                );
            } else {
                return res.status(200).json({
                    results: {
                        responseCode: "404",
                        message: "Tài khoản Email đã tồn tại.",
                    }
                });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

// API đăng nhập tài khoản
router.post('/login', (req, res) => {

    const user = req.body;
    query = "select email, name, password, role, status, deleted from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {

            // console.log(results[0])
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(200).json({
                    results: {
                        responseCode: '404',
                        message: "Tài khoản hoặc mật khẩu không chính xác"
                    }
                });
            } else if (results[0].status === "false") {
                return res.status(200).json({
                    results: {
                        responseCode: '404',
                        message: "Tài khoản của bạn đã dừng hoạt động hoặc chưa kích hoạt. Liên hệ quản lý để kích hoạt",
                    }
                });
            } else if (results[0].deleted === "true") {
                return res.status(200).json({
                    results: {
                        responseCode: '401',
                        message: "Tài khoản của bạn đã bị xóa. Liên hệ quản lý để khôi phục",
                    }
                });
            }
            else if (results[0].password == user.password) {
                const response = {
                    email: results[0].email,
                    role: results[0].role,
                    name: results[0].name,
                };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
                    expiresIn: '8h'
                })
                res.status(200).json({
                    token: accessToken,
                    results: {
                        responseCode: '200',
                        message: "Đăng nhập thành công.",
                    }
                });
            } else {
                return res.status(200).json({
                    results: {
                        responseCode: '400',
                        message: "Có lỗi xảy ra. Vui lòng thử lại sau"
                    }
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
                return res.status(200).json({
                    results: {
                        responseCode: '401',
                        message: "Email không chính xác"
                    }
                });
            } else {
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Mật khẩu được gửi từ Laka Cafe Manage',
                    html: '<p><b>Chi tiết đăng nhập vào hệ thống Laka Cafe manage</b><br><b>Email: </b>' + results[0].email + '<br><b>Password: </b>' + results[0].password + '<br><a href="http://localhost:4200">Nhấn vào đây để đăng nhập lại</a></p>'
                }
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        // console.log(err)
                    } else {
                        // console.log("Email sent: " + info.response)
                    }
                });
                return res.status(200).json({
                    results: {
                        responseCode: '200',
                        message: "Mật khẩu đã được gửi tới Email của bạn."
                    }
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

    let valueSearch = req.query.value;
    let pageSize = Number(req.query.pageSize);
    let pageIndex = Number(req.query.pageIndex);
    let valueLimit = pageSize;
    let valueOffset = pageSize * pageIndex;
    let dataCount = 0;

    var queryCount = "SELECT COUNT(*) as dataCount FROM user WHERE deleted='false' and (? IS NULL or name LIKE ?)";
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
    })

    var query = "select id, name, email, contactNumber, status from user where role = 'user' and deleted='false' and (? IS NULL or name LIKE ?) order by id asc LIMIT ? OFFSET ?";
    connection.query(query, [valueSearch, ['%' + valueSearch + '%'], valueLimit, valueOffset], (err, results) => {
        if (!err) {
            return res.status(200).json({
                results: {
                    responseCode: "200",
                    message: "Lấy danh sách nhân viên thành công.",
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

// API thay đổi(cập nhật) trạng thái status của user
router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res) => {

    let user = req.body;
    var query = "update user set status = ? where id = ?";
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    results: {
                        responseCode: "404",
                        message: "ID của tài khoản không tồn tại."
                    }
                });
            }
            return res.status(200).json({
                results: {
                    responseCode: "200",
                    message: "Cập nhật trạng thái tài khoản thành công."
                }
            });
        }
        else {
            return res.status(200).json({
                results: {
                    responseCode: "500",
                    message: err
                }
            });
        }
    })
})

// API kiểm tra Token
router.get('/checkToken', auth.authenticateToken, (req, res) => {

    return res.status(200).json({
        results: {
            responseCode: "200",
            message: "true"
        }
    });
});

// API thay đổi mật khẩu của user
router.post('/changePassword', auth.authenticateToken, (req, res) => {

    const user = req.body;
    const email = res.locals.email;
    var query = "select * from user where email = ? and password = ?";
    // console.log("user: ", user);
    connection.query(query, [email, user.oldPassword], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(200).json({
                    results: {
                        responseCode: "401",
                        message: "Mật khẩu cũ không chính xác."
                    }
                })
            }
            else if (results[0].password == user.oldPassword) {
                query = "update user set password = ? where email = ?";
                connection.query(query, [user.newPassword, email], (err, results) => {
                    if (!err) {
                        return res.status(200).json({
                            results: {
                                responseCode: "200",
                                message: "Mật khẩu đã được cập nhật thành công."
                            }
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
