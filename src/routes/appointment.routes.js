const express = require('express');
const { authPatient } = require('../middlewares/auth.middleware');
const { bookAppointment, cancelAppointment } = require('../controllers/appointment.controller');
const router = express.Router();
router.post('/patient/book',authPatient,bookAppointment);
router.patch('/patient/cancel',authPatient,cancelAppointment);
module.exports = router;

