/** @format */
const Joi = require("joi");

const IssueModel = require("./models/issue");

const createIssue = async (req, res) => {
  const paramsSchema = Joi.object({
    userId: Joi.string().required(),
  });

  const bodySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string().uri()).required(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { userId } = await paramsSchema.validateAsync(req.params, options);
    var { title, description, images } = await bodySchema.validateAsync(
      req.body,
      options,
    );
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    var newIssue = IssueModel({
      title,
      description,
      images,
      userId,
    });

    var issue = await newIssue.save();

    // console.log(issue);
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
      issue,
    },
  });
};

module.exports = createIssue;
