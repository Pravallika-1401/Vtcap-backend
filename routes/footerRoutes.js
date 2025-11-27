const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getFooter, updateFooter } = require("../controllers/footerController");

router.get("/", getFooter);
router.put("/", protect, updateFooter);

module.exports = router;
