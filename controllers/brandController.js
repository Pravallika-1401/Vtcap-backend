// const Brand = require("../models/Brand");

// // GET ALL BRANDS (Products listing)
// exports.getBrands = async (req, res) => {
//   try {
//     const brands = await Brand.find().sort("name");
//     res.json(brands);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET SINGLE BRAND BY SLUG (Brand page)
// exports.getBrandBySlug = async (req, res) => {
//   try {
//     const brand = await Brand.findOne({ slug: req.params.slug });
//     if (!brand) return res.status(404).json({ message: "Brand not found" });
//     res.json(brand);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // CREATE (Admin Panel)
// exports.createBrand = async (req, res) => {
//   try {
//     const brand = new Brand(req.body);
//     await brand.save();
//     res.status(201).json(brand);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE (Admin Panel)
// exports.updateBrand = async (req, res) => {
//   try {
//     const updated = await Brand.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ message: "Brand not found" });

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE BRAND
// exports.deleteBrand = async (req, res) => {
//   try {
//     await Brand.findByIdAndDelete(req.params.id);
//     res.json({ message: "Brand deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




// const Brand = require("../models/Brand");

// // CREATE
// exports.createBrand = async (req, res) => {
//   try {
//     const brand = await Brand.create(req.body);
//     res.status(201).json(brand);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating brand", error });
//   }
// };

// // GET ALL
// exports.getBrands = async (req, res) => {
//   try {
//     const brands = await Brand.find();
//     res.status(200).json(brands);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching brands", error });
//   }
// };

// // UPDATE
// exports.updateBrand = async (req, res) => {
//   try {
//     const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).json(brand);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating brand", error });
//   }
// };

// // DELETE
// exports.deleteBrand = async (req, res) => {
//   try {
//     await Brand.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Brand removed" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting brand", error });
//   }
// };







// const Brand = require("../models/Brand");

// // Create a new brand
// exports.createBrand = async (req, res) => {
//   try {
//     const data = req.body;

//     if (req.file) {
//       data.logoUrl = "/uploads/" + req.file.filename;
//     }

//     const brand = new Brand(data);
//     await brand.save();

//     res.status(201).json({ message: "Brand created", brand });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creating brand" });
//   }
// };

// // Get all brands
// exports.getBrands = async (req, res) => {
//   try {
//     const brands = await Brand.find();
//     res.json(brands);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching brands" });
//   }
// };

// // Get single brand page by slug
// exports.getBrandBySlug = async (req, res) => {
//   try {
//     const brand = await Brand.findOne({ slug: req.params.slug });

//     if (!brand) {
//       return res.status(404).json({ message: "Brand not found" });
//     }

//     res.json(brand);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching brand" });
//   }
// };

// // Update brand
// exports.updateBrand = async (req, res) => {
//   try {
//     const updates = req.body;

//     if (req.file) {
//       updates.logoUrl = "/uploads/" + req.file.filename;
//     }

//     const brand = await Brand.findByIdAndUpdate(req.params.id, updates, {
//       new: true,
//     });

//     res.json({ message: "Updated successfully", brand });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating brand" });
//   }
// };

// // Delete brand
// exports.deleteBrand = async (req, res) => {
//   try {
//     await Brand.findByIdAndDelete(req.params.id);
//     res.json({ message: "Brand deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting brand" });
//   }
// };






// const Brand = require("../models/Brand");

// // Create Brand
// exports.createBrand = async (req, res) => {
//   try {
//     const heroImage = req.file ? req.file.path : null;

//     const brand = await Brand.create({
//       name: req.body.name,
//       slug: req.body.slug,
//       heroImage,
//       aboutText: req.body.aboutText,
//       offerText: req.body.offerText,
//       products: req.body.products || [],
//     });

//     res.status(201).json(brand);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get All Brands
// exports.getBrands = async (req, res) => {
//   try {
//     const brands = await Brand.find();
//     res.json(brands);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get brand by slug
// exports.getBrandBySlug = async (req, res) => {
//   try {
//     const brand = await Brand.findOne({ slug: req.params.slug });
//     if (!brand) return res.status(404).json({ message: "Brand not found" });
//     res.json(brand);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update Brand
// exports.updateBrand = async (req, res) => {
//   try {
//     const update = req.body;

//     if (req.file) update.heroImage = req.file.path;

//     const brand = await Brand.findByIdAndUpdate(req.params.id, update, {
//       new: true,
//     });

//     if (!brand) return res.status(404).json({ message: "Brand not found" });

//     res.json(brand);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete Brand
// exports.deleteBrand = async (req, res) => {
//   try {
//     const brand = await Brand.findByIdAndDelete(req.params.id);

//     if (!brand) return res.status(404).json({ message: "Brand not found" });

//     res.json({ message: "Brand deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


const Brand = require("../models/Brand");
const cloudinary = require("../config/cloudinary");
const ErrorResponse = require("../utils/errorResponse");

// // In controller
// if (!product) {
//   return next(new ErrorResponse("Product not found", 404));
// }

// exports.createBrand = async (req, res) => {
//   try {
//     let heroImage = "";

//     if (req.file) {
//       const uploaded = await cloudinary.uploader.upload(req.file.path, {
//         folder: "brands"
//       });
//       heroImage = uploaded.secure_url;
//     }

//     const brand = await Brand.create({
//       name: req.body.name,
//       slug: req.body.slug,
//       heroImage,
//       aboutText: req.body.aboutText,
//       offerText: req.body.offerText,
//       products: req.body.products || [],
//     });

//     res.status(201).json({
//       message: "Brand created successfully",
//       data: brand
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

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
