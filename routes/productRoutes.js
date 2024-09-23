const express = require('express');
const productController = require('../controllers/productController');
const {isAdmin} = require('../middleware/auth');
const router = express.Router();

// Route menambahkan produk baru (hanya untuk role admin)
router.post('/', isAdmin, productController.addProduct);
// Route mengubah informasi produk (hanya untuk role admin)
router.put('/:id', isAdmin, productController.updateProduct);
// Route mendapatkan informasi seluruh produk
router.get('/', productController.getAllProduct);
// Route mendapatkan informasi produk dengan id tertentu
router.get('/:id', productController.getProductById);
// Route mendapatkan informasi produk dengan kategori tertentu
router.get('/category/:category', productController.getProductByCategory);

module.exports = router;