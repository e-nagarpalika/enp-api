/** @format */
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongoDB = require("./database/mongoDB");
const UserModel = require("./modules/users/model");
const IssueModel = require("./modules/grievances/models/issue");
const IssueTypeModel = require("./modules/grievances/models/issueType");
const app = require("./app");

// jest.setTimeout(10000);

let mongoMemoryServer;

beforeAll(async () => {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  mongoMemoryServer = await MongoMemoryServer.create();

  const uri = mongoMemoryServer.getUri();

  await mongoDB.connect(uri).catch((err) => console.error(err));
});

// TODO: afterAll is closing db connect before last test run,
// afterAll((done) => {
//   mongoDB.disconnect(done);
//   if (mongoMemoryServer) {
//     await mongoMemoryServer.stop();
//     done();
//     mongoMemoryServer = null;
//   }
// });

describe("POST /api/login", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("PUT /api/register", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("PUT /api/users/:userId", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("GET /api/users/:userId/issues", () => {
  beforeAll(async () => {
    const newIssue = {
      title: "This is Issue Title",
      description: "This is Issue description",
      images: [
        "https://sample-url.com/of/image",
        "https://sample-url.com/of/image",
      ],
    };

    await Promise.all([
      request(app)
        .post("/api/users/60f07245837e0e980156e4a4/issues")
        .send(newIssue),
    ]);
  });

  test.only("Case: Success", (done) => {
    request(app)
      .get("/api/users/60f07245837e0e980156e4a4/issues")
      .then((response) => {
        expect(response.statusCode).toBe(200);

        expect(response.body).toMatchObject({
          status: "Success",
        });

        expect(response.body.data.issues).toMatchSnapshot([
          {
            _id: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: expect.any(Number),
          },
        ]);

        done();
      });
  });
});

describe("POST /api/users/:userId/issues", () => {
  test("CASE: Success", (done) => {
    const newIssue = {
      title: "This is Issue Title",
      description: "This is Issue description",
      images: [
        "https://sample-url.com/of/image",
        "https://sample-url.com/of/image",
      ],
    };

    request(app)
      .post("/api/users/60f07245837e0e980156e4a4/issues")
      .send(newIssue)
      .then((response) => {
        expect(response.statusCode).toBe(200);

        expect(response.body).toMatchObject({
          status: "Success",
        });

        expect(response.body.data).toMatchObject({
          issue: expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            images: expect.arrayContaining([expect.any(String)]),
          }),
        });

        done();
      });
  });
});

describe("POST /api/users/:userId/issues/:issueId/comments", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("GET /api/users/:userId/issues/:issueId/comments", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("GET /api/issues/:issueId", () => {
  const issueId = "60f07245837e0e980156e4a3";

  beforeAll(async () => {
    const newIssue = IssueModel({
      _id: mongoose.Types.ObjectId(issueId),
      title: "This is Issue Title",
      description: "This is Issue description",
      images: [
        "https://sample-url.com/of/image",
        "https://sample-url.com/of/image",
      ],
    });

    await newIssue.save();
  });

  afterAll(() => {
    IssueModel.db.dropCollection("issues");
  });

  test("Case: Success", (done) => {
    request(app)
      .get(`/api/issues/${issueId}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);

        expect(response.body).toMatchObject({
          status: "Success",
        });

        expect(response.body.data).toMatchObject({
          issue: expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            images: expect.arrayContaining([expect.any(String)]),
          }),
        });

        done();
      });
  });

  test("Case: Not Found", (done) => {
    request(app)
      .get(`/api/issues/60f07245837e0e980156e4a4`)
      .then((response) => {
        expect(response.statusCode).toBe(200);

        expect(response.body).toMatchObject({
          status: "Error",
          message: "Issue Not Found",
        });

        done();
      });
  });
});

describe("POST /api/admin/user", () => {
  beforeAll(() => {
    const newUser = UserModel({
      phoneNumber: "+919876543211",
    });

    newUser.save();
  });

  afterAll(() => {
    UserModel.findOneAndRemove({
      phoneNumber: "+919876543211",
    });
  });

  test("Case: User Not Found Case", (done) => {
    request(app)
      .post("/api/admin/user")
      .send({ phoneNumber: "9876543210" })
      .then((response) => {
        expect(response.statusCode).toBe(200);

        expect(response.body).toMatchObject({
          status: "Error",
          message: "User Not Found",
        });

        done();
      });
  });

  test("Case: Success", (done) => {
    const phoneNumber = "+919876543211";

    request(app)
      .post("/api/admin/user")
      .send({ phoneNumber })
      .then((response) => {
        expect(response.statusCode).toBe(200);

        expect(response.body).toMatchObject({
          status: "Success",
        });

        expect(response.body.data).toMatchObject({
          user: expect.objectContaining({
            phoneNumber: expect.any(String),
          }),
        });

        done();
      });
  });
});

describe("PUT /admin/user/:userId", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("POST /api/admin/issues/issueType", () => {
  test("CASE: Success", (done) => {
    const newIssueTypeObj = {
      name: "Traffic Light",
      city: "delhi",
    };

    request(app)
      .post("/api/admin/issues/issueType")
      .send(newIssueTypeObj)
      .then((response) => {
        expect(response.statusCode).toBe(200);

        expect(response.body).toMatchObject({
          status: "Success",
        });

        expect(response.body.data).toMatchObject({
          issueType: expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            city: expect.toBeOneOf(["delhi", "bangaluru", "mumbai"]),
          }),
        });

        done();
      });
  });
});

describe("GET /admin/issues/issueType", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("GET /admin/issues", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("GET /admin/issues/:issueId", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("GET /admin/issues/:issueId/comments", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("POST /admin/issues/:issueId/comments", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("DELETE /admin/issues/:issueId/comments/:commentId", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
