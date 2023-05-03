// Khai báo biến, thư viện sử dụng
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

// API thêm Category bán hàng
router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let category = req.body;
    var query = "insert into categorySale (name, deleted) values(?, 0)";
    connection.query(query, [category.name], (err, results) => {
        if (!err) {
            return res.status(200).json({
                results: {
                    responseCode: "200",
                    message: "Thêm danh mục bán hàng thành công."
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
// router.get('/search', auth.authenticateToken, (req, res) => {

//     var queryCount = "select COUNT(*) as dataCount from category where deleted=0 and name LIKE ? order by id asc";
//     let dataCount = 0;
//     connection.query(queryCount, [['%' + req.query.name + '%']], (err, results) => {
//         if (!err) {
//             dataCount = results[0];
//         } else {
//             return res.status(200).json({
//                 results: {
//                     responseCode: "500",
//                     message: err 
//                 }
//             });
//         }
//     });

//     var query = "select * from category where deleted=0 and name LIKE ? order by id asc";
//     connection.query(query, [['%' + req.query.name + '%']], (err, results) => {
//         if (!err) {
//             return res.status(200).json({
//                 results: {
//                     responseCode: "200",
//                     message: "Tìm kiếm danh mục thành công.",
//                     data: results,
//                     dataCount: dataCount.dataCount
//                 }
//             });
//         } else {
//             return res.status(200).json({
//                 results: {
//                     responseCode: "500",
//                     message: err
//                 }
//             });
//         }
//     });
// });

// API lấy danh sách Category
router.get('/get', auth.authenticateToken, (req, res) => {

    let valueSearch = req.query.value;
    let pageSize = Number(req.query.pageSize);
    let pageIndex = Number(req.query.pageIndex);
    let valueLimit = pageSize;
    let valueOffset = pageSize * pageIndex;

    var queryCount = "SELECT COUNT(*) as dataCount FROM categorySale WHERE deleted=0 and (? IS NULL or name LIKE ?) ORDER BY id ASC";
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
    });
    var query = "SELECT * FROM categorySale WHERE deleted=0 and (? IS NULL or name LIKE ?) order by id asc LIMIT ? OFFSET ?";
    connection.query(query, [valueSearch, ['%' + valueSearch + '%'], valueLimit, valueOffset], (err, results) => {
        if (!err) {
            return res.status(200).json({
                results: {
                    responseCode: "200",
                    message: "Lấy danh sách danh mục bán hàng thành công.",
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
    var query = "update categorySale set name=? where id=? and deleted=0";
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

// API xóa Category
router.delete('/delete', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let category = req.query.id;
    var query = "update categorySale set deleted=1 where id=?";
    connection.query(query, [category], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    results: {
                        responseCode: "404",
                        message: "Danh mục không được tìm thấy hoặc danh mục đã được chuyển vào thùng rác."
                    }
                });
            } else {
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Danh mục đã được chuyển vào thùng rác thành công."
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

// API lấy thùng rác Category
router.get('/trash', auth.authenticateToken, (req, res) => {

    let valueSearch = req.query.value;
    let pageSize = Number(req.query.pageSize);
    let pageIndex = Number(req.query.pageIndex);
    let valueLimit = pageSize;
    let valueOffset = pageSize * pageIndex;

    var queryCount = "SELECT COUNT(*) as dataCount FROM categorySale WHERE deleted=1";
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
    var query = "SELECT * FROM categorySale WHERE deleted=1 and (? IS NULL or name LIKE ?) order by id asc LIMIT ? OFFSET ?";
    connection.query(query, [valueSearch, ['%' + valueSearch + '%'], valueLimit, valueOffset], (err, results) => {
        if (!err) {
            return res.status(200).json({
                results: {
                    responseCode: "200",
                    message: "Lấy danh sách thùng rác thành công.",
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


// API tìm kiếm danh sách thùng rác Category
router.get('/search-trash', auth.authenticateToken, (req, res) => {

    var queryCount = "select COUNT(*) as dataCount from category where deleted=1 and name LIKE ? order by id asc";
    let dataCount = 0;
    connection.query(queryCount, [req.query.name, ['%' + req.query.name + '%']], (err, results) => {
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

    var query = "select * from category where deleted=1 and name LIKE ? order by id asc";
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

// API xóa hoàn toàn khỏi Category
router.delete('/destroy', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let category = req.query.id;
    var query = "DELETE FROM categorySale where id=?";
    connection.query(query, [category], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    results: {
                        responseCode: "404",
                        message: "Danh mục không được tìm thấy."
                    }
                });
            } else {
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Danh mục đã bị xóa hoàn toàn."
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


// API khôi phục Category từ thùng rác
router.patch('/restore', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let category = req.body;
    var query = "update categorySale set deleted=0 where id=?";
    connection.query(query, [category.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    results: {
                        responseCode: "404",
                        message: "Danh mục không được tìm thấy hoặc danh mục đã được chuyển vào thùng rác."
                    }
                });
            } else {
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Khôi phục danh mục thành công."
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



// API xóa hoàn toàn tất cả danh mục khỏi Category
router.delete('/destroy-all', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    var query = "DELETE FROM categorySale where deleted=1";
    connection.query(query, (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    results: {
                        responseCode: "404",
                        message: "Danh mục không được tìm thấy hoặc danh mục đã được chuyển vào thùng rác."
                    }
                });
            } else {
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Danh mục đã bị xóa hoàn toàn."
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


// API khôi phục tất cả Category từ thùng rác
router.patch('/restore-all', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    var query = "update categorySale set deleted=0";
    connection.query(query, (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(200).json({
                    results: {
                        responseCode: "404",
                        message: "Danh mục không được tìm thấy hoặc danh mục đã được chuyển vào thùng rác."
                    }
                });
            } else {
                return res.status(200).json({
                    results: {
                        responseCode: "200",
                        message: "Khôi phục danh mục thành công."
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


// Lấy danh sách tên sản phẩm
router.get('/lstCategory', (req, res) => {
    var query = "SELECT id, name FROM categorySale WHERE deleted=0";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json({
                results: {
                    responseCode: "200",
                    message: "Lấy danh sách danh mục thành công",
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
    })
})

module.exports = router;