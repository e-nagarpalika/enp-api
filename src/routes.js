/** @format */

const express = require("express");

const router = express.Router();

const {
  user: userMiddleware,
  admin: adminMiddleware,
} = require("./middlewares");

const contactUsRoute = require("./modules/common/contactUs");
const createAdminCommentRoute = require("./modules/grievances/createAdminComment");
const createCommentRoute = require("./modules/grievances/createComment");
const createIssueRoute = require("./modules/grievances/createIssue");
const createIssueTypeRoute = require("./modules/grievances/createIssueType");
const deleteAdminCommentRoute = require("./modules/grievances/deleteAdminComment");
const getAdminCommentsRoute = require("./modules/grievances/getAdminComments");
const getAdminIssueRoute = require("./modules/grievances/getAdminIssue");
const getAdminIssuesRoute = require("./modules/grievances/getAdminIssues");
const getCommentsRoute = require("./modules/grievances/getComments");
const getIssueCountRoute = require("./modules/grievances/getIssueCount");
const getIssueGraphByCategoryRoute = require("./modules/grievances/getIssueGraphByDate");
const getIssueGraphByDateRoute = require("./modules/grievances/getIssueGraphByCategory");
const getIssueRoute = require("./modules/grievances/getIssue");
const getIssueStatsRoute = require("./modules/grievances/getIssueStats");
const getIssueTypesRoute = require("./modules/grievances/getIssueTypes");
const getUserByPhoneNumberRoute = require("./modules/users/getUserByPhoneNumber");
const getUserIssuesRoute = require("./modules/grievances/getUserIssues");
const getNotificationsRoute = require("./modules/notifications/getNotifications");
const getNotificationCountRoute = require("./modules/notifications/getNotificationCount");
const loginRoute = require("./modules/auth/login");
const registerRoute = require("./modules/users/register");
const updateAccountRoute = require("./modules/users/updateAccount");
const updateUserTypeRoute = require("./modules/users/updateUserType");
const validateAadharRoute = require("./modules/users/validateAadhar");
const getHappinessLevelRoute = require("./modules/dashboard/getHappinessLevel");

/**
 * @swagger
 * /api/contact-us:
 *   post:
 *     summary: contact developers regarding any bugs in code
 *     description: contact developers regarding any bugs in code
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
router.post("/contact-us", userMiddleware, contactUsRoute);

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
router.put("/register", userMiddleware, registerRoute);

/**
 * @swagger
 * /api/users/validateAadhar:
 *   post:
 *     summary: validate aadhar number
 *     description: validate aadhar number
 *     tags:
 *     - users
 *     responses:
 *       200:
 *         true | false
 */
router.post("/users/validateAadhar", userMiddleware, validateAadharRoute);

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
router.get("/users/:userId/issues", userMiddleware, getUserIssuesRoute);

/**
 * @swagger
 * /api/issues:
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
router.post("/issues", userMiddleware, createIssueRoute);

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
 * /api/issues/stats:
 *   get:
 *     summary: get issue statistics
 *     description: get issue statistics
 *     tags:
 *     - issues
 *     parameters:
 *     responses:
 *       200:
 *         description:
 */
router.get("/issues/stats", getIssueStatsRoute);

/**
 * @swagger
 * /api/issues/count:
 *   post:
 *     summary: get count of Grievances
 *     description: get count of Grievances
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
 *         description:
 */
router.get("/issues/count", userMiddleware, getIssueCountRoute);

/**
 * @swagger
 * /api/issues/graphs/byDate:
 *   get:
 *     summary: get issue statistics
 *     description: get issue statistics
 *     tags:
 *     - issues
 *     parameters:
 *     responses:
 *       200:
 *         description:
 */
router.get("/issues/graphs/byDate", getIssueGraphByDateRoute);

/**
 * @swagger
 * /api/issues/graphs/byCategory:
 *   get:
 *     summary: get issue statistics
 *     description: get issue statistics
 *     tags:
 *     - issues
 *     parameters:
 *     responses:
 *       200:
 *         description:
 */
router.get("/issues/graphs/byCategory", getIssueGraphByCategoryRoute);

/**
 * @swagger
 * /api/dashboard/happiness-level:
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
router.get("/dashboard/happiness-level", getHappinessLevelRoute);

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
 * /api/:userId/notificationCount:
 *   get:
 *     summary: get notification Count
 *     description: get notification Count
 *     tags:
 *     - notifications
 *     parameters:
 *     responses:
 *       200:
 *         description:
 */
router.get("/:userId/notificationCount", getNotificationCountRoute);

/**
 * @swagger
 * /api/:userId/notifications:
 *   get:
 *     summary: get notifications
 *     description: get notifications
 *     tags:
 *     - notifications
 *     parameters:
 *     responses:
 *       200:
 *         description:
 */
router.get("/:userId/notifications", getNotificationsRoute);

/**
 * @swagger
 * /api/admin/user:
 *   post:
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
router.post("/admin/user", getUserByPhoneNumberRoute);

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
router.put("/admin/users", adminMiddleware, updateUserTypeRoute);

/**
 * @swagger
 * /api/admin/issues/issueTypes:
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
router.post("/admin/issues/issueTypes", adminMiddleware, createIssueTypeRoute);

/**
 * @swagger
 * /api/admin/issues/issueTypes:
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
router.get("/admin/issues/issueTypes", adminMiddleware, getIssueTypesRoute);

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
