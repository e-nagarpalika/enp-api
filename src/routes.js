/** @format */

const express = require("express");

const router = express.Router();

// const middleware = require("./middlewares/index");

const createAdminCommentRoute = require("./modules/grievances/createAdminComment");
const createCommentRoute = require("./modules/grievances/createComment");
const createIssueRoute = require("./modules/grievances/createIssue");
const createIssueTypeRoute = require("./modules/grievances/createIssueType");
const deleteAdminCommentRoute = require("./modules/grievances/deleteAdminComment");
const getAdminCommentsRoute = require("./modules/grievances/getAdminComments");
const getAdminIssueRoute = require("./modules/grievances/getAdminIssue");
const getAdminIssuesRoute = require("./modules/grievances/getAdminIssues");
const getCommentsRoute = require("./modules/grievances/getComments");
const getIssueRoute = require("./modules/grievances/getIssue");
const getIssueTypesRoute = require("./modules/grievances/getIssueTypes");
const getUserByPhoneNumberRoute = require("./modules/users/getUserByPhoneNumber");
const getUserIssuesRoute = require("./modules/grievances/getUserIssues");
const loginRoute = require("./modules/auth/login");
const registerRoute = require("./modules/auth/register");
const updateAccountRoute = require("./modules/users/updateAccount");
const updateUserTypeRoute = require("./modules/users/updateUserType");

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: get JWT token in cookie by sending Firebase Auth token
 *     description: >
 *        get JWT token in cookie by sending Firebase Auth token
 *     operationId: getUsers
 *     tags:
 *     - users
 *     produces:
 *     - application/json
 *     consumes:
 *     - application/json
 *     parameters:
 *     - token: Firebase Auth Token
 *       description: Firebase Auth Token
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       200:
 *         description: Signed In
 */
router.post("/login", loginRoute);

/**
 * @swagger
 * /api/register:
 *   put:
 *     summary: user information update for the first time
 *     description: user information update for the first time
 *     tags:
 *     - users
 *     parameters:
 *     - token: JWT token
 *       description: JWT token
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       200:
 *         description: User information is updated
 */
router.put("/register", registerRoute);

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: user account update
 *     description: user account update
 *     tags:
 *     - users
 *     parameters:
 *     - token: JWT token
 *       description: JWT token
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       200:
 *         description: user information is updated
 */
router.put("/users/:userId", updateAccountRoute);

/**
 * @swagger
 * /api/users/:userId/issues:
 *   get:
 *     summary: get all issues of user(owner)
 *     description: get all issues of user(owner)
 *     tags:
 *     - users
 *     - issues
 *     parameters:
 *     - token: Firebase Auth Token
 *       description: Firebase Auth Token
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       200:
 *         description: list of all the issues created by user with :userId
 */
router.get("/users/:userId/issues", getUserIssuesRoute);

/**
 * @swagger
 * /api/users/:userId/issues:
 *   post:
 *     summary: create new issue by USER
 *     description: create new issue by USER
 *     tags:
 *     - users
 *     parameters:
 *     - token: JWT Token
 *       description: JWT Token
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       200:
 *         description:
 */
router.post("/users/:userId/issues", createIssueRoute);

/**
 * @swagger
 * /api/users/:userId/issues/:issueId/comments:
 *   post:
 *     summary: create new coment by USER on issue
 *     description: create new coment by USER on issue
 *     tags:
 *     - users
 *     - issues
 *     parameters:
 *     - token: JWT token
 *       description: JWT token
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       200:
 *         description: Signed In
 */
router.post("/users/:userId/issues/:issueId/comments", createCommentRoute);

/**
 * @swagger
 * /api/users/:userId/issues/:issueId/comments:
 *   get:
 *     summary: get all comments of issues
 *     description: get all comments of issues
 *     tags:
 *     - users
 *     - issues
 *     parameters:
 *     - token: JWT Token
 *       description: JWT Token
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       200:
 *         description: Signed In
 */
router.get("/users/:userId/issues/:issueId/comments", getCommentsRoute);

/**
 * @swagger
 * /api/issues/:issueId:
 *   get:
 *     summary: get issue
 *     description: get issue
 *     tags:
 *     - issues
 *     parameters:
 *     responses:
 *       200:
 *         description: Signed In
 */
router.get("/issues/:issueId", getIssueRoute);

/**
 * @swagger
 * /api/admin/user:
 *   get:
 *     summary: get user by phone number
 *     description: get user by phone number
 *     tags:
 *     - admins
 *     parameters:
 *     - phoneNumber: Phone Number
 *       description: Phone Number
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       200:
 *         description: return user information if exists otherwise "false".
 */
router.get("/admin/user", getUserByPhoneNumberRoute);

/**
 * @swagger
 * /api/admin/user/:userId:
 *   get:
 *     summary: change account type by Admin only
 *     description: change account type by Admin only
 *     tags:
 *     - admins
 *     parameters:
 *     - userId: UserId
 *       description: UserId
 *       in: String
 *       required: true
 *       type: String
 *     - accountType: account type (USER, MANAGER, ADMIN)
 *       description: account type (USER, MANAGER, ADMIN)
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       200:
 *         description: true/false
 */
router.put("/admin/user/:userId", updateUserTypeRoute);

/**
 * @swagger
 * /api/admin/issues/issueType:
 *   post:
 *     description: create an issue Type
 *     tags:
 *     - admins
 *     parameters:
 *     - phoneNumber: Phone Number
 *       description: Phone Number
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: true/false
 */
router.post("/admin/issues/issueType", createIssueTypeRoute);

/**
 * @swagger
 * /api/admin/issues/issueType:
 *   post:
 *     description: get all issue types
 *     tags:
 *     - admins
 *     parameters:
 *     - phoneNumber: Phone Number
 *       description: Phone Number
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: true/false
 */
router.get("/admin/issues/issueType", getIssueTypesRoute);

/**
 * @swagger
 * /api/admin/issues:
 *   get:
 *     description: get user by phone number
 *     tags:
 *     - admins
 *     parameters:
 *     - phoneNumber: Phone Number
 *       description: Phone Number
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       200:
 *         description: true/false
 */
router.get("/admin/issues", getAdminIssuesRoute);

/**
 * @swagger
 * /api/admin/issues/:issueId:
 *   get:
 *     description: get user by phone number
 *     tags:
 *     - admins
 *     parameters:
 *     - phoneNumber: Phone Number
 *       description: Phone Number
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       200:
 *         description: true/false
 */
router.get("/admin/issues/:issueId", getAdminIssueRoute);

/**
 * @swagger
 * /api/admin/issues/:issueId/comments:
 *   get:
 *     description: get all comments of issues
 *     tags:
 *     - admins
 *     parameters:
 *     - phoneNumber: Phone Number
 *       description: Phone Number
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       200:
 *         description: true/false
 */
router.get("/admin/issues/:issueId/comments", getAdminCommentsRoute);

/**
 * @swagger
 * /api/admin/issues/:issueId/comments:
 *   post:
 *     summary: get all comments of issues
 *     description: get all comments of issues
 *     tags:
 *     - admins
 *     parameters:
 *     - phoneNumber: Phone Number
 *       description: Phone Number
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: true/false
 */
router.post("/admin/issues/:issueId/comments", createAdminCommentRoute);

/**
 * @swagger
 * /api/admin/issues/:issueId/comments/:commentId:
 *   delete:
 *     summary: ADMIN can delete comment done by them
 *     description: ADMIN can delete comment done by them
 *     tags:
 *     - issues
 *     - admins
 *     parameters:
 *     - phoneNumber: Phone Number
 *       description: Phone Number
 *       in: String
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: true/false
 */
router.delete(
  "/admin/issues/:issueId/comments/:commentId",
  deleteAdminCommentRoute,
);

module.exports = router;
