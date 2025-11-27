const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

// GET ALL GALLERY IMAGES (Main Website Uses This)
exports.getGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createGalleryItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newItem = await Gallery.create({
      title: req.body.title,
      category: req.body.category,
      image: `/uploads/${req.file.filename}`   // 🔥 LOCAL IMAGE SAVE
    });

    res.status(201).json({
      message: "Gallery item created successfully",
      data: newItem
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};






exports.deleteGallery = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: "Gallery item deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// NEW: TOGGLE FEATURED
exports.toggleFeatured = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    // Toggle the boolean value
    item.isFeatured = !item.isFeatured;
    await item.save();

    res.json({ 
      message: "Featured status updated successfully",
      isFeatured: item.isFeatured
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};