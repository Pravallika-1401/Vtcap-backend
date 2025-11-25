// const AboutHome = require("../models/AboutHome");
// const cloudinary = require("../config/cloudinary");

// exports.getAboutHome = async (req, res) => {
//   const about = await AboutHome.findOne();
//   res.json(about);
// };

// exports.updateAboutHome = async (req, res) => {
//   try {
//     let imageUrl;

//     if (req.file) {
//       const uploaded = await cloudinary.uploader.upload(req.file.path);
//       imageUrl = uploaded.secure_url;
//     }

//     const updated = await AboutHome.findOneAndUpdate(
//       {},
//       {
//         title: req.body.title,
//         content: req.body.content,
//         imageUrl: imageUrl,
//         subtitle: req.body.subtitle
//       },
//       { new: true, upsert: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };






// const AboutHome = require("../models/AboutHome");
// const cloudinary = require("../config/cloudinary");
// const ErrorResponse = require("../utils/errorResponse");

// // // In controller
// // if (!product) {
// //   return next(new ErrorResponse("Product not found", 404));
// // }

// exports.getAboutHome = async (req, res) => {
//   try {
//     const about = await AboutHome.findOne();
    
//     if (!about) {
//       return res.status(404).json({ message: "About Home content not found" });
//     }
    
//     res.json(about);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching About Home", error: err.message });
//   }
// };

// exports.updateAboutHome = async (req, res) => {
//   try {
//     // Get existing data to preserve imageUrl if no new upload
//     const existing = await AboutHome.findOne();
//     let imageUrl = existing?.imageUrl || "";

//     // Only upload new image if provided
//     if (req.file) {
//       const uploaded = await cloudinary.uploader.upload(req.file.path, {
//         folder: "about-home"
//       });
//       imageUrl = uploaded.secure_url;
//     }

//     const updated = await AboutHome.findOneAndUpdate(
//       {},
//       {
//         title: req.body.title,
//         content: req.body.content,
//         imageUrl: imageUrl,
//         subtitle: req.body.subtitle
//       },
//       { new: true, upsert: true }
//     );

//     res.json({
//       message: "About Home updated successfully",
//       data: updated
//     });
//   } catch (err) {
//     res.status(500).json({ 
//       message: "Error updating About Home", 
//       error: err.message 
//     });
//   }
// };






const AboutHome = require("../models/AboutHome");
const cloudinary = require("../config/cloudinary");

// GET About Home Data
exports.getAboutHome = async (req, res) => {
  try {
    let about = await AboutHome.findOne();

    if (!about) {
      about = await AboutHome.create({});
    }

    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Error fetching About Home", error: err.message });
  }
};


// UPDATE ABOUT MAIN FIELDS (title + desc + mainImage)
exports.updateAboutHome = async (req, res) => {
  try {
    let about = await AboutHome.findOne() || await AboutHome.create({});
    let imageUrl = about.mainImage;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "about-home-main"
      });
      imageUrl = upload.secure_url;
    }

    about.title = req.body.title || about.title;
    about.description1 = req.body.description1 || about.description1;
    about.description2 = req.body.description2 || about.description2;
    about.mainImage = imageUrl;

    await about.save();

    res.json({ message: "About updated", data: about });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ADD TRUSTED BY LOGO
exports.addTrustedLogo = async (req, res) => {
  try {
    let about = await AboutHome.findOne() || await AboutHome.create({});
    
    let logoUrl = "";
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "trusted-logos"
      });
      logoUrl = upload.secure_url;
    }

    about.trustedLogos.push({
      name: req.body.name || "",
      logoUrl
    });

    await about.save();

    res.json({ message: "Trusted logo added", data: about.trustedLogos });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE TRUSTED LOGO
exports.deleteTrustedLogo = async (req, res) => {
  try {
    const about = await AboutHome.findOne();
    if (!about) return res.status(404).json({ message: "Not found" });

    about.trustedLogos = about.trustedLogos.filter(
      (l) => l._id.toString() !== req.params.id
    );

    await about.save();

    res.json({ message: "Trusted logo removed", data: about.trustedLogos });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ADD AUTHORIZED LOGO
exports.addAuthorizedLogo = async (req, res) => {
  try {
    let about = await AboutHome.findOne() || await AboutHome.create({});

    let logoUrl = "";
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "authorized-logos"
      });
      logoUrl = upload.secure_url;
    }

    about.authorizedLogos.push({
      name: req.body.name || "",
      logoUrl
    });

    await about.save();

    res.json({ message: "Authorized logo added", data: about.authorizedLogos });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE AUTHORIZED LOGO
exports.deleteAuthorizedLogo = async (req, res) => {
  try {
    const about = await AboutHome.findOne();
    if (!about) return res.status(404).json({ message: "Not found" });

    about.authorizedLogos = about.authorizedLogos.filter(
      (l) => l._id.toString() !== req.params.id
    );

    await about.save();

    res.json({ message: "Authorized logo removed", data: about.authorizedLogos });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
