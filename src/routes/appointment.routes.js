const express = require('express');
const { authPatient } = require('../middlewares/auth.middleware');
const { bookAppointment } = require('../controllers/appointment.controller');
const router = express.Router();
router.post('/patient/bookAppointment',authPatient,bookAppointment);
module.exports = router;

