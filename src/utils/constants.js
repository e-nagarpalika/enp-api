/** @format */

const ACCOUNT_TYPE = {
  user: "USER",
  manager: "MANAGER",
  admin: "ADMIN",
};

const FETCH_STATUS = {
  none: "NONE",
  loading: "LOADING",
  error: "ERROR",
  success: "SUCCESS",
};

const STATUS_CODES = {
  200: "SUCCESS",
  201: "SUCCESS, CREATED",
  400: "CLIENT ERROR",
  404: "ERROR, NOT FOUND",
  500: "SERVER ERROR",
};

const GENDER = {
  male: "MALE",
  female: "FEMALE",
  other: "OTHER",
};

const LOCATION = {
  bangaluru: "BANGALURU",
  delhi: "DELHI",
  mumbai: "MUMBAI",
};

const PROFESSIONS = {
  doctor: "DOCTOR",
  engineer: "ENGINEER",
  farmer: "FARMER",
  other: "OTHER",
};

/**
 * NONE - when issue was created
 * REVIEW - issue will be reviews by officers
 * PROGRESS - discussion has started on this issue
 * ACTION - action has been initiated by officers
 * RESOLVED - issue has been resolved
 */
const GRIEVANCE_STATUS = {
  none: "NONE",
  review: "REVIEW",
  // progress: "PROGRESS",
  action: "ACTION",
  resolved: "RESOLVED",
};

module.exports = {
  ACCOUNT_TYPE,
  FETCH_STATUS,
  GENDER,
  LOCATION,
  PROFESSIONS,
  STATUS_CODES,
  GRIEVANCE_STATUS,
};
