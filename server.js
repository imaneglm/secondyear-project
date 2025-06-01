// Load Required Modules
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
// Database configuration
const pool = require('./config/db');
// Load environment variables from .env file
dotenv.config();
// Initialize Express app
const app = express();



app.get('/', (req,res) => {
  console.log('GET / route is hit');
  res.send('Welcome to the Delivery Company API');
});

// Set the port from environment or default to 5000
const port=5000;




// Parse incoming JSON data
app.use(express.json());
// Enable Cross-Origin Resource Sharing (CORS)
// This allows the frontend (e.g., React on localhost:3000) to access the backend (e.g., localhost:5000)
app.use(cors({
   origin: 'http://localhost:3000', 
  credentials: true
}));
// API Routes
// Import route handlers
const AdminRoute = require ('./routes/Adminroute');
const contactRoute = require('./routes/contactroute');
const feedbackRoute = require('./routes/Feedbackroute');
const packageRoute = require('./routes/packageroute');
const loginRoute = require('./routes/Loginroute');
const signupRoute = require('./routes/Signuproute');
const preferencesRoute = require ('./routes/preferencesroute');
const NotificationsRoute = require('./routes/Notificationroute');
const QrRoute = require ('./routes/QRroute');
// Mount API routes
// General feedback route
app.use('/api/feedback', feedbackRoute);
// Map-related APIs
// user login
app.use('/api/login', loginRoute);
// user user registration
app.use('/api/signup', signupRoute);
// api contact
app.use('/api/contact', contactRoute);
// preferences api
app.use('/api/preferences' , preferencesRoute);
// packages api
app.use('/api/package', packageRoute);
// Admin api
app.use('/api/Admin',AdminRoute);
// notifications route
app.use('/api/Notifications',NotificationsRoute);
app.use('/api/Qr', QrRoute);

// Start Server
// if the server is runing on the port send a message 
app.listen(port,() => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});