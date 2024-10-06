const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // for authentication purposes
const bcrypt = require('bcrypt'); // for hashing passwords and encryption

const app = express();

// Middleware
// Enable CORS for all routes
app.use(cors());
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

//Routes
//Register
app.post('/api/register', async (req, res) => {
    try {
        const { username, password, userFirstName, userLastName, idNumber, accountNumber} = req.body;

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
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

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user: ' + error.message);
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
     res.status(200).send('Logout successfully');
  });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


