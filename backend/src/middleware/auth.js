const jwt = require('jwt-simple');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const generateToken = (userId) => {
  return jwt.encode({ userId, iat: Math.floor(Date.now() / 1000) }, JWT_SECRET);
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = jwt.decode(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);
      req.user = user;
    }
  } catch (error) {
    console.log('Auth error:', error);
  }
  next();
};

module.exports = { generateToken, authMiddleware };
