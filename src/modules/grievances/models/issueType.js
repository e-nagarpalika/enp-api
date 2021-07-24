/** @format */

const { mongoose } = require("../../../database/mongoDB");

const issueTypeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    location: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
    },
  },
  {
    collection: "issueTypes",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
);

module.exports = mongoose.model("issueType", issueTypeSchema);
