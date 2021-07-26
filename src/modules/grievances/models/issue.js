/** @format */

const { mongoose } = require("../../../database/mongoDB");
const { GRIEVANCE_STATUS } = require("../../../utils/constants");

const issueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [...Object.values(GRIEVANCE_STATUS)],
      default: GRIEVANCE_STATUS.none,
    },
  },
  {
    collection: "issues",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
);

module.exports = mongoose.model("issue", issueSchema);
