const express = require("express");
const router = express.Router();

router.post("/login", (req, res, next) => {
  res.status(200).json({
    message: "You have accessed login route for student",
  });
});

router.get("/profile/:studentId", (req, res, next) => {
  res.status(200).json({
    message: "You have accessed route for student profile",
  });
});

router.post("/register", (req, res, next) => {
  res.status(201).json({
    message: "You have accessed signup route for student",
  });
});

module.exports = router;
