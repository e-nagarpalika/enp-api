/** @format */
// const Joi = require("joi");
const { mongoose } = require("../../database/mongoDB");

const IssueModel = require("./models/issue");
const { GRIEVANCE_STATUS, LOCATIONS } = require("../../utils/constants");

const getIssueStats = async (req, res) => {
  const { userId, location } = req.query;

  let query = {};

  if (typeof userId !== "undefined") {
    query = {
      ...query,
      userId: mongoose.Types.ObjectId(userId),
    };
  }

  if (
    typeof location !== "undefined" &&
    Object.values(LOCATIONS).findIndex(
      (l) => l.toLowerCase() === location.toLowerCase(),
    ) >= 0
  ) {
    query = {
      ...query,
      location,
    };
  }

  try {
    // NOTE: var is used intentionally here.
    var [total, progress, resolved] = await Promise.all([
      // total issues
      IssueModel.countDocuments({ ...query }),
      // total issues in progress
      IssueModel.countDocuments({
        ...query,
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
        ...query,
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
