// const express = require("express");
// const router = express.Router();
// const {
//   getBrands,
//   getBrandBySlug,
//   createBrand,
//   updateBrand,
//   deleteBrand
// } = require("../controllers/brandController");

// const { protect } = require("../middleware/authMiddleware");

// // PUBLIC ROUTES
// router.get("/", getBrands);
// router.get("/:slug", getBrandBySlug);

// // ADMIN ROUTES
// router.post("/", protect, createBrand);
// router.put("/:id", protect, updateBrand);
// router.delete("/:id", protect, deleteBrand);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const brandController = require("../controllers/brandController");

// // create brand page content
// router.post("/", brandController.createBrand);

// // get all brands
// router.get("/", brandController.getBrands);

// // update brand
// router.put("/:id", brandController.updateBrand);

// // delete brand
// router.delete("/:id", brandController.deleteBrand);

// module.exports = router;



const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");



const {
  createBrand,
  getBrands,
  getBrandBySlug,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

// Create brand
router.post("/", protect, upload.single("heroImage"), createBrand);
// router.post('/create', brandController.createBrand);


// Get all brands
router.get("/", getBrands);

// Get brand by slug
router.get("/:slug", getBrandBySlug);

// Update brand
router.put("/:id",protect, upload.single("heroImage"), updateBrand);

// Delete brand
router.delete("/:id",protect, deleteBrand);

module.exports = router;
