const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  getBookingById
} = require('../controllers/bookingController');
const { createBookingValidation } = require('../validators/bookingValidators');
const validateRequest = require('../middleware/validateRequest');
const { auth } = require('../middleware/authMiddleware');

router.post('/', auth(), createBookingValidation, validateRequest, createBooking);
router.get('/me', auth(), getUserBookings);

router.get('/', auth({ role: 'admin' }), getAllBookings);
router.get('/:id', auth({ role: 'admin' }), getBookingById);
router.put('/:id/status', auth({ role: 'admin' }), updateBookingStatus);

module.exports = router;

