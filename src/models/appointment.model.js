const { default: mongoose } = require("mongoose");
const DoctorModel = require("./doctor.model");

const appointmentSchema = new mongoose.Schema({
    fromPatientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    toDoctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },

    appointMentDetails: {
        status: {
            type: String,
            required: true,
            enum: ["Booked", "Finished","Cancelled"],
        },
        date: {
            day: {
                type: Number,
                 enum: [0,1,2,3,4,5,6],
                required:true,
            },
            time: {
                type: String,
                required:true,

            }
        },
    }

}, {
    timestamps: true,
});




const AppointmentModel = mongoose.model('Appointment', appointmentSchema);
module.exports = AppointmentModel;
