/** @format */
const Joi = require("joi");

const IssueModel = require("./models/issue");

const getIssue = async (req, res) => {
  // create schema object
  const schema = Joi.object({
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
    var { issueId } = await schema.validateAsync(req.params, options);
  } catch (validateError) {
    // console.log("validateError");
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    var issue = await IssueModel.findById(issueId);
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

module.exports = getIssue;
