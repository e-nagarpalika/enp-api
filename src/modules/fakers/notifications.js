/** @format */
// NOTE: Run this code in development environment only
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// eslint-disable-next-line import/no-extraneous-dependencies
const Faker = require("faker");
const { mongoose } = require("../../database/mongoDB");

const NotificationModel = require("../notifications/models/notification");

async function createNotifications({ count = 100 } = {}) {
  for (let i = 0; i < count; i += 1) {
    const newNoti = NotificationModel({
      userId: mongoose.Types.ObjectId(),
      issueId: mongoose.Types.ObjectId(),
      title: Faker.lorem.sentences(),
    });

    // eslint-disable-next-line no-await-in-loop
    const res = await newNoti.save();
    console.log(res);
  }
}

// createNotifications({});
