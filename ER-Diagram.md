# Database Schema Design – DARSHAN EASE

## Overview

The database schema for **DARSHAN EASE** is designed using a relational model to ensure data integrity, consistency, and scalability.

The system consists of four main entities:

- User
- Temple
- DarshanSlot
- Booking

Each entity is connected using primary and foreign key relationships to maintain referential integrity.

---

## Entities and Attributes

### 1. User

The **User** entity stores information about registered users who book darshan slots.

#### Attributes:
- **UserID (Primary Key)** – Unique identifier for each user
- Name – Full name of the user
- Email – User’s email address
- Phone – Contact number
- Address – Residential address

---

### 2. Temple

The **Temple** entity contains details about temples available in the system.

#### Attributes:
- **TempleID (Primary Key)** – Unique identifier for each temple
- TempleName – Name of the temple
- Location – Address or city of the temple
- DarshanStartTime – Daily darshan opening time
- DarshanEndTime – Daily darshan closing time

---

### 3. DarshanSlot

The **DarshanSlot** entity represents individual time slots available for darshan at a temple.

#### Attributes:
- **SlotID (Primary Key)** – Unique identifier for each slot
- **TempleID (Foreign Key)** – References Temple(TempleID)
- Date – Date of the darshan slot
- StartTime – Slot start time
- EndTime – Slot end time
- AvailableSeats – Number of seats available for booking
- Price – Cost per slot

---

### 4. Booking

The **Booking** entity records the bookings made by users.

#### Attributes:
- **BookingID (Primary Key)** – Unique identifier for each booking
- **UserID (Foreign Key)** – References User(UserID)
- **SlotID (Foreign Key)** – References DarshanSlot(SlotID)
- BookingDate – Date on which the booking was made
- TotalAmount – Total amount paid for the booking

---

## Entity Relationships

### 1. User – Booking Relationship (One-to-Many)

- One user can make multiple bookings.
- Each booking belongs to only one user.

**Foreign Key Used:**
- `UserID` in the Booking table

---

### 2. Temple – DarshanSlot Relationship (One-to-Many)

- One temple can have multiple darshan slots.
- Each darshan slot is associated with only one temple.

**Foreign Key Used:**
- `TempleID` in the DarshanSlot table

---

### 3. DarshanSlot – Booking Relationship (One-to-Many)

- One darshan slot can have multiple bookings.
- Each booking is linked to only one darshan slot.

**Foreign Keys Used:**
- `SlotID` in the Booking table
- `TempleID` in the DarshanSlot table

---

## Referential Integrity

The foreign key relationships are established using the primary keys of the respective parent tables. This ensures:

- Data consistency
- Prevention of invalid references
- Proper linkage between users, temples, slots, and bookings

---

## Conclusion

The DARSHAN EASE database schema is structured to support efficient slot management and secure booking operations.

The design can be further extended by adding:

- Payment tracking
- Admin management module
- Cancellation policies
- Reporting and analytics features

This schema forms a strong foundation for the DARSHAN EASE temple booking system and can be customized based on future requirements.
