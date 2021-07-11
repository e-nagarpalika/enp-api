/** @format */

const mongoose = require("mongoose");

const { /* NODE_ENV, */ MONGODB_URI } = process.env;

// NOTE: disable autoIndex for production server so that it won't recreate
// all the indexes again and again, as warning given in mongoose website.
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false, // NODE_ENV !== "production" || NODE_ENV !== "development"
    // autoIndex: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Database connection successful");
  })
  // eslint-disable-next-line no-unused-vars
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Database connection error");
  });

module.exports = mongoose;
