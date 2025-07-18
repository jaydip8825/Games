import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // For now, since we're not using real JWT, we'll get user from the request body
    // In a real app, you would verify the JWT token and get user from it
    const userEmail = req.body.email;
    
    if (!userEmail) {
      return res.status(401).json({ message: 'User email required in request body' });
    }

    const user = await User.findOne({ email: userEmail });
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log('Auth middleware error:', err);
    res.status(500).json({ message: 'Authentication error' });
  }
};

export default authMiddleware; 