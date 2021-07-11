/** @format */

const mongoose = require("../database/init");

const issueTypeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: false,
    },
    name: {
      type: String,
      unique: true,
      required: true,
      lowercase: false,
      trim: false,
    },
    city: { type: String, unique: false, required: false, default: null },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { collection: "issue_types" },
);
issueTypeSchema.set("toJSON", {
  // eslint-disable-next-line
  transform: (doc, returnedObject) => {
    // eslint-disable-next-line no-param-reassign,no-underscore-dangle
    returnedObject.id = returnedObject._id.toString();
    // eslint-disable-next-line no-param-reassign,no-underscore-dangle
    delete returnedObject._id;
    // eslint-disable-next-line no-param-reassign,no-underscore-dangle
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("issueType", issueTypeSchema);
