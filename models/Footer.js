const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  description: {
    type: String,
    default: "Your trusted partner for premium building materials and home solutions."
  },

  // SOCIAL LINKS
  facebook: { type: String, trim: true },
  instagram: { type: String, trim: true },
  linkedin: { type: String, trim: true },
  twitter: { type: String, trim: true },
  whatsapp: { type: String, trim: true },

  // CONTACT SECTION
  address: { type: String, trim: true },
  phone1: { type: String, trim: true },
  phone2: { type: String, trim: true },
  email: { type: String, trim: true },

  // COPYRIGHT
  copyrightText: {
    type: String,
    default: "© 2025 VTC Corporation. All rights reserved."
  }

}, { timestamps: true });

module.exports = mongoose.model("Footer", footerSchema);
