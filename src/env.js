/** @format */

require("dotenv").config();

const assert = require("assert");

const { AUTH_SECRET, PORT, MONGODB_URI, NODE_ENV, WEB_URI } = process.env;

assert(AUTH_SECRET, "AUTH_SECRET value is required");
assert(PORT, "PORT value is required");
assert(MONGODB_URI, "MONGODB_URI value is required");
assert(NODE_ENV, "NODE_ENV value is required");
assert(WEB_URI, "WEB_URI value is required");
