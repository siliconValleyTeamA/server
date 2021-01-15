const connection = require("./connection");
const mysql = require("mysql2");

async function getScheduleProject() {
  let [rows, fields] = await connection.query(`SELECT * FROM category`);
  return rows;
}

module.exports = { getScheduleProject };
