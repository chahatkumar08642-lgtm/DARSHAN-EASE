const { body } = require('express-validator');

const createTempleValidation = [
  body('name').notEmpty().withMessage('Temple name is required'),
  body('location').notEmpty().withMessage('Location is required')
];

module.exports = {
  createTempleValidation
};

