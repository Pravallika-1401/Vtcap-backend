// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: Number,
//   shortDescription: String,
//   longDescription: String,
//   image: String,
//   category: String,
//   slug: { type: String, unique: true }
// });

// module.exports = mongoose.model("Product", productSchema);






// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { 
//       type: String, 
//       required: [true, "Product name is required"],
//       trim: true 
//     },
//     slug: { 
//       type: String, 
//       required: true, 
//       unique: true,
//       lowercase: true,
//       trim: true
//     },
//     shortDescription: { 
//       type: String,
//       maxlength: 200 
//     },
//     longDescription: { 
//       type: String 
//     },
//     category: { 
//       type: String,
//       required: [true, "Category is required"]
//     },
//     image: { 
//       type: String 
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

// // Auto-generate slug from name if not provided
// productSchema.pre("save", function (next) {
//   if (!this.slug && this.name) {
//     this.slug = this.name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/^-+|-+$/g, "");
//   }
//   next();
// });

// module.exports = mongoose.model("Product", productSchema);




// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { 
//       type: String, 
//       required: [true, "Product name is required"],
//       trim: true 
//     },
//     slug: { 
//       type: String, 
//       required: true, 
//       unique: true,
//       lowercase: true,
//       trim: true
//     },
//     price: {
//       type: Number,
//       min: [0, "Price cannot be negative"]
//     },
//     shortDescription: { 
//       type: String,
//       maxlength: [200, "Short description cannot exceed 200 characters"]
//     },
//     longDescription: { 
//       type: String 
//     },
//     category: { 
//       type: String,
//       required: [true, "Category is required"],
//       trim: true
//     },
//     image: { 
//       type: String 
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

// // Auto-generate slug from name if not provided
// productSchema.pre("save", function (next) {
//   if (!this.slug && this.name) {
//     this.slug = this.name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/^-+|-+$/g, "");
//   }
//   next();
// });

// // Create index for better query performance
// productSchema.index({ slug: 1 });
// productSchema.index({ category: 1 });

// module.exports = mongoose.model("Product", productSchema);



const mongoose = require("mongoose");

const brandCardSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  image: { 
    type: String, 
    required: true 
  },
  products: {
    type: [String],       // Array of product names (strings)
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("BrandCard", brandCardSchema);
