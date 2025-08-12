const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const doctorRoutes = require('./src/routes/doctor.routes')
const patientRoutes = require('./src/routes/patient.routes')


dotenv.config();

const app = express(); 

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());


app.use('/doctor',doctorRoutes);
app.use('/patient',patientRoutes);
// Test Route
app.get('/', (req, res) => {
  res.send("Hello world");
});

module.exports = app;
