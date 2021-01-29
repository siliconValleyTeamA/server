const connection = require("./connection");
const mysql = require("mysql2");

//포인트 조회
async function getPoint(req) {
  let [rows, fields] = await connection.query(
    `SELECT point FROM user WHERE id=${req.user.id}`
  );
  return rows;
}

//포인트 충전
async function chargePoint(req) {
  const query = mysql.format(
    `UPDATE user SET point=${req.body.point} WHERE id = ${req.user.id}`
  );
  let [rows, fields] = await connection.query(query);
  return rows;
}

//펀딩 내역 조회
async function getInvestment(req) {
  let [rows, fields] = await connection.query(
    `SELECT * FROM project_detail INNER JOIN investment ON project_detail.id=investment.project_id WHERE user_id=${req.user.id} ORDER BY investment_date`
  );
  return rows;
}

//펀딩 내역 추가
async function addInvestment({ investment_date, money, projectId, userId }) {
  const query = mysql.format("INSERT INTO investment SET ?", {
    investment_date,
    money: money,
    project_id: projectId,
    user_id: userId,
  });
  let [rows, fields] = await connection.query(query);
  return rows;
}

//카트 조회
async function getCart(req) {
  let [rows, fields] = await connection.query(
    `SELECT *,cart.id as cart_id FROM project_detail INNER JOIN cart ON project_detail.id=cart.project_id WHERE user_id=${req.user.id}`
  );
  return rows;
}

//카트 추가
async function addCart({ cart_date, money, money_scale, projectId, userId }) {
  const query = mysql.format("INSERT INTO cart SET ?", {
    cart_date,
    money,
    money_scale,
    project_id: projectId,
    user_id: userId,
  });
  let [rows, fields] = await connection.query(query);
  return rows;
}

//카트 수정
async function editCart({ money, cartId }) {
  const query = mysql.format(
    `UPDATE cart SET money=${money} WHERE id = ${cartId}`
  );
  let [rows, fields] = await connection.query(query);
  return rows;
}

//카트 삭제
async function deleteCart(req) {
  const query = mysql.format(`DELETE FROM cart WHERE id = ${req.body.cartId}`);
  let [rows, fields] = await connection.query(query);
  return rows;
}

//찜 조회
async function getJjim(req) {
  let [rows, fields] = await connection.query(
    `SELECT *,jjim.id as jjim_id FROM project_detail INNER JOIN jjim ON project_detail.id=jjim.project_id WHERE user_id=${req.user.id}`
  );
  return rows;
}

//찜 추가
async function addJjim({ jjim_date, investment, projectId, userId }) {
  const query = mysql.format("INSERT INTO jjim SET ?", {
    jjim_date,
    investment,
    project_id: projectId,
    user_id: userId,
  });
  let [rows, fields] = await connection.query(query);
  return rows;
}

//찜 삭제
async function deleteJjim(req) {
  const jjimId = req.body.jjimId;
  const query = mysql.format(`DELETE FROM jjim WHERE id = ${jjimId}`);
  let [rows, fields] = await connection.query(query);
  return rows;
}

module.exports = {
  getPoint,
  chargePoint,
  getInvestment,
  addInvestment,
  getCart,
  addCart,
  editCart,
  deleteCart,
  getJjim,
  addJjim,
  deleteJjim,
};
