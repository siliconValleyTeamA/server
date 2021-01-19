var express = require("express");
var router = express.Router();
var passport = require("passport");
const { github } = require("./authGithub");
const { findUser } = require("../db/auth");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  findUser({
    name: user.name,
    github_id: user.github_id,
  }).then((result) => {
    done(null, result[0]);
  });
});

passport.use("github", github);

router.get(
  "/github",
  passport.authenticate("github", { authType: "reauthenticate" })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/mypage",
    successRedirect: "http://localhost:3000/mypage",
  })
);

router.get("/logout", function (req, res) {
  req.logout();
  res.json({ success: true });
});

module.exports = router;
