/** @format */

const { mongoose } = require("../../../database/mongoDB");
const { GRIEVANCE_STATUS, LOCATIONS } = require("../../../utils/constants");

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
      enum: [...Object.values(LOCATIONS)],
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
    geoLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
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
