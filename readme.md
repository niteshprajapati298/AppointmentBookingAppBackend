

---

# 📖 MediLink – Doctor–Patient Appointment Booking System

## 🚀 Overview

MediLink is a web application that connects patients with doctors by enabling **appointment booking, availability management, and scheduling**.

* Patients can register, search doctors by specialization, and book appointments.
* Doctors can manage availability, view bookings, and cancel appointments.
* Admin (future scope) can manage users, doctors, and appointments.

---

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js, MongoDB, JWT, Bcrypt
**Frontend:** React 
**Other Tools:** Mongoose, Cron Jobs (for auto-cancellation of expired appointments)

---

## 📂 Project Structure

```bash
MediLink/
│── controllers/       # Business logic (doctor, patient, appointment)
│── models/            # MongoDB schemas
│── routes/            # Express routes (doctor, patient, appointment)
│── middlewares/       # Auth middleware (JWT-based)
│── utils/             # Utility functions (generate availability etc.)
│── config/            # DB connection, environment setup
│── app.js             # Express app entry point
│── README.md          # Project documentation
```

---

## 🔑 Features

### 👩‍⚕️ For Doctors

* Register & login
* Manage availability (weekly slots)
* View all appointments
* Cancel an appointment
* Set status `Active` / `Inactive`

### 🧑‍🤝‍🧑 For Patients

* Register & login
* View profile
* Search doctors by specialization
* Book & cancel appointments
* View appointment history

---

## 📌 API Endpoints

### 🔹 Auth Routes

**Doctor**

* `POST /doctor/signup` → Register doctor
* `POST /doctor/login` → Login doctor
* `GET /doctor/profileView` → View profile (auth required)
* `POST /doctor/logout` → Logout doctor

**Patient**

* `POST /patient/signup` → Register patient
* `POST /patient/login` → Login patient
* `GET /patient/profileView` → View profile (auth required)
* `POST /patient/logout` → Logout patient

---

### 🔹 Doctor Routes

* `PATCH /doctor/availability` → Update availability
* `GET /doctor/appointments` → View all appointments
* `PATCH /doctor/appointment/:id/cancel` → Cancel appointment

---

### 🔹 Patient Routes

* `GET /patient/doctors` → Get all doctors
* `GET /patient/doctors/:id` → Get doctor by ID
* `GET /patient/doctor/search?specialization=cardiology` → Search doctors
* `POST /patient/book` → Book appointment
* `PATCH /patient/cancel` → Cancel appointment
* `GET /patient/appointments` → Get all appointments for logged-in patient

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/MediLink.git
cd MediLink
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables (`.env`)

```env
PORT=8080
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
```

### 4. Run Server

```bash
npm run dev
```

Server will start on: **[http://localhost:8080](http://localhost:8080)**

---

## 🧪 Testing

Use **Postman / Thunder Client** with sample requests:

* Register doctor & patient
* Book appointment
* Cancel appointment
* Search doctors

---

## 🚧 Future Improvements

* ✅ Admin Dashboard
* ✅ Payment Integration
* ✅ Notifications (Email/SMS)
* ✅ Analytics Dashboard for doctors

---

## 👨‍💻 Contributors

* **Nitesh Prajapati** (Backend Developer)
* **Nitesh Prajapati** (Frontend Developer)

---

