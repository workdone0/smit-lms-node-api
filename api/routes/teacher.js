const express = require("express");
const router = express.Router();

router.post("/login", (req, res, next) => {
  res.status(200).json({
    message: "You have accessed login route for teacher",
  });
});

router.get("/profile/:teacherId", (req, res, next) => {
  res.status(200).json({
    message: "You have accessed route for student profile",
  });
});

router.post("/register", (req, res, next) => {
  res.status(201).json({
    message: "You have accessed signup route for teacher",
  });
});

module.exports = router;
