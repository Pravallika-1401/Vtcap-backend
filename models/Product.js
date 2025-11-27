const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Brand name is required"],
    trim: true
  },
  image: { 
    type: String, 
    required: [true, "Brand image is required"]
  },
  products: {
    type: [String],
    required: [true, "Products list is required"],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: "Products array cannot be empty"
    }
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);