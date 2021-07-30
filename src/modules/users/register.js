/** @format */

const Joi = require("joi");

const { LOCATION, GENDER, PROFESSIONS } = require("../../utils/constants");
const UserModel = require("./models/model");

const register = async (req, res) => {
  const { id: userId } = req.auth;

  const bodySchema = Joi.object({
    name: Joi.string().min(4).max(15).required(),
    email: Joi.string().email().required(),
    // avatar: Joi.string().uri().required(),
    aadharNumber: Joi.string().length(16).required(),
    location: Joi.string()
      .valid(...Object.values(LOCATION))
      .required(),
    gender: Joi.string()
      .valid(...Object.values(GENDER))
      .required(),
    profession: Joi.string()
      .valid(...Object.values(PROFESSIONS))
      .required(),
    phoneNumber: Joi.string().length(10).required(),
  });

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var data = await bodySchema.validateAsync(req.body, options);
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    var user = await UserModel.findByIdAndUpdate(
      userId,
      {
        ...data,
        isFirstTime: false,
      },
      { new: true },
    );
  } catch (dbError) {
    // console.log(dbError);

    return res.json({
      status: "Error",
      message: "Something went wrong, please try after sometime.",
    });
  }

  return res.json({
    status: "Success",
    data: {
      user: {
        ...user.toJSON(),
        id: user.id,
      },
    },
  });
};

module.exports = register;
