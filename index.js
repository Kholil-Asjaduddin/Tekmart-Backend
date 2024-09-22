const express = require('express');
const mongoose = require('mongoose');

//env
const dotenv = require("dotenv");
dotenv.config();

//Connection string
const URI = process.env.URI

//Product
const Product = require("./models/product.model.js")
const productRoute = require("./routes/product.route.js")

//User
const User = require("./models/user.model.js")
const userRoute = require("./routes/user.route.js")

//Order
const Order = require("./models/order.model.js")
const orderRoute = require("./routes/order.route.js")

//Payment
const Payment = require("./models/payment.model.js")
const paymentRoute = require("./routes/payment.route.js")

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());


// Use user routes for handling user-related endpoints
app.use('/api/user', userRoute); // Add the user routes under "/api/user" path

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
