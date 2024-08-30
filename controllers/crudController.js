const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const createEmployees = async (req, res) => {
    const { name, email, no, password, departmentId } = req.body;
  
    if (!name || !email || !no || !password) {
      return res.status(400).json({ error: 'Name, email, no, and password are required' });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const employee = await prisma.employee.create({
        data: {
          name,
          email,
          no,
          password: hashedPassword,
          department: departmentId ? {
            connect: {
              id: Number(departmentId)  // Convert departmentId to number
            }
          } : undefined
        },
        include: {
          department: true
        }
      });
      res.status(201).json(employee);
    } catch (err) {
      console.error('Error creating employee:', err);
      res.status(500).json({
        error: 'An error occurred while creating the employee.',
        details: err.message
      });
    }
  };
  
const getAllEmployee = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({
      error: 'An error occurred while fetching employees.',
      details: err.message
    });
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error('Error fetching employee by ID:', err);
    res.status(500).json({
      error: 'An error occurred while fetching the employee.',
      details: err.message
    });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, no, password } = req.body;

  if (!id || !name || !email || !no || !password) {
    return res.status(400).json({ error: 'ID, name, email, no, and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await prisma.employee.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        no,
        password: hashedPassword
      }
    });
    res.json(employee);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Employee not found' });
    }
    console.error('Error updating employee:', err);
    res.status(500).json({
      error: 'An error occurred while updating the employee. Please try again later.',
      details: err.message
    });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.employee.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Employee not found' });
    }
    console.error('Error deleting employee:', err);
    res.status(500).json({
      error: 'An error occurred while deleting the employee.',
      details: err.message
    });
  }
};

module.exports = {
  createEmployees,
  getAllEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};
