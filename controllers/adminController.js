const bcrypt = require("bcrypt");
const adminService = require("../services/adminService");

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get admin by ID
const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await adminService.getAdminById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new admin
const addAdmin = async (req, res) => {
  try {
    // Extract the password from the request body
    const { password, ...rest } = req.body;

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Save the new admin with the hashed password
    const newAdmin = await adminService.addAdmin({
      ...rest,
      password: hashedPassword,
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an admin by ID
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAdmin = await adminService.updateAdmin(id, req.body);
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an admin by ID
const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAdmin = await adminService.deleteAdmin(id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin login
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await adminService.getAdminByUsername(username);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAdmins,
  getAdminById,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
};
