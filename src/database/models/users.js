/** @format */

const mongoose = require("../init");

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
    },
    accountType: {
      type: Number,
      required: true,
      default: 0,
      enum: [0, 1, 2],
    },
    gender: {
      type: String,
      required: false,
      enum: ["male", "female", "other"],
    },
    profession: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    aadharNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
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
