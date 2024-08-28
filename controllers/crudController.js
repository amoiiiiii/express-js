const pool = require('../config/db');

const createEmployees = async (req, res) => {
  console.log('Request Body:', req.body); // Untuk debug

  const { name, email, no } = req.body;

  if (!name || !email || !no) {
    return res.status(400).json({ error: 'Name, email, and no are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO employee (name, email, no) VALUES ($1, $2, $3) RETURNING *',
      [name, email, no]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Read all employees
const getAllEmployee = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employee');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read a single employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM employee WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an employee by ID
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, no } = req.body;
  try {
    const result = await pool.query(
      'UPDATE employee SET name = $1, email = $2, no = $3 WHERE id = $4 RETURNING *',
      [name, email, no, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an employee by ID
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM employee WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createEmployees,
  getAllEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};
