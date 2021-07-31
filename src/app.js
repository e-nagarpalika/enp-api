/** @format */

const { WEB_URI } = process.env;

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const routes = require("./routes");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "E-NagarPalika API",
      version: "1.0.0",
    },
  },
  apis: ["src/routes.js"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: WEB_URI,
  }),
);
app.use(cookieParser());
app.use(express.json());
// app.use(middleware.decodeToken);

app.get("/", (_req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/api", routes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;
