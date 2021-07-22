/** @format */
const Joi = require("joi");

const IssueModel = require("./models/issue");

const getUserIssues = async (req, res) => {
  // create schema object
  const schema = Joi.object({
    userId: Joi.string().required(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { userId } = await schema.validateAsync(req.params, options);
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    var issues = await IssueModel.find({ userId }).lean();
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
      issues: issues.map(({ _id, ...rest }) => ({ ...rest, id: _id })),
    },
  });
};

module.exports = getUserIssues;
