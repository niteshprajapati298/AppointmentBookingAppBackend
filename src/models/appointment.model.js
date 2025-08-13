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
            enum: ["Booked", "Finished","Cancelled","Pending"],
        },
        date: {
            day: {
                type: String,
                 enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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




const AppointmentModel = mongoose.model('Appointments', appointmentSchema);
module.exports = AppointmentModel;
