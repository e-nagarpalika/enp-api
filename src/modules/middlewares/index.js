/** @format */

const jwt = require("jsonwebtoken");
const admin = require("./firebase");

class Middleware {
  // eslint-disable-next-line class-methods-use-this,consistent-return
  async decodeToken(req, res, next) {
    if (
      req.headers !== "Bearer null" &&
      req.headers?.authorization?.startsWith("Bearer ")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.currentUser = decodedToken;
        // eslint-disable-next-line no-console
        // console.log(decodedToken);
        if (decodedToken) {
          return next();
        }
        return res.status(200).send("Authorized");
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        return res.status(401).send("Unauthorized");
      }
    } else {
      return res.status(401).send("Unauthorized");
    }
  }

  // eslint-disable-next-line consistent-return,class-methods-use-this
  async authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(401).send("Unauthorized");
        }
        req.user = user;
        return next();
      });
    }
    return res.status(401).send("Unauthorized");
  }
}

module.exports = new Middleware();
