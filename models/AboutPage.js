const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  year: String,
  title: String,
  description: String
});

const aboutPageSchema = new mongoose.Schema({
  // HERO
  pageTitle: { type: String, default: "About VTC Corporation" },
  heroText: { type: String },

  // MISSION & VISION
  mission: { type: String },
  vision: { type: String },

  // CEO SECTION
  ceoName: { type: String, default: "Mr. Sushil Kumar Patwari" },
  ceoDescription1: { type: String },
  ceoDescription2: { type: String },
  ceoImages: [String],   // MULTIPLE IMAGES

  // TEAM SECTION
  teamTitle: { type: String, default: "The VTC Team" },
  teamDescription1: { type: String },
  teamDescription2: { type: String },
  teamImages: [String],   // MULTIPLE IMAGES

  // TIMELINE
  milestones: [milestoneSchema],

  // WHY CHOOSE US SECTION
  whyChooseUs: [String],

}, { timestamps: true });

module.exports = mongoose.model("AboutPage", aboutPageSchema);
