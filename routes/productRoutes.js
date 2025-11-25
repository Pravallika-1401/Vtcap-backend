// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/uploadMiddleware");
// const protect = require("../middleware/authMiddleware");

// const {
//   getProducts,
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct
// } = require("../controllers/productController");

// router.get("/", getProducts);
// router.get("/:slug", getProduct);

// router.post("/", protect, upload.single("image"), createProduct);
// router.put("/:id", protect, upload.single("image"), updateProduct);
// router.delete("/:id", protect, deleteProduct);

// module.exports = router;




const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand
} = require("../controllers/productController");

// HOME PAGE FETCH
router.get("/", getBrands);

// ADMIN PANEL
router.post("/", protect, upload.single("image"), createBrand);
router.put("/:id", protect, upload.single("image"), updateBrand);
router.delete("/:id", protect, deleteBrand);

module.exports = router;
