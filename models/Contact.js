const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  address: { 
    type: String,
    trim: true
  },
  phone: { 
    type: String,
    trim: true
  },
  email: { 
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
  },
  whatsapp: { 
    type: String,
    trim: true
  },
  mapEmbedUrl: { 
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);
