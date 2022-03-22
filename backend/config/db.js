let mysql = require('mysql');

let conn = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "quizzo"
});

conn.connect(function(err){
    if (err) throw err;
    console.log("Database connected successfully");
})

module.exports = conn;