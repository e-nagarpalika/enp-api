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
    },
    accountType: {
      type: Number,
      required: true,
      default: 0,
      // 0 = USER, 1 = MANAGER, 2 = ADMIN
      enum: [0, 1, 2],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
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
    },
    aadharNumber: {
      type: Number,
      unique: true,
    },
    avatar: {
      type: String,
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
