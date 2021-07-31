/** @format */
const Joi = require("joi");

const IssueModel = require("./models/issue");

const {
  LOCATIONS,
  GRIEVANCE_CATEGORIES,
  GRIEVANCE_STATUS,
  SORT_BY,
} = require("../../utils/constants");

const getUserIssues = async (req, res) => {
  // create schema object
  const paramSchema = Joi.object({
    userId: Joi.string().required(),
  });

  const querySchema = Joi.object({
    sortBy: Joi.string().valid(...Object.values(SORT_BY)),
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
    var { userId } = await paramSchema.validateAsync(req.params, options);
    var { sortBy, location, category, status } =
      await querySchema.validateAsync(req.query, options);
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  let filterQuery = { userId };
  let sort = { createdAt: -1 };
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
    const query = IssueModel.find(filterQuery);

    if (sortBy === SORT_BY.createdAt) {
      sort = { ...sort, createdAt: -1 };
    }
    if (sortBy === SORT_BY.createdAtDesc) {
      sort = { ...sort, createdAt: 1 };
    }
    if (sortBy === SORT_BY.updatedAt) {
      sort = { ...sort, updatedAt: -1 };
    }
    if (sortBy === SORT_BY.updatedAtDesc) {
      sort = { ...sort, updatedAt: 1 };
    }

    query.sort(sort);

    // NOTE: var is used intentionally here.
    var issues = await query.lean();
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
