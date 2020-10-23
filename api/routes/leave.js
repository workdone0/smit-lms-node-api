const express = require("express");
const router = express.Router();

//Post route for applying leave
router.post("/apply", (req, res, next) => {
  res.status(200).json({
    message: "You have accessed route to apply for leave",
  });
});

router.get("/:leaveId", (req, res, next) => {
  res.status(200).json({
    message: "You have accessed route get details for a single leave",
  });
});

router.get("/:studentId", (req, res, next) => {
  res.status(201).json({
    message:
      "You have accessed route to get all the leave related to a single studentId",
  });
});

router.get("/:teacherId", (req, res, next) => {
  res.status(201).json({
    message:
      "You have accessed route to get all the leave related to a single teacherId",
  });
});

module.exports = router;
