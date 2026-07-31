require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { seedAdmin } = require('./controllers/authController');
const path = require('path');

// Routes
const authRoutes = require('./routes/authRoutes');
const tourRoutes = require('./routes/tourRoutes');
const visaRoutes = require('./routes/visaRoutes');
const activityRoutes = require('./routes/activityRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const popupRoutes = require('./routes/popupRoutes');

const app = express();

// Connect to database
connectDB().then(() => {
  // Seed initial admin user
  seedAdmin();
});

// Middleware
app.use(
  cors({
    origin: [
      "https://air-dream.vercel.app",
      "http://localhost:5173",
      ,"https://airdreamtraveltourism.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/visas', visaRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/popups', popupRoutes);

app.get('/', (req, res) => {
  res.send('Air Dream Travel & Tourism API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
