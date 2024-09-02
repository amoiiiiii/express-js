const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

/**
 * @swagger
 * /department:
 *   post:
 *     summary: Create a new department
 *     description: Creates a new department in the system
 *     tags: [Department]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Human Resources
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/department', departmentController.createDepartment);

/**
 * @swagger
 * /department:
 *   get:
 *     summary: Get all departments
 *     description: Retrieves a list of all departments
 *     tags: [Department]
 *     responses:
 *       200:
 *         description: List of departments
 *       500:
 *         description: Internal server error
 */
router.get('/department', departmentController.getAllDepartments);

/**
 * @swagger
 * /department/{id}:
 *   get:
 *     summary: Get a department by ID
 *     description: Retrieves a department's details by their ID
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Department details
 *       404:
 *         description: Department not found
 *       500:
 *         description: Internal server error
 */
router.get('/department/:id', departmentController.getDepartmentById);

/**
 * @swagger
 * /department/{id}:
 *   put:
 *     summary: Update a department
 *     description: Updates a department's details by their ID
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Human Resources
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Department not found
 *       500:
 *         description: Internal server error
 */
router.put('/department/:id', departmentController.updateDepartment);

/**
 * @swagger
 * /department/{id}:
 *   delete:
 *     summary: Delete a department
 *     description: Deletes a department by their ID
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Department deleted successfully
 *       404:
 *         description: Department not found
 *       500:
 *         description: Internal server error
 */
router.delete('/department/:id', departmentController.deleteDepartment);

module.exports = router;
