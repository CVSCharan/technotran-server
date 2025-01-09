const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true }, // Add a date field for TTL
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create a TTL index on the 'expiresAt' field
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Documents expire at the specified date in 'expiresAt'

module.exports = mongoose.model("Otp", otpSchema);
