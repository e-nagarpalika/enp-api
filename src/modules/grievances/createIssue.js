/** @format */
const Joi = require("joi");

const IssueModel = require("./models/issue");
const { LOCATIONS } = require("../../utils/constants");

const createIssue = async (req, res) => {
  const { id: userId } = req.auth;

  const bodySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().valid(...Object.values(LOCATIONS)),
    category: Joi.string().required(),
    images: Joi.array().items(Joi.string().uri()).required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { title, description, images, location, category, coordinates } =
      await bodySchema.validateAsync(req.body, options);
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
      location,
      category,
      geoLocation: {
        type: "Point",
        coordinates,
      },
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
      issue: {
        ...issue.toJSON(),
        id: issue._id,
      },
    },
  });
};

module.exports = createIssue;
