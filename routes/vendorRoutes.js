const express = require("express");
const vendorController = require("../controllers/vendorController");
const {
  authenticate,
  authorizeRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// GET all vendors
router.get("/", vendorController.getAllVendors);

// GET a single vendor by ID
router.get("/:id", vendorController.getVendorById);

// POST - Add a new vendor
router.post("/", vendorController.addVendor);

// PUT - Update a vendor by ID
router.put("/:id", vendorController.updateVendor);

// DELETE - Remove a vendor by ID
router.delete("/:id", vendorController.deleteVendor);

// POST - Admin login
router.post("/login/:orgData", vendorController.loginVendor);

// POST - Reset Password by email
router.post("/reset-password", vendorController.resetPassword);

module.exports = router;
