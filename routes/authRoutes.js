// const express = require("express");
// const { registerAdmin, loginAdmin } = require("../controllers/authController");
// const router = express.Router();

// // Register admin (use only once)
// router.post("/register", registerAdmin);

// // Login admin
// router.post("/login", loginAdmin);

// module.exports = router;

const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

module.exports = router;
