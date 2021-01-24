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
} = require("../db/project");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/uploadimage", async function (req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});
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

//프로젝트 찜 여부 조회
router.get("/:projectId/jjim", async function (req, res, next) {
  const projectId = req.params.projectId;
  const userId = req.user.id;
  const rows = await getUserJjim({ projectId, userId });
  if (rows.length != 0) res.json(rows[0]);
  else res.json({ success: false });
});

router.post("/projectinfo", async function (req, res, next) {
  const goalMoney = parseInt(req.body.goalMoney);
  await addProject({
    title: req.body.title,
    company: req.body.company,
    goalMoney: goalMoney,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    categoryId: req.body.categoryId,
    image: "",
  });
  res.json({ success: true });
});

module.exports = router;
