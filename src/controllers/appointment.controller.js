const DoctorModel = require("../models/doctor.model");
const PatiendModel = require("../models/patient.model");

// book an appointment
module.exports.bookAppointment = async (req, res, next) => {
    try {
        const { doctorId, patientId, slot } = req.body;
        // availability = {
        // day:Number
        // slots:[
        //{time:"",isBooked} ,{},{},{},{}
        //]
        // },
        const day = slot.day;
        const time = slot.time;


        if (!doctorId || !patientId || !slot) return res.status(400).json("All Fields are required");
        if (!time) return res.status(400).json("Time is Required")
        if (!day) return res.status(400).json("Day is Required")
        const isDoctorExists = await DoctorModel.findById({ _id: doctorId });
        if (!isDoctorExists) return res.status(400).json("Doctor Does Not Exists");
        const isPatientExists = await PatiendModel.findById({ _id: isPatientExists });
        const isSlotAvailable = await DoctorModel.find({
            availability: {
                day: Number,
                slots: [
                    { time: time, isBooked: false }
                ]
            }
        });
        if (!isSlotAvailable) return res.status(400).json("Selected Slot is Not Available");
        const appointment = await DoctorModel.create({
            availability: {
                day: Number,
                slots: [
                    { time: time, isBooked: true }
                ]
            }
        })
        res.status(201).json({
            message: "Appointment Booked Successfully", details: {
                doctorId,
                patientId,
                bookedSlot
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}