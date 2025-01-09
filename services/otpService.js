const nodemailer = require("nodemailer");
const VerifyOtp = require("../models/Otp");

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

// Function to generate a random 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send OTP via email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL, // Sender email
    to: email, // Recipient email
    subject: "OTP for Technotran Solutions E-Verify Portal",
    text: `OTP for Technotran Solutions E-Verify Portal is: ${otp}. It is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

// Function to save OTP record in the database
const saveOtpRecord = async (email, otp) => {
  const otpRecord = new VerifyOtp({
    email: email,
    otp: otp,
  });

  try {
    await otpRecord.save();
  } catch (error) {
    console.error("Error saving OTP record:", error);
    throw new Error("Failed to save OTP record");
  }
};

// Function to verify OTP
const verifyOtpInDatabase = async (email, otp) => {
  try {
    const otpRecord = await VerifyOtp.findOne({ email }).sort({
      createdAt: -1,
    });
    if (!otpRecord) {
      throw new Error("OTP record not found");
    }

    if (otp !== otpRecord.otp) {
      throw new Error("Invalid OTP");
    }

    return true; // OTP verified successfully
  } catch (error) {
    throw new Error(error.message || "Failed to verify OTP");
  }
};

module.exports = {
  generateOtp,
  sendOtpEmail,
  saveOtpRecord,
  verifyOtpInDatabase,
};
