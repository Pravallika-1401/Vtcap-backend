// const mongoose = require("mongoose");

// const heroSchema = new mongoose.Schema({
//   heading: String,
//   subHeading: String,
//   bgImage: String
// });

// module.exports = mongoose.model("Hero", heroSchema);



// const mongoose = require("mongoose");

// const heroSchema = new mongoose.Schema({
//   title: { 
//     type: String,
//     default: "Welcome to Our Website"
//   },
//   subtitle: { 
//     type: String 
//   },
//   buttonText: { 
//     type: String,
//     default: "Learn More"
//   },
//   buttonLink: { 
//     type: String,
//     default: "#products"
//   },
//   backgroundUrl: { 
//     type: String 
//   }
//   },{
//     timestamps: true
//   });

// module.exports = mongoose.model("Hero", heroSchema);






// const mongoose = require("mongoose");

// const heroSchema = new mongoose.Schema({
//   title: { 
//     type: String,
//     default: "Welcome to Our Website",
//     trim: true
//   },
//   subtitle: { 
//     type: String,
//     trim: true
//   },
//   buttonText: { 
//     type: String,
//     default: "Learn More",
//     trim: true
//   },
//   buttonLink: { 
//     type: String,
//     default: "#products",
//     trim: true
//   },
//   backgroundUrl: { 
//     type: String,
//     trim: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model("Hero", heroSchema);





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
