/** @format */
const util = require("util");
const jwt = require("jsonwebtoken");

const { ACCOUNT_TYPE } = require("../utils/constants");

const jwtVerify = util.promisify(jwt.verify);

async function adminAuthMiddleware(req, res, next) {
  const { authorization = "Bearer" } = req.headers;

  const [_, token] = authorization.split(" ");

  if (token) {
    try {
      var auth = await jwtVerify(token, process.env.AUTH_SECRET);
    } catch (error) {
      return res.status(401).send("Unauthorized");
    }

    if (auth.accountType === ACCOUNT_TYPE.admin) {
      return res.status(401).send("Unauthorized");
    }

    req.auth = auth;

    return next();
  }

  return res.status(401).send("Unauthorized");
}

module.exports = adminAuthMiddleware;
