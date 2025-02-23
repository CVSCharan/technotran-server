const express = require("express");
const router = express.Router();
const multer = require("multer");
const certificateController = require("../controllers/certificateController");

// Multer middleware for file uploads
const upload = multer();

// Routes for certificates
router.get("/", certificateController.getAll); // Fetch all certificates
router.get("/recent", certificateController.getRecent); // Fetch recently added certificates
router.get("/count", certificateController.count); // Get count of all certificates
router.get("/search", certificateController.search); // Search certificates dynamically
router.get("/:org", certificateController.getByOrganization); // Fetch certificates by organization
router.get("/id/:id", certificateController.getById); // Fetch certificate by ID
router.get("/email/:email", certificateController.getByEmail); // Fetch certificates by email

// Certificate creation, updates, and deletions
router.post("/", certificateController.create); // Create a new certificate
router.put("/:id", certificateController.update); // Update a certificate by ID
router.delete("/:id", certificateController.delete); // Delete a certificate by ID

// Email verification route
router.post("/verify-email", certificateController.verifyEmail);

// Route for bulk upload via Excel
router.post(
  "/upload",
  upload.single("file"),
  certificateController.uploadExcel
);

module.exports = router;
