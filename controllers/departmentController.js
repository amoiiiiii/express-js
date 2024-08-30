const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createDepartment = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const department = await prisma.department.create({
      data: {
        name,
      },
    });
    res.status(201).json(department);
  } catch (err) {
    console.error('Error creating department:', err);
    res.status(500).json({
      error: 'An error occurred while creating the department.',
      details: err.message,
    });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
    res.json(departments);
  } catch (err) {
    console.error('Error fetching departments:', err);
    res.status(500).json({
      error: 'An error occurred while fetching departments.',
      details: err.message,
    });
  }
};

const getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await prisma.department.findUnique({
      where: { id: Number(id) },
    });
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
  } catch (err) {
    console.error('Error fetching department by ID:', err);
    res.status(500).json({
      error: 'An error occurred while fetching the department.',
      details: err.message,
    });
  }
};

const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const department = await prisma.department.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(department);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Department not found' });
    }
    console.error('Error updating department:', err);
    res.status(500).json({
      error: 'An error occurred while updating the department.',
      details: err.message,
    });
  }
};

const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.department.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Department deleted successfully' });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Department not found' });
    }
    console.error('Error deleting department:', err);
    res.status(500).json({
      error: 'An error occurred while deleting the department.',
      details: err.message,
    });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
