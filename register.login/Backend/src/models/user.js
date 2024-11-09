import mongoose from 'mongoose';

// User Schema and Model
const userSchema = new mongoose.Schema({
    username: String,
    userFirstName: String,
    userLastName: String,
    password: String,
    idNumber: String,
    accountNumber: String,
});

const User = mongoose.model('users', userSchema);

export default User;
