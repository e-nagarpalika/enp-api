/** @format */
const Joi = require("joi");

const userModel = require("./models/model");
const { ACCOUNT_TYPE, LOCATION } = require("../../utils/constants");

const updateUserType = async (req, res) => {
  const schema = Joi.object({
    phoneNumber: Joi.string().length(10).required(),
    accountType: Joi.string()
      .valid(...Object.values(ACCOUNT_TYPE))
      .required(),
    location: Joi.string()
      .valid(...Object.values(LOCATION))
      .when("accountType", {
        is: ACCOUNT_TYPE.manager,
        then: Joi.required(),
      }),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { phoneNumber, accountType, location } = await schema.validateAsync(
      req.body,
      options,
    );
  } catch (validateError) {
    console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  const user = await userModel.findOne({ phoneNumber: `+91${phoneNumber}` });

  if (!user) {
    return res.json({
      status: "Error",
      message: "Not Found",
    });
  }

  user.accountType = accountType;

  if (accountType === ACCOUNT_TYPE.manager) {
    user.location = location;
  }

  await user.save();

  return res.json({
    status: "Success",
    message: `Account is updated to ${accountType}`,
  });
};

module.exports = updateUserType;
