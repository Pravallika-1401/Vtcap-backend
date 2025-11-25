// const mongoose = require("mongoose");

// const gallerySchema = new mongoose.Schema({
//   images: [String]
// });

// module.exports = mongoose.model("Gallery", gallerySchema);






// const mongoose = require("mongoose");
// const gallerySchema = new mongoose.Schema(
//   {
//     title: { 
//       type: String,
//       trim: true
//     },
//     imageUrl: { 
//       type: String, 
//       required: true 
//     },
//     isFeatured: { 
//       type: Boolean, 
//       default: false 
//     }
//   },
//   { 
//     timestamps: true 
//   }
// );

// module.exports = mongoose.model("Gallery", gallerySchema);




// const mongoose = require("mongoose");

// const gallerySchema = new mongoose.Schema(
//   {
//     title: { 
//       type: String,
//       trim: true,
//       default: "Gallery Image"
//     },
//     imageUrl: { 
//       type: String, 
//       required: [true, "Image URL is required"]
//     },
//     isFeatured: { 
//       type: Boolean, 
//       default: false 
//     }
//   },
//   { 
//     timestamps: true 
//   }
// );

// // Index for faster featured queries
// gallerySchema.index({ isFeatured: 1 });

// module.exports = mongoose.model("Gallery", gallerySchema);








const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Gallery", gallerySchema);
