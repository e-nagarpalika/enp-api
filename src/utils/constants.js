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

const LOCATIONS = {
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
  progress: "PROGRESS",
  action: "ACTION",
  resolved: "RESOLVED",
};

const GRIEVANCE_CATEGORIES = [
  "Road Safety & Traffic",
  "Electricity",
  "Ration Service",
  "Housing and Development",
  "Water Delivery",
  "Sanitation",
  "Vigilance & Anti-corruption",
  "Public Safety",
  "Healthcare",
];

const SORT_BY = {
  createdAt: "createdAt",
  createdAt_desc: "createdAt_desc",
  updatedAt: "updatedAt",
  updatedAt_desc: "updatedAt_desc",
};

module.exports = {
  ACCOUNT_TYPE,
  FETCH_STATUS,
  GENDER,
  GRIEVANCE_CATEGORIES,
  GRIEVANCE_STATUS,
  LOCATIONS,
  PROFESSIONS,
  SORT_BY,
  STATUS_CODES,
};
