/** @format */
const Joi = require("joi");

const IssueModel = require("./models/issue");
const { GRIEVANCE_STATUS } = require("../../utils/constants");

const getIssueStats = async (req, res) => {
  try {
    // NOTE: var is used intentionally here.
    var [total, progress, resolved] = await Promise.all([
      // total issues
      IssueModel.countDocuments({}),
      // total issues in progress
      IssueModel.countDocuments({
        status: {
          $in: [
            GRIEVANCE_STATUS.none,
            GRIEVANCE_STATUS.review,
            GRIEVANCE_STATUS.action,
          ],
        },
      }),
      // total issues resolved
      IssueModel.countDocuments({
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
      progress,
      resolved,
    },
  });
};

module.exports = getIssueStats;
