const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();
const app = express();
app.use(express.json()); // JSON body parse karne ke liye

// MongoDB connect kar rahe hain
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB error:', err));

// Routes mount kar rahe hain
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
