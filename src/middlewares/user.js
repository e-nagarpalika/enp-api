/** @format */
const util = require("util");
const jwt = require("jsonwebtoken");

const { ACCOUNT_TYPE } = require("../utils/constants");

const jwtVerify = util.promisify(jwt.verify);

// This middleware will allow all the users with type "USER", "MANAGER", "ADMIN"
async function userAuthMiddleware(req, res, next) {
  const { authorization = "Bearer" } = req.headers;

  // eslint-disable-next-line no-unused-vars
  const [Bearer, token] = authorization.split(" ");

  if (token) {
    try {
      var auth = await jwtVerify(token, process.env.AUTH_SECRET);
    } catch (error) {
      return res.status(401).send("Unauthorized");
    }

    const isTypePresent =
      Object.keys(ACCOUNT_TYPE).findIndex(
        (type) => auth.accountType === type,
      ) >= 0;

    if (isTypePresent) {
      return res.status(401).send("Unauthorized");
    }

    req.auth = auth;

    return next();
  }

  return res.status(401).send("Unauthorized");
}

module.exports = userAuthMiddleware;
