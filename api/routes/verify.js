const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/student", (req, res, next) => {
  const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
  Student.find({ _id: decoded.userId, email: decoded.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        res.status(200).json({
          message: "User found",
          value: true,
        });
      } else {
        res.status(401).json({
          message: "Invalid User",
          value: false,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
        value: false,
      });
    });
});

module.exports = router;
