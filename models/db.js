

const mysql = require('mysql2');
const util = require('util');

const db = {
  host: '103.191.209.34',
  user: 'ubzrnkmd_user_pickupkart',
  password: 'Win@1753012',
  database: 'ubzrnkmd_pickupkart',
};

const pool = mysql.createPool(db);

const queryAsync = util.promisify(pool.query).bind(pool);

module.exports = { queryAsync };

