const mysql = require("mysql2/promise");

 const mysqlPool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"bookmanagesys"
});
module.exports = mysqlPool;

