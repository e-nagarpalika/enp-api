/** @format */
const Joi = require("joi");

const IssueModel = require("./models/issue");

// TODO: Auth is pending
const getAdminIssues = async (req, res) => {
  // // create schema object
  // const schema = Joi.object({
  //   userId: Joi.string().required(),
  // });

  // // schema options
  // const options = {
  //   abortEarly: false, // include all errors
  //   allowUnknown: false, // ignore unknown props
  //   stripUnknown: true, // remove unknown props
  // };

  // try {
  //   // NOTE: var is used intentionally here.
  //   var { userId } = await schema.validateAsync(req.params, options);
  // } catch (validateError) {
  //   // console.log(validateError);

  //   return res.json({
  //     status: "Error",
  //     message: "Input Type Error",
  //   });
  // }

  try {
    // NOTE: var is used intentionally here.
    var issues = await IssueModel.find({});
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
      issues,
    },
  });
};

module.exports = getAdminIssues;
