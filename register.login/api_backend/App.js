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
    userFirstName: String,
    userLastName: String,
    password: String,
    idNumber: String,
    accountNumber: String
})

//Creating Model
const user = mongoose.model('User', userSchema)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


