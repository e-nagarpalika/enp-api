/** @format */

const { mongoose } = require("../../../database/mongoDB");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    issueId: {
      type: mongoose.Types.ObjectId,
      ref: "issues",
    },
    title: {
      type: String,
      required: true,
    },
    isViewed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    collection: "notifications",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
);

module.exports = mongoose.model("notification", notificationSchema);
