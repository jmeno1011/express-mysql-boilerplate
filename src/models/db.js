const mysql = require('mysql');
const dbcConfig = require('../config/db.config.js');

const connection = mysql.createPool({
  connectionLimit: dbcConfig.connectionLimit,
  host: dbcConfig.host,
  user: dbcConfig.user,
  password: dbcConfig.password,
  database: dbcConfig.database,
  multipleStatements: dbcConfig.multipleStatements,
  // mysql시간과 server시간 추가
  timezone: "Asia/Seoul",
});

module.exports = connection;
