/** @format */
const Joi = require("joi");

const IssueModel = require("./models/issue");
const {
  GRIEVANCE_STATUS,
  GRIEVANCE_CATEGORIES,
  LOCATIONS,
} = require("../../utils/constants");

const getIssueCount = async (req, res) => {
  const querySchema = Joi.object({
    userId: Joi.string().alphanum().length(24),
    location: Joi.string().valid(...Object.values(LOCATIONS)),
    category: Joi.string().valid(...Object.values(GRIEVANCE_CATEGORIES)),
    status: Joi.string().valid(...Object.values(GRIEVANCE_STATUS)),
  })
    .min(0)
    .max(4);

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { userId, location, category, status } =
      await querySchema.validateAsync(req.query, options);
  } catch (validateError) {
    console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  let filterQuery = {};

  if (typeof userId !== "undefined") {
    filterQuery = {
      ...filterQuery,
      userId,
    };
  }

  if (
    typeof location !== "undefined" &&
    Object.values(LOCATIONS).findIndex((l) => l === location) > -1
  ) {
    filterQuery = {
      ...filterQuery,
      location,
    };
  }

  if (
    typeof category !== "undefined" &&
    Object.values(GRIEVANCE_CATEGORIES).findIndex((l) => l === category) > -1
  ) {
    filterQuery = {
      ...filterQuery,
      category,
    };
  }

  if (
    typeof status !== "undefined" &&
    Object.values(GRIEVANCE_STATUS).findIndex((l) => l === status) > -1
  ) {
    filterQuery = {
      ...filterQuery,
      status,
    };
  }

  try {
    const query = IssueModel.countDocuments(filterQuery);

    // NOTE: var is used intentionally here.
    var count = await query.lean();
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

module.exports = getIssueCount;
