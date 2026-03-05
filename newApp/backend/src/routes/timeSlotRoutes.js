const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getTimeSlotsForTemple,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot
} = require('../controllers/timeSlotController');
const { auth } = require('../middleware/authMiddleware');

router.get('/', getTimeSlotsForTemple);
router.post('/', auth({ role: 'admin' }), createTimeSlot);
router.put('/:id', auth({ role: 'admin' }), updateTimeSlot);
router.delete('/:id', auth({ role: 'admin' }), deleteTimeSlot);

module.exports = router;

