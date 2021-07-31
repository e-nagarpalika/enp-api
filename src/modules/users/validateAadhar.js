/** @format */

const Joi = require("joi");

const UserModel = require("./models/model");

const validateAadhar = async (req, res) => {
  const bodySchema = Joi.object({
    aadharNumber: Joi.string().length(16),
  });

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { aadharNumber } = await bodySchema.validateAsync(req.body, options);
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    var user = await UserModel.find({
      aadharNumber,
    });
  } catch (dbError) {
    // console.log(dbError);

    return res.json({
      status: "Error",
      message: "Something went wrong, please try after sometime.",
    });
  }

  if (!user) {
    return res.json({
      status: "Success",
      data: {
        exists: false,
      },
    });
  }

  return res.json({
    status: "Success",
    data: {
      exists: true,
    },
  });
};

module.exports = validateAadhar;
