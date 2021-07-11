/** @format */

require("dotenv").config();

const { PORT, WEB_URI } = process.env;

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

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cors({ origin: WEB_URI }));
app.use(cookieParser());
app.use(express.json());
// app.use(middleware.decodeToken);

app.use("/api", routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${PORT}`);
});
