/** @format */

const express = require("express");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

const middleware = require("../middlewares/index");
const userData = require("../../models/users");

// eslint-disable-next-line consistent-return
authRouter.post("/login", middleware.decodeToken, async (req, res) => {
  const { phone_number: phoneNumber } = req.currentUser;

  if (phoneNumber) {
    userData
      .findOne({ phoneNumber })
      .then((user) => {
        const accessToken = jwt.sign(
          { username: user.name, role: user.user_type },
          process.env.ACCESS_TOKEN_SECRET,
        );
        res.cookie("token", accessToken, { httpOnly: true });
        return res.status(200).json({ status: true, message: "LoggedIn" });
      })
      .catch((e) =>
        res
          .status(404)
          .json({ status: false, message: "User Not Found", error: e }),
      );
  }
  return res.status(403).send("Unauthorized");
});

authRouter.post("/register", middleware.decodeToken, async (req, res) => {
  const phone = req.currentUser.phone_number;
  if (phone) {
    if (phone === req.body.phone_no) {
      // eslint-disable-next-line new-cap
      const user = new userData(req.body);
      // eslint-disable-next-line consistent-return
      await user.save((err) => {
        if (err && err.code !== 11000) {
          if (err.message.search(" validation failed:")) {
            return res.status(500).json({
              status: false,
              message: err.message.split("failed:")[1],
            });
          }
          return res.status(500).send("Unexpected error showed up");
        }
        // duplicate key
        if (err) {
          if (err.code === 11000 || err.code === 11001) {
            const text = err.message.slice(err.message.search("{") + 1, -1);

            return res
              .status(409)
              .json({ status: false, message: `${text}  already exists` });
          }
        }
        const accessToken = jwt.sign(
          { username: req.name, role: 0 },
          process.env.ACCESS_TOKEN_SECRET,
        );
        return res.status(201).json({ status: true, message: accessToken });
      });
    } else {
      return res.status(422).send("Unprocessable Entity ");
    }
  }
  return res.status(422).send("Unprocessable Entity ");
});

module.exports = authRouter;
