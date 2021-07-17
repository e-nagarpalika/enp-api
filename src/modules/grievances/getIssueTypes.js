/** @format */

const IssueTypeModel = require("./models/issueType");

const getIssueTypes = async (req, res) => {
  try {
    // NOTE: var is used intentionally here.
    var issueTypes = await IssueTypeModel.find({});
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
      issueTypes,
    },
  });
};

module.exports = getIssueTypes;
