
const express = require('express');
const { registerDoctor, loginDoctor, getDoctorProfile, logoutDoctor, updateDoctorProfile, updateDoctorAvailability } = require('../controllers/doctor.controller');
const { authDoctor } = require('../middlewares/auth.middleware');
const router = express.Router();
router.post('/signup',registerDoctor);
router.post('/login',loginDoctor);
router.get('/profileView',authDoctor,getDoctorProfile);
router.post('/logout',authDoctor,logoutDoctor);
router.patch("/availability", authDoctor, updateDoctorAvailability);


// 🔑 Doctor Routes

// ✅ Already have: register, login, profile, logout
// 👉 Add these:

// PATCH /doctor/availability → to update doctor availability (when schedule changes).

// GET /doctor/appointments → doctor can view all upcoming/past appointments.

// PATCH /doctor/appointment/:id/complete → doctor marks an appointment as completed (if not handled by cron).

// PATCH /doctor/appointment/:id/cancel → doctor cancels appointment if unavailable.

module.exports=router;