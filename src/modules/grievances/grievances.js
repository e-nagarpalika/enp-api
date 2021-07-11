/** @format */

const express = require("express");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send("Success");
  })
  .post((req, res) => {
    res.send("Success");
  });

router
  .route("/:id")
  .get((req, res) => {
    res.send("Success");
  })
  .put((req, res) => {
    res.send("Success");
  })
  .delete((req, res) => {
    res.send("Success");
  });

router.get("/:gId/comments/:cId", (req, res) => {
  res.send("Success");
});

router.put("/:gId/comments/:cId", (req, res) => {
  res.send("Success");
});

router.post("/:gId/comments", (req, res) => {
  res.send("Success");
});

router.delete("/:gId/comments/:cId", (req, res) => {
  res.send("Success");
});

module.exports = router;
