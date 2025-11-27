const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, required: true }
});

const heroSchema = new mongoose.Schema({
  slides: [slideSchema]
}, { timestamps: true });

module.exports = mongoose.model("Hero", heroSchema);
