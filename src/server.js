/** @format */

// This file is required to assert all the ENV variables
// required to run this application.
require("./env");

const { PORT } = process.env;

const app = require("./app");
const { connect: connectMongo } = require("./database/mongoDB");

async function init() {
  await connectMongo();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

init();
