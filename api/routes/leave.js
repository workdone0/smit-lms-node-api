const express = require("express");
const router = express.Router();
const Leave = require("../models/leave");
const mongoose = require("mongoose");
const { request } = require("http");

//Post route for applying leave
router.post("/apply", (req, res, next) => {
  const leave = new Leave({
    _id: mongoose.Types.ObjectId(),
    to: req.body.to,
    from: req.body.from,
    purpose: req.body.purpose,
    place: req.body.place,
    alternate_phone: req.body.alternate_phone,
    floor_warden: req.body.floor_warden, //floor_warden id
    student: req.body.student,
    status: req.body.status,
  });
  leave
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Leave Created Succesfuly",
        result: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
});

router.get("/:leaveId", (req, res, next) => {
  res.status(200).json({
    message: "You have accessed route get details for a single leave",
  });
});

router.post("/student", (req, res, next) => {
  Leave.find({ student: req.body.studentId })
    .exec()
    .then((result) => {
      res.status(200).json({
        leaves: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
});

router.post("/teacher", (req, res, next) => {
  Leave.find({ floor_warden: req.body.teacherId })
    .exec()
    .then((result) => {
      res.status(200).json({
        leaves: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
});

module.exports = router;
