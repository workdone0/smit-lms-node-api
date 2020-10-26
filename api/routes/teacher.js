const express = require("express");
const router = express.Router();
const Teacher = require("../models/teacher");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res, next) => {
  Teacher.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length === 0) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            SECRET_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "Auth Successful",
            token: token,
          });
        }
        return res.status(401).json({
          message: "Auth Failed",
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong while signing in",
        error: error,
      });
    });
});

router.get("/profile/:teacherId", (req, res, next) => {
  res.status(200).json({
    message: "You have accessed route for student profile",
  });
});

router.get("/list", (req, res, next) => {
  Teacher.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        quantity: result.length,
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
});

router.post("/register", (req, res, next) => {
  Teacher.find({
    phone: req.body.phone,
    email: req.body.email,
    emp_id: req.body.emp_id,
  })
    .exec()
    .then((user) => {
      if (user.length === 0) {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          if (error) {
            res.status(500).json({
              message: "Something went wrong while creating user",
              error: error,
            });
          } else {
            const teacher = new Teacher({
              _id: mongoose.Types.ObjectId(),
              name: req.body.name,
              phone: req.body.phone,
              email: req.body.email,
              emp_id: req.body.emp_id,
              password: hash,
              chamber: req.body.chamber,
              hostel: req.body.hostel,
              block: req.body.block,
              level: req.body.level,
            });
            teacher
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User Created Succesfuly",
                  result: result,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Something went wrong",
                  error: error,
                });
              });
          }
        });
      } else {
        res.status(409).json({
          message: "User already exists with this email",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
});

module.exports = router;
