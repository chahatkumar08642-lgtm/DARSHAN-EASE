const { body } = require('express-validator');

const createBookingValidation = [
  body('templeId').notEmpty().withMessage('Temple ID is required'),
  body('timeSlotId').notEmpty().withMessage('Time slot ID is required'),
  body('attendees')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Attendees must be between 1 and 10')
];

module.exports = {
  createBookingValidation
};

