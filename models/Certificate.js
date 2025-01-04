const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  issueDate: { type: Date, default: Date.now },
  certificateId: { type: String, required: true, unique: true },
  rollNo: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Certificate", certificateSchema);
