// src/middleware/authMiddleware.js
//import jwt from 'jsonwebtoken'; // Remove if not used
//import User from '../models/user.js';

const authenticateUser = (req, res, next) => {
  // Check if the user is authenticated (adjust this logic as per your authentication method)
  if (req.isAuthenticated()) {
    req.user = req.user || {}; // Assuming req.user is set after login
    return next();
  } else {
    return res.status(401).json({ error: 'Not authenticated' });
  }
};

export default authenticateUser;  // Default export
