/** @format */
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongoDB = require("./database/mongoDB");
const UserModel = require("./modules/users/model");
const app = require("./app");

let mongoMemoryServer;

beforeAll(async () => {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  mongoMemoryServer = await MongoMemoryServer.create();

  const uri = mongoMemoryServer.getUri();

  mongoDB.connect(uri);
});

afterAll(async () => {
  mongoDB.disconnect();

  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
    mongoMemoryServer = null;
  }
});

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
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("POST /api/users/:userId/issues", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
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

describe("GET /issues/:issueId", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
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

describe("POST /admin/issues/issueType", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
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
