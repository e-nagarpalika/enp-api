/** @format */

const IssueCommentModel = require("./models/issueComment");

const deleteAdminComment = async (req, res) => {
  const paramsSchema = Joi.object({
    // userId: Joi.string().required(),
    issueId: Joi.string().required(),
  });

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
    await IssueCommentModel.findOneAndRemove(issueId);
  } catch (dbError) {
    // console.log(dbError);

    return res.json({
      status: "Error",
      message: "Something went wrong, please try after sometime.",
    });
  }

  return res.json({
    status: "Success",
  });
};

module.exports = deleteAdminComment;
