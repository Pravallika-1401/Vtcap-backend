const Hero = require("../models/Hero");
const cloudinary = require("../config/cloudinary");


// GET HERO SLIDES
exports.getHero = async (req, res) => {
  try {
    let hero = await Hero.findOne();

    // If no data → create empty record
    if (!hero) {
      hero = await Hero.create({ slides: [] });
    }

    res.json(hero.slides);

  } catch (err) {
    res.status(500).json({ message: "Error fetching hero", error: err.message });
  }
};



exports.addSlide = async (req, res) => {
  try {
    // ✅ VALIDATIONS
    if (!req.file) {
      return res.status(400).json({ message: "Slide image is required" });
    }

    if (!req.body.title || !req.body.category) {
      return res.status(400).json({ 
        message: "Title and category are required" 
      });
    }

    let hero = await Hero.findOne() || await Hero.create({ slides: [] });

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "hero_slides"
    });

    hero.slides.push({
      category: req.body.category,
      title: req.body.title,
      description: req.body.description || "",
      image: upload.secure_url
    });

    await hero.save();
    res.json({ message: "Slide added", slides: hero.slides });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE SLIDE
exports.updateSlide = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) return res.status(404).json({ message: "Hero not found" });

    const slide = hero.slides.id(req.params.id);
    if (!slide) return res.status(404).json({ message: "Slide not found" });

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "hero_slides"
      });
      slide.image = upload.secure_url;
    }

    slide.category = req.body.category || slide.category;
    slide.title = req.body.title || slide.title;
    slide.description = req.body.description || slide.description;

    await hero.save();

    res.json({ message: "Slide updated", slides: hero.slides });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE SLIDE
exports.deleteSlide = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) return res.status(404).json({ message: "Hero not found" });

    hero.slides = hero.slides.filter(s => s._id.toString() !== req.params.id);
    await hero.save();

    res.json({ message: "Slide deleted", slides: hero.slides });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getHeroAdmin = async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) hero = await Hero.create({ slides: [] });
    res.json(hero);  // SLIDES array inside hero object
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

