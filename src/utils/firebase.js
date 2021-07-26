/** @format */

const admin = require("firebase-admin");

const { NODE_ENV } = process.env;

const options = {};

if (NODE_ENV === "development") {
  options.credential = admin.credential.cert(
    require("../../data/serviceAccount.json"),
  );
}

admin.initializeApp(options);

module.exports = admin;
