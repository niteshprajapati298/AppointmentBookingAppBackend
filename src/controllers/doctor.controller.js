const { request } = require("express");
const AppointmentModel = require("../models/appointment.model");
const DoctorModel = require("../models/doctor.model");

const { createDoctor } = require("../services/doctor.service");

module.exports.registerDoctor = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, specialization } = req.body;
    const isDoctorAlreadyExists = await DoctorModel.findOne({ email: email });
    if (isDoctorAlreadyExists) return res.status(401).json("Email Id is already Registered with an Account");

    const doctor = await createDoctor(firstName, lastName, email, password, specialization);
    const token = await doctor.getJwt();
    res.cookie('token', token);
    res.status(201).json({ token: token, message: "Doctor Registered Successfully" })
  } catch (error) {
    res.status(401).json(error.message)
  }
}

module.exports.loginDoctor = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(401).json("All Fields are Required");
    const doctor = await DoctorModel.findOne({ email }).select('+password');
    if (!doctor) return res.status(401).json("Invalid Credentials");
    const isHashPassword = await doctor.validatePassword(password);
    if (!isHashPassword) return res.status(401).json("Invalid Credentials");

    const token = await doctor.getJwt();
    res.cookie("token", token);
    res.status(201).json({ token: token, message: "User Logged In successfully" })
  } catch (error) {
    res.status(401).json(error.message)
  }
}

module.exports.getDoctorProfile = async (req, res, next) => {
  try {
    const doctor = req.doctor;
    if (!doctor) return res.status(401).json("Unable to Fetch Profile");
    res.status(200).json({ YourProfile: doctor });
  } catch (error) {
    return res.status(404).json(error.message, "Internal Server Error")
  }
}

module.exports.logoutDoctor = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json("Token Not Found Please LogIn");
    res.clearCookie("token", token);
    res.status(201).json({ message: "Logged Out Successfully" })
  } catch (error) {
    res.status(401).json("Internal Server Error");
  }
}

module.exports.getDoctors = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const doctor = await DoctorModel.findById(id);
      if (!doctor) return res.status(404).json({ message: "Doctor not found" });
      return res.status(200).json(doctor);
    }
    const doctors = await DoctorModel.find();
    return res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getDoctorsBySpeciality = async (req, res) => {
  try {
    const { speciality } = req.query;
    if (!speciality) return res.status(400).json({ message: "Speciality query is required" });

    const doctors = await DoctorModel.find({
      speciality: { $regex: speciality, $options: "i" }
    });

    if (!doctors.length) return res.status(404).json({ message: "No doctors found" });

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateDoctorAvailability = async (req, res) => {
  try {
    const { status } = req.body;
    if (status !== "Active" && status !== "inactive") return res.status(400).json("Please Enter a valid status");

    const doctorId = req.doctor._id;
    if (!doctorId) return res.status(400).json("Invalid or Expiry Token");
    const doctor = await DoctorModel.findByIdAndUpdate(
      doctorId,
      { status: status },
      { new: true }
    );
    return res.status(200).json({
      message: "Status Update Successfully",
      doctor
    })

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


//get all appointmensts with doctor which is booked 

module.exports.getAllAppointmentsByDoctorId = async (req, res) => {
  try {
    const currentDay = new Date().getDay();
    const doctorId = req.doctor._id;
    if (!doctorId) return res.status(400).json("UnAuthorized");
    const appointments = await AppointmentModel.find(
      {
        toDoctorId: doctorId,
        "appointMentDetails.date.day": currentDay
      }
    )
    if (appointments.length === 0) return res.status(200).json("No Appointments found for today");
    res.status(200).json({ message: "Today Appointments", appointments });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.getAllAppointmentbyId = async (req, res) => {
  try {
    const currentDay = new Date().getDay();
    const doctorId = req.doctor._id;
    const appointmentId = req.params.id;
    if (!doctorId) return res.status(400).json("UnAuthorized");
    const appointments = await AppointmentModel.find(
      {
        _id:appointmentId,
        toDoctorId: doctorId,
        "appointMentDetails.date.day": currentDay
      }
    )
    if (appointments.length === 0) return res.status(200).json("No Appointments found for today");
    res.status(200).json({ message: "Appointment", appointments });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.cancelAppointmentById = async (req, res) => {
  try {
    const doctorId = req.doctor._id;
    const appointmentId = req.params.id; 

    if (!doctorId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!appointmentId) {
      return res.status(400).json({ message: "Please provide the Appointment Id" });
    }

    const cancelledAppointment = await AppointmentModel.findOneAndUpdate(
      {
        _id: appointmentId,
        toDoctorId: doctorId, 
        "appointMentDetails.status": "Booked"
      },
      { $set: { "appointMentDetails.status": "Cancelled By Doctor" } },
      { new: true }
    );

    if (!cancelledAppointment) {
      return res.status(400).json({ message: "You can't cancel this appointment (either not found or already cancelled)" });
    }

    res.status(200).json({
      message: "Appointment cancelled successfully",
      cancelledAppointment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


