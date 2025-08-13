
const express = require('express');
const { registerDoctor, loginDoctor, getDoctorProfile, logoutDoctor } = require('../controllers/doctor.controller');
const { authDoctor } = require('../middlewares/auth.middleware');
const router = express.Router();
router.post('/signup',registerDoctor);
router.post('/login',loginDoctor);
router.get('/profileView',authDoctor,getDoctorProfile);
router.post('/logout',authDoctor,logoutDoctor);
module.exports=router;