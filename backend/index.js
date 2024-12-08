const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const partnerRoutes = require('./routes/partners');
const orderRoutes = require('./routes/orders')
const Assignment = require('./models/Assignment');
const assignmentRoutes = require('./routes/assignments');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/partners', partnerRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/assignments', assignmentRoutes);


mongoose.connect('mongodb://localhost:27017/deliverySystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Failed:', err));

app.listen(5000, () => console.log('Server is currently running on port 5000'));
