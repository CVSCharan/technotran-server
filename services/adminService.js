const Admin = require("../models/Admin");

// Get all admins
const getAllAdmins = async () => {
  return await Admin.find(); // Returns all admins
};

// Get a single admin by ID
const getAdminById = async (id) => {
  return await Admin.findById(id); // Finds an admin by its ID
};

// Add a new admin
const addAdmin = async (adminData) => {
  const newAdmin = new Admin(adminData);
  return await newAdmin.save(); // Saves the new admin to the database
};

// Update an admin by ID
const updateAdmin = async (id, adminData) => {
  return await Admin.findByIdAndUpdate(id, adminData, { new: true }); // Updates and returns the updated admin
};

// Delete an admin by ID
const deleteAdmin = async (id) => {
  return await Admin.findByIdAndDelete(id); // Deletes an admin by ID
};

// Get admin by username
const getAdminByUsername = async (username) => {
  return await Admin.findOne({ username });
};

// Get admin by email
const getAdminByEmail = async (email) => {
  return await Admin.findOne({ email });
};

module.exports = {
  getAllAdmins,
  getAdminById,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminByUsername,
  getAdminByEmail,
};
