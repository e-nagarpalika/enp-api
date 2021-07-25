/** @format */

const Joi = require("joi");

const UserModel = require("./model");

const register = async (req, res) => {
  const { id: userId } = req.auth;

  const bodySchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    // avatar: Joi.string().uri(),
    aadhar: Joi.string(),
    location: Joi.string(),
    gender: Joi.string(),
    profession: Joi.string(),
    phoneNumber: Joi.string(),
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
