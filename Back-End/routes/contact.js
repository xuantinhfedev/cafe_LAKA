// Khai báo biến, thư viện sử dụng
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


router.post('/send', (req, res) => {


    let contact = req.body;
    var query = "insert into contact (name, contactNumber, email, message, deleted) values(?, ?, ?, ?, 'false')";
    connection.query(query, [contact.name, contact.contactNumber, contact.email, contact.message], (err, results) => {
        if (!err) {
            return res.status(200).json({
                results: {
                    responseCode: "200",
                    message: "Gửi tin nhắn thành công"
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

module.exports = router;