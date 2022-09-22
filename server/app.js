const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoute");
const globalErrorHandler = require("./controllers/globalErrorHandler");
const AppError = require("./utils/AppError");

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRouter);

app.all("*", (req, res, next) => {
  next(new AppError("Page not found", 404));
});

app.use(globalErrorHandler);

module.exports = app;
