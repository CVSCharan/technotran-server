const express = require("express");
const adminController = require("../controllers/adminController");
const {
  authenticate,
  authorizeRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// 🟢 Superadmin Only
router.post(
  "/",
  authenticate,
  authorizeRole("superadmin"),
  adminController.addAdmin
);
router.delete(
  "/:id",
  authenticate,
  authorizeRole("superadmin"),
  adminController.deleteAdmin
);

// 🟡 Both Superadmin & Admin
router.get(
  "/",
  authenticate,
  authorizeRole("superadmin", "admin"),
  adminController.getAllAdmins
);
router.get(
  "/:id",
  authenticate,
  authorizeRole("superadmin", "admin"),
  adminController.getAdminById
);
router.put(
  "/:id",
  authenticate,
  authorizeRole("superadmin", "admin"),
  adminController.updateAdmin
);

// 🔹 Login & Logout (No authentication needed)
router.post("/login", adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);
router.post("/reset-password", adminController.resetPassword);

module.exports = router;
