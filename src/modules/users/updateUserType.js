/** @format */
const Joi = require("joi");

const userModel = require("./model");

const updateUserType = async (req, res) => {
  const schema = Joi.object({
    phoneNumber: Joi.string().required(),
    accountType: Joi.string().required(),
    city: Joi.string().required(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { phoneNumber, accountType, city } = await schema.validateAsync(
      req.body,
      options,
    );
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  const user = await userModel.findOne({ phoneNumber });

  if (accountType === 2) {
    user.accountType = accountType;
  }

  if (accountType === 1 && city) {
    user.accountType = accountType;
    user.city = city;
  }

  await user.save();

  return res.json({
    status: "Success",
    message: "Upgraded to Admin",
  });
};

module.exports = updateUserType;
