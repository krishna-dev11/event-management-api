# Event Management API

A simple backend project built using **Node.js**, **Express**, and **MongoDB**, created as part of a task for an internship selection process.

This API allows users to create events, register for them, cancel registrations, and view event stats.

---

## 🔧 Tech Stack
- Node.js
- Express.js
- MongoDB (with Mongoose)

---

## 📁 Project Structure
```
├── app.js             // Main app entry
├── routes/            // API route handlers
├── controllers/       // Logic behind each API
├── models/            // MongoDB models
├── .env               // Environment variables
└── README.md
```

---

## 🧪 API Endpoints

### Create a User
`POST /api/users`
```json
{
  "name": "Nikhil",
  "email": "nikhil@example.com"
}
```

### Create an Event
`POST /api/events`
```json
{
  "title": "Code Conference",
  "datetime": "2025-08-15T10:00:00Z",
  "location": "Mumbai",
  "capacity": 200
}
```

### Register for an Event
`POST /api/events/:eventId/register`
```json
{
  "userId": "<userId>"
}
```

### Cancel Registration
`POST /api/events/:eventId/cancel`
```json
{
  "userId": "<userId>"
}
```

### Get Event Details
`GET /api/events/:eventId`

### Get Event Stats
`GET /api/events/:eventId/stats`

### List Upcoming Events
`GET /api/events`
> Sorted by date, then location

---

## 📬 Additional Info
- Validations are in place for date, capacity, duplicates, and more.
- All errors handled with proper messages.
- Only future events are shown in listing.

---

## 📥 Postman Collection
You can import this into Postman to test the API:
[download postman collection ](Event Management API.postman_collection.json)

---

## ✍️ Author Note
Krishna gothwal

Thank you for the opportunity.
