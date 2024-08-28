const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgre',
  password: '082411',  
  port: 5432,
});

module.exports = pool;
