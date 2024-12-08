const express = require('express');
const Order = require('../models/Order');
const DeliveryPartner = require('../models/DeliveryPartner');
const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Assign order to a partner
router.post('/assign', async (req, res) => {
  const { orderId, partnerId } = req.body;

  const partner = await DeliveryPartner.findById(partnerId);
  const order = await Order.findById(orderId);

  if (partner.currentLoad >= 3) {
    return res.status(400).json({ message: 'Partner has reached maximum load' });
  }

  order.assignedTo = partnerId;
  order.status = 'assigned';
  partner.currentLoad += 1;

  await order.save();
  await partner.save();

  res.json({ message: 'Order assigned successfully', order });
});

// Update order status
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id);
  order.status = status;

  if (status === 'delivered' || status === 'cancelled') {
    const partner = await DeliveryPartner.findById(order.assignedTo);
    partner.currentLoad -= 1;
    if (status === 'delivered') partner.metrics.completedOrders += 1;
    else partner.metrics.cancelledOrders += 1;
    await partner.save();
  }

  await order.save();
  res.json(order);
});

module.exports = router;
