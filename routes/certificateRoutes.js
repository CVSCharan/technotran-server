const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");

router.get("/", certificateController.getAll);
router.get("/:id", certificateController.getById);
router.get("/email/:email", certificateController.getByEmail); // Existing route to fetch certificate by email
router.post("/", certificateController.create);
router.put("/:id", certificateController.update);
router.delete("/:id", certificateController.delete);

// New route for verifying email
router.post("/verify-email", certificateController.verifyEmail);

module.exports = router;
