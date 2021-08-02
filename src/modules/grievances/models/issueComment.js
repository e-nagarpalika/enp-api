/** @format */

const { mongoose } = require("../../../database/mongoDB");

const issueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    issueId: {
      type: mongoose.Types.ObjectId,
      ref: "issues",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    collection: "issueComments",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
);

module.exports = mongoose.model("issueComment", issueSchema);
