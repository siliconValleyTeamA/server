const connection = require("./connection");
const mysql = require("mysql2");

async function getScheduleProject() {
  let [rows, fields] = await connection.query(
    `SELECT * FROM project WHERE start_date>=NOW()`
  );
  return rows;
}

module.exports = { getScheduleProject };
