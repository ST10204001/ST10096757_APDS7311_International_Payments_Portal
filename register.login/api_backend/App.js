const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // for authentication purposes
const bcrypt = require('bcrypt'); // for hashing passwords and encryption
const https = require('https');
const fs = require('fs');

const app = express();

// Middleware
// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3001', // Specify the frontend URL
    credentials: true, // Enable sending cookies or HTTP credentials
}));
app.use(express.json()); // for sending and receiving data
app.use(cookieParser()); // for parsing cookies

const dbName = 'myDatabase'; 
// MongoDB Connection
mongoose.connect('mongodb+srv://monajackson98:Kc9gZY2EAkj5mIs9@cluster0.uxhruuc.mongodb.net/myDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database running successfully');  // Success message
})
.catch(error => {
    console.log('There is a connection error:', error); // Log the entire error object
});

//Creating Schema
const userSchema = new mongoose.Schema({
    username: String,
    userFirstName: String,
    userLastName: String,
    password: String,
    idNumber: String,
    accountNumber: String
})

//Creating Model
const User = mongoose.model('User', userSchema)

// Helper function to validate input using RegEx patterns
function validateInput({ username, password, userFirstName, userLastName, idNumber, accountNumber }) {
    const usernamePattern = /^[a-zA-Z0-9_]+$/; // Alphanumeric with underscores
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}$/; // Minimum 8 characters, letters, and numbers, allows special characters
    const namePattern = /^[a-zA-Z\s]+$/; // Alphabetic characters and spaces
    const idNumberPattern = /^\d{13}$/; // 13 numeric digits
    const accountNumberPattern = /^\d{8,12}$/; // 8 to 12 digit numbers

    if (!usernamePattern.test(username)) {
        return 'Invalid username: Only alphanumeric characters and underscores (_) are allowed.';
    }
    if (!passwordPattern.test(password)) {
        return 'Invalid password: Must be at least 8 characters long, include at least one letter and one number, and may include special characters.';
    }
    if (!namePattern.test(userFirstName)) {
        return 'Invalid first name: Only alphabetic characters and spaces are allowed.';
    }
    if (!namePattern.test(userLastName)) {
        return 'Invalid last name: Only alphabetic characters and spaces are allowed.';
    }
    if (!idNumberPattern.test(idNumber)) {
        return 'Invalid ID number: Must be exactly 13 numeric digits.';
    }
    if (!accountNumberPattern.test(accountNumber)) {
        return 'Invalid account number: Must be between 8 and 12 numeric digits.';
    }

    return null; // All inputs are valid
}


//Routes
//Register
app.post('/api/register', async (req, res) => {
    try {
        const { username, password, userFirstName, userLastName, idNumber, accountNumber} = req.body;

         // Validate inputs using RegEx
         const validationError = validateInput({ username, password, userFirstName, userLastName, idNumber, accountNumber });
         if (validationError) {
            return res.status(400).json({ error: validationError }); // Send validation error message as JSON
         }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, 
            userFirstName, 
            userLastName,
            password: hashedPassword,
            idNumber,
            accountNumber});
            await newUser.save().catch(err => {
                console.error('Error saving user:', err);
            });

            res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering user: ' + error.message }); 
    }
});

//Login
app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (user && (await bcrypt.compare(password, user.password)))   
   {
        res.cookie('userToken', user._id.toString(), { httpOnly: true });
        res.status(200).send('Login successfully');
      } else {
        res.status(401).send('Invalid Credentials');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error logging in user: ' + error.message);
    }
  });

  //Logout
app.post('/api/logout', async (req, res) => {
     res.clearCookie('userToken');
     res.status(200).send('Logout successful');
  });

  const authenticateUser= async (req,res,next)=>{
    const userId = req.cookies.userToken;

    if (!userId) {
        return res.status(401).send('Unauthorized');
      }

    try{
       const user = await User.findById(userId);

       if (!user) {
        return res.status(401).send('Unauthorized');
        
      }
      else{
        const users={
          userName:user.userName
        }
         return res.status(201).json(users);
      }
    }
      catch (error) {
        res.status(500).send('Error authenticating user');
      }
}

  app.get('/dashboard', authenticateUser, (req, res) => {
  });

  // Load SSL certificate and key
  const sslOptions = {
    key: fs.readFileSync('./keys/private.key'), 
    cert: fs.readFileSync('./keys/certificate.crt'),
};

const PORT = process.env.PORT || 3000;

// Create HTTPS server
const server = https.createServer(sslOptions, app);

server.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});

