const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        "https://github.com/CVSCharan/Technotran_Assets/blob/main/Picture11.png?raw=true", // Optional, default if no image is uploaded
    },
    role: {
      type: String,
      enum: ["superadmin", "admin"], // Only these values are allowed
      default: "admin",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Admin", adminSchema);
