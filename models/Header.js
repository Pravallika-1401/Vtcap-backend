// const mongoose = require("mongoose");

// const headerSchema = new mongoose.Schema({
//   logo: String,
//   title: String,
//   subtitle: String,
//   menu: [
//     {
//       name: String,
//       link: String
//     }
//   ]
// });

// module.exports = mongoose.model("Header", headerSchema);




// const mongoose = require("mongoose");
// const headerSchema = new mongoose.Schema({
//   brandName: { 
//     type: String,
//     default: "Your Brand"
//   },
//   tagline: { 
//     type: String 
//   },
//   logoUrl: { 
//     type: String 
//   },
//   homeLabel: { 
//     type: String, 
//     default: "Home" 
//   },
//   aboutLabel: { 
//     type: String, 
//     default: "About" 
//   },
//   productsLabel: { 
//     type: String, 
//     default: "Products" 
//   },
//   galleryLabel: { 
//     type: String, 
//     default: "Gallery" 
//   },
//   contactLabel: { 
//     type: String, 
//     default: "Contact" 
//   },
//   },{
//     timestamps: true
// });

// module.exports = mongoose.model("Header", headerSchema);



// const mongoose = require("mongoose");

// const headerSchema = new mongoose.Schema({
//   brandName: { 
//     type: String,
//     default: "Your Brand",
//     trim: true
//   },
//   tagline: { 
//     type: String,
//     trim: true
//   },
//   logoUrl: { 
//     type: String,
//     trim: true
//   },
//   homeLabel: { 
//     type: String, 
//     default: "Home",
//     trim: true
//   },
//   aboutLabel: { 
//     type: String, 
//     default: "About",
//     trim: true
//   },
//   productsLabel: { 
//     type: String, 
//     default: "Products",
//     trim: true
//   },
//   galleryLabel: { 
//     type: String, 
//     default: "Gallery",
//     trim: true
//   },
//   contactLabel: { 
//     type: String, 
//     default: "Contact",
//     trim: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model("Header", headerSchema);




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
