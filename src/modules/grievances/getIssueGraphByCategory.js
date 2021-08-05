/** @format */
// const Joi = require("joi");

const IssueModel = require("./models/issue");
// const { GRIEVANCE_STATUS } = require("../../utils/constants");

// NOTE: work in progress
const getIssueGraphByCategory = async (req, res) => {
  try {
    // NOTE: var is used intentionally here.
    var result = await IssueModel.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
            year: {
              $year: "$createdAt",
            },
          },
          numberofdocuments: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          numberofdocuments: true,
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    // console.log(result);
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
      result,
    },
  });
};

module.exports = getIssueGraphByCategory;
