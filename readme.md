Alright — here’s **one single `README.md` file** you can copy-paste directly into your project.

---

```markdown
# 📌 Appointment Booking API – Frontend Developer Guide

This backend API manages **Patients**, **Doctors**, and **Appointments** for an appointment booking system.  
Use this guide to integrate and test routes in the frontend.

---

## 🔑 Base URL
```

[http://localhost:8080/api](http://localhost:8080/api)

````
*(Replace with deployed backend URL in production)*

---

## 🧍‍♂️ Patient Routes

### 1️⃣ Register Patient
**POST** `/patients/signup`  
**Request Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@mail.com",
  "password": "123456"
}
````

**Response Example:**

```json
{
  "message": "Patient registered successfully",
  "token": "JWT_TOKEN"
}
```

---

### 2️⃣ Login Patient

**POST** `/patients/login`
**Request Body:**

```json
{
  "email": "john@mail.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

### 3️⃣ Get Patient Profile

**GET** `/patients/profileView`
**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "_id": "123",
  "name": "John Doe",
  "email": "john@mail.com"
}
```

---

### 4️⃣ Logout Patient

**POST** `/patients/logout`
**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{ "message": "Logged out" }
```

---

## 🩺 Doctor Routes

### 1️⃣ Register Doctor

**POST** `/doctors/signup`
**Request Body:**

```json
{
  "name": "Dr. Smith",
  "email": "smith@mail.com",
  "password": "123456",
  "speciality": "Cardiology"
}
```

**Response:**

```json
{
  "message": "Doctor registered successfully",
  "token": "JWT_TOKEN"
}
```

---

### 2️⃣ Login Doctor

**POST** `/doctors/login`
**Request Body:**

```json
{
  "email": "smith@mail.com",
  "password": "123456"
}
```

---

### 3️⃣ Get All Doctors

**GET** `/patients/doctors`
**Headers:**

```
Authorization: Bearer <patient_token>
```

**Response:**

```json
[
  { "_id": "1", "name": "Dr. Smith", "speciality": "Cardiology" }
]
```

---

### 4️⃣ Get Doctor by ID

**GET** `/patients/doctors/:id`
Example:

```
/patients/doctors/64d82f91
```

**Headers:** Patient auth required.
**Response:**

```json
{
  "_id": "1",
  "name": "Dr. Smith",
  "speciality": "Cardiology"
}
```

---

### 5️⃣ Search Doctor by Speciality

**GET** `/patients/doctor/search?speciality=cardio`
**Headers:** Patient auth required.
**Response:**

```json
[
  { "_id": "1", "name": "Dr. Smith", "speciality": "Cardiology" }
]
```

---

## 📅 Appointment Routes

### 1️⃣ Create Appointment

**POST** `/appointments`
**Headers:**

```
Authorization: Bearer <patient_token>
```

**Request Body:**

```json
{
  "doctorId": "DOCTOR_ID",
  "date": "2025-08-15",
  "slot": "10:00 AM"
}
```

**Response:**

```json
{
  "message": "Appointment booked successfully",
  "appointmentId": "A12345"
}
```

---

### 2️⃣ Get Appointments for Patient

**GET** `/appointments/patient`
**Headers:** Patient auth required.
**Response:** List of patient appointments.

---

### 3️⃣ Get Appointments for Doctor

**GET** `/appointments/doctor`
**Headers:** Doctor auth required.
**Response:** List of doctor appointments.

---

## 🔐 Authentication Rules

* **Patients** → Use JWT from `/patients/login` in `Authorization` header.
* **Doctors** → Use JWT from `/doctors/login`.
* All protected routes require:

```
Authorization: Bearer <token>
```

---

## ⚠️ Notes

* Speciality search is **case-insensitive** and matches partial strings.
* Date format for appointments: `YYYY-MM-DD`.
* For local testing, use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).
* Replace `localhost:5000` with your production API URL when deploying.

```

---

If you want, I can also make this README **include example `cURL` commands** so your frontend dev can test routes directly from the terminal without Postman. That would make testing even faster.
```
