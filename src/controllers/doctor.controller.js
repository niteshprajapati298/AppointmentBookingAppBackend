const DoctorModel = require("../models/doctor.model");
const bcrypt = require('bcrypt');
const { createDoctor } = require("../services/doctor.service");

module.exports.registerDoctor = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, specialization } = req.body;
        const isDoctorAlreadyExists = await DoctorModel.findOne({ email: email });
        if (isDoctorAlreadyExists) return res.status(401).json("Email Id is already Registered with an Account");

        const doctor = await createDoctor(firstName, lastName, email, password, specialization);
        const token = await doctor.getJwt();
        res.cookie('token', token);
        res.status(201).json({ token: token, message: "Doctor Registered Successfully" })
    } catch (error) {
        res.status(401).json(error.message)
    }
}
module.exports.loginDoctor = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(401).json("All Fields are Required");
        const doctor =await DoctorModel.findOne({ email }).select('+password');
        if (!doctor) return res.status(401).json("Invalid Credentials");
        const isHashPassword =await doctor.validatePassword(password);
        if (!isHashPassword) return res.status(401).json("Invalid Credentials");
       
        const token =await doctor.getJwt();
        res.cookie("token",token);
        res.status(201).json({ token: token, message: "User Logged In successfully" })
    } catch (error) {
        res.status(401).json( error.message)}
}

module.exports.getDoctorProfile = async (req,res,next)=>{
    try {
        const doctor = req.doctor;
        if(!doctor) return res.status(401).json("Unable to Fetch Profile");
        res.status(200).json({YourProfile:doctor});
    } catch (error) {
        return res.status(404).json(error.message,"Internal Server Error")
    }
}
module.exports.logoutDoctor = async (req,res,next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if(!token) return res.status(401).json("Token Not Found Please LogIn");
        res.clearCookie("token",token);
        res.status(201).json({message:"Logged Out Successfully"})
    } catch (error) {
        res.status(401).json("Internal Server Error");
    }
}
module.exports.getDoctors = async (req, res) => {
    try {
      const id = req.params.id;
  
      if (id) {
        const doctor = await DoctorModel.findById(id);
        if (!doctor) {
          return res.status(404).json({ message: "Doctor not found" });
        }
        return res.status(200).json(doctor);
      } else {
        const doctors = await DoctorModel.find();
        return res.status(200).json(doctors);
      }
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports.getDoctorsBySpeciality = async (req,res,next) => {
    
}
  