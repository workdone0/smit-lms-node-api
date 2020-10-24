const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }, //teachers name
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true }, //teachers email
  emp_id: { type: Number, required: true, unique: true }, //teachers emp_id
  password: { type: String, required: true }, // encrypted password
  chamber: { type: String, required: true }, // chamber no,
  hostel: { type: String, required: true }, // hostel no.
  level: { type: Number, required: true }, // floor no.
  block: { type: String, required: true }, // block
});

module.exports = mongoose.model("Teacher", teacherSchema);
