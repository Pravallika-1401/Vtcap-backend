
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