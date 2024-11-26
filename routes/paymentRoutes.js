const express = require('express');

const {
    processPayment,
    getPaymentByOrderId,
    getAllPayments
  } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Process Payment
router.post('/', protect, processPayment);

// Get Payment by Order ID
router.get('/order/:orderId', protect, getPaymentByOrderId);

// Get all payments
router.get('/', getAllPayments);

module.exports = router;
