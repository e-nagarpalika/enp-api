/** @format */

const express = require("express");

const router = express.Router();

router
  .route("/:userId")
  .get((req, res) => {
    res.send("Success");
  })
  .put((req, res) => {
    res.send("Success");
  });

// for searching user with mobile number.
router.get("/search", (req, res) => {
  res.send("Success");
});

module.exports = router;
