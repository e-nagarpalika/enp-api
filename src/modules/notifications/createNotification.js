/** @format */

const NotificationModel = require("./models/notification");

/**
 *
 * NOTE: This is not an API but a function to call to create notification
 * @param {Object} params
 * @param {String} params.userId
 * @param {String} params.issueId
 * @param {String} params.title
 * @returns
 */
const createNotification = async ({ userId, issueId, title }) => {
  const newNotification = NotificationModel({
    userId,
    issueId,
    title,
  });

  const notification = await newNotification.save();

  return {
    ...notification.toJSON(),
    // eslint-disable-next-line no-underscore-dangle
    id: notification._id,
  };
};

module.exports = createNotification;
