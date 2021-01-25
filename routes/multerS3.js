const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const s3connect = require("./s3config");
const s3 = new aws.S3(s3connect);

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "fuding-bucket",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        Math.floor(Math.random() * 1000).toString() +
          Date.now() +
          "." +
          file.originalname.split(".").pop()
      );
    },
  }),
  limits: {
    fileSize: 1000 * 1000 * 10,
  },
});

module.exports = { upload };
