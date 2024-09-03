const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.post('/department', departmentController.createDepartment);
router.get('/department', departmentController.getAllDepartments);
router.get('/department/:id', departmentController.getDepartmentById);
router.put('/department/:id', departmentController.updateDepartment);
router.delete('/department/:id', departmentController.deleteDepartment);

module.exports = router;
