/** @format */

const jwt = require("jsonwebtoken");

const userModel = require("../users/model");

const { ACCESS_TOKEN_SECRET } = process.env;

// eslint-disable-next-line consistent-return
const login = async (req, res) => {
  const { phoneNumber } = req.currentUser;

  if (!phoneNumber) {
    return res.status(403).send("Unauthorized");
  }

  try {
    const user = await userModel.findOne({ phoneNumber });

    const accessToken = jwt.sign(
      {
        id: user.id,
        phoneNumber: user.phoneNumber,
        role: user.user_type,
      },
      ACCESS_TOKEN_SECRET,
    );

    res.cookie("token", accessToken, { httpOnly: true });

    return res.status(200).json({
      status: true,
      message: "LoggedIn",
    });
  } catch (e) {
    res.status(404).json({
      status: false,
      message: "User Not Found",
      error: e,
    });
  }
};

module.exports = login;
