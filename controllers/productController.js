// const Product = require("../models/Product");
// const cloudinary = require("../config/cloudinary");

// exports.getProducts = async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// };

// exports.getProduct = async (req, res) => {
//   const product = await Product.findOne({ slug: req.params.slug });
//   res.json(product);
// };

// exports.createProduct = async (req, res) => {
//   try {
//     let imageUrl = "";

//     if (req.file) {
//       const uploaded = await cloudinary.uploader.upload(req.file.path);
//       imageUrl = uploaded.secure_url;
//     }

//     const newProduct = await Product.create({
//       name: req.body.name,
//       price: req.body.price,
//       shortDescription: req.body.shortDescription,
//       longDescription: req.body.longDescription,
//       category: req.body.category,
//       slug: req.body.slug,
//       image: imageUrl
//     });

//     res.json(newProduct);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     let imageUrl = req.body.image;

//     if (req.file) {
//       const uploaded = await cloudinary.uploader.upload(req.file.path);
//       imageUrl = uploaded.secure_url;
//     }

//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name,
//         price: req.body.price,
//         shortDescription: req.body.shortDescription,
//         longDescription: req.body.longDescription,
//         category: req.body.category,
//         slug: req.body.slug,
//         image: imageUrl
//       },
//       { new: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Product Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };























// const Product = require("../models/Product");
// const cloudinary = require("../config/cloudinary");

// // Helper function to delete image from cloudinary
// const deleteImageFromCloudinary = async (imageUrl) => {
//   try {
//     if (imageUrl) {
//       const publicId = imageUrl.split('/').pop().split('.')[0];
//       await cloudinary.uploader.destroy(publicId);
//     }
//   } catch (error) {
//     console.error('Error deleting image:', error);
//   }
// };

// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching products", error: err.message });
//   }
// };

// exports.getProduct = async (req, res) => {
//   try {
//     const product = await Product.findOne({ slug: req.params.slug });
    
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
    
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching product", error: err.message });
//   }
// };

// exports.createProduct = async (req, res) => {
//   try {
//     // Validation
//     if (!req.body.name || !req.body.slug || !req.body.category) {
//       return res.status(400).json({ 
//         message: "Name, slug, and category are required" 
//       });
//     }

//     // Check if slug already exists
//     const existingProduct = await Product.findOne({ slug: req.body.slug });
//     if (existingProduct) {
//       return res.status(400).json({ 
//         message: "Product with this slug already exists" 
//       });
//     }

//     let imageUrl = "";

//     if (req.file) {
//       const uploaded = await cloudinary.uploader.upload(req.file.path, {
//         folder: "products"
//       });
//       imageUrl = uploaded.secure_url;
//     }

//     const newProduct = await Product.create({
//       name: req.body.name,
//       price: req.body.price,
//       shortDescription: req.body.shortDescription,
//       longDescription: req.body.longDescription,
//       category: req.body.category,
//       slug: req.body.slug,
//       image: imageUrl
//     });

//     res.status(201).json({
//       message: "Product created successfully",
//       product: newProduct
//     });
//   } catch (err) {
//     res.status(500).json({ 
//       message: "Error creating product", 
//       error: err.message 
//     });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     const existingProduct = await Product.findById(req.params.id);
    
//     if (!existingProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     let imageUrl = existingProduct.image;

//     // If new image is uploaded, delete old one and upload new
//     if (req.file) {
//       // Delete old image from cloudinary
//       if (existingProduct.image) {
//         await deleteImageFromCloudinary(existingProduct.image);
//       }
      
//       const uploaded = await cloudinary.uploader.upload(req.file.path, {
//         folder: "products"
//       });
//       imageUrl = uploaded.secure_url;
//     }

//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name,
//         price: req.body.price,
//         shortDescription: req.body.shortDescription,
//         longDescription: req.body.longDescription,
//         category: req.body.category,
//         slug: req.body.slug,
//         image: imageUrl
//       },
//       { new: true, runValidators: true }
//     );

//     res.json({
//       message: "Product updated successfully",
//       product: updated
//     });
//   } catch (err) {
//     res.status(500).json({ 
//       message: "Error updating product", 
//       error: err.message 
//     });
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
    
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Delete image from cloudinary
//     if (product.image) {
//       await deleteImageFromCloudinary(product.image);
//     }

//     await Product.findByIdAndDelete(req.params.id);
    
//     res.json({ 
//       message: "Product deleted successfully" 
//     });
//   } catch (err) {
//     res.status(500).json({ 
//       message: "Error deleting product", 
//       error: err.message 
//     });
//   }
// };







// const Product = require("../models/Product");
// const cloudinary = require("../config/cloudinary");
// const ErrorResponse = require("../utils/errorResponse");

// // // In controller
// // if (!product) {
// //   return next(new ErrorResponse("Product not found", 404));
// // }

// // Helper function to delete image from cloudinary
// const deleteImageFromCloudinary = async (imageUrl) => {
//   try {
//     if (imageUrl) {
//       const publicId = imageUrl.split('/').pop().split('.')[0];
//       await cloudinary.uploader.destroy(`products/${publicId}`);
//     }
//   } catch (error) {
//     console.error('Error deleting image:', error);
//   }
// };

// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching products", error: err.message });
//   }
// };

// exports.getProduct = async (req, res) => {
//   try {
//     const product = await Product.findOne({ slug: req.params.slug });
    
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
    
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching product", error: err.message });
//   }
// };

// exports.createProduct = async (req, res) => {
//   try {
//     // Validation
//     if (!req.body.name || !req.body.slug || !req.body.category) {
//       return res.status(400).json({ 
//         message: "Name, slug, and category are required" 
//       });
//     }

//     // Check if slug already exists
//     const existingProduct = await Product.findOne({ slug: req.body.slug });
//     if (existingProduct) {
//       return res.status(400).json({ 
//         message: "Product with this slug already exists" 
//       });
//     }

//     let imageUrl = "";

//     if (req.file) {
//       const uploaded = await cloudinary.uploader.upload(req.file.path, {
//         folder: "products"
//       });
//       imageUrl = uploaded.secure_url;
//     }

//     const newProduct = await Product.create({
//       name: req.body.name,
//       price: req.body.price,
//       shortDescription: req.body.shortDescription,
//       longDescription: req.body.longDescription,
//       category: req.body.category,
//       slug: req.body.slug,
//       image: imageUrl
//     });

//     res.status(201).json({
//       message: "Product created successfully",
//       product: newProduct
//     });
//   } catch (err) {
//     res.status(500).json({ 
//       message: "Error creating product", 
//       error: err.message 
//     });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     const existingProduct = await Product.findById(req.params.id);
    
//     if (!existingProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     let imageUrl = existingProduct.image;

//     // If new image is uploaded, delete old one and upload new
//     if (req.file) {
//       // Delete old image from cloudinary
//       if (existingProduct.image) {
//         await deleteImageFromCloudinary(existingProduct.image);
//       }
      
//       const uploaded = await cloudinary.uploader.upload(req.file.path, {
//         folder: "products"
//       });
//       imageUrl = uploaded.secure_url;
//     }

//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name,
//         price: req.body.price,
//         shortDescription: req.body.shortDescription,
//         longDescription: req.body.longDescription,
//         category: req.body.category,
//         slug: req.body.slug,
//         image: imageUrl
//       },
//       { new: true, runValidators: true }
//     );

//     res.json({
//       message: "Product updated successfully",
//       product: updated
//     });
//   } catch (err) {
//     res.status(500).json({ 
//       message: "Error updating product", 
//       error: err.message 
//     });
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
    
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Delete image from cloudinary
//     if (product.image) {
//       await deleteImageFromCloudinary(product.image);
//     }

//     await Product.findByIdAndDelete(req.params.id);
    
//     res.json({ 
//       message: "Product deleted successfully" 
//     });
//   } catch (err) {
//     res.status(500).json({ 
//       message: "Error deleting product", 
//       error: err.message 
//     });
//   }
// };









// const BrandCard = require("../models/Product");
// const cloudinary = require("../config/cloudinary");

// // GET ALL BRAND CARDS
// exports.getBrands = async (req, res) => {
//   try {
//     const brands = await BrandCard.find().sort({ createdAt: -1 });
//     res.json(brands);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // CREATE BRAND CARD
// // exports.createBrand = async (req, res) => {
// //   try {
// //     let imgUrl = "";

// //     if (req.file) {
// //       const upload = await cloudinary.uploader.upload(req.file.path, {
// //         folder: "brand-cards"
// //       });
// //       imgUrl = upload.secure_url;
// //     }

// //     const brand = await BrandCard.create({
// //       name: req.body.name,
// //       image: imgUrl,
// //       products: JSON.parse(req.body.products) // Array
// //     });

// //     res.json({ message: "Brand created", brand });

// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };
// exports.createBrand = async (req, res) => {
//   try {
//     // ✅ ADD VALIDATIONS
//     if (!req.body.name) {
//       return res.status(400).json({ message: "Brand name is required" });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: "Brand image is required" });
//     }

//     if (!req.body.products) {
//       return res.status(400).json({ message: "Products list is required" });
//     }

//     let products;
//     try {
//       products = JSON.parse(req.body.products);
//       if (!Array.isArray(products) || products.length === 0) {
//         return res.status(400).json({ message: "Products must be a non-empty array" });
//       }
//     } catch (err) {
//       return res.status(400).json({ message: "Invalid products format" });
//     }

//     const upload = await cloudinary.uploader.upload(req.file.path, {
//       folder: "brand-cards"
//     });

//     const brand = await Product.create({ // ← Changed from BrandCard
//       name: req.body.name,
//       image: upload.secure_url,
//       products: products
//     });

//     res.json({ message: "Brand created", brand });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE BRAND CARD
// exports.updateBrand = async (req, res) => {
//   try {
//     const brand = await BrandCard.findById(req.params.id);
//     if (!brand) return res.status(404).json({ message: "Not found" });

//     let imgUrl = brand.image;

//     if (req.file) {
//       const upload = await cloudinary.uploader.upload(req.file.path, {
//         folder: "brand-cards"
//       });
//       imgUrl = upload.secure_url;
//     }

//     brand.name = req.body.name || brand.name;
//     brand.products = req.body.products ? JSON.parse(req.body.products) : brand.products;
//     brand.image = imgUrl;

//     await brand.save();

//     res.json({ message: "Brand updated", brand });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE BRAND CARD
// exports.deleteBrand = async (req, res) => {
//   try {
//     await BrandCard.findByIdAndDelete(req.params.id);
//     res.json({ message: "Brand removed" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };








const Product = require("../models/Product"); // ✅ Changed from BrandCard
const cloudinary = require("../config/cloudinary");

// GET ALL BRAND CARDS
exports.getBrands = async (req, res) => {
  try {
    const brands = await Product.find().sort({ createdAt: -1 });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE BRAND CARD
exports.createBrand = async (req, res) => {
  try {
    // ✅ VALIDATIONS
    if (!req.body.name) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Brand image is required" });
    }

    if (!req.body.products) {
      return res.status(400).json({ message: "Products list is required" });
    }

    let products;
    try {
      products = JSON.parse(req.body.products);
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ 
          message: "Products must be a non-empty array" 
        });
      }
    } catch (err) {
      return res.status(400).json({ message: "Invalid products format" });
    }

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "brand-cards"
    });

    const brand = await Product.create({ // ✅ Now Product is defined
      name: req.body.name,
      image: upload.secure_url,
      products: products
    });

    res.json({ message: "Brand created successfully", brand });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE BRAND CARD
exports.updateBrand = async (req, res) => {
  try {
    const brand = await Product.findById(req.params.id); // ✅ Changed
    
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    let imgUrl = brand.image;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "brand-cards"
      });
      imgUrl = upload.secure_url;
    }

    brand.name = req.body.name || brand.name;
    brand.image = imgUrl;
    
    if (req.body.products) {
      try {
        const products = JSON.parse(req.body.products);
        if (Array.isArray(products) && products.length > 0) {
          brand.products = products;
        }
      } catch (err) {
        return res.status(400).json({ message: "Invalid products format" });
      }
    }

    await brand.save();
    res.json({ message: "Brand updated successfully", brand });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE BRAND CARD
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Product.findByIdAndDelete(req.params.id); // ✅ Changed
    
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ message: "Brand deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};