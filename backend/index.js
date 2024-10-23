const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ruleRoutes = require('./routes/ruleRoutes');
const userRoutes = require('./routes/userRoutes');  // Import user routes
require('dotenv').config();  // Load environment variables from .env

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// API Routes
app.use('/api/rules', ruleRoutes);
app.use('/api/users', userRoutes);  // Add the user routes

// Set port to 5002 or use the value from .env
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
