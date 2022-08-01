const mysql = require('mysql');
const dbcConfig = require('../config/db.config.js');

const connection = mysql.createPool({
  connectionLimit: dbcConfig.connectionLimit,
  host: dbcConfig.host,
  user: dbcConfig.user,
  password: dbcConfig.password,
  database: dbcConfig.database,
  multipleStatements: dbcConfig.multipleStatements,
});

module.exports = connection;
