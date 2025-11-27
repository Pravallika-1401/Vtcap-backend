const mongoose = require("mongoose");

const headerSchema = new mongoose.Schema({
  brandName: { type: String, default: "Your Brand" },
  tagline: { type: String, default: "Premium Building Materials" },
  logoUrl: { type: String, default: "" },

  homeLabel: { type: String, default: "Home" },
  aboutLabel: { type: String, default: "About" },
  productsLabel: { type: String, default: "Products" },
  galleryLabel: { type: String, default: "Gallery" },
  contactLabel: { type: String, default: "Contact" },
}, { timestamps: true });

module.exports = mongoose.model("Header", headerSchema);
