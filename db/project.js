const connection = require("./connection");
const mysql = require("mysql2");

//곧 개봉될 프로젝트 조회
async function getScheduleProject() {
  const [rows, fields] = await connection.query(
    `SELECT * FROM project_detail WHERE open_left_days>=0`
  );
  return rows;
}

//곧 성골할 프로젝트 조회
async function getSoonSuccessProject() {
  const [rows, fields] = await connection.query(
    `SELECT * FROM project_detail WHERE percent>=80 and percent <100`
  );
  return rows;
}

//인기있는 프로젝트 조회
async function getPopularProject() {
  const [rows, fields] = await connection.query(
    `SELECT * FROM project_detail_popular WHERE end_date >= CURDATE()`
  );
  return rows;
}

//프로젝트를 카테고리, 필터별로 조회
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

  const [rows, fields] = await connection.query(query);
  return rows;
}

//프로젝트 상세내용 조회
async function getProjectDetail({ projectId }) {
  const [rows, fields] = await connection.query(
    `SELECT * FROM project_detail WHERE id = ${projectId}`
  );
  return rows;
}

//프로젝트 찜 여부 조회
async function getUserJjim({ projectId, userId }) {
  const [rows, fields] = await connection.query(
    `SELECT *,jjim.id as jjim_id from jjim INNER JOIN project ON project.id=jjim.project_id WHERE jjim.user_id=${userId} and project.id=${projectId}`
  );
  return rows;
}
//프로젝트 추가
async function addProject({
  title,
  company,
  goalMoney,
  startDate,
  endDate,
  categoryId,
  image,
}) {
  const query = mysql.format("INSERT INTO project SET ?", {
    title: title,
    company: company,
    goal_money: goalMoney,
    start_date: startDate,
    end_date: endDate,
    category_id: categoryId,
    image: image,
  });
  const [rows, fields] = await connection.query(query);
  return rows;
}

module.exports = {
  getScheduleProject,
  getSoonSuccessProject,
  getPopularProject,
  getCategoryProject,
  getProjectDetail,
  getUserJjim,
  addProject,
};
