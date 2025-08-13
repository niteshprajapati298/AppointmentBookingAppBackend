const express = require('express');
const { registerPatient, loginPatient, getPatientProfile, logoutPatient, getDoctors } = require('../controllers/patient.controller');
const router = express.Router();
const {authPatient} = require('../middlewares/auth.middleware')
router.post('/signup',registerPatient);
router.post('/login',loginPatient);
router.get('/profileView',authPatient,getPatientProfile);
router.post('/logout',authPatient,logoutPatient);
router.get('/doctors/:id',getDoctors);

module.exports=router;