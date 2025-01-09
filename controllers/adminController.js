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
    const newAdmin = await adminService.addAdmin(req.body);
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

module.exports = {
  getAllAdmins,
  getAdminById,
  addAdmin,
  updateAdmin,
  deleteAdmin,
};
