// const mongoose = require("mongoose");

// const brandSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true }, 
//     slug: { type: String, required: true, unique: true },

//     // Hero section
//     logoUrl: { type: String },
//     heroTitle: { type: String },
//     heroSubtitle: { type: String },
//     heroDescription: { type: String },

//     // About section
//     aboutTitle: { type: String },
//     aboutText: { type: String },

//     // What we offer
//     offerTitle: { type: String },
//     offerText: { type: String },

//     // Product ranges for that brand page
//     productRanges: [
//       {
//         title: String,
//         description: String,
//       },
//     ],

//     // Card info for Products main page
//     cardTitle: String,
//     cardSubtitle: String,
//     cardImageUrl: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Brand", brandSchema);






// const express = require("express");
// const router = express.Router();
// const {
//   createBrand,
//   getBrands,
//   getBrandBySlug,
//   updateBrand,
//   deleteBrand,
// } = require("../controllers/brandController");

// const upload = require("../middleware/uploadMiddleware");

// // Create new brand
// router.post("/", upload.single("logo"), createBrand);

// // Get all brands
// router.get("/", getBrands);

// // Get one brand by slug
// router.get("/:slug", getBrandBySlug);

// // Update brand
// router.put("/:id", upload.single("logo"), updateBrand);

// // Delete brand
// router.delete("/:id", deleteBrand);

// module.exports = router;







// const mongoose = require("mongoose");

// const brandSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   slug: { type: String, required: true, unique: true },
//   heroImage: { type: String, required: true },
//   aboutText: { type: String, required: true },
//   offerText: { type: String, required: true },
//   products: [{ type: String }],
// });

// module.exports = mongoose.model("Brand", brandSchema);




const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Brand name is required"],
    trim: true
  },
  slug: { 
    type: String, 
    required: [true, "Slug is required"], 
    unique: true,
    lowercase: true,
    trim: true
  },
  heroImage: { 
    type: String 
    // Remove required: true to allow creation without image initially
  },
  aboutText: { 
    type: String,
    default: ""
  },
  offerText: { 
    type: String,
    default: ""
  },
  products: [{ type: String }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Brand", brandSchema);