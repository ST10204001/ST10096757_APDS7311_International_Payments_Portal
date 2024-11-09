// src/middleware/authMiddleware.js
//import jwt from 'jsonwebtoken'; // Remove if not used
//import User from '../models/user.js';

const authMiddleware = (req, res, next) => {
  // Check if the user is authenticated using the session data
  if (req.session && req.session.user) {
    return next();  // If user is authenticated, proceed to the next middleware/route handler
  } else {
    return res.status(401).json({ error: 'Not authenticated' });  // If no session data, deny access
  }
};

export default authMiddleware;

