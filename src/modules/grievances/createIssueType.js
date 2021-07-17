/** @format */
const Joi = require("joi");

const IssueTypeModel = require("./models/issueType");

const createIssueType = async (req, res) => {
  // create schema object
  const schema = Joi.object({
    name: Joi.string().required(),
    city: Joi.string().valid("bangaluru", "delhi", "mumbai").required(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var value = await schema.validateAsync(req.body, options);
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    var newIssueType = IssueTypeModel(value);

    var issueType = await newIssueType.save();
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
      issueType,
    },
  });
};

module.exports = createIssueType;
