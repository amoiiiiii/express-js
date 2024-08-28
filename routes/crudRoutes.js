const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');
// Create a new employee
router.post('/employee', crudController.createEmployees);

// Read all employees
router.get('/employee', crudController.getAllEmployee);

// Read a single employee by ID
router.get('/employee/:id', crudController.getEmployeeById);

// Update an employee by ID
router.put('/employee/:id', crudController.updateEmployee);

// Delete an employee by ID
router.delete('/employee/:id', crudController.deleteEmployee);

module.exports = router;
