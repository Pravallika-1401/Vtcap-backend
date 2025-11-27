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
