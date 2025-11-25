// const Gallery = require("../models/Gallery");
// const cloudinary = require("../config/cloudinary");

// exports.getGallery = async (req, res) => {
//   const data = await Gallery.findOne();
//   res.json(data);
// };

// exports.updateGallery = async (req, res) => {
//   try {
//     let images = [];

//     if (req.files) {
//       for (const file of req.files) {
//         const uploaded = await cloudinary.uploader.upload(file.path);
//         images.push(uploaded.secure_url);
//       }
//     }

//     const updated = await Gallery.findOneAndUpdate(
//       {},
//       { images },
//       { new: true, upsert: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




// const Gallery = require("../models/Gallery");
// const cloudinary = require("../config/cloudinary");

// // Get all gallery images
// exports.getGallery = async (req, res) => {
//   try {
//     const images = await Gallery.find().sort({ createdAt: -1 });
//     res.json(images);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get featured images only (for home page)
// exports.getFeaturedGallery = async (req, res) => {
//   try {
//     const images = await Gallery.find({ isFeatured: true })
//       .sort({ createdAt: -1 })
//       .limit(8);
//     res.json(images);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Create new gallery image
// exports.createGalleryImage = async (req, res) => {
//   try {
//     let imageUrl = "";

//     if (req.file) {
//       const uploaded = await cloudinary.uploader.upload(req.file.path, {
//         folder: "gallery"
//       });
//       imageUrl = uploaded.secure_url;
//     }

//     const newImage = await Gallery.create({
//       title: req.body.title || "",
//       imageUrl: imageUrl,
//       isFeatured: req.body.isFeatured === "true" || req.body.isFeatured === true
//     });

//     res.status(201).json(newImage);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Toggle featured status
// exports.toggleFeatured = async (req, res) => {
//   try {
//     const image = await Gallery.findById(req.params.id);
    
//     if (!image) {
//       return res.status(404).json({ message: "Image not found" });
//     }

//     image.isFeatured = !image.isFeatured;
//     await image.save();

//     res.json(image);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete gallery image
// exports.deleteGalleryImage = async (req, res) => {
//   try {
//     const image = await Gallery.findById(req.params.id);
    
//     if (!image) {
//       return res.status(404).json({ message: "Image not found" });
//     }

//     // Delete from cloudinary (optional)
//     if (image.imageUrl) {
//       try {
//         const publicId = image.imageUrl.split('/').pop().split('.')[0];
//         await cloudinary.uploader.destroy(`gallery/${publicId}`);
//       } catch (cloudErr) {
//         console.error("Cloudinary delete error:", cloudErr);
//       }
//     }

//     await Gallery.findByIdAndDelete(req.params.id);
    
//     res.json({ message: "Image deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



// controllers/galleryController.js

// const Gallery = require("../models/Gallery");

// exports.createGalleryItem = async (req, res) => {
//   try {
//     const imageUrl = `/uploads/${req.file.filename}`;

//     const item = await Gallery.create({
//       title: req.body.title,
//       isFeatured: req.body.isFeatured === "true",
//       imageUrl,
//     });

//     res.status(201).json(item);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// exports.getGallery = async (req, res) => {
//   try {
//     const items = await Gallery.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// exports.deleteGallery = async (req, res) => {
//   try {
//     await Gallery.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// exports.toggleFeatured = async (req, res) => {
//   try {
//     const item = await Gallery.findById(req.params.id);
//     item.isFeatured = !item.isFeatured;
//     await item.save();
//     res.json(item);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };






// const Gallery = require("../models/Gallery");
// const cloudinary = require("../config/cloudinary");
// const ErrorResponse = require("../utils/errorResponse");

// // // In controller
// // if (!product) {
// //   return next(new ErrorResponse("Product not found", 404));
// // }

// exports.createGalleryItem = async (req, res) => {
//   try {
//     let imageUrl = "";

//     if (req.file) {
//       const uploaded = await cloudinary.uploader.upload(req.file.path, {
//         folder: "gallery"
//       });
//       imageUrl = uploaded.secure_url;
//     }

//     const item = await Gallery.create({
//       title: req.body.title,
//       isFeatured: req.body.isFeatured === "true",
//       imageUrl,
//     });

//     res.status(201).json({
//       message: "Gallery item created successfully",
//       data: item
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// exports.getGallery = async (req, res) => {
//   try {
//     const items = await Gallery.find().sort({ createdAt: -1 });
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// exports.deleteGallery = async (req, res) => {
//   try {
//     const item = await Gallery.findById(req.params.id);
    
//     if (!item) {
//       return res.status(404).json({ message: "Gallery item not found" });
//     }

//     await Gallery.findByIdAndDelete(req.params.id);
//     res.json({ message: "Gallery item deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// exports.toggleFeatured = async (req, res) => {
//   try {
//     const item = await Gallery.findById(req.params.id);
    
//     if (!item) {
//       return res.status(404).json({ message: "Gallery item not found" });
//     }
    
//     item.isFeatured = !item.isFeatured;
//     await item.save();
//     res.json(item);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };






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

// ADD GALLERY IMAGE (Admin)
exports.createGalleryItem = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "gallery"
      });
      imageUrl = uploaded.secure_url;
    }

    const newItem = await Gallery.create({
      title: req.body.title,
      category: req.body.category,
      image: imageUrl
    });

    res.json({
      message: "Gallery item created successfully",
      data: newItem
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE IMAGE
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
