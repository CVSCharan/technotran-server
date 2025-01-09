const otpService = require("../services/otpService");

// Controller to send OTP
const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = otpService.generateOtp(); // Generate OTP

  try {
    // Send OTP via email
    await otpService.sendOtpEmail(email, otp);

    // Save OTP record in the database
    await otpService.saveOtpRecord(email, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in sending OTP:", error);
    res.status(500).json({ message: error.message });
  }
};

// Controller to verify OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const isVerified = await otpService.verifyOtpInDatabase(email, otp);

    if (isVerified) {
      res
        .status(200)
        .json({ message: "OTP verified successfully", verified: true });
    }
  } catch (error) {
    console.error("Error in verifying OTP:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { sendOtp, verifyOtp };
