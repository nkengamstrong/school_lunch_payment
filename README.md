# School Lunch Payment System

A digital platform for parents to manage and fund their children's lunch accounts, allowing secure payments, balance tracking, and low-balance alerts to ensure students have sufficient funds for their meals.

## Table of Contents

- [Features](#features)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Planned Enhancements](#planned-enhancements)
- [License](#license)

## Features

- **Parent Account Management**: Secure registration and login for parents to manage their children’s lunch accounts.
- **Student Accounts**: Each student has a dedicated account linked to the parent for tracking lunch funds.
- **Balance Tracking**: Real-time account balance display.
- **Payment Processing**: (In progress) Parents can make secure payments to fund lunch accounts.
- **Low Balance Alerts**: (Upcoming) Notify parents when account balances fall below a specified threshold.
- **Admin Dashboard**: (Upcoming) Allows school administrators to manage student accounts and monitor payment statuses.

## System Requirements

- **Node.js**: v14 or higher
- **React**: v17 or higher
- **MySQL or MariaDB**: Database server for storing account and transaction data
- **XAMPP**: Local database server setup for development

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nkengamstrong/school_lunch_payment.git
   cd SchoolLunchPaymentSystem
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Set Up the Database**:
   - Open **XAMPP** and start **MySQL**.
   - Use **phpMyAdmin** or MySQL CLI to import the provided SQL schema:
     ```sql
     CREATE DATABASE school_lunch;
     USE school_lunch;
     -- Then import schema.sql or run setup scripts
     ```

4. **Configure Environment Variables**:
   Create a `.env` file in the `server/` directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=school_lunch
   PORT=5000
   ```

5. **Start the Backend Server**:
   ```bash
   npm start
   ```

6. **Install Frontend Dependencies**:
   ```bash
   cd ../client
   npm install
   ```

7. **Start the Frontend App**:
   ```bash
   npm start
   ```

## Usage

- **Register/Login**: Parents can create accounts or log in securely.
- **Manage Students**: Add student accounts linked to a parent account.
- **Track Balances**: View real-time lunch account balances.
- **Make Payments**: (Coming soon) Securely fund student accounts.
- **Receive Alerts**: (Upcoming) Get notified when balances run low.

## Technologies Used

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MySQL (via XAMPP)
- **Authentication**: JWT (planned)
- **Deployment Tools**: (TBD)

## Project Structure

```
SchoolLunchPaymentSystem/
├── client/          # React frontend
├── server/          # Node.js backend
├── database/        # SQL scripts and schema
└── README.md
```

## Planned Enhancements

- Payment gateway integration
- Admin dashboard with role-based access
- Email and SMS notifications for low balances
- Mobile responsiveness
- Unit and integration testing

## License

This project is licensed under the MIT License.
