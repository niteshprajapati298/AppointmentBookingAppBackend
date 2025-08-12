const DoctorModel = require("../models/doctor.model");
const bcrypt = require('bcrypt');

module.exports.registerDoctor = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, specialization } = req.body;
        const isDoctorAlreadyExists = await DoctorModel.findOne({ email: email });
        if (isDoctorAlreadyExists) return res.status(401).json("Email Id is already Registered with an Account");

        const doctor = await doctorService.createDoctor(firstName, lastName, email, password, specialization);
        const token = await DoctorModel.getJwt();
        res.cookies('token', token);
        return res.status(201).json({ token: token, message: "Doctor Registered Successfully" })
    } catch (error) {
        res.status(401).json("Internal Server Error", error.message)
    }
}
module.exports.loginDoctor = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(401).json("All Fields are Required");
        const doctor = DoctorModel.findOne({ email });
        if (!doctor) return res.status(401).json("Invalid Credentials");
        const isHashPassword = DoctorModel.validatePassword(password);
        if (!isHashPassword) return res.status(401).json("Invalid Credentials");
       
        const token =await DoctorModel.getJwt();
        res.cookies("token",token);
        return res.status(201).json({ token: token, message: "User Logged In successfully" })
    } catch (error) {
        res.status(401).json("Internal Server Error", error.message)
    }
}

module.exports.getDoctorProfile = async ()=>{
    try {
        const doctor = req.doctor;
        if(!doctor) return res.status(401).json("Unable to Fetch Profile");
        return res.status(200).json("Your Profile");
    } catch (error) {
        return res.status(404).json(error.message,"Internal Server Error")
    }
}