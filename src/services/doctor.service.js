const DoctorModel = require("../models/doctor.model");

module.exports.createDoctor = async (firstName,lastName,email,password,specialization)=>{
  if(!firstName||!email||!password||!specialization) throw new Error("All Fields are Required");
  const hashPassword = await DoctorModel.hashPassword(password)
  
  const doctor = await DoctorModel.create({
    firstName,
    lastName,
    email,
    password:hashPassword,
    specialization,

  })
  return doctor;
}