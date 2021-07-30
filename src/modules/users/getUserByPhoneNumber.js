/** @format */
const Joi = require("joi");

const userModel = require("./models/model");

// Flow of Controller
// 1. Validate the input
// 2. search in DB
// 3. reply success if value exists, otherwise send Not Found error.
const getUserByPhoneNumber = async (req, res) => {
  // create schema object
  const schema = Joi.object({
    phoneNumber: Joi.string().length(10).required(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { phoneNumber } = await schema.validateAsync(req.body, options);
  } catch (validateError) {
    // console.log("validateError");
    // console.log(validateError);

    return res.status(200).json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    var user = await userModel.findOne({ phoneNumber });
  } catch (dbError) {
    // console.log(dbError);

    return res.status(200).json({
      status: "Error",
      message: "Something went wrong, please try after sometime.",
    });
  }

  if (!user) {
    return res.json({
      status: "Error",
      message: "User Not Found",
    });
  }

  return res.json({
    status: "Success",
    data: {
      user,
    },
  });
};

module.exports = getUserByPhoneNumber;
