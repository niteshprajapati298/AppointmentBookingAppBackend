const express = require('express');
const { registerPatient, loginPatient } = require('../controllers/patient.controller');
const router = express.Router();
router.post('/signup',registerPatient);
router.post('/login',loginPatient);
