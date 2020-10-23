const express = require("express");
const app = express();

const studentRoutes = require("./api/routes/student");
const teacherRoutes = require("./api/routes/teacher");
const leaveRoutes = require("./api/routes/leave");

//CORS error fix by setting a header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Setup for different routes
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/leave", leaveRoutes);

//Throwing an error if no route is found, always will stay at the end of all routes
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//Method to handle all the errors thrown from anywhere inside the file
app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({
    error: error.message,
  });
});

module.exports = app;
