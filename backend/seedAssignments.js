const mongoose = require('mongoose');
const Assignment = require('./models/Assignment'); // Adjust path if necessary
const Order = require('./models/Order');
const Partner = require('./models/DeliveryPartner');

mongoose.connect('mongodb://localhost:27017/deliverySystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedAssignments = async () => {
  try {
    await Assignment.deleteMany({});
    const orders = await Order.find();
    const partners = await Partner.find();

    if (orders.length < 2 || partners.length < 2) {
      console.log('Please add at least two orders and two partners to seed assignments.');
      return mongoose.connection.close();
    }

    const assignments = [
      {
        orderId: orders[0]._id,
        partnerId: partners[0]._id,
        status: 'success',
        timestamp: new Date(),
      },
      {
        orderId: orders[1]._id,
        partnerId: partners[1]._id,
        status: 'failed',
        reason: 'Partner unavailable',
        timestamp: new Date(),
      },
    ];

    await Assignment.insertMany(assignments);
    console.log('Assignments seeded successfully.');
  } catch (err) {
    console.error('Error seeding assignments:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedAssignments();
