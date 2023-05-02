// Khai báo biến, thư viện sử dụng
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


router.post('/send', (req, res) => {
  let contact = req.body;
  const moonLanding = new Date();
  var query = "insert into contact (name, contactNumber, email, message, deleted, status, createdAt) values(?, ?, ?, ?, 'false', ?, ?)";
  connection.query(query, [contact.name, contact.contactNumber, contact.email, contact.message, 0, moonLanding], (err, results) => {
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
});

router.get('/get', auth.authenticateToken, (req, res, next) => {

  let valueSearch = req.query.value;
  let pageSize = Number(req.query.pageSize);
  let pageIndex = Number(req.query.pageIndex);
  let valueLimit = pageSize;
  let valueOffset = pageSize * pageIndex;

  var queryCount = "SELECT COUNT(*) as dataCount FROM contact WHERE deleted='false'";
  let dataCount = 0;
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

  var query = "SELECT * FROM contact WHERE deleted = 'false' and (? IS NULL or name LIKE ?) order by createdAt DESC LIMIT ? OFFSET ? ";
  connection.query(query, [valueSearch, ['%' + valueSearch + '%'], valueLimit, valueOffset], (err, results) => {
    if (!err) {
      return res.status(200).json({
        results: {
          responseCode: "200",
          message: "Lấy danh sách thành công.",
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

router.patch('/update', auth.authenticateToken, (req, res) => {

  let contact = req.body;
  var query = "update contact set status = ? where id = ?";
  connection.query(query, [contact.status, contact.id], (err, results) => {
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


module.exports = router;