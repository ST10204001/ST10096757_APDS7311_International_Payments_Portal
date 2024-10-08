INTERNATIONAL PAYMENT SYSTEM README

CONTRIBUTORS
Monique Jackson– ST10096757
Imrah Lodewyk – ST10204001
Malerato Seboni – ST10112350
Salih Adams – ST10202241 
 
	-- PROJECT OVERVIEW --
The International Payment System (IPS) is designed for a bank's online banking site, allowing customers to make secure international payments. The system provides a dedicated payments portal accessible only by pre-registered bank employees. Customers can register, log in, and execute transactions, while employees can verify and submit these transactions to SWIFT.

However for this part of the POE, the requirements for the app is to allow customers to register and login into the website.

	-- FEATURES --
- Customer Registration: Users can register by providing their full name, ID number, account number, and password.
- User Authentication: Customers can log in using their username, account number, and password.

	-- TECHNOLOGIES USED --
- Frontend:    React.js 
- Backend:     Node.js, Express.js
- Database:    MongoDB
- Security:    Bcrypt for password hashing, Helmet for security headers, and other security libraries
- API Testing: Postman
- SSL/TLS:     Self-signed certificates for secure communication


		-- INSTALLATION --
	-- PREREQUISITES --
- Node.js (v12 or higher)
- MongoDB (local or Atlas)
- npm 

	-- CLONE THE REPOSITORY --
Clone the repository from the GitHub link: https://github.com/ST10204001/ST10096757_APDS7311_International_Payments_Portal.git
 
	-- BACKEND SETUP --
1.Download the editor of your choice. The instructions following are for Visual Studio Code. Ensure you follow the equivalent 	steps should you choose another editor.
2.Navigate to the backend directory by typing “cd” followed by the directory leading to the “api_backend” file.
3.Install dependencies, namely nodemon, which can be run as “npm install” in the command prompt terminal or the equivalent command
4.Start the backend by running “node App.js” in the terminal

	-- FRONTEND SETUP --
1.Open Windows PowerShell
2.Navigate to the backend directory by typing “cd” followed by the directory leading to the “login-register-with-node” file.
3.Install dependencies, namely nodemon, which can be run as “npm install” in the command prompt terminal or the equivalent command.
4.Install Bootstrap dependencies by typing “npm install bootstrap”.
5.Start the React application by running “npm start”.
6.In the event that the PowerShell terminal states that something else is running on port 3001 and asks if you would like to run on another port, type “y” and press enter.
7.Ensure that the web page opens on firefox.

	-- USAGE --
1.Open your FireFox Web Browser and navigate to http://localhost:3001 for the frontend interface.
2.Follow the prompts to register or log in as a customer.
3.Once logged in, customers can enter payment details and submit transactions.
4.Employees can log in to the payment portal to verify and submit payments to SWIFT.

		-- API DOCUMENTATION --
	-- BASE URL --
Development: http://localhost:3001/api


API ENDPOINTS FOR THE INTERNATIONAL PAYMENT SYSTEM

1. USER REGISTRATION

Endpoint: POST /api/register
Register a new user by providing their details.
	o The username can consist of alphanumeric characters and underscores.
	o The first name can contain alphabetic characters and spaces.
	o The last name can contain alphabetic characters and spaces.
	o The password must be at least 8 characters long, include at least one letter and one number, and may include special characters. 
	o The ID must be exactly 13 numeric digits.
	o The account number must be between 8 and 12 numeric digits.
Response:
201 Created: User successfully registered.
400 Bad Request: Validation error or user already exists.

2. USER LOGIN

Endpoint: POST /api/login
Description: Log in a registered user using their credentials.
Request Body: 
{
	o The username must match a stored username that will consist of alphanumeric characters and underscores.
	o The password must match the stored password of that username which should be at least 8 characters long, include at least one letter and one number, and may include special characters. 
	o The account number must match the account number stored under that username that is between 8 and 12 numeric digits.
}
Response:
200 OK: Successfully logged in, with session token.
401 Unauthorized: Invalid credentials.


		-- SECURITY MEASURES --
SECURITY MEASURES
To safeguard sensitive information and protect against common web vulnerabilities, the following security measures have been implemented in the International Payment System:

1. Password Hashing and Salting: User passwords are hashed and salted using Bcrypt before being stored in the database, making 	them unreadable even if accessed. The Bcrypt library is used for securely hashing passwords before storing them in the 	database. Bcrypt incorporates a work factor (cost factor) that makes the hashing process slower, thereby increasing 	resistance to brute-force attacks. When a user registers, the password is hashed using Bcrypt. During login, the hashed 	password is compared with the stored hash.

2. CORS: Cross-Origin Resource Sharing (CORS): CORS is configured to restrict which domains can access the API, thus minimizing 	the risk of CSRF (Cross-Site Request Forgery) attacks.

3. Helmet: This middleware helps secure applications by setting various HTTP headers. It’s designed to mitigate common security 	vulnerabilities.
Headers Implemented:
		o Content Security Policy (CSP): Helps prevent Cross-Site Scripting (XSS) attacks by controlling which 			resources the browser is allowed to load.
		o X-Content-Type-Options: Prevents browsers from MIME-sniffing a response away from the declared content type.
		o X-Frame-Options: Protects against clickjacking by controlling whether the browser should allow the site to be framed.
		o Strict-Transport-Security: Enforces secure (HTTP over SSL/TLS) connections to the server.

4. Rate Limiting: This practice helps to protect against brute-force attacks and denial-of-service (DoS) attacks by limiting the number of requests from a single IP address over a specified time frame.

5. Input Validation and Sanitisation: All user inputs are validated using regex patterns to ensure they meet expected formats, preventing SQL injection and XSS attacks.

6. Session Management: Secure cookie attributes are set to enhance session management. This includes:
	o HttpOnly: Prevents client-side scripts from accessing the cookie.
	o Secure: Ensures cookies are sent over HTTPS only.
	o SameSite: Controls how cookies are sent with cross-origin requests.


	-- PROTECTION AGAINST ATTACKS --
To further secure the application, the following measures have been taken:
•	Input Validation: All inputs are validated against expected patterns to prevent injections.
•	Brute Force Protection: Rate limiting is applied to login attempts to mitigate brute force attacks.
•	XSS Protection: Helmet and other libraries are used to set headers that mitigate cross-site scripting attacks.
•	SQL Injection Protection: As a NoSQL database is used, care is taken to validate inputs before processing them.

	-- WHITELIST INPUT VALIDATION --
All user input is validated against regular expressions (RegEx) to prevent injection attacks and ensure that only acceptable formats are accepted.
SSL CONFIGURATION
All communication between the client and server is encrypted using SSL/TLS. This is enforced by:
•	Redirecting all HTTP traffic to HTTPS.
•	Configuring the server to use a valid SSL certificate (e.g., from Let's Encrypt).


LICENSE
This project is licensed under the MIT License.
