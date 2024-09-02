const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');

/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Create a new employee
 *     description: Creates a new employee in the system
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               no:
 *                 type: string
 *                 example: 123456
 *               password:
 *                 type: string
 *                 example: password123
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/employee', crudController.createEmployees);

/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Get all employees
 *     description: Retrieves a list of all employees
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: List of employees
 *       500:
 *         description: Internal server error
 */
router.get('/employee', crudController.getAllEmployee);

/**
 * @swagger
 * /employee/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     description: Retrieves an employee's details by their ID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee details
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.get('/employee/:id', crudController.getEmployeeById);

/**
 * @swagger
 * /employee/{id}:
 *   put:
 *     summary: Update an employee
 *     description: Updates an employee's details by their ID
 *     tags: [Employee]
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
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               no:
 *                 type: string
 *                 example: 123456
 *               password:
 *                 type: string
 *                 example: newpassword123
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.put('/employee/:id', crudController.updateEmployee);

/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Delete an employee
 *     description: Deletes an employee by their ID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.delete('/employee/:id', crudController.deleteEmployee);

module.exports = router;
