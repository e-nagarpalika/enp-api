/** @format */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// eslint-disable-next-line import/no-extraneous-dependencies
const Faker = require("faker");

const { mongoose } = require("../../database/mongoDB");
const {
  ACCOUNT_TYPE,
  GRIEVANCE_CATEGORIES,
  GRIEVANCE_STATUS,
  LOCATIONS,
} = require("../../utils/constants");
const getRandomValueFromArray = require("../../utils/getRandomValueFromArray");

const UserModel = require("../users/models/model");
const IssueModel = require("../grievances/models/issue");

async function createIssue({
  createdAt = new Date().toISOString(),
  count = 50,
} = {}) {
  const usersRes = await UserModel.find(
    {
      accountType: ACCOUNT_TYPE.user,
    },
    "_id",
  );

  const userList = usersRes.map(({ _id }) => _id);

  // console.log(userList);

  for (let i = 0; i < count; i += 1) {
    const newIssue = IssueModel({
      userId: getRandomValueFromArray(userList),
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
