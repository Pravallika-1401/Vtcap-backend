const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema({
  name: String,
  logoUrl: String
});

const aboutHomeSchema = new mongoose.Schema({
  title: { type: String, default: "About VTC Corporation" },

  description1: { type: String, default: "" },
  description2: { type: String, default: "" },

  mainImage: { type: String, default: "" },

  trustedLogos: [logoSchema],        // Trusted By logos
  authorizedLogos: [logoSchema],     // Authorized Distributor logos

}, { timestamps: true });

module.exports = mongoose.model("AboutHome", aboutHomeSchema);
