const bcrypt = require("bcrypt");
const vendorService = require("../services/vendorService");
const Vendor = require("../models/Vendor");

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

// Admin login
const loginVendor = async (req, res) => {
  const { name, password } = req.body;
  const { org } = req.params;

  try {
    // Query all vendors for the organization
    console.log(org);
    const vendors = await vendorService.getVendorsByOrg(org);

    if (!vendors || vendors.length === 0) {
      return res
        .status(404)
        .json({ message: "No vendors found for the organization" });
    }

    // Find the specific vendor by username in the fetched list
    const vendor = vendors.find((vendor) => vendor.name === name);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, vendor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", vendor });
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
};
