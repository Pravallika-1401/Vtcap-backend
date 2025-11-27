const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const {
  getHeader,
  updateHeader
} = require("../controllers/headerController");

// PUBLIC – MAIN WEBSITE USES THIS
router.get("/", getHeader);

// PROTECTED – ADMIN PANEL USES THIS
router.put("/", protect, upload.single("logo"), updateHeader);

module.exports = router;
