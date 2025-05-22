const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tailor_notebook'
});
module.exports = pool;
