const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  loginAdmin,
  getProfile,
  updateProfile
} = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidators');
const validateRequest = require('../middleware/validateRequest');
const { auth } = require('../middleware/authMiddleware');

router.post('/register', registerValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, loginUser);
router.post('/admin/login', loginValidation, validateRequest, loginAdmin);

router.get('/me', auth(), getProfile);
router.put('/me', auth(), updateProfile);

module.exports = router;

