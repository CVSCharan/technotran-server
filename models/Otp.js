const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    ttl: 600, // OTP will expire 10 minutes (600 seconds) after creation
  }
);

module.exports = mongoose.model("Otp", otpSchema);
