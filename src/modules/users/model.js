/** @format */

const { mongoose } = require("../../database/mongoDB");

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
      enum: ["USER", "MANAGER", "ADMIN"],
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
    profession: {
      type: String,
    },
    city: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      index: true,
    },
    aadharNumber: {
      type: Number,
      unique: true,
      index: true,
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
