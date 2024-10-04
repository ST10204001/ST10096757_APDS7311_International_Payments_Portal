const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // for authentication purposes
const bcrypt = require('bcrypt'); // for hashing passwords and encryption

const app = express();

// Middleware
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

app.post('/api/register', async (req,res)=>{

    try
    {
        const {username,password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); //10 char password
        const newUser = new User({ username, 
            userFirstName, 
            userLastName,
            password: hashedPassword,
            idNumber,
            accountNumber});
        await newUser.save();
        res.status(201).send('User registered successfully');
    }
    catch(error)
    {
        res.status(500).send('Error registering user');
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


