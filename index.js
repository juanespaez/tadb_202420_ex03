const express = require('express');
const cors = require('cors');
require('dotenv').config();
 
const app = express();
const elementRoutes = require('./src/controllers/elementController');
const compoundRoutes = require('./src/controllers/compoundController')
 
// Middleware
app.use(cors());
app.use(express.json());
 
// Add request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
 
// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    env: {
      dbHost: process.env.DB_HOST,
      dbPort: process.env.DB_PORT,
      dbName: process.env.DB_DATABASE
    }
  });
});
 
// Routes
app.use('/api/elements', elementRoutes);
app.use('/api/compounds', compoundRoutes);
 
// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});
 
 
const API_PORT = process.env.PORT || 3000;  
app.listen(API_PORT, () => {
  console.log(`
    Server is running on: http://localhost:${API_PORT}
    Database is on port: ${process.env.DB_PORT}
  `);
});
