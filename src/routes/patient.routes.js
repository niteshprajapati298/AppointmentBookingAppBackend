const express = require('express');
const { registerPatient, loginPatient, getPatientProfile, logoutPatient } = require('../controllers/patient.controller');
const router = express.Router();
const {authPatient} = require('../middlewares/auth.middleware');
const { getDoctorsBySpeciality, getDoctors } = require('../controllers/doctor.controller');
const { getAllBookedAppointmentsByPatientId } = require('../controllers/appointment.controller');
router.post('/signup',registerPatient);
router.post('/login',loginPatient);
router.get('/profileView',authPatient,getPatientProfile);
router.post('/logout',authPatient,logoutPatient);
router.get('/doctors',authPatient, getDoctors);        
router.get('/doctors/:id',authPatient, getDoctors);    

router.get("/doctor/search",authPatient ,getDoctorsBySpeciality);
router.get('/appointments',authPatient,getAllBookedAppointmentsByPatientId);



module.exports=router;