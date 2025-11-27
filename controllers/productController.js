const Product = require("../models/Product"); // ✅ Changed from BrandCard
const cloudinary = require("../config/cloudinary");

// GET ALL BRAND CARDS
exports.getBrands = async (req, res) => {
  try {
    const brands = await Product.find().sort({ createdAt: -1 });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE BRAND CARD
exports.createBrand = async (req, res) => {
  try {
    // ✅ VALIDATIONS
    if (!req.body.name) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Brand image is required" });
    }

    if (!req.body.products) {
      return res.status(400).json({ message: "Products list is required" });
    }

    let products;
    try {
      products = JSON.parse(req.body.products);
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ 
          message: "Products must be a non-empty array" 
        });
      }
    } catch (err) {
      return res.status(400).json({ message: "Invalid products format" });
    }

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "brand-cards"
    });

    const brand = await Product.create({ // ✅ Now Product is defined
      name: req.body.name,
      image: upload.secure_url,
      products: products
    });

    res.json({ message: "Brand created successfully", brand });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE BRAND CARD
exports.updateBrand = async (req, res) => {
  try {
    const brand = await Product.findById(req.params.id); // ✅ Changed
    
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    let imgUrl = brand.image;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "brand-cards"
      });
      imgUrl = upload.secure_url;
    }

    brand.name = req.body.name || brand.name;
    brand.image = imgUrl;
    
    if (req.body.products) {
      try {
        const products = JSON.parse(req.body.products);
        if (Array.isArray(products) && products.length > 0) {
          brand.products = products;
        }
      } catch (err) {
        return res.status(400).json({ message: "Invalid products format" });
      }
    }

    await brand.save();
    res.json({ message: "Brand updated successfully", brand });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE BRAND CARD
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Product.findByIdAndDelete(req.params.id); // ✅ Changed
    
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ message: "Brand deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};