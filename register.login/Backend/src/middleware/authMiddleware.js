// src/middleware/authMiddleware.js
//import jwt from 'jsonwebtoken'; // Remove if not used
//import User from '../models/user.js';

const authMiddleware = (req, res, next) => {
  // Check if the user is authenticated by checking the session
  if (req.session && req.session.user && req.session.user.id) {
    // If the user is authenticated, proceed to the next middleware/route handler
    return next();
  } else {
    // If no user is found in the session, return a 401 Unauthorized error
    console.log('Unauthorized access attempt:', req.session);  // Debugging: log session data
    return res.status(401).json({ error: 'Not authenticated. Please log in.' });
  }
};

export default authMiddleware;

