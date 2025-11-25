// const AboutPage = require("../models/AboutPage");
// const cloudinary = require("../config/cloudinary");

// exports.getAboutPage = async (req, res) => {
//   const data = await AboutPage.findOne();
//   res.json(data);
// };

// exports.updateAboutPage = async (req, res) => {
//   try {
//     // let imageUrl = [];

//     // if (req.files && req.files.length > 0) {
//     let imageUrl;  
// if (req.file) {  
//   const uploaded = await cloudinary.uploader.upload(req.file.path);
//   imageUrl = uploaded.secure_url;
//       for (const file of req.files) {
//         const uploaded = await cloudinary.uploader.upload(file.path);
//         imageUrl.push(uploaded.secure_url);
//       }
//     }

//     const updated = await AboutPage.findOneAndUpdate(
//       {},
//       {
//         pageTitle: req.body.pageTitle,
//         mainContent: req.body.mainContent,
//         imageUrl,
//         heroText: req.body.heroText
//       },
//       { new: true, upsert: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };





// const AboutPage = require("../models/AboutPage");
// const cloudinary = require("../config/cloudinary");
// const ErrorResponse = require("../utils/errorResponse");

// // In controller
// // if (!product) {
// //   return next(new ErrorResponse("Product not found", 404));
// // }

// // exports.getAboutPage = async (req, res) => {
// //   const data = await AboutPage.findOne();
// //   res.json(data);
// // };
// exports.getAboutPage = async (req, res) => {
//   try {
//     const data = await AboutPage.findOne();
    
//     if (!data) {
//       return res.status(404).json({ message: "About Page content not found" });
//     }
    
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching About Page", error: err.message });
//   }
// };

// // exports.updateAboutPage = async (req, res) => {
// //   try {
// //     let imageUrl;

// //     if (req.file) {
// //       const uploaded = await cloudinary.uploader.upload(req.file.path);
// //       imageUrl = uploaded.secure_url;
// //     }

// //     const updated = await AboutPage.findOneAndUpdate(
// //       {},
// //       {
// //         pageTitle: req.body.pageTitle,
// //         mainContent: req.body.mainContent,
// //         imageUrl: imageUrl,
// //         heroText: req.body.heroText
// //       },
// //       { new: true, upsert: true }
// //     );

// //     res.json(updated);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// exports.updateAboutPage = async (req, res) => {
//   try {
//     // Get existing data to preserve imageUrl if no new upload
//     const existing = await AboutPage.findOne();
//     let imageUrl = existing?.imageUrl || "";

//     if (req.file) {
//       const uploaded = await cloudinary.uploader.upload(req.file.path, {
//         folder: "about-page"
//       });
//       imageUrl = uploaded.secure_url;
//     }

//     const updated = await AboutPage.findOneAndUpdate(
//       {},
//       {
//         pageTitle: req.body.pageTitle,
//         mainContent: req.body.mainContent,
//         imageUrl: imageUrl,
//         heroText: req.body.heroText
//       },
//       { new: true, upsert: true }
//     );

//     res.json({
//       message: "About Page updated successfully",
//       data: updated
//     });
//   } catch (err) {
//     res.status(500).json({ 
//       message: "Error updating About Page", 
//       error: err.message 
//     });
//   }
// };







const AboutPage = require("../models/AboutPage");
const cloudinary = require("../config/cloudinary");

exports.getAboutPage = async (req, res) => {
  try {
    const data = await AboutPage.findOne();
    if (!data) return res.status(404).json({ message: "About Page not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching About Page", error: err.message });
  }
};

exports.updateAboutPage = async (req, res) => {
  try {
    const existing = await AboutPage.findOne();

    // -------------------------
    // MULTIPLE IMAGE UPLOADS
    // -------------------------
    let ceoImages = existing?.ceoImages || [];
    let teamImages = existing?.teamImages || [];

    if (req.files?.ceoImages) {
      ceoImages = [];
      for (const file of req.files.ceoImages) {
        const uploaded = await cloudinary.uploader.upload(file.path, { folder: "about/ceo" });
        ceoImages.push(uploaded.secure_url);
      }
    }

    if (req.files?.teamImages) {
      teamImages = [];
      for (const file of req.files.teamImages) {
        const uploaded = await cloudinary.uploader.upload(file.path, { folder: "about/team" });
        teamImages.push(uploaded.secure_url);
      }
    }

    const updated = await AboutPage.findOneAndUpdate(
      {},
      {
        pageTitle: req.body.pageTitle,
        heroText: req.body.heroText,

        mission: req.body.mission,
        vision: req.body.vision,

        ceoName: req.body.ceoName,
        ceoDescription1: req.body.ceoDescription1,
        ceoDescription2: req.body.ceoDescription2,
        ceoImages,

        teamTitle: req.body.teamTitle,
        teamDescription1: req.body.teamDescription1,
        teamDescription2: req.body.teamDescription2,
        teamImages,

        milestones: req.body.milestones ? JSON.parse(req.body.milestones) : existing?.milestones,
        whyChooseUs: req.body.whyChooseUs ? JSON.parse(req.body.whyChooseUs) : existing?.whyChooseUs
      },
      { new: true, upsert: true }
    );

    res.json({ message: "About Page Updated Successfully", data: updated });

  } catch (err) {
    res.status(500).json({ message: "Error updating About page", error: err.message });
  }
};
