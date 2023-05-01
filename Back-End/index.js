const express = require('express');
var cors = require('cors');
const connection = require('./connection');

const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const billRoute = require('./routes/bill');
const dashboardRoute = require('./routes/dashboard');

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

// Stripe - Xử lý thanh toán
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const stripe = require("stripe")("sk_test_51MtO0CCDpSxvrGONrUKuLXanfodvJEay1dTYc3DCFOI7E40ezylv0ub4uQAUBhfrFlHaICkQNsgpbBRdO28VuUie00KDfW2yct");

app.post("/checkout", async (req, res, next) => {
    try {
        console.log(req.body)
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.items.map((item) => ({
                price_data: {
                    currency: 'vnd',
                    product_data: {
                        name: item.name,
                        // images: [`http://localhost:8080/uploads/${item.product}`]
                    },
                    unit_amount: item.price
                },
                quantity: item.quantity
            })),
            mode: "payment",
            success_url: "http://localhost:8080/success.html",
            cancel_url: "http://localhost:8080/cancel.html",
        });

        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
})


module.exports = app;