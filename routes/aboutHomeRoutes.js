const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const {
  getAboutHome,
  updateAboutHome,
  addTrustedLogo,
  deleteTrustedLogo,
  addAuthorizedLogo,
  deleteAuthorizedLogo
} = require("../controllers/aboutHomeController");

// PUBLIC
router.get("/", getAboutHome);

// MAIN ABOUT UPDATE
router.put("/", protect, upload.single("mainImage"), updateAboutHome);

// TRUSTED BY
router.post("/trusted", protect, upload.single("logo"), addTrustedLogo);
router.delete("/trusted/:id", protect, deleteTrustedLogo);

// AUTHORIZED
router.post("/authorized", protect, upload.single("logo"), addAuthorizedLogo);
router.delete("/authorized/:id", protect, deleteAuthorizedLogo);

module.exports = router;
