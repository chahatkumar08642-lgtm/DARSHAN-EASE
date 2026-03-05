## Darshan Ease

Darshan Ease is a full-stack MERN (MongoDB, Express, React, Node.js) application for managing temple darshan visits. Devotees can browse temples, book darshan slots, avoid long queues, and receive real-time updates. Admins can manage temples, time slots, bookings, and view basic analytics.

### Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Nodemailer, QRCode
- **Frontend**: React, React Router, Axios

### Project Structure

- **backend**: Express API, MongoDB models, business logic
- **frontend**: React SPA for users and admins

### Setup Instructions

#### Prerequisites

- Node.js (LTS)
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)

#### 1. Clone / open the project

Open the `Darshan Ease` project folder in your editor or terminal:

```bash
cd "d:/Darshan Ease/newApp"
```

#### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend` based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/darshan_ease
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:5173

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_smtp_user
EMAIL_PASS=your_smtp_password
EMAIL_FROM="Darshan Ease <no-reply@darshanease.com>"
```

Then start the backend in development mode:

```bash
npm run dev
```

This will start the API server (default: `http://localhost:5000`).

#### 3. Frontend setup

Open a new terminal in the project root:

```bash
cd "d:/Darshan Ease/newApp/frontend"
npm install
npm run dev
```

The React app will run at `http://localhost:5173` by default.

#### 4. Seeding sample data

To add sample temples, time slots, and an admin user:

```bash
cd backend
npm run seed
```

This will:

- Create an admin user (`admin@darshanease.com` / `Admin@123`)
- Insert a few sample temples and darshan time slots

#### 5. Default roles & logins

- **Admin**: use the seeded admin credentials above to log in via the Admin login screen.
- **User**: register a new account via the User Registration form.

### Key Features

- **User**
  - JWT-based registration and login
  - View and filter temple list
  - View temple details (location, timings, facilities, crowd status)
  - Book darshan slots
  - Booking history with e-receipts
  - QR code for booking verification
  - Notifications panel (basic UI, placeholder data)

- **Admin**
  - Admin login dashboard
  - Add / edit / delete temples
  - Manage darshan time slots per temple
  - View all bookings and approve / cancel
  - Basic analytics (bookings per day, peak hours approximation)
  - 

### Notes

- This codebase is structured for clarity and extensibility, not heavy micro-optimizations.
- Email sending uses Nodemailer; configure real SMTP credentials in `.env` to send real emails. Otherwise, emails will be logged to the console.
- QR codes are generated as data URLs and stored with each booking for verification.
<img width="1366" height="766" alt="Darshan Ease - Google Chrome 06-03-2026 01_35_32" src="https://github.com/user-attachments/assets/89b47787-cf87-4121-92d9-72ee60e44656" />
<img width="1366" height="766" alt="Darshan Ease - Google Chrome 06-03-2026 01_35_21" src="https://github.com/user-attachments/assets/f26e135a-788f-402f-9c4e-3d5558e4fe50" />
<img width="1366" height="766" alt="Darshan Ease - Google Chrome 06-03-2026 01_35_12" src="https://github.com/user-attachments/assets/aae517ae-34f6-4670-960c-940be8901b0a" />
<img width="1366" height="766" alt="Darshan Ease - Google Chrome 06-03-2026 01_34_56" src="https://github.com/user-attachments/assets/1ba05a9a-1add-46cd-86d0-1d50a0760441" />


