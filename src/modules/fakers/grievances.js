/** @format */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// eslint-disable-next-line import/no-extraneous-dependencies
const Faker = require("faker");

const { mongoose } = require("../../database/mongoDB");
const {
  LOCATIONS,
  GRIEVANCE_CATEGORIES,
  GRIEVANCE_STATUS,
} = require("../../utils/constants");
const getRandomValueFromArray = require("../../utils/getRandomValueFromArray");

const IssueModel = require("../grievances/models/issue");

async function createIssue({
  userIds = [],
  createdAt = new Date().toISOString(),
  count = 10,
} = {}) {
  for (let i = 0; i < count; i += 1) {
    const newIssue = IssueModel({
      userId: getRandomValueFromArray([
        // put userId here in array.
        mongoose.Types.ObjectId("610414090340b90480b3a756"),
      ]),
      // userId: mongoose.Types.ObjectId(),
      title: Faker.lorem.sentence(),
      description: Faker.lorem.sentences(),
      images: [
        Faker.image.imageUrl(),
        Faker.image.imageUrl(),
        Faker.image.imageUrl(),
        Faker.image.imageUrl(),
        Faker.image.imageUrl(),
      ],
      location: getRandomValueFromArray(Object.values(LOCATIONS)),
      category: getRandomValueFromArray(Object.values(GRIEVANCE_CATEGORIES)),
      status: getRandomValueFromArray(Object.values(GRIEVANCE_STATUS)),
      geoLocation: {
        coordinates: [Faker.address.longitude(), Faker.address.latitude()],
      },
      createdAt,
    });

    // eslint-disable-next-line no-await-in-loop
    const res = await newIssue.save();
    console.log(res);
  }
}

// createIssue();

// console.log(Math.floor(Math.random() * 12));
function generateRandomInteger(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function getDaysArray(start, end) {
  const arr = [];

  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    arr.push(new Date(date).toISOString());
  }

  return arr;
}
// console.dir(getDaysArray(new Date(2020, 0, 2), new Date()));

async function generateDateforIssues({
  baseYear = 2020,
  baseMonth = 0,
  baseDay = 2,
}) {
  const days = getDaysArray(new Date(baseYear, baseMonth, baseDay), new Date());

  for (let i = 0; i < days.length; i += 1) {
    const issueCount = generateRandomInteger(1, 101);
    // console.log(days[i], generateRandomInteger(1, 101));
    createIssue({ count: issueCount, createdAt: days[i] });
  }
}

// generateDateforIssues({});
