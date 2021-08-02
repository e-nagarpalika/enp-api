/** @format */
const Joi = require("joi");

const IssueCommentModel = require("./models/issueComment");

const getComments = async (req, res) => {
  const paramsSchema = Joi.object({
    issueId: Joi.string().length(24).required(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { issueId } = await paramsSchema.validateAsync(req.params, options);
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    // NOTE: var is used intentionally here.
    const query = IssueCommentModel.find({ issueId }).sort({
      createdAt: -1,
    });

    var comments = await query.lean();

    // console.log(comment);
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
      comments: comments.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id,
      })),
    },
  });
};

module.exports = getComments;
