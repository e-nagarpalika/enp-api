/** @format */

const jwt = require("jsonwebtoken");

const firebaseAdmin = require("../../middlewares/firebase");

const UserModel = require("../users/model");

const { AUTH_SECRET } = process.env;

// 1. get firebase auth token
// 2. validate firebase auth token and get user data if success
// 3. if un-successful return with Error
// 4. if successful, check if user already exists in mongoDB or not
// 5. if user account already exists, generate a JWT token and return
// 6. if user account don't exists, create a new account in MongoDB
// and then generate JWT token and return to user.
const login = async (req, res) => {
  const { firebaseToken } = req.body;

  try {
    var { phone_number: phoneNumber, uid } = await firebaseAdmin
      .auth()
      .verifyIdToken(firebaseToken);
  } catch (error) {
    return res.json({
      status: "Error",
      message: "Invalid Firebase Auth Token",
    });
  }

  var user = await UserModel.findOne({ phoneNumber });

  console.log(user, AUTH_SECRET);

  if (!user) {
    const newUser = UserModel({
      phoneNumber,
    });

    try {
      user = await newUser.save();
    } catch (error) {
      return res.json({
        status: "Error",
        message: "Something went wrong, please try after sometime. 2",
      });
    }
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      phoneNumber: user.phoneNumber,
      role: user.accountType,
    },
    AUTH_SECRET,
  );

  res.cookie("token", accessToken, { httpOnly: true });

  return res.json({
    status: "Success",
    message: "LoggedIn",
  });
};

module.exports = login;
