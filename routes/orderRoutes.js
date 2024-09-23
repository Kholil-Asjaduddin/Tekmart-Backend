// routes/orderRoutes.js
const express = require('express');
const {
  getAllOrders,
  getUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  verifyOrder
} = require('../controllers/orderController');

const router = express.Router();

// Route to get all orders (Admin - Tekmart WebApp)
router.get('/', getAllOrders);

// Route to get all orders by a specific user (Pengguna)
router.get('/user/:userId', getUserOrders);

// Route to create a new order (Pengguna)
router.post('/', createOrder);

// Route to update an order (Tekmart WebApp or Petugas Tekmart)
router.put('/:orderId', updateOrder);

// Route to delete an order (Pengguna)
router.delete('/:orderId', deleteOrder);

// Route to verify an order using unique code (Petugas Tekmart)
router.get('/verify/:uniqueCode', verifyOrder);

module.exports = router;
