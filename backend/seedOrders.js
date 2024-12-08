const mongoose = require('mongoose');
const Order = require('./models/Order');

mongoose.connect('mongodb://localhost:27017/deliverySystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedOrders = async () => {
  try {
    await Order.deleteMany({});
    const orders = [
      {
        orderNumber: 'ORD001',
        customer: { name: 'John Doe', latitude: 40.7128, longitude: -74.0060 },
        area: 'Area 1',
        status: 'assigned',
        scheduledFor: new Date(),
      },
      {
        orderNumber: 'ORD002',
        customer: { name: 'Jane Smith', latitude: 34.0522, longitude: -118.2437 },
        area: 'Area 2',
        status: 'picked',
        scheduledFor: new Date(),
      },
    ];

    await Order.insertMany(orders);
    console.log('Orders seeded successfully.');
  } catch (err) {
    console.error('Error seeding orders:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedOrders();
