const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minLength: [2, "First name must be at least 2 characters long"],
    },
    lastName: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender is required"],
    },
    contactNumber: {
      type: String, 
      required: [true, "Contact number is required"],
      match: [/^\d{10}$/, "Contact number must be exactly 10 digits"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
      select: false, // Don't return password by default
    },
    address: {
      address: { type: String, trim: true },
      city: { type: String, trim: true },
      state: {
        type: String,
        enum: [
          "Andhra Pradesh",
          "Arunachal Pradesh",
          "Assam",
          "Bihar",
          "Chhattisgarh",
          "Goa",
          "Gujarat",
          "Haryana",
          "Himachal Pradesh",
          "Jharkhand",
          "Karnataka",
          "Kerala",
          "Madhya Pradesh",
          "Maharashtra",
          "Manipur",
          "Meghalaya",
          "Mizoram",
          "Nagaland",
          "Odisha",
          "Punjab",
          "Rajasthan",
          "Sikkim",
          "Tamil Nadu",
          "Telangana",
          "Tripura",
          "Uttar Pradesh",
          "Uttarakhand",
          "West Bengal",
          "Delhi",
          "Jammu and Kashmir",
        ],
      },
      pincode: {
        type: String,
        match: [/^\d{6}$/, "Pincode must be exactly 6 digits"],
      },
    },
    medicalInfo: {
      bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      },
      allergies: {
        type: [String],
        default: [],
      },
      existingConditions: {
        type: [String],
        default: [],
      },
      emergencyContact: {
        name: {
          type: String,
          maxLength: [20, "Name cannot be more than 20 characters long"],
          minLength: [3, "Name must be at least 3 characters long"],
        },
        relation: {
          type: String,
          enum: [
            "Brother",
            "Sister",
            "Father",
            "Mother",
            "GrandFather",
            "GrandMother",
            "Uncle",
            "Aunt",
          ],
        },
        contactNumber: {
          type: String,
          match: [/^\d{10}$/, "Contact number must be exactly 10 digits"],
        },
      },
    },
  },
  { timestamps: true }
);
patientSchema.methods.getJwt = function () {
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    return token;
    
}
patientSchema.statics.hashPassword = function(password){
    return bcrypt.hash(password,10);
}
patientSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password,this.password);
}
const PatiendModel = mongoose.model("Patient", patientSchema);
module.exports = PatiendModel;
