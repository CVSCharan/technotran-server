const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

// GET all admins
router.get("/", adminController.getAllAdmins);

// GET a single admin by ID
router.get("/:id", adminController.getAdminById);

// POST - Add a new admin
router.post("/", adminController.addAdmin);

// PUT - Update an admin by ID
router.put("/:id", adminController.updateAdmin);

// DELETE - Remove an admin by ID
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
