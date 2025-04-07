import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Middleware to protect routes by verifying JWT authentication token.
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: Token not provided.' });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.userId).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token.' });
    }
  } catch (error) {
    next(error);
  }
};

// Middleware to check if the user is an admin.
const admin = (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(401).json({ message: 'Authorization failed: Not authorized as an admin.' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { protect, admin };
