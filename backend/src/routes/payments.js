const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Get user payments
router.get('/user/:userId', async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create payment
router.post('/', async (req, res) => {
  try {
    const { userId, amount, type, description } = req.body;
    const payment = new Payment({
      userId,
      amount,
      type,
      description,
      status: 'pending'
    });
    await payment.save();
    res.status(201).json({ message: 'Payment created', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update payment status
router.put('/:id', async (req, res) => {
  try {
    const { status, transactionId } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status, transactionId, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ message: 'Payment updated', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
