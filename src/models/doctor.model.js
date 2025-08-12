const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const doctorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "Name must be at 3 character long"],
            maxLength: [20, "Name must be at 3 character long"],
        },
        lastName: {
            type: String,
            required: false,
            minLength: [3, "Name must be at 3 character long"],
            maxLength: [20, "Name must be at 3 character long"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        specialization: {
            required: true,
            type: [String],
        },
        password: {
            type: String,
            select:false,
            required: true,
        },

        status: {
            type: String,
            enum: ["Active", "inActive"],
            default: "Active",
        },
        availability: [
            {
                day: String,
                enum: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ],
                slots: [
                    {
                        time: String,
                        isBooked: Boolean,
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
);

doctorSchema.methods.getJwt =  function (params) {
    const token =  jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'7d'})
    return token;
}
doctorSchema.statics.hashPassword =  function (password) {
    return  bcrypt.hash(password,10)
    
}
doctorSchema.methods.validatePassword =  function (password) {
    return bcrypt.compare(password,this.password);
}
const DoctorModel = mongoose.model("Doctor", doctorSchema);
module.exports = DoctorModel;
