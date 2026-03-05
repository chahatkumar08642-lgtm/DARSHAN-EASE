const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const { auth } = require('../middleware/authMiddleware');

router.get('/dashboard', auth({ role: 'admin' }), getDashboardStats);

module.exports = router;

