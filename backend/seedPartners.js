const mongoose = require('mongoose');
const Partner = require('./models/DeliveryPartner');

mongoose.connect('mongodb://localhost:27017/deliverySystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedPartners = async () => {
  try {
    await Partner.deleteMany({});
    const partners = [
      {
        name: 'Partner 1',
        email: 'partner1@example.com',
        phone: '1234567890',
        status: 'active',
        currentLoad: 2,
      },
      {
        name: 'Partner 2',
        email: 'partner2@example.com',
        phone: '0987654321',
        status: 'inactive',
        currentLoad: 0,
      },
    ];

    await Partner.insertMany(partners);
    console.log('Partners seeded successfully.');
  } catch (err) {
    console.error('Error seeding partners:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedPartners();
