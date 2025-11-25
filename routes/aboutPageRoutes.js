// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/uploadMiddleware");
// const protect = require("../middleware/authMiddleware");
// const { getAboutPage, updateAboutPage } = require("../controllers/aboutPageController");

// router.get("/", getAboutPage);
// // router.put("/", protect, upload.array("images", 5), updateAboutPage);
// router.put("/", protect, upload.single("image"), updateAboutPage);

// module.exports = router;



const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");
const { getAboutPage, updateAboutPage } = require("../controllers/aboutPageController");

router.get("/", getAboutPage);

router.put(
  "/",
  protect,
  upload.fields([
    { name: "ceoImages", maxCount: 10 },
    { name: "teamImages", maxCount: 10 }
  ]),
  updateAboutPage
);

module.exports = router;
