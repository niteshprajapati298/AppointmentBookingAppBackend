
const PatiendModel = require("../models/patient.model");

module.exports.createPatient= async (firstName,lastName,gender,email,password,contactNumber) => {
    if(!firstName||!gender||!gender||!email||!password||!contactNumber) throw new Error("All fields are required");
    const hashedPassword = await PatiendModel.hashPassword(password)
    const patient = await PatiendModel.create({
        firstName,
        lastName,
        gender,
        email,
        password:hashedPassword,
        contactNumber
    })
    return patient;
    
}