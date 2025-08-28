
const express = require('express');
const { registerDoctor, loginDoctor, getDoctorProfile, logoutDoctor, updateDoctorAvailability, getAllAppointmentsByDoctorId, cancelAppointmentById, getAllAppointmentbyId } = require('../controllers/doctor.controller');
const { authDoctor } = require('../middlewares/auth.middleware');
const router = express.Router();
router.post('/signup',registerDoctor);
router.post('/login',loginDoctor);
router.get('/profileView',authDoctor,getDoctorProfile);
router.post('/logout',authDoctor,logoutDoctor);
router.patch("/availability", authDoctor, updateDoctorAvailability);
router.get('/appointments',authDoctor,getAllAppointmentsByDoctorId);
router.get('/appointments/:id',authDoctor,getAllAppointmentbyId);
router.patch(
  "/appointment/:id/cancel",
  authDoctor,
  cancelAppointmentById
);


// PATCH /doctor/appointment/:id/cancel → doctor cancels appointment if unavailable.


// 🔑 Doctor Routes

// ✅ Already have: register, login, profile, logout
// 👉 Add these:

// PATCH /doctor/availability → to update doctor availability (when schedule changes).



// PATCH /doctor/appointment/:id/complete → doctor marks an appointment as completed (if not handled by cron).


module.exports=router;