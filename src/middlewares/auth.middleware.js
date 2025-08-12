const jwt = require('jsonwebtoken');
const PatiendModel = require('../models/patient.model');
const DoctorModel = require('../models/doctor.model');

module.exports.authPatient = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json("Invalid Token Please Login Again");
        // Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            console.error('JWT Verification Error:', error);
            if (error.name === 'JsonWebTokenError') {
                return res.status(400).json({ message: 'Invalid token format' });
            } else if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired' });
            }
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        const patient = await PatiendModel.findById(decoded._id);
        if (!patient) return res.status(401).json("patient not found");
        req.patient = patient;
        next();
    } catch (error) {
        console.error('Authentication Middleware Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}
module.exports.authDoctor = async (req, res, next) => {
    try {
        const token = req?.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json("Invalid or Expiry Token");
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            console.error('JWT Verification Error:', error);
            if (error.name === 'JsonWebTokenError') {
                return res.status(400).json({ message: 'Invalid token format' });
            } else if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired' });
            }
        }
        const doctor = await DoctorModel.findOne({ _id: decoded._id });
        req.doctor = doctor;
        next();
    }
    catch (error) {
        console.error('Authentication Middleware Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}