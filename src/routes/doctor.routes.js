
const express = require('express');
const { registerDoctor, loginDoctor, getDoctorProfile } = require('../controllers/doctor.controller');
const { authDoctor } = require('../middlewares/auth.middleware');
const router = express.Router();
router.post('/signup',registerDoctor);
router.post('/login',loginDoctor);
router.get('/profileView',authDoctor,getDoctorProfile);
module.exports=router;