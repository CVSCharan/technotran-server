const bcrypt = require("bcrypt");
const vendorService = require("../services/vendorService");
const jwt = require("jsonwebtoken");

// Get all vendors
const getAllVendors = async (req, res) => {
  try {
    const vendors = await vendorService.getAllVendors();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get vendor by ID
const getVendorById = async (req, res) => {
  const { id } = req.params;
  try {
    const vendor = await vendorService.getVendorById(id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new vendor
const addVendor = async (req, res) => {
  try {
    // Extract the password from the request body
    const { password, ...rest } = req.body;

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    // Save the new vendor with the hashed password
    const newVendor = await vendorService.addVendor({
      ...rest,
      password: hashedPassword,
    });

    res.status(201).json(newVendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a vendor by ID
const updateVendor = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedVendor = await vendorService.updateVendor(id, req.body);
    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(updatedVendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a vendor by ID
const deleteVendor = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVendor = await vendorService.deleteVendor(id);
    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vendor login
const loginVendor = async (req, res) => {
  const { username, password } = req.body;
  const { orgData } = req.params; // Get the selected vendor (organization)

  try {
    // Find the vendor based on the orgName and username
    const vendor = await vendorService.getVendorByOrgAndUsername(
      orgData,
      username
    );

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, vendor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: vendor._id, role: vendor.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set HTTP-only cookie for security
    res.cookie("vendor_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({
      message: "Login successful",
      token,
      id: vendor._id,
      username: vendor.name,
      email: vendor.email,
      org: vendor.org,
      orgPic: vendor.orgPic,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout vendor by clearing the token
const logoutVendor = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// Reset Password
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const admin = await vendorService.getVendorByEmail(email);
    if (!admin) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllVendors,
  getVendorById,
  addVendor,
  updateVendor,
  deleteVendor,
  loginVendor,
  logoutVendor,
  resetPassword,
};
