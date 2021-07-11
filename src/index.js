/** @format */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const accountRouter = require("./modules/account/account");
const authRouter = require("./modules/auth/auth");
const dashboardRouter = require("./modules/dashboard/dashboard");
const grievancesRouter = require("./modules/grievances/grievances");
const usersRouter = require("./modules/users/users");
const adminActionRouter = require("./modules/adminActions/adminActions");

const app = express();

app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT || 8080;
app.use(express.json());
// app.use(middleware.decodeToken);

app.use("/api/account", accountRouter);
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/grievances", grievancesRouter);
app.use("/api/users", usersRouter);
app.use("/api/admin/action", adminActionRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${PORT}`);
});
