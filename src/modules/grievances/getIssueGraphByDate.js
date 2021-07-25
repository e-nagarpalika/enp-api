/** @format */
const Joi = require("joi");

const IssueModel = require("./models/issue");
const { GRIEVANCE_STATUS } = require("../../utils/constants");

// NOTE: work in progress
const getIssueGraphByDate = async (req, res) => {
  try {
    // NOTE: var is used intentionally here.
    var total = await IssueModel.countDocuments({});
  } catch (dbError) {
    console.log(dbError);

    return res.json({
      status: "Error",
      message: "Something went wrong, please try after sometime.",
    });
  }

  return res.json({
    status: "Success",
    data: {
      total,
    },
  });
};

module.exports = getIssueGraphByDate;
