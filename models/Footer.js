// const mongoose = require("mongoose");

// const footerSchema = new mongoose.Schema({
//   text: String,
//   links: [
//     {
//       name: String,
//       url: String
//     }
//   ],
//   social: [
//     {
//       platform: String,
//       url: String
//     }
//   ]
// });

// module.exports = mongoose.model("Footer", footerSchema);





// const mongoose = require("mongoose");

// const footerSchema = new mongoose.Schema({
//   copyrightText: { 
//     type: String,
//     default: "© 2025 Your Company. All rights reserved."
//   },
//   facebook: { 
//     type: String 
//   },
//   instagram: { 
//     type: String 
//   },
//   linkedin: { 
//     type: String 
//   }
// });

// module.exports = mongoose.model("Footer", footerSchema);



// const mongoose = require("mongoose");

// const footerSchema = new mongoose.Schema({
//   copyrightText: { 
//     type: String,
//     default: "© 2025 Your Company. All rights reserved."
//   },
//   facebook: { 
//     type: String,
//     trim: true
//   },
//   instagram: { 
//     type: String,
//     trim: true
//   },
//   linkedin: { 
//     type: String,
//     trim: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model("Footer", footerSchema);





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
