const Header = require("../models/Header");
const cloudinary = require("../config/cloudinary");

// GET HEADER (MAIN WEBSITE USES THIS)
exports.getHeader = async (req, res) => {
  try {
    let header = await Header.findOne();

    // If first time website runs, create empty default header
    if (!header) {
      header = await Header.create({});
    }

    res.json(header);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching header",
      error: err.message
    });
  }
};


// UPDATE HEADER (ADMIN PANEL)
exports.updateHeader = async (req, res) => {
  try {
    let header = await Header.findOne();

    if (!header) {
      header = await Header.create({});
    }

    let logoUrl = header.logoUrl; // keep old logo if not updated

    // If admin uploaded new logo file → upload to cloudinary
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "header"
      });
      logoUrl = uploadResult.secure_url;
    }

    // Update DB
    header.brandName = req.body.brandName || header.brandName;
    header.tagline = req.body.tagline || header.tagline;
    header.logoUrl = logoUrl;

    header.homeLabel = req.body.homeLabel || header.homeLabel;
    header.aboutLabel = req.body.aboutLabel || header.aboutLabel;
    header.productsLabel = req.body.productsLabel || header.productsLabel;
    header.galleryLabel = req.body.galleryLabel || header.galleryLabel;
    header.contactLabel = req.body.contactLabel || header.contactLabel;

    await header.save();

    res.json({
      message: "Header updated successfully",
      data: header
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
