const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')


dotenv.config();

const app = express(); 

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());

// Test Route
app.get('/', (req, res) => {
  res.send("Hello world");
});

module.exports = app;
