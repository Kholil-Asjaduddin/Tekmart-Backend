const Payment = require('../models/Payment');
const Order = require('../models/Order');

// Process Payment
exports.processPayment = async (req, res) => {
  const { orderId, totalPrice, paymentMethod } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Simulate payment processing
    const payment = new Payment({
      orderId,
      totalPrice,
      paymentMethod,
      status: 'Completed',
      transactionId: 'TXN' + Date.now(),
    });

    const savedPayment = await payment.save();

    // Update Order status
    order.status = 'Paid';
    await order.save();

    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Payment Detail by Order ID
exports.getPaymentByOrderId = async (req, res) => {
  try {
    const payment = await Payment.findOne({ orderId: req.params.orderId });

    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
