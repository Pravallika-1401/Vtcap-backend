// const Footer = require("../models/Footer");
// const ErrorResponse = require("../utils/errorResponse");

// // // In controller
// // if (!product) {
// //   return next(new ErrorResponse("Product not found", 404));
// // }

// // exports.getFooter = async (req, res) => {
// //   const footer = await Footer.findOne();
// //   res.json(footer);
// // };

// exports.getFooter = async (req, res) => {
//   try {
//     const footer = await Footer.findOne();
    
//     if (!footer) {
//       return res.status(404).json({ message: "Footer content not found" });
//     }
    
//     res.json(footer);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching footer", error: err.message });
//   }
// };

// exports.updateFooter = async (req, res) => {
//   try {
//     const updated = await Footer.findOneAndUpdate(
//       {},
//       {
//         // copyrightText: req.body.copyrightText,
//         // links: JSON.parse(req.body.links),
//         // links: req.body.links ? JSON.parse(req.body.links) : [],
//         // social: JSON.parse(req.body.social)
//         // social: req.body.links ? JSON.parse(req.body.links) : []
//         copyrightText: req.body.copyrightText,
//           facebook: req.body.facebook,
//           instagram: req.body.instagram,
//           linkedin: req.body.linkedin
//       },
//       { new: true, upsert: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };





const Footer = require("../models/Footer");

exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ message: "Footer content not found" });
    }
    res.json(footer);
  } catch (err) {
    res.status(500).json({ 
      message: "Error fetching footer", 
      error: err.message 
    });
  }
};

exports.updateFooter = async (req, res) => {
  try {
    const updated = await Footer.findOneAndUpdate(
      {},
      {
        description: req.body.description,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        linkedin: req.body.linkedin,
        twitter: req.body.twitter,
        whatsapp: req.body.whatsapp,

        address: req.body.address,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        email: req.body.email,

        copyrightText: req.body.copyrightText
      },
      { new: true, upsert: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ 
      message: err.message 
    });
  }
};
