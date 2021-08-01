/** @format */
const Joi = require("joi");

const IssueModel = require("./models/issue");
const {
  // eslint-disable-next-line no-unused-vars
  LOCATIONS,
  GRIEVANCE_STATUS,
  GRIEVANCE_CATEGORIES,
} = require("../../utils/constants");

const updateIssue = async (req, res) => {
  // const { id: userId } = req.auth;

  const paramSchema = Joi.object({
    issueId: Joi.string().length(24).required(),
  });

  const bodySchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    // location: Joi.string().valid(...Object.values(LOCATIONS)),
    status: Joi.string().valid(...Object.values(GRIEVANCE_STATUS)),
    category: Joi.string().valid(...Object.values(GRIEVANCE_CATEGORIES)),
    images: Joi.array().items(Joi.string().uri()),
    // coordinates: Joi.array().items(Joi.number()).length(2),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var [{ issueId }, body] = await Promise.all([
      paramSchema.validateAsync(req.param, options),
      bodySchema.validateAsync(req.body, options),
    ]);
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    var issue = await IssueModel.findByIdAndUpdate(issueId, body, {
      new: true,
    });

    // console.log(issue);
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
      issue: {
        ...issue.toJSON(),
        // eslint-disable-next-line no-underscore-dangle
        id: issue._id,
      },
    },
  });
};

module.exports = updateIssue;
