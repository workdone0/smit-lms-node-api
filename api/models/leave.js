const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  to: { type: String, required: true },
  from: { type: String, required: true },
  purpose: { type: String, required: true },
  place: { type: String, required: true },
  alternate_phone: { type: Number, required: true },
  floor_warden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Leave", leaveSchema);
