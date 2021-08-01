/** @format */
const Joi = require("joi");

const IssueModel = require("./models/notification");

const getNotificationCount = async (req, res) => {
  // create schema object
  const paramSchema = Joi.object({
    userId: Joi.string().length(24).required(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { userId } = await paramSchema.validateAsync(req.params, options);
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    var count = await IssueModel.countDocuments({
      userId,
    });
    // console.log(count);
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
      count,
    },
  });
};

module.exports = getNotificationCount;
