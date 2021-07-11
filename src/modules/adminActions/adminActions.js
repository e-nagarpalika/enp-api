/** @format */

const express = require("express");

const middleware = require("../middlewares/index");
const issueType = require("../../models/issueType");
const userData = require("../../models/users");

const adminActionRouter = express.Router();

// eslint-disable-next-line consistent-return
adminActionRouter.patch(
  "/create-admin",
  middleware.authenticateJWT,
  async (req, res) => {
    const { role } = req.user;
    // eslint-disable-next-line no-console
    // console.log(role);
    if (role !== 2) {
      return res.status(403).send("Forbidden Action");
    }

    const { phoneNumber, accountType, city } = req.body;

    const user = await userData.findOne({ phoneNumber });

    if (accountType === 2) {
      user.accountType = accountType;
    }

    if (accountType === 1 && city) {
      user.accountType = accountType;
      user.city = city;
    }

    if (accountType === 1 && !city) {
      return res.status(409).json({
        status: false,
        message: "Incomplete Request",
      });
    }

    await user.save();
    return res.status(200).json({
      status: true,
      message: "Upgraded to Admin",
    });
  },
);

// eslint-disable-next-line consistent-return
adminActionRouter.post(
  "/create-issue-type",
  middleware.authenticateJWT,
  async (req, res) => {
    const { role } = req.user;
    if (role !== 2) {
      return res.status(403).send("Forbidden Action");
    }
    // eslint-disable-next-line new-cap
    const user = new issueType(req.body);
    // eslint-disable-next-line consistent-return
    return user.save((err) => {
      if (err && err.code !== 11000) {
        if (err.message.search(" validation failed:")) {
          return res
            .status(500)
            .json({ status: false, message: err.message.split("failed:")[1] });
        }
        return res.status(500).send("Unexpected error showed up");
      }
      // duplicate key
      if (err) {
        if (err.code === 11000 || err.code === 11001) {
          const text = err.message.slice(err.message.search("{") + 1, -1);
          // eslint-disable-next-line consistent-return
          return res
            .status(409)
            .json({ status: false, message: `${text}  already exists` });
        }
      }

      res.status(201).json({
        status: true,
        message: "Issue Type Created",
      });
    });
  },
);

module.exports = adminActionRouter;
