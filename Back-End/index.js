const express = require('express');
var cors = require('cors');
const connection = require('./connection');

const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const billRoute = require('./routes/bill');
const dashboardRoute = require('./routes/dashboard');
const contactRoute = require('./routes/contact');

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

// Stripe - Xử lý thanh toán
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const stripe = require("stripe")("sk_test_51MtO0CCDpSxvrGONrUKuLXanfodvJEay1dTYc3DCFOI7E40ezylv0ub4uQAUBhfrFlHaICkQNsgpbBRdO28VuUie00KDfW2yct");

app.post("/checkout", async (req, res, next) => {
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