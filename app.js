const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const crudRoutes = require('./routes/crudRoutes');
const authRoutes = require('./routes/auth');
const departmentRoutes = require('./routes/departmentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes')

const app = express();

app.use(cors());
app.use(bodyParser.json()); // Untuk JSON
app.use(bodyParser.urlencoded({ extended: true })); // Untuk x-www-form-urlencoded

app.use('/api', crudRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', departmentRoutes);
app.use('/api/attendance', attendanceRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
