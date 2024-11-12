INTERNATIONAL PAYMENT SYSTEM README

CONTRIBUTORS
Monique Jackson– ST10096757
Imrah Lodewyk – ST10204001
Malerato Seboni – ST10112350
Salih Adams – ST10202241 

 	-- YouTube Link --
https://youtu.be/qKFHH6oLhTU
 
	-- PROJECT OVERVIEW --
APDS Payment System

Welcome to the APDS Payment System! This application is designed to provide secure and efficient payment transactions for both clients and employees. It uses the MERN stack (MongoDB, Express, React, and Node.js) and includes a variety of security features to ensure that sensitive data is protected.

## Table of Contents

1. [Overview](#overview)
2. [Setup Instructions](#setup-instructions)
3. [Application Walkthrough](#application-walkthrough)
4. [Backend Walkthrough](#backend-walkthrough)
5. [Security Measures](#security-measures)
6. [API Testing with Postman](#api-testing-with-postman)
7. [MongoDB](#mongodb)
8. [Testing Integration](#testing-integration)
9. [Contributors](#contributors)

## Overview

For our APDS POE assignment, we were tasked with creating a payment system that employs robust security measures. The application is built using the MERN stack, which includes:

- **MongoDB** for the database
- **Express.js** for the backend API
- **React** for the frontend UI
- **Node.js** for running the server

This project focuses on secure transactions and user management, ensuring that both client and employee data is handled carefully.

## Setup Instructions

### Prerequisites

Before you start, make sure you have the following installed:

- **Node.js**: You can download it from [here](https://nodejs.org/).
- **Git**: To clone the repository.

### Cloning the Repository

1. Clone the repository by running the following command:

2. Navigate to the cloned repository folder.

### Backend Setup

1. Open a terminal and navigate to the backend directory (where `server.js` is located).
2. Install the backend dependencies:

   ```bash
   npm install
   ```

   This will install the necessary packages, including:
   - `express`
   - `mongoose`
   - `express-session`
   - `bcryptjs`
   - `express-validator`
   - `express-brute`
   - `helmet`
   - `cors`

3. If you're working in a real project environment, you would need to set up environment variables (`.env`) to store sensitive data like the MongoDB connection URI and session secrets. However, for testing purposes, these values are stored openly in the `README`.

4. Start the server:

   ```bash
   node server.js
   ```

   The backend will be accessible at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory.
2. Install the frontend dependencies:

   ```bash
   npm install
   ```

3. Start the frontend application:

   ```bash
   npm start
   ```

   The frontend will be accessible at `http://localhost:5001`.

   If using Firefox, you'll need to click **Advanced** and select **Trust the Link** to bypass the initial security warning.

## Application Walkthrough

### Registration & Login

- **Registration**: Clients can register with their username, password, first name, last name, ID number, and account number.
- **Login**: Both clients and employees can log in. Clients use their username, password, and account number, while employees only need their username and password.

### Client Dashboard

Once logged in, clients can:
- View their account details.
- Create a transaction by filling out:
  - Recipient name
  - Amount to transfer
  - Currency type
  - Transaction method (SWIFT requires a SWIFT code)

### Employee Dashboard

Employees can:
- View a list of transactions that need approval.
- Verify the transaction details (including SWIFT codes).
- Approve and send the transactions.

Both clients and employees can log out from the application.

## Backend Walkthrough

### API Design

The backend relies on API endpoints to handle user registration, login, and transaction creation. It uses session management for user authentication, with cookies storing user data securely.

- **Registration** (`POST /api/register`): Registers a new user (client or employee).
- **Login** (`POST /api/login`): Authenticates a user based on credentials.
- **Create Transaction** (`POST /api/transaction`): Allows clients to create a transaction by verifying their session.

The backend uses validation and hashing for secure user authentication and transaction management.

### Code Example for Register API

```js
// Example of registering a user
app.post('/api/register', (req, res) => {
  // Validate input, hash password, and save user to database
});
```

### Code Example for Transaction Creation

```js
// Example of creating a transaction
app.post('/api/transaction', (req, res) => {
  // Verify user session and save transaction to database
});
```

## Security Measures

We’ve implemented several security measures to protect sensitive data:

1. **Password Hashing**: We use `bcrypt` to hash user passwords before storing them in the database. This ensures that even if the database is compromised, passwords remain secure.
2. **CORS**: Configured to only allow requests from trusted origins to prevent unauthorized access.
3. **Helmet**: Sets HTTP security headers to prevent common vulnerabilities like XSS, Clickjacking, and more.
4. **SSL Encryption**: All communication is encrypted using SSL certificates to ensure secure data transmission over HTTPS.
5. **Rate Limiting**: We use `express-rate-limit` to limit the number of requests an IP can make to prevent DoS attacks.
6. **Brute Force Protection**: Using `express-brute`, we limit the number of failed login attempts to prevent brute-force attacks.
7. **Input Validation**: All user inputs are validated to prevent malicious data from being processed.

### Session Management

User sessions are managed via secure cookies (`userToken`) with the following attributes:
- `HttpOnly`: Prevents access by JavaScript.
- `Secure`: Ensures cookies are only sent over HTTPS.
- `SameSite`: Restricts how cookies are sent with cross-origin requests.

## API Testing with Postman

### Step 1: Test Registration API

1. Open Postman and send a **POST** request to `http://localhost:5000/api/register`.
2. Set the request body as JSON with user registration details:

   ```json
   {
     "username": "newUser123",
     "password": "password123",
     "userFirstName": "John",
     "userLastName": "Doe",
     "idNumber": "1234567890123",
     "accountNumber": "1234567890"
   }
   ```

3. Hit **Send**. If successful, you’ll get a response:

   ```json
   {
     "message": "User registered successfully"
   }
   ```

### Step 2: Test Login API

1. Send a **POST** request to `http://localhost:5000/api/login` with login credentials.
2. If successful, you’ll get a session cookie that can be used in future requests.

### Step 3: Test Transaction API

1. Send a **POST** request to `http://localhost:5000/api/transaction` with transaction details.

   ```json
   {
     "amount": 500,
     "recipientAccount": "9876543210",
     "senderAccount": "1234567890",
     "transactionType": "transfer"
   }
   ```

2. Include the session cookie in the headers for authentication.

## MongoDB

The application uses MongoDB as the database, with two collections:
- `users`: Stores user data (clients and employees).
- `transactions`: Stores transaction details.

## Testing Integration

We integrated SonarQube (via SonarCloud) into our CircleCI pipeline to automatically scan the code for potential issues, including security vulnerabilities and code smells. SonarCloud provides real-time feedback on our code quality and security.


Thank you for reviewing our APDS project.


LICENSE
This project is licensed under the MIT License.
