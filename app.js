var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var session = require("express-session");
const secret = require("./secret.json");

var projectRouter = require("./routes/project");
var userRouter = require("./routes/user");
var categoryRouter = require("./routes/category");
var authRouter = require("./routes/auth");

let corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const cors = require("cors");
var app = express();
app.use(cors(corsOptions));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  session({
    secret: secret.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/project", projectRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
