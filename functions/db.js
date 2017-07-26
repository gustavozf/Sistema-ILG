var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : '02121996',
    database : 'SISTEMA_ILG2'
  });

  module.exports = pool;
