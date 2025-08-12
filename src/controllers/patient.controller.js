const PatiendModel = require("../models/patient.model");
const { createPatient } = require("../services/patient.service");


module.exports.registerPatient = async (req, res, next) => {
    try {
        const { firstName, lastName, gender, email, password, contactNumber } = req.body;
        const isPatiendAlreadyExists = await PatiendModel.findOne({ email: email });
        if (isPatiendAlreadyExists) return res.status(400).json("Email Id is already registerd with an account");
        const patient = await createPatient(firstName, lastName, gender, email, password, contactNumber);
        const token = await patient.getJwt();
        res.cookie('token',token);
        return res.status(201).json({ token: token }, patient)
    } catch (error) {
        res.status(401).json(error.message)
    }
}
module.exports.loginPatient = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email||!password) return res.status(401).json("All Field are Required");
        const patient = await PatiendModel.findOne({ email: email }).select('+password');
        if (!patient) return res.status(401).json("Invalid Credentials");
        const ishashPassword = await patient.validatePassword(password);
        if (!ishashPassword) return res.status(401).json("Invalid Credentials");
        const token = await patient.getJwt();
        res.cookie('token',token)
        return res.status(201).json(patient, token);
    } catch (error) {
        return res.status(401).json(error.message)
    }
}
module.exports.getPatientProfile = async (req,res,next) => {
    try {
        const patient = req.patient;
        if(!patient) return res.status(401).json("Patient does not Exists");
        return res.status(201).json(patient);
    } catch (error) {
        return res.status(401).json("Internal server Error");
    }
}