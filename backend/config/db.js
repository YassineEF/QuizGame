let mysql = require("mysql");

let conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "quizzo",
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Database connected successfully");
});

module.exports = conn;
