const AppointmentModel = require("../models/appointment.model");
const DoctorModel = require("../models/doctor.model");
const PatientModel = require("../models/patient.model");

module.exports.bookAppointment = async (req, res) => {
    try {
        const { doctorId, patientId, slot, status } = req.body;
        if (!doctorId || !patientId || !slot || !status) return res.status(400).json("All fields are required");

        const { day, time } = slot;
        if (day === undefined) return res.status(400).json("Day is required");
        if (!time) return res.status(400).json("Time is required");

        const doctor = await DoctorModel.findById(doctorId);
        if (!doctor) return res.status(400).json("Doctor does not exist");
        if (doctor.status !== "Active") return res.status(400).json("Doctor is not available");

        const patient = await PatientModel.findById(patientId);
        if (!patient) return res.status(400).json("Patient does not exist");

        const slotAvailable = await DoctorModel.findOne({
            _id: doctorId,
            availability: {
                $elemMatch: {
                    day: day,
                    slots: { $elemMatch: { time: time, isBooked: false } }
                }
            }
        });

        if (!slotAvailable) return res.status(400).json("Selected slot is not available");

        await DoctorModel.updateOne(
            { _id: doctorId },
            { $set: { "availability.$[day].slots.$[slot].isBooked": true } },
            {
                arrayFilters: [
                    { "day.day": day },
                    { "slot.time": time }
                ]
            }
        );

        const appointment = await AppointmentModel.create({
            fromPatientId: patientId,
            toDoctorId: doctorId,
            appointMentDetails: {
                status: "Booked",
                date: { day, time }
            }
            
        });

        res.status(201).json({
            message: "Appointment booked successfully",
            details: { appointment }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.cancelAppointment = async   (req, res) => {
       try {
        const { doctorId, patientId, slot, status,appointmentId } = req.body;
        if (!doctorId || !patientId || !slot || !status|| !appointmentId) return res.status(400).json("All fields are required");
        const {day,time} = slot;
        const doctor = await DoctorModel.findById(doctorId);
        if (!doctor) return res.status(400).json("Doctor does not exist");
        if (doctor.status !== "Active") return res.status(400).json("Doctor is not available");

        const patient = await PatientModel.findById(patientId);
        if (!patient) return res.status(400).json("Patient does not exist");

        const isAppointExists = await AppointmentModel.findById(appointmentId);
        if(!isAppointExists) return res.status(400).json("Appointment Does not Exists");
        
        
        await DoctorModel.updateOne(
            { _id: doctorId },
            { $set: { "availability.$[day].slots.$[slot].isBooked": false } },
            {
              arrayFilters: [
                { "day.day": day },      
                { "slot.time": time }    
              ]
            }
          );
          
        const cancelledAppointment = await AppointmentModel.updateOne(
            {
              _id: appointmentId,
              fromPatientId: patientId,
              toDoctorId: doctorId
            },
            { $set: { "appointMentDetails.status": "Cancelled" } }
          );
          res.status(200).json({appomessage:"Appointment Cancelled",cancelledAppointment})
        
       } catch (error) {
        res.status(500).json({ message: error.message });

       }
}