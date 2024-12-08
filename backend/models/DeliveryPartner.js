const mongoose = require('mongoose');

const DeliveryPartnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  currentLoad: { type: Number, default: 0, max: 3 },
  areas: [String],
  shift: {
    start: String, // HH:mm
    end: String,   // HH:mm
  },
  metrics: {
    rating: { type: Number, default: 0 },
    completedOrders: { type: Number, default: 0 },
    cancelledOrders: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('DeliveryPartner', DeliveryPartnerSchema);
