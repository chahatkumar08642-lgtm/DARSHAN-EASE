const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const auth = (options = {}) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

      if (!token) {
        return res.status(401).json({ message: 'Not authorized, token missing' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = null;
      if (decoded.type === 'admin') {
        user = await Admin.findById(decoded.id).select('-password');
        req.isAdmin = true;
      } else {
        user = await User.findById(decoded.id).select('-password');
        req.isAdmin = false;
      }

      if (!user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      req.user = user;

      if (options.role === 'admin' && !req.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error', error);
      return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  };
};

module.exports = {
  auth
};

