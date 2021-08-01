/** @format */
const Joi = require("joi");

const IssueModel = require("./models/notification");

const getUserIssues = async (req, res) => {
  // create schema object
  const paramSchema = Joi.object({
    notificationId: Joi.string().length(24).required(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var { notificationId } = await paramSchema.validateAsync(
      req.params,
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
    var notification = await IssueModel.findByIdAndUpdate(
      notificationId,
      {
        isViewed: true,
      },
      { new: true },
    );
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
      notification: {
        ...notification.toJSON(),
        // eslint-disable-next-line no-underscore-dangle
        id: notification._id,
      },
    },
  });
};

module.exports = getUserIssues;
