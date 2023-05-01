// Khai báo biến, thư viện sử dụng
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');
const bodyparser = require('body-parser')
const multer = require('multer')
const app = express();
const path = require('path')

// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
  extended: true
}))

let pathImg = '';
//! Use of Multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})


const upload = multer({ storage: storage });


// API thêm Product
router.post('/add', upload.single('image'), auth.authenticateToken, checkRole.checkRole, (req, res) => {

  let product = req.body;
  if (!req.file) {
    var query = "insert into product (name, categoryId, description ,price, status, deleted) values(?, ?, ?, ?, 'true', 'false')";
    connection.query(query, [product.name, product.categoryId, product.description, product.price], (err, results) => {
      if (!err) {
        return res.status(200).json({
          results: {
            responseCode: "200",
            message: "Thêm sản phẩm mới thành công."
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
  } else {
    var imgsrc = req.file.filename;
    var query = "insert into product (name, categoryId, description, file_src ,price, status, deleted) values(?, ?, ?, ?, ?, 'true', 'false')";
    connection.query(query, [product.name, product.categoryId, product.description, imgsrc, product.price], (err, results) => {
      if (!err) {
        return res.status(200).json({
          results: {
            responseCode: "200",
            message: "Thêm sản phẩm mới thành công."
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
  }

});

// API lấy danh sách Product
router.get('/get', auth.authenticateToken, (req, res, next) => {

  let valueSearch = req.query.value;
  let pageSize = Number(req.query.pageSize);
  let pageIndex = Number(req.query.pageIndex);
  let valueLimit = pageSize;
  let valueOffset = pageSize * pageIndex;

  var queryCount = "SELECT COUNT(*) as dataCount FROM product WHERE deleted='false' and (? IS NULL or name LIKE ?)  ORDER BY categoryId ASC";
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

  var query = "select p.id, p.name, p.description, p.file_src, p.price, p.status, c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c ON p.categoryId = c.id where p.deleted = 'false' and (? IS NULL or p.name LIKE ?) order by categoryId asc LIMIT ? OFFSET ? ";
  connection.query(query, [valueSearch, ['%' + valueSearch + '%'], valueLimit, valueOffset], (err, results) => {
    if (!err) {
      return res.status(200).json({
        results: {
          responseCode: "200",
          message: "Lấy danh sách sản phẩm thành công.",
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
  var query = "select id, name, description, price, file_src from product where id = ? and deleted = 'false'";
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

// API cập nhật sản phẩm
router.post('/update', upload.single('image'), auth.authenticateToken, checkRole.checkRole, (req, res) => {

  let product = req.body;
  if (!req.file) {
    var query = "update product set name=?, categoryId=?, description=?, price=? where id=? and deleted='false'";
    connection.query(query, [product.name, product.categoryId, product.description, product.price, product.id], (err, results) => {
      if (!err) {
        return res.status(200).json({
          results: {
            responseCode: "200",
            message: "Cập nhật sản phẩm thành công."
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
  } else {
    var imgsrc = req.file.filename;
    var query = "update product set name=?, categoryId=?, description=?,file_src=?, price=? where id=? and deleted='false'";
    connection.query(query, [product.name, product.categoryId, product.description, imgsrc, product.price, product.id], (err, results) => {
      if (!err) {
        return res.status(200).json({
          results: {
            responseCode: "200",
            message: "Cập nhật sản phẩm thành công."
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
  }
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
          results: {
            responseCode: "404",
            message: "Không tìm thấy sản phẩm hoặc sản phẩm đã bị xóa."
          }
        });
      }
      return res.status(200).json({
        results: {
          responseCode: "200",
          message: "Sản phẩm đã được chuyển vào thùng rác."
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

router.patch('/updateStatus', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {

  let user = req.body;
  var query = "update product set status=? where id=? and deleted = 'false'";
  connection.query(query, [user.status, user.id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(200).json({
          results: {
            responseCode: "404",
            message: "Không tìm thấy sản phẩm hoặc sản phẩm đã bị xóa."
          }
        });
      }
      return res.status(200).json({
        results: {
          responseCode: "200",
          message: "Trạng thái sản phẩm đã được cập nhật thành công."
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

router.get('/getCategories', auth.authenticateToken, (req, res, next) => {
  var query = "SELECT * FROM category WHERE deleted='false'";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json({
        results: {
          responseCode: "200",
          message: "Lấy danh sách danh mục thành công.",
          data: results,
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


//  API lấy danh sách sản phẩm có trong thùng rác
router.get('/trash-product', auth.authenticateToken, (req, res, next) => {

  let valueSearch = req.query.value;
  let pageSize = Number(req.query.pageSize);
  let pageIndex = Number(req.query.pageIndex);
  let valueLimit = pageSize;
  let valueOffset = pageSize * pageIndex;

  var queryCount = "SELECT COUNT(*) as dataCount FROM product WHERE deleted='true' and (? IS NULL or name LIKE ?)";
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

  var query = "select p.id, p.name, p.description, p.file_src, p.price, p.status, c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c ON p.categoryId = c.id where p.deleted = 'true' and (? IS NULL or p.name LIKE ?) order by categoryId asc LIMIT ? OFFSET ? ";
  connection.query(query, [valueSearch, ['%' + valueSearch + '%'], valueLimit, valueOffset], (err, results) => {
    if (!err) {
      return res.status(200).json({
        results: {
          responseCode: "200",
          message: "Lấy danh sách sản phẩm thành công.",
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

// API xóa hoàn toàn khỏi Sản phẩm
router.delete('/destroy', auth.authenticateToken, checkRole.checkRole, (req, res) => {
  let product = req.query.id;
  var query = "DELETE FROM product where id=?";
  connection.query(query, [product], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(200).json({
          results: {
            responseCode: "404",
            message: "Sản phẩm không được tìm thấy"
          }
        });
      } else {
        return res.status(200).json({
          results: {
            responseCode: "200",
            message: "Sản phẩm đã bị xóa hoàn toàn."
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

// API khôi phục Sản phẩm từ thùng rác
router.patch('/restore', auth.authenticateToken, checkRole.checkRole, (req, res) => {
  let product = req.body;
  var query = "UPDATE product SET deleted='false' WHERE id=?";
  connection.query(query, [product.id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(200).json({
          results: {
            responseCode: "404",
            message: "Sản phẩm không được tìm thấy."
          }
        });
      } else {
        return res.status(200).json({
          results: {
            responseCode: "200",
            message: "Khôi phục sản phẩm thành công."
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

// API xóa hoàn toàn tất cả danh mục khỏi danh sách Sản phẩm
router.delete('/clear', auth.authenticateToken, checkRole.checkRole, (req, res) => {
  var query = "DELETE FROM product where deleted='true'";
  connection.query(query, (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(200).json({
          results: {
            responseCode: "404",
            message: "Sản phẩm không được tìm thấy."
          }
        });
      } else {
        return res.status(200).json({
          results: {
            responseCode: "200",
            message: "Tất cả sản phẩm đã được xóa khỏi thùng rác"
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



// API khôi phục tất cả Sản phẩm từ thùng rác
router.patch('/restore-all', auth.authenticateToken, checkRole.checkRole, (req, res) => {
  var query = "UPDATE product SET deleted='false'";
  connection.query(query, (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(200).json({
          results: {
            responseCode: "404",
            message: "Sản phẩm không được tìm thấy."
          }
        });
      } else {
        return res.status(200).json({
          results: {
            responseCode: "200",
            message: "Khôi phục tất cả sản phẩm từ thùng rác thành công."
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


// API lấy danh sách sản phẩm phía client
router.get('/pageAllProduct', (req, res, next) => {

  let valueSearch = req.query.value;
  let pageSize = Number(req.query.pageSize);
  let pageIndex = Number(req.query.pageIndex);
  let valueLimit = pageSize;
  let valueOffset = pageSize * pageIndex;
  let valueSort = req.query.sort;
  let categoryID = req.query.categoryId;
  var queryCount = '';
  if (categoryID) {
    queryCount = `SELECT COUNT(*) as dataCount FROM product WHERE deleted='false' and (? IS NULL or name LIKE ?) and categoryId = ? ORDER BY price ${valueSort}`;
  } else {
    queryCount = `SELECT COUNT(*) as dataCount FROM product WHERE deleted='false' and (? IS NULL or name LIKE ?) ORDER BY price ${valueSort}`;
  }
  let dataCount = 0;
  connection.query(queryCount, [valueSearch, ['%' + valueSearch + '%'], categoryID, categoryID], (err, results) => {
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

  var query = '';
  if (categoryID) {
    query = `select p.id, p.name, p.description, p.file_src, p.price, p.status, c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c ON p.categoryId = c.id where p.deleted = 'false' and (? IS NULL or p.name LIKE ?) and categoryId = ? ORDER BY p.price ${valueSort} LIMIT ? OFFSET ? `;
    connection.query(query, [valueSearch, ['%' + valueSearch + '%'], categoryID, valueLimit, valueOffset], (err, results) => {
      if (!err) {
        return res.status(200).json({
          results: {
            responseCode: "200",
            message: "Lấy danh sách sản phẩm thành công.",
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
  } else {
    query = `select p.id, p.name, p.description, p.file_src, p.price, p.status, c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c ON p.categoryId = c.id where p.deleted = 'false' and (? IS NULL or p.name LIKE ?) order by p.price ${valueSort} LIMIT ? OFFSET ? `;
    connection.query(query, [valueSearch, ['%' + valueSearch + '%'], valueLimit, valueOffset], (err, results) => {
      if (!err) {
        return res.status(200).json({
          results: {
            responseCode: "200",
            message: "Lấy danh sách sản phẩm thành công.",
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
  }


});

module.exports = router;