const express = require('express');
const Assignment = require('../models/Assignment');
const router = express.Router();

// Metrics route
router.get('/metrics', async (req, res) => {
  try {
    const totalAssigned = await Assignment.countDocuments();
    const successRate = await Assignment.countDocuments({ status: 'success' }) / totalAssigned * 100;
    const averageTime = await Assignment.aggregate([
      {
        $group: {
          _id: null,
          avgTime: { $avg: { $subtract: ['$timestamp', '$createdAt'] } },
        },
      },
    ]);

    const failureReasons = await Assignment.aggregate([
      { $match: { status: 'failed' } },
      { $group: { _id: '$reason', count: { $sum: 1 } } },
    ]);

    res.json({
      totalAssigned,
      successRate: isNaN(successRate) ? 0 : successRate.toFixed(2),
      averageTime: averageTime[0]?.avgTime || 0,
      failureReasons,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching metrics', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('orderId', 'orderNumber') // Populate order details
      .populate('partnerId', 'name')     // Populate partner details
      .sort({ timestamp: -1 })           // Sort by most recent
      .limit(5);                         // Limit to 5 results
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching assignments', error: err.message });
  }
});

module.exports = router;
