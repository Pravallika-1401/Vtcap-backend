// const Header = require("../models/Header");
// const cloudinary = require("../config/cloudinary");
// const ErrorResponse = require("../utils/errorResponse");

// // // In controller
// // if (!product) {
// //   return next(new ErrorResponse("Product not found", 404));
// // }

// // exports.getHeader = async (req, res) => {
// //   const header = await Header.findOne();
// //   res.json(header);
// // };

// exports.getHeader = async (req, res) => {
//   try {
//     const header = await Header.findOne();
    
//     if (!header) {
//       return res.status(404).json({ message: "Header content not found" });
//     }
    
//     res.json(header);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching header", error: err.message });
//   }
// };

// // exports.updateHeader = async (req, res) => {
// //   try {
// //     const existing = await Header.findOne();
// //     let logoUrl = existing?.logoUrl || "";

// //     if (req.file) {
// //       const uploaded = await cloudinary.uploader.upload(req.file.path, {
// //         folder: "header"
// //       });
// //       logoUrl = uploaded.secure_url;
// //     }

// //     const updated = await Header.findOneAndUpdate(
// //       {},
// //       {
// //         logoUrl: logoUrl,
// //         brandName: req.body.brandName,
// //         tagline: req.body.tagline,
// //         homeLabel: req.body.homeLabel,
// //         aboutLabel: req.body.aboutLabel,
// //         productsLabel: req.body.productsLabel,
// //         galleryLabel: req.body.galleryLabel,
// //         contactLabel: req.body.contactLabel
// //       },
// //       { new: true, upsert: true }
// //     );

// //     res.json({
// //       message: "Header updated successfully",
// //       data: updated
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// exports.updateHeader = async (req, res) => {
//   try {
//     let logoUrl;

//     if (req.file) {
//       const uploaded = await cloudinary.uploader.upload(req.file.path);
//       logoUrl = uploaded.secure_url;
//     }

//     const updated = await Header.findOneAndUpdate(
//       {},
//       {
//         logoUrl: logoUrl,
//         brandName: req.body.brandName,
//         tagline: req.body.tagline,
//         // menu: JSON.parse(req.body.menu)
//         homeLabel: req.body.homeLabel,
//         aboutLabel: req.body.aboutLabel,
//         productsLabel: req.body.productsLabel,
//         galleryLabel: req.body.galleryLabel,
//         contactLabel: req.body.contactLabel
//       },
//       { new: true, upsert: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };









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
