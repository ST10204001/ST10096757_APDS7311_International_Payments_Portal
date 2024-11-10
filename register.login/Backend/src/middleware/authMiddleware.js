// src/middleware/authMiddleware.js
//import jwt from 'jsonwebtoken'; // Remove if not used
//import User from '../models/user.js';

const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.id) {
    console.log("Authenticated User:", req.session.user);  // Debugging: check session data
    return next();
  } else {
    console.log('Unauthorized access attempt:', req.session);  // Debugging: log session data
    return res.status(401).json({ error: 'Not authenticated. Please log in.' });
  }
};

export default authMiddleware;

