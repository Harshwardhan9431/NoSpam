const express = require("express");
const AppError = require("./utils/appError");
const GlobalAppError = require("./utils/errorController.js");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const spamRouter = require('./routes/spamRoutes');

const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use('/api/v1/spam', spamRouter);

app.all("*", (_req, res, next) => {
  next(
    new AppError(
      `This ${req.originalUrl} url is currently not defined on this server`,
      404
    )
  );
});
app.use(GlobalAppError);

module.exports = app;
