const express = require('express');
const productController = require('../controllers/productController');
const {isAdmin} = require('../middleware/auth');
const router = express.Router();

// Route menambahkan produk baru (hanya untuk role admin)
router.post('/', isAdmin, productController.addProduct);

module.exports = router;