# Technical Architecture – DARSHAN EASE

## Overview
DARSHAN EASE is a web-based temple darshan booking system designed using a layered architecture.
The system ensures scalability, security, and smooth user experience.

---

## Architecture Layers

### 1. Presentation Layer (Frontend)
This layer handles user interaction.

Responsibilities:
- User registration and login
- Viewing darshan slots
- Booking darshan tickets

Technologies:
- HTML
- CSS
- JavaScript
- (Future Scope: React.js)

---

### 2. Application Layer (Backend)
This layer contains business logic and APIs.

Responsibilities:
- Handle user requests
- Manage bookings and slots
- Authentication and authorization

Technologies:
- Node.js
- Express.js

---

### 3. Data Layer (Database)
This layer stores application data.

Responsibilities:
- Store user details
- Store darshan slots
- Store booking records

Technology:
- MongoDB

---

### 4. Authentication & Security
Handles secure access to the system.

Technologies:
- JWT Authentication
- Role-based access control

---

## Data Flow
User → Frontend → Backend API → Database → Backend → Frontend → User

---

## Architecture Diagram
Refer to the architecture diagram for visual understanding.
