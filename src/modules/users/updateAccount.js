/** @format */
const Joi = require("joi");

const UserModel = require("./models/model");

const updateAccount = async (req, res) => {
  const paramsSchema = Joi.object({
    userId: Joi.string().required(),
  });

  const bodySchema = Joi.object({
    name: Joi.string().min(4).max(15),
    email: Joi.string().email(),
    avatar: Joi.string().uri(),
    aadhar: Joi.string().length(16),
  })
    .min(1)
    .max(4);

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { userId } = await paramsSchema.validateAsync(req.params, options);
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
    var user = await UserModel.findByIdAndUpdate(userId, data);
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
      user,
    },
  });
};

module.exports = updateAccount;
