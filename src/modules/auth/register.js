/** @format */

const jwt = require("jsonwebtoken");

const userModel = require("../users/model");

const { ACCESS_TOKEN_SECRET } = process.env;

const register = async (req, res) => {
  const { phoneNumber } = req.currentUser;

  if (phoneNumber) {
    return res.status(422).send("Unprocessable Entity ");
  }

  if (phoneNumber !== req.body.phone_no) {
    return res.status(422).send("Unprocessable Entity ");
  }

  // eslint-disable-next-line new-cap
  const user = new userModel(req.body);
  // eslint-disable-next-line consistent-return
  return user.save((err) => {
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
      {
        username: req.name,
        role: 0,
      },
      ACCESS_TOKEN_SECRET,
    );

    return res.status(201).json({ status: true, message: accessToken });
  });
};

module.exports = register;
