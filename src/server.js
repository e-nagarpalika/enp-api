/** @format */

// This file is required to assert all the ENV variables
// required to run this application.
require("./env");

const { PORT, NODE_ENV } = process.env;

const app = require("./app");
const { connect: connectMongo } = require("./database/mongoDB");

async function init() {
  await connectMongo();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening at http://localhost:${PORT}`);
  });

  // NOTE: this is for only generating fake data in local env only
  // eslint-disable-next-line global-require
  if (NODE_ENV === "local") require("./modules/fakers/index");
}

init();
