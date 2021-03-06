var express = require("express");
var router = express.Router();

const {
  getScheduleProject,
  getSoonSuccessProject,
  getPopularProject,
  getCategoryProject,
  getProjectDetail,
  getUserJjim,
  addProject,
  getImageDescription,
} = require("../db/project");

const { upload } = require("./multerS3");

//곧 개봉될 프로젝트 조회
router.get("/schedule", async function (req, res, next) {
  res.json(await getScheduleProject());
});

//곧 성골할 프로젝트 조회
router.get("/success", async function (req, res, next) {
  res.json(await getSoonSuccessProject());
});

//인기있는 프로젝트 조회
router.get("/popular", async function (req, res, next) {
  res.json(await getPopularProject());
});

//프로젝트를 카테고리, 필터별로 조회
router.get(
  "/category/:categoryId/:filterType",
  async function (req, res, next) {
    const filterType = req.params.filterType;
    const category = req.params.categoryId;
    const rows = await getCategoryProject({
      category: category,
      filterType: filterType,
    });
    res.json(rows);
  }
);

//프로젝트 상세내용 조회
router.get("/:projectId", async function (req, res, next) {
  const projectId = req.params.projectId;
  res.json(await getProjectDetail({ projectId }));
});

// 프로젝트 이미지&설명 조회
router.get("/:projectId/:language", async function (req, res, next) {
  const projectId = req.params.projectId;
  const language = req.params.language;
  res.json(await getImageDescription({ projectId }));
});

//프로젝트 찜 여부 조회
router.get("/:projectId/jjim", async function (req, res, next) {
  const projectId = req.params.projectId;
  const userId = req.user.id;
  const rows = await getUserJjim({ projectId, userId });
  if (rows.length != 0) res.json(rows[0]);
  else res.json({ success: false });
});

// 프로젝트 등록시 프로젝트 정보 업로드
router.post("/projectinfo", async function (req, res, next) {
  const goalMoney = parseInt(req.body.goalMoney);
  let images = "";
  const imageCollection = req.body.images.map(function (imageObj) {
    images += imageObj.filename + "&";
  });
  const language = req.body.language.split("-")[0];
  const project_id = parseInt(req.body.language.split("-")[1]);
  id = await addProject({
    title: req.body.title,
    company: req.body.company,
    goalMoney: goalMoney,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    categoryId: req.body.categoryId,
    image: images,
    description: req.body.description,
    language: language,
    projectId: project_id,
  });
  res.json({
    success: true,
    projectId: id,
  });
});

// 프로젝트 등록시 이미지 업로드
router.post(
  "/uploadimage",
  upload.single("file"),
  async function (req, res, next) {
    res.json({
      image: req.file.location,
    });
  }
);

module.exports = router;
