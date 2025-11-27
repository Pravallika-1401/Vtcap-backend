const Brand = require("../models/Brand");

exports.createBrand = async (req, res) => {
  try {
    // ✅ VALIDATION
    if (!req.body.name || !req.body.slug) {
      return res.status(400).json({ 
        message: "Name and slug are required" 
      });
    }

    // ✅ CHECK DUPLICATE SLUG
    const existingBrand = await Brand.findOne({ slug: req.body.slug });
    if (existingBrand) {
      return res.status(400).json({ 
        message: "Brand with this slug already exists" 
      });
    }

    let heroImage = "";
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "brands"
      });
      heroImage = uploaded.secure_url;
    }

    const brand = await Brand.create({
      name: req.body.name,
      slug: req.body.slug,
      heroImage,
      aboutText: req.body.aboutText || "",
      offerText: req.body.offerText || "",
      products: req.body.products || [],
    });

    res.status(201).json({
      message: "Brand created successfully",
      data: brand
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const existing = await Brand.findById(req.params.id);
    
    if (!existing) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const update = req.body;
    update.heroImage = existing.heroImage; // Preserve existing image

    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "brands"
      });
      update.heroImage = uploaded.secure_url;
    }

    const brand = await Brand.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.json({
      message: "Brand updated successfully",
      data: brand
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getBrandBySlug = async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ message: "Brand deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
