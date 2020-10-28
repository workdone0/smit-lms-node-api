const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res, next) => {
  Student.find({ email: req.body.email })
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
            process.env.JWT_KEY,
            { expiresIn: "7d" }
          );
          return res.status(200).json({
            message: "Auth Successful",
            token: token,
            user: { _id: user[0]._id, email: user[0].email },
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

router.get("/profile/:studentId", (req, res, next) => {
  res.status(200).json({
    message: "You have accessed route for student profile",
  });
});

router.post("/register", (req, res, next) => {
  Student.find({
    phone: req.body.phone,
    email: req.body.email,
    reg_no: req.body.reg_no,
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
            const student = new Student({
              _id: mongoose.Types.ObjectId(),
              name: req.body.name,
              phone: req.body.phone,
              email: req.body.email,
              reg_no: req.body.reg_no,
              password: hash,
              floor_warden_id: req.body.floor_warden_id,
              hostel: req.body.hostel,
              block: req.body.block,
              room: req.body.room,
              level: req.body.level,
              parents_phone: req.body.parents_phone,
              department: req.body.department,
              year: req.body.year,
            });
            student
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
