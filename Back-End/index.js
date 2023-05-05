const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const mysql = require('mysql');

const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const billRoute = require('./routes/bill');
const dashboardRoute = require('./routes/dashboard');
const contactRoute = require('./routes/contact');
const categorySaleRoute = require('./routes/categorySale');
const productSaleRoute = require('./routes/productSale');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// public folder uploads (Ảnh)
app.use('/uploads', express.static('uploads'));
app.use(express.static("public"));

// Route 
app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use('/bill', billRoute);
app.use('/dashboard', dashboardRoute);
app.use('/contact', contactRoute);
app.use('/category-sale', categorySaleRoute);
app.use('/product-sale', productSaleRoute);

// Stripe - Xử lý thanh toán
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const stripe = require("stripe")("sk_test_51MtO0CCDpSxvrGONrUKuLXanfodvJEay1dTYc3DCFOI7E40ezylv0ub4uQAUBhfrFlHaICkQNsgpbBRdO28VuUie00KDfW2yct");

app.put('/productSale/subtract', function (req, res) {
    const products = req.body;

    if (!Array.isArray(products)) {
        return res.status(200).json({ results: {
            responseCode: '400',
            message: 'Body # type'
        } });
    }

    const ids = products.map(product => product.id);

    const query = `
    UPDATE productSale
    SET quantity = quantity - CASE WHEN id IN (${mysql.escape(ids)}) THEN ? ELSE 0 END
    WHERE id IN (${mysql.escape(ids)})
  `;

    const values = [
        ...products.filter(product => product.quantity > 0).map(product => product.quantity),
        ...ids
    ];

    connection.query(query, values, function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({ results: {
            responseCode: '200',    
            message: 'Cập nhật số lượng sản phẩm'
        } });
    });
});

app.post("/checkout", async (req, res, next) => {
    // console.log(req.body)
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['VN'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'vnd',
                        },
                        display_name: 'Miễn phí vận chuyển',
                        // delivery_estimate: {
                        //     minimum:{
                        //         unit: 'day',
                        //         value: 1
                        //     },
                        //     maximum: {
                        //         unit: 'day',
                        //         value: 1
                        //     }
                        // }
                    }
                }
            ],
            line_items: req.body.items.map((item) => ({
                price_data: {
                    currency: 'vnd',
                    product_data: {
                        name: item.name,
                        // images: [`http://localhost:8080/uploads/${item.product}`]
                    },
                    unit_amount: item.price - (item.price * item.sale / 100)
                },
                quantity: item.quantity
            })),
            mode: "payment",
            success_url: "http://localhost:8080/success.html",
            cancel_url: "http://localhost:8080/cancel.html",
        });
        // console.log(session);
        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
});


module.exports = app;