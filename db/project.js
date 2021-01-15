const connection = require("./connection");
const mysql = require("mysql2");

async function getScheduleProject() {
  let [rows, fields] = await connection.query(
    `SELECT * FROM project_detail WHERE open_left_days>=0`
  );
  return rows;
}

async function getSoonSuccessProject() {
  let [rows, fields] = await connection.query(
    `SELECT * FROM project_detail WHERE percent>=80 and percent <100`
  );
  return rows;
}

async function getPopularProject() {
  let [rows, fields] = await connection.query(
    `SELECT * FROM project_detail_popular WHERE end_date >= CURDATE()`
  );
  return rows;
}

async function getCategoryProject({ category, filterType }) {
  let query = `SELECT * FROM project_detail`;

  query += ` WHERE end_date >= CURDATE() and (category_id=${category} or ${category} = 1)`;

  switch (filterType) {
    case "percent":
      query += ` ORDER BY percent DESC`;
      break;
    case "amount":
      query += ` ORDER BY funding_money DESC`;
      break;
    case "closing":
      query += ` ORDER BY end_date`;
      break;
    default:
      break;
  }

  let [rows, fields] = await connection.query(query);
  return rows;
}

async function getProjectDetail({ projectId }) {
  let [rows, fields] = await connection.query(
    `SELECT * FROM project_detail WHERE id = ${projectId}`
  );
  return rows;
}

module.exports = {
  getScheduleProject,
  getSoonSuccessProject,
  getPopularProject,
  getCategoryProject,
  getProjectDetail
};
