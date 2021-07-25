/** @format */
const Joi = require("joi");

const { CITIES } = require("../../utils/constants");
const IssueTypeModel = require("./models/issueType");

const createIssueType = async (req, res) => {
  // create schema object
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    location: Joi.string().valid(...Object.values(CITIES)),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: false, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { title, location } = await schema.validateAsync(req.body);
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    var newIssueType = IssueTypeModel({ title, location });

    var issueType = await newIssueType.save();
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
      issueType: {
        ...issueType.toJSON(),
        id: issueType.id,
      },
    },
  });
};

module.exports = createIssueType;
