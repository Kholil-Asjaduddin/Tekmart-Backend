const express = require('express');
const productController = require('../controllers/productController');
const {isAdmin} = require('../middleware/auth');
const router = express.Router();

// Route menambahkan produk baru (hanya untuk role admin)
router.post('/', isAdmin, productController.addProduct);
// Route mengubah informasi produk (hanya untuk role admin)
router.put('/:id', isAdmin, productController.updateProduct);

module.exports = router;