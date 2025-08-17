const { default: mongoose } = require("mongoose");
const AppointmentModel = require("../models/appointment.model");
const DoctorModel = require("../models/doctor.model");
const PatientModel = require("../models/patient.model");

module.exports.bookAppointment = async (req, res) => {
    try {
        const { doctorId, slot, status } = req.body;

        if (!doctorId || !slot || !status) return res.status(400).json("All fields are required");
        const patientId = req.patient._id;
        const { day, time } = slot;
        const now = new Date();

        let appointmentDate = new Date();
        appointmentDate.setDate(
            now.getDate() + ((day - now.getDay() + 7) % 7)
        );

        const [hours, minutes] = time.split(":");
        appointmentDate.setHours(hours, minutes, 0, 0);

        if (appointmentDate < now) {
            return res.status(400).json({ message: "Cannot book past time slot" });
        }


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
module.exports.cancelAppointment = async (req, res) => {
    try {
        const { doctorId, patientId, slot, appointmentId } = req.body;
        if (!doctorId || !patientId || !slot || !appointmentId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const { day, time } = slot;

        const doctor = await DoctorModel.findById(doctorId);
        if (!doctor) return res.status(400).json({ message: "Doctor does not exist" });
        if (doctor.status !== "Active") return res.status(400).json({ message: "Doctor is not available" });

        const patient = await PatientModel.findById(patientId);
        if (!patient) return res.status(400).json({ message: "Patient does not exist" });

        const isAppointmentExists = await AppointmentModel.findOne({
            _id: appointmentId,
            fromPatientId: patientId,
            toDoctorId: doctorId,
            "appointMentDetails.status": "Booked"
        });
        if (!isAppointmentExists) {
            return res.status(404).json({ message: "Appointment does not exist or is not booked" });
        }

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
            { _id: appointmentId },
            { $set: { "appointMentDetails.status": "Cancelled" } }
        );

        if (cancelledAppointment.modifiedCount === 0) {
            return res.status(400).json({ message: "Failed to cancel appointment" });
        }

        res.status(200).json({
            message: "Appointment Cancelled",
            cancelledAppointment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.completeAppointment = async (req, res) => {
    // Todo---->>>>>
    // setup cron job for when time passes the current appointment should be completed  and that particular slot availability should be updated

}

module.exports.getAllBookedAppointmentsByPatientId = async (req, res) => {
    try {
        const _id = req.patient?._id;
        if (!_id) return res.status(401).json({ message: "Unauthorized: Patient not found" });
        console.log("Patient ID from token:", _id);

        const appointments = await AppointmentModel.find({
            fromPatientId: req.patient._id,
            "appointMentDetails.status": "Booked"
        });

        if (appointments.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(appointments);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

