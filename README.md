# College Event Management System (CEMS)

## Overview
The **College Event Management System (CEMS)** is a web-based platform designed to streamline event organization and management within educational institutions. This system automates tasks such as participant registration, event approval, notifications, and resource allocation, providing an efficient and user-friendly experience for all stakeholders, including students, faculty, and event organizers.

**Note**: This platform is specifically designed for handling events in **MIT World Peace University, Pune**.

---

## Features
- **Role-Based Access**: Distinct functionality for Admin Faculty, Faculty, Students, and Event Organizers.
- **Event Management**: Create, edit, delete events with detailed descriptions.
- **Approval Workflow**: Admin Faculty can approve/reject event requests and assign faculty in charge.
- **Notifications**: Automated email notifications for event updates, such as rescheduling or cancellations.
- **Participant Management**: Track and view event registrations with detailed attendee data.
- **Security**: Password encryption using bcrypt and OTP-based email verification for registration.
- **Responsiveness**: Optimized UI for various devices using HTML, CSS, and EJS.

---

## Technologies Used
### Frontend:
- HTML
- CSS
- JavaScript
- EJS (Embedded JavaScript)

### Backend:
- Node.js
- Express.js

### Database:
- MySQL

### Authentication:
- bcrypt for password hashing
- OTP-based Email Verification

---

## Database Schema
The database schema for CEMS is designed to efficiently manage events, users, and registrations.

```sql
CREATE DATABASE ems;
USE ems;

-- Create events table
CREATE TABLE events (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255) DEFAULT NULL,
  type VARCHAR(255) DEFAULT NULL,
  is_paid VARCHAR(10) DEFAULT NULL,
  status ENUM('pending','approved') NOT NULL DEFAULT 'pending',
  created_by_email VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY name (name)
);

-- Create faculty table
CREATE TABLE faculty (
  faculty_id INT NOT NULL AUTO_INCREMENT,
  name TEXT NOT NULL,
  event_id INT NOT NULL,
  faculty_prn INT NOT NULL,
  PRIMARY KEY (faculty_id),
  KEY event_id (event_id),
  CONSTRAINT faculty_ibfk_1 FOREIGN KEY (event_id) REFERENCES events (id)
);

-- Create login table
CREATE TABLE login_users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY username (username)
);

-- Create users table
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  prn VARCHAR(10) DEFAULT NULL,
  faculty_id VARCHAR(10) DEFAULT NULL,
  event_id INT DEFAULT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  category ENUM('student','faculty','event_manager') NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
);

-- Create registrations table
CREATE TABLE registrations (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  category VARCHAR(20) DEFAULT NULL,
  event_id INT NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  purpose TEXT NOT NULL,
  registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  eventemail VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY event_id (event_id),
  KEY email (email),
  CONSTRAINT registrations_ibfk_1 FOREIGN KEY (event_id) REFERENCES events (id),
  CONSTRAINT registrations_ibfk_2 FOREIGN KEY (email) REFERENCES users (email)
);
```

---

## Registration Process
1. **Students**:
   - Only students with a valid **MIT WPU PRN** can register and use this platform.
   - Provide your PRN, name, and university email during registration.

2. **Faculty**:
   - Use your personal or university email to register.
   - Faculty accounts can manage assigned events and notify participants of updates.

3. **Event Organizers**:
   - Use your personal email to register.
   - Organizers can create, edit, and manage events.

4. **Admin Faculty**:
   - Log in directly using the following credentials:
     - **Email**: `admin@gmail.com`
     - **Password**: `admin123`
   - Admins have the highest privileges, including event approvals, faculty assignment, and participant tracking.

---

## Installation
Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aakarsh15/Event-management-system.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd Event-management-system
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Configure the `.env` file**:
   - Add your database credentials and email service configuration in a `.env` file.

5. **Import the SQL schema**:
   - Use the SQL script provided in the `Database Schema` section to create the required tables in your MySQL database.

6. **Run the application**:
   ```bash
   npm start
   ```

7. **Access the application**:
   - Open your browser and go to: `http://localhost:3000`.

---

## Usage
- **Admin Faculty**:
  - Approve or reject events.
  - Assign faculty in charge of specific events.
  - Oversee and manage participant registrations.

- **Faculty**:
  - Notify participants about updates.
  - Manage assigned events efficiently.

- **Students**:
  - Browse and register for events.
  - Manage participation in university events.

- **Event Organizers**:
  - Create, edit, and manage events.
  - Track participants and oversee event logistics.

---

## Future Enhancements
- Integration with **payment gateways** for ticketing and paid event registration.
- Development of a **dedicated mobile app** for improved accessibility.
- **Advanced analytics** for evaluating event performance.
- **AI-driven recommendations** for personalized event suggestions and scheduling.

---

## Contributors
- **S.LAKSHMI ABHISHIKTHA**

---

## License
This project is licensed under the **MIT License**. See the `LICENSE` file for more details.
