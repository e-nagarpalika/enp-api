/** @format */
const Joi = require("joi");

const IssueModel = require("./models/issue");

const getAdminIssue = async (req, res) => {
  const paramsSchema = Joi.object({
    issueId: Joi.string().required(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { issueId } = await paramsSchema.validateAsync(req.params, options);
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    var issue = await IssueModel.find({ issueId });
  } catch (dbError) {
    // console.log(dbError);

    return res.json({
      status: "Error",
      message: "Something went wrong, please try after sometime.",
    });
  }

  if (!issue) {
    return res.json({
      status: "Error",
      message: "Issue Not Found",
    });
  }

  return res.json({
    status: "Success",
    data: {
      issue,
    },
  });
};

module.exports = getAdminIssue;
