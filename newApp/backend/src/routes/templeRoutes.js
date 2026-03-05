const express = require('express');
const router = express.Router();
const {
  getTemples,
  getTempleById,
  createTemple,
  updateTemple,
  deleteTemple
} = require('../controllers/templeController');
const { createTempleValidation } = require('../validators/templeValidators');
const validateRequest = require('../middleware/validateRequest');
const { auth } = require('../middleware/authMiddleware');

router.get('/', getTemples);
router.get('/:id', getTempleById);

router.post('/', auth({ role: 'admin' }), createTempleValidation, validateRequest, createTemple);
router.put('/:id', auth({ role: 'admin' }), createTempleValidation, validateRequest, updateTemple);
router.delete('/:id', auth({ role: 'admin' }), deleteTemple);

module.exports = router;

