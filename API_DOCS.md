

---

# 🩺 Healthcare Appointment Booking API Documentation

Base URL:

```
http://localhost:8080
```

---

## 🔐 Authentication

* **Doctor routes** require `Authorization: Bearer <doctorToken>`
* **Patient routes** require `Authorization: Bearer <patientToken>`

Tokens are returned on login.

---

## 👨‍⚕️ Doctor Routes

### 1. Register Doctor

**POST** `/doctor/signup`

```json
Request Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "specialization": ["Cardiology"],
  "password": "password123"
}

Response:
{
  "message": "Doctor registered successfully",
  "token": "<JWT_TOKEN>"
}
```

---

### 2. Login Doctor

**POST** `/doctor/login`

```json
Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "<JWT_TOKEN>"
}
```

---

### 3. Get Doctor Profile

**GET** `/doctor/profileView`
Headers: `Authorization: Bearer <doctorToken>`

Response:

```json
{
  "_id": "68a59c9db424e452fb827085",
  "firstName": "John",
  "lastName": "Doe",
  "specialization": ["Cardiology"],
  "status": "Active",
  "availability": [...]
}
```

---

### 4. Logout Doctor

**POST** `/doctor/logout`
Headers: `Authorization: Bearer <doctorToken>`

Response:

```json
{ "message": "Logged out successfully" }
```

---

### 5. Update Availability

**PATCH** `/doctor/availability`
Headers: `Authorization: Bearer <doctorToken>`

```json
Request Body:
{
  "day": 1,
  "slots": [
    { "time": "09:00", "isBooked": false },
    { "time": "10:00", "isBooked": false }
  ]
}
```

---

### 6. Get All Appointments

**GET** `/doctor/appointments`
Headers: `Authorization: Bearer <doctorToken>`

Response:

```json
[
  {
    "_id": "appointmentId",
    "patient": "patientId",
    "appointMentDetails": {
      "time": "10:00",
      "status": "Booked"
    }
  }
]
```

---

### 7. Cancel Appointment (by Doctor)

**PATCH** `/doctor/appointment/:id/cancel`
Headers: `Authorization: Bearer <doctorToken>`

Response:

```json
{
  "message": "Appointment Cancelled",
  "cancelledAppointment": { ... }
}
```

---

## 🧑‍🤝‍🧑 Patient Routes

### 1. Register Patient

**POST** `/patient/signup`

```json
Request Body:
{
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice@example.com",
  "password": "mypassword"
}

Response:
{
  "message": "Patient registered successfully",
  "token": "<JWT_TOKEN>"
}
```

---

### 2. Login Patient

**POST** `/patient/login`

```json
Request Body:
{
  "email": "alice@example.com",
  "password": "mypassword"
}

Response:
{
  "token": "<JWT_TOKEN>"
}
```

---

### 3. Get Patient Profile

**GET** `/patient/profileView`
Headers: `Authorization: Bearer <patientToken>`

Response:

```json
{
  "_id": "patientId",
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice@example.com"
}
```

---

### 4. Logout Patient

**POST** `/patient/logout`
Headers: `Authorization: Bearer <patientToken>`

Response:

```json
{ "message": "Logged out successfully" }
```

---

### 5. Get All Doctors

**GET** `/patient/doctors`
Headers: `Authorization: Bearer <patientToken>`

Response:

```json
[
  {
    "_id": "doctorId",
    "firstName": "John",
    "lastName": "Doe",
    "specialization": ["Cardiology"],
    "status": "Active"
  }
]
```

---

### 6. Get Doctor by ID

**GET** `/patient/doctors/:id`

Response:

```json
{
  "_id": "doctorId",
  "firstName": "John",
  "lastName": "Doe",
  "specialization": ["Cardiology"],
  "availability": [...]
}
```

---

### 7. Search Doctor by Specialization

**GET** `/patient/doctor/search?specialization=Cardiology`

Response:

```json
[
  { "_id": "doctorId", "firstName": "John", "lastName": "Doe" }
]
```

---

### 8. Book Appointment

**POST** `/patient/book`
Headers: `Authorization: Bearer <patientToken>`

```json
Request Body:
{
  "doctorId": "68a59c9db424e452fb827085",
  "day": 1,
  "time": "10:00"
}

Response:
{
  "message": "Appointment booked successfully",
  "appointment": { ... }
}
```

---

### 9. Cancel Appointment (by Patient)

**PATCH** `/patient/cancel`
Headers: `Authorization: Bearer <patientToken>`

```json
Request Body:
{ "appointmentId": "68a59c9db424e452fb827099" }

Response:
{ "message": "Appointment cancelled successfully" }
```

---

### 10. Get Patient’s Appointments

**GET** `/patient/appointments`
Headers: `Authorization: Bearer <patientToken>`

Response:

```json
[
  {
    "_id": "appointmentId",
    "doctor": "doctorId",
    "appointMentDetails": {
      "time": "10:00",
      "status": "Booked"
    }
  }
]
```

