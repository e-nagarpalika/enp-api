/** @format */
// const Joi = require("joi");

const { mongoose } = require("../../database/mongoDB");
const IssueModel = require("./models/issue");
const { GRIEVANCE_STATUS, LOCATIONS } = require("../../utils/constants");

// TODO: optimise reponse later
const getIssueGraphByDate = async (req, res) => {
  const { userId, location } = req.query;

  let match = {};

  if (typeof userId !== "undefined") {
    match = {
      ...match,
      userId: mongoose.Types.ObjectId(userId),
    };
  }
  if (
    typeof location !== "undefined" &&
    Object.values(LOCATIONS).findIndex(
      (l) => l.toLowerCase() === location.toLowerCase(),
    ) >= 0
  ) {
    match = {
      ...match,
      location,
    };
  }

  const group = {
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
  };
  const project = {
    numberofdocuments: true,
  };
  const sort = {
    "_id.year": 1,
    "_id.month": 1,
  };

  try {
    // NOTE: var is used intentionally here.
    var [totalResponse, resolvedResponse] = await Promise.all([
      // Total Issues
      IssueModel.aggregate([
        { $match: match },
        { $group: group },
        { $project: project },
        { $sort: sort },
      ]),
      IssueModel.aggregate([
        {
          // NOTE: update filter here
          $match: {
            ...match,
            status: GRIEVANCE_STATUS.resolved,
          },
        },
        { $group: group },
        { $project: project },
        { $sort: sort },
      ]),
    ]);
  } catch (dbError) {
    // console.log(dbError);

    return res.json({
      status: "Error",
      message: "Something went wrong, please try after sometime.",
    });
  }

  const list = [
    ...totalResponse.map(({ _id, numberofdocuments }) => ({
      year: _id.year,
      month: _id.month,
      total: numberofdocuments,
    })),
    ...resolvedResponse.map(({ _id, numberofdocuments }) => ({
      year: _id.year,
      month: _id.month,
      resolved: numberofdocuments,
    })),
  ];

  const finalList = {};

  for (let i = 0; i < list.length; i += 1) {
    // eslint-disable-next-line no-shadow
    const { year, month, total, resolved } = list[i];

    if (!finalList[year]) {
      finalList[year] = {};
    }
    if (!finalList[year][month]) {
      finalList[year][month] = { year, month };
    }

    if (typeof total !== "undefined") {
      finalList[year][month] = {
        ...finalList[year][month],
        total,
      };
    }

    if (typeof resolved !== "undefined") {
      finalList[year][month] = {
        ...finalList[year][month],
        resolved,
      };
    }
  }

  const [value1 = [], value2 = []] = Object.values(finalList).map((value) =>
    Object.values(value),
  );

  const data = [...value1, ...value2];
  return res.json({
    status: "Success",
    data,
  });
};

module.exports = getIssueGraphByDate;
