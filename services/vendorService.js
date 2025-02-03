const Vendor = require("../models/Vendor");

// Get all vendors
const getAllVendors = async () => {
  return await Vendor.find(); // Returns all vendors
};

// Get a single vendor by ID
const getVendorById = async (id) => {
  return await Vendor.findById(id); // Finds a vendor by its ID
};

// Add a new vendor
const addVendor = async (vendorData) => {
  const newVendor = new Vendor(vendorData);
  return await newVendor.save(); // Saves the new vendor to the database
};

// Update a vendor by ID
const updateVendor = async (id, vendorData) => {
  return await Vendor.findByIdAndUpdate(id, vendorData, { new: true }); // Updates and returns the updated vendor
};

// Delete a vendor by ID
const deleteVendor = async (id) => {
  return await Vendor.findByIdAndDelete(id); // Deletes a vendor by ID
};

// Get vendor by username
const getVendorByUsername = async (name) => {
  return await Vendor.findOne({ name });
};

// Get vendors by organization
const getVendorsByOrg = async (org) => {
  return await Vendor.find({ org }); // Finds all vendors belonging to the given organization
};

const getVendorByOrgAndUsername = async (orgName, username) => {
  console.log("VENDOR BY ORG & USERNAME", orgName, username);
  return await Vendor.findOne({ org: orgName, name: username });
};

// Get admin by email
const getVendorByEmail = async (email) => {
  return await Vendor.findOne({ email });
};

module.exports = {
  getAllVendors,
  getVendorById,
  addVendor,
  updateVendor,
  deleteVendor,
  getVendorByUsername,
  getVendorsByOrg,
  getVendorByOrgAndUsername,
  getVendorByEmail,
};
