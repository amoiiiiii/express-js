const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');


router.post('/employee', crudController.createEmployees);
router.get('/employee', crudController.getAllEmployee);
router.get('/employee/:id', crudController.getEmployeeById);
router.put('/employee/:id', crudController.updateEmployee);
router.delete('/employee/:id', crudController.deleteEmployee);

module.exports = router;
