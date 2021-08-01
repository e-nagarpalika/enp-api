/** @format */
const Joi = require("joi");

const IssueModel = require("./models/notification");

const getNotifications = async (req, res) => {
  // create schema object
  const paramSchema = Joi.object({
    userId: Joi.string().length(24).required(),
  });

  const querySchema = Joi.object({
    limit: Joi.number(),
    skip: Joi.number(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  try {
    // NOTE: var is used intentionally here.
    var [{ userId }, { limit = 25, page = 0 }] = await Promise.all([
      paramSchema.validateAsync(req.params, options),
      querySchema.validateAsync(req.query, options),
    ]);
  } catch (validateError) {
    // console.log(validateError);

    return res.json({
      status: "Error",
      message: "Input Type Error",
    });
  }

  try {
    const query = IssueModel.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .skip(limit * page)
      .limit(limit);

    // NOTE: var is used intentionally here.
    var notifications = await query.lean();
    // console.log(notifications);
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
      notifications: notifications.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id,
      })),
    },
  });
};

module.exports = getNotifications;
