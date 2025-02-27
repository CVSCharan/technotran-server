const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    program: { type: String, required: true },
    department: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    issueDate: { type: Date, default: Date.now },
    certificateId: { type: String, required: true, unique: true },
    certificateImgSrc: { type: String, require: false, default: "" },
    rollNo: { type: String, required: true },
    email: { type: String, required: true },
    org: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Certificate", certificateSchema);
