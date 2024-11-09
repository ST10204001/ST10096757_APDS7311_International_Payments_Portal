import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.status(401).json({ error: 'No token provided, please log in.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET is your secret key used to sign the token
    const user = await User.findById(decoded.id); // Get the user by ID
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user; // Add the user to the request object
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export default authMiddleware;
