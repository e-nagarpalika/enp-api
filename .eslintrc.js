/** @format */

module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["jest"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    camelcase: ["error", { properties: "always" }],
    "no-var": "off",
    "block-scoped-var": "off",
    "vars-on-top": "off",
  },
};
