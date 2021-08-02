/** @format */
const Joi = require("joi");

const IssueCommentModel = require("./models/issueComment");

const createComment = async (req, res) => {
  const paramsSchema = Joi.object({
    userId: Joi.string().required(),
    issueId: Joi.string().required(),
  });

  const bodySchema = Joi.object({
    title: Joi.string().min(0).max(250).required(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var [{ userId, issueId }, { title }] = await Promise.all([
      paramsSchema.validateAsync(req.params, options),
      bodySchema.validateAsync(req.body, options),
    ]);
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    var newIssueComment = IssueCommentModel({
      userId,
      issueId,
      title,
    });

    var comment = await newIssueComment.save();
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
      comment: {
        ...comment.toJSON(),
        // eslint-disable-next-line no-underscore-dangle
        id: comment._id,
      },
    },
  });
};

module.exports = createComment;
