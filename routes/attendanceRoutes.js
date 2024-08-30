const express = require('express');
const router = express.Router();
const { checkIn, checkOut } = require('../controllers/attendanceController'); // Import controller
const authenticateToken = require('../middlewares/authenticateToken'); // Sesuaikan jalur import

// Endpoint untuk check-in
router.post('/checkin', authenticateToken, checkIn);

// Endpoint untuk check-out
router.post('/checkout', authenticateToken, checkOut);

module.exports = router;
