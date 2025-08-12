const express = require('express');
const { registerPatient, loginPatient, getPatientProfile } = require('../controllers/patient.controller');
const router = express.Router();
const {authPatient} = require('../middlewares/auth.middleware')
router.post('/signup',registerPatient);
router.post('/login',loginPatient);
router.get('/profileView',authPatient,getPatientProfile);

module.exports=router;