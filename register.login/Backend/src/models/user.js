import mongoose from 'mongoose';

// User Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    password: { type: String, required: true },
    idNumber: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    isEmployee: { type: Boolean, default: false },  // Employee flag
});

const User = mongoose.model('users', userSchema);

export default User;
