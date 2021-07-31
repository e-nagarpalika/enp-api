/** @format */

const mongoose = require("mongoose");

const { /* NODE_ENV, */ MONGODB_URI } = process.env;

module.exports = {
  mongoose,
  connect: (uri = MONGODB_URI) =>
    // mongoose.Promise = Promise;

    // NOTE: disable autoIndex for production server so that it won't recreate
    // all the indexes again and again, as warning given in mongoose website.
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // autoIndex: false, // NODE_ENV !== "production" || NODE_ENV !== "development"
      autoIndex: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};
