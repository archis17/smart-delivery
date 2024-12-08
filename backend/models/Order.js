const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderNumber: String,
  customer: {
    name: String,
    phone: String,
    address: String,
  },
  area: String,
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  status: { type: String, enum: ['pending', 'assigned', 'picked', 'delivered'], default: 'pending' },
  scheduledFor: String, // HH:mm
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner' },
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
