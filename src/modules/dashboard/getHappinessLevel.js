/** @format */
const Joi = require("joi");

const IssueModel = require("../grievances/models/issue");
const { LOCATIONS, GRIEVANCE_STATUS } = require("../../utils/constants");

const getHappinessLevel = async (req, res) => {
  // create schema object
  const paramSchema = Joi.object({
    location: Joi.string().valid(...Object.values(LOCATIONS)),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { location } = await paramSchema.validateAsync(req.params, options);
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    var [total, resolved] = await Promise.all([
      IssueModel.countDocuments({ location }),
      IssueModel.countDocuments({
        location,
        status: GRIEVANCE_STATUS.resolved,
      }),
    ]);
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
      total,
      resolved,
    },
  });
};

module.exports = getHappinessLevel;
