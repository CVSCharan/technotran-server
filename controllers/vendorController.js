const vendorService = require("../services/vendorService");

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
    const newVendor = await vendorService.addVendor(req.body);
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

module.exports = {
  getAllVendors,
  getVendorById,
  addVendor,
  updateVendor,
  deleteVendor,
};
