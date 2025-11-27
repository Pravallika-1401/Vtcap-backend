
const AboutHome = require("../models/AboutHome");
const cloudinary = require("../config/cloudinary");

// GET About Home Data
exports.getAboutHome = async (req, res) => {
  try {
    let about = await AboutHome.findOne();

    if (!about) {
      about = await AboutHome.create({});
    }

    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Error fetching About Home", error: err.message });
  }
};


// UPDATE ABOUT MAIN FIELDS (title + desc + mainImage)
exports.updateAboutHome = async (req, res) => {
  try {
    let about = await AboutHome.findOne() || await AboutHome.create({});
    let imageUrl = about.mainImage;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "about-home-main"
      });
      imageUrl = upload.secure_url;
    }

    about.title = req.body.title || about.title;
    about.description1 = req.body.description1 || about.description1;
    about.description2 = req.body.description2 || about.description2;
    about.mainImage = imageUrl;

    await about.save();

    res.json({ message: "About updated", data: about });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




exports.addTrustedLogo = async (req, res) => {
  try {
    // ✅ FILE VALIDATION
    if (!req.file) {
      return res.status(400).json({ message: "Logo image is required" });
    }

    let about = await AboutHome.findOne() || await AboutHome.create({});
    
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "trusted-logos"
    });

    about.trustedLogos.push({
      name: req.body.name || "Trusted Partner",
      logoUrl: upload.secure_url
    });

    await about.save();
    res.json({ message: "Trusted logo added", data: about.trustedLogos });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE TRUSTED LOGO
exports.deleteTrustedLogo = async (req, res) => {
  try {
    const about = await AboutHome.findOne();
    if (!about) return res.status(404).json({ message: "Not found" });

    about.trustedLogos = about.trustedLogos.filter(
      (l) => l._id.toString() !== req.params.id
    );

    await about.save();

    res.json({ message: "Trusted logo removed", data: about.trustedLogos });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addAuthorizedLogo = async (req, res) => {
  try {
    // ✅ FILE VALIDATION
    if (!req.file) {
      return res.status(400).json({ message: "Logo image is required" });
    }

    let about = await AboutHome.findOne() || await AboutHome.create({});

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "authorized-logos"
    });

    about.authorizedLogos.push({
      name: req.body.name || "Authorized Dealer",
      logoUrl: upload.secure_url
    });

    await about.save();
    res.json({ message: "Authorized logo added", data: about.authorizedLogos });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE AUTHORIZED LOGO
exports.deleteAuthorizedLogo = async (req, res) => {
  try {
    const about = await AboutHome.findOne();
    if (!about) return res.status(404).json({ message: "Not found" });

    about.authorizedLogos = about.authorizedLogos.filter(
      (l) => l._id.toString() !== req.params.id
    );

    await about.save();

    res.json({ message: "Authorized logo removed", data: about.authorizedLogos });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
