const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { generateWeeklyAvalability } = require("../utils/generateWeeklyAvailability");

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
              day: {
                type: Number,
                enum: [
                 0,1,2,3,4,5,6
                ],
              },
              slots: [
                {
                  time: {
                    type: String,
                    match: /^(?:[01]\d|2[0-3]):[0-5]\d$/, // Validates HH:MM 24h format
                  },
                  isBooked: {
                    type: Boolean,
                    default: false
                  }
                }
              ]
            }
          ]
          
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
doctorSchema.pre('save', function (next) {
    if(!this.availability||this.availability.length===0){
        this.availability=generateWeeklyAvalability();
    }
    next();
}) 
const DoctorModel = mongoose.model("Doctor", doctorSchema);
module.exports = DoctorModel;
