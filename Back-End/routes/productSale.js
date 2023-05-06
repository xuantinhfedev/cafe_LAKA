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
const mysql = require('mysql');

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
    var query = "insert into productSale (name, categorySaleId, description ,price, sale, hot, quantity, status, deleted) values(?, ?, ?, ?, ?, 'false', ?, 'true', 0)";
    connection.query(query, [product.name, product.categorySaleId, product.description, product.price, product.sale, product.quantity], (err, results) => {
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
    var query = "insert into productSale (name, categorySaleId, description, image ,price, sale, hot, quantity, status, deleted) values(?, ?, ?, ?, ?, ?, 'false', ?, 'true', 0)";
    connection.query(query, [product.name, product.categorySaleId, product.description, imgsrc, product.price, product.sale, product.quantity], (err, results) => {
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

  var queryCount = "SELECT COUNT(*) as dataCount FROM productSale WHERE deleted=0";
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
  })

  var query = "select p.id, p.name, p.description, p.image, p.price, p.status, p.sale, p.hot, p.quantity, c.id as categorySaleId, c.name as categoryName from productSale as p INNER JOIN categorySale as c ON p.categorySaleId = c.id where p.deleted = 0 and (? IS NULL or p.name LIKE ?) order by categorySaleId asc LIMIT ? OFFSET ? ";
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
  var query = "select id, name from productSale where categorySaleId = ? and status = 'true' and deleted = 0";
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
  var query = "select id, name, description, price, image, sale, hot, quantity from productSale where id = ? and deleted = 0";
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
    var query = "update productSale set name=?, categorySaleId=?, description=?, price=?, sale=?, quantity=? where id=? and deleted=0";
    connection.query(query, [product.name, product.categorySaleId, product.description, product.price, product.sale, product.quantity, product.id], (err, results) => {
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
    var query = "update productSale set name=?, categorySaleId=?, description=?,image=?, price=?, sale=?, quantity=? where id=? and deleted=0";
    connection.query(query, [product.name, product.categorySaleId, product.description, imgsrc, product.price, product.sale, product.quantity, product.id], (err, results) => {
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
  var query = "update productSale set deleted=1 where id=? and deleted=0";
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
  var query = "update productSale set status=? where id=? and deleted = 0";
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

router.patch('/updateHot', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {

  let user = req.body;
  var query = "update productSale set hot=? where id=? and deleted = 0";
  connection.query(query, [user.hot, user.id], (err, results) => {
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
          message: "Độ hot sản phẩm đã được cập nhật thành công."
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
  var query = "SELECT * FROM categorySale WHERE deleted=0";
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

  var queryCount = "SELECT COUNT(*) as dataCount FROM productSale WHERE deleted=1";
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

  var query = "select p.id, p.name, p.description, p.image, p.price, p.status, p.sale, p.hot, p.quantity, c.id as categorySaleId, c.name as categoryName from productSale as p INNER JOIN categorySale as c ON p.categorySaleId = c.id where p.deleted = 1 and (? IS NULL or p.name LIKE ?) order by categorySaleId asc LIMIT ? OFFSET ? ";
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
  var query = "DELETE FROM productSale where id=?";
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
  var query = "UPDATE productSale SET deleted=0 WHERE id=?";
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
  var query = "DELETE FROM productSale where deleted=1";
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
  var query = "UPDATE productSale SET deleted=0";
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
    queryCount = `SELECT COUNT(*) as dataCount FROM productSale WHERE deleted=0 and status='true' and (? IS NULL or name LIKE ?) and categorySaleId = ? ORDER BY price ${valueSort}`;
  } else {
    queryCount = `SELECT COUNT(*) as dataCount FROM productSale WHERE deleted=0 and status='true' and (? IS NULL or name LIKE ?) ORDER BY price ${valueSort}`;
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
  console.log(categoryID)
  if (categoryID) {
    query = `select p.id, p.name, p.description, p.image, p.price, p.sale, p.hot, p.quantity, p.status, c.id as categorySaleId, c.name as categoryName from productSale as p INNER JOIN categorySale as c ON p.categorySaleId = c.id where p.deleted = 0 and p.status='true' and  (? IS NULL or p.name LIKE ?) and categorySaleId = ? ORDER BY p.price ${valueSort} LIMIT ? OFFSET ? `;
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
    query = `select p.id, p.name, p.description, p.image, p.price, p.sale, p.hot, p.quantity, p.status, c.id as categorySaleId, c.name as categoryName from productSale as p INNER JOIN categorySale as c ON p.categorySaleId = c.id where p.deleted = 0 and p.status='true' and (? IS NULL or p.name LIKE ?) order by p.price ${valueSort} LIMIT ? OFFSET ? `;
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

// API lấy danh sách sản phẩm phía client
router.get('/pageProductHot', (req, res, next) => {

  let valueSearch = req.query.value;
  let pageSize = Number(req.query.pageSize);
  let pageIndex = Number(req.query.pageIndex);
  let valueLimit = pageSize;
  let valueOffset = pageSize * pageIndex;
  let valueSort = req.query.sort;
  let categoryID = req.query.categoryId;
  var queryCount = '';
  queryCount = `SELECT COUNT(*) as dataCount FROM productSale WHERE deleted=0 and  status='true' and (? IS NULL or name LIKE ?) AND hot='true' ORDER BY price ${valueSort}`;
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
  query = `select p.id, p.name, p.description, p.image, p.price, p.sale, p.hot, p.quantity, p.status, c.id as categorySaleId, c.name as categoryName from productSale as p INNER JOIN categorySale as c ON p.categorySaleId = c.id where p.deleted = 0  and status='true' and  (? IS NULL or p.name LIKE ?) AND hot='true' order by p.price ${valueSort} LIMIT ? OFFSET ? `;
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


// API lấy danh sách sản phẩm phía client
router.get('/pageProductSale', (req, res, next) => {

  let valueSearch = req.query.value;
  let pageSize = Number(req.query.pageSize);
  let pageIndex = Number(req.query.pageIndex);
  let valueLimit = pageSize;
  let valueOffset = pageSize * pageIndex;
  let valueSort = req.query.sort;
  let categoryID = req.query.categoryId;
  var queryCount = '';

  queryCount = `SELECT COUNT(*) as dataCount FROM productSale WHERE deleted=0 and status='true' and (? IS NULL or name LIKE ?) AND sale > 0 ORDER BY price ${valueSort}`;
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
  query = `select p.id, p.name, p.description, p.image, p.price, p.sale, p.hot, p.quantity, p.status, c.id as categorySaleId, c.name as categoryName from productSale as p INNER JOIN categorySale as c ON p.categorySaleId = c.id where p.deleted = 0  and status='true' and  (? IS NULL or p.name LIKE ?) AND sale > 0 order by p.price ${valueSort} LIMIT ? OFFSET ? `;
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

module.exports = router;