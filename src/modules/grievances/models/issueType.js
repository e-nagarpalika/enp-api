/** @format */

const { mongoose } = require("../../../database/mongoDB");

const issueTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      lowercase: false,
      trim: false,
    },
    city: {
      type: String,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
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
