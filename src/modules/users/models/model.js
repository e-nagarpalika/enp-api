/** @format */

const { mongoose } = require("../../database/mongoDB");
const { ACCOUNT_TYPE, GENDER } = require("../../utils/constants");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: false,
      trim: false,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    accountType: {
      type: String,
      required: true,
      default: "USER",
      enum: Object.values(ACCOUNT_TYPE),
    },
    gender: {
      type: String,
      enum: Object.values(GENDER),
    },
    profession: {
      type: String,
    },
    location: {
      type: String,
    },
    email: {
      type: String,
    },
    aadharNumber: {
      type: Number,
    },
    avatar: {
      type: String,
    },
    isFirstTime: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "users",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
);

module.exports = mongoose.model("user", userSchema);
