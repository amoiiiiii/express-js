const express = require('express');
const router = express.Router();
const { checkIn, checkOut } = require('../controllers/attendanceController'); // Import controller
const authenticateToken = require('../middlewares/authenticateToken');

/**
 * @swagger
 * /checkin:
 *   post:
 *     summary: Check-in a user
 *     description: Allows a user to check in
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully checked in
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/checkin', authenticateToken, checkIn);

/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Check-out a user
 *     description: Allows a user to check out
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully checked out
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/checkout', authenticateToken, checkOut);

module.exports = router;
