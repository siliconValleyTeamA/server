const connection = require("./connection");
const mysql = require("mysql2");

async function getScheduleProject() {
  let [rows, fields] = await connection.query(
    `SELECT * FROM project WHERE start_date>=NOW()`
  );
  return rows;
}

async function getCategoryProject({ category, filterType }) {
  let [rows, fields] = await connection.query(
    `SELECT * FROM project WHERE category_id=${category} or ${category} = 1`
  );
  return rows;
}

module.exports = { getScheduleProject, getCategoryProject };
