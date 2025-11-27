const Footer = require("../models/Footer");

exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ message: "Footer content not found" });
    }
    res.json(footer);
  } catch (err) {
    res.status(500).json({ 
      message: "Error fetching footer", 
      error: err.message 
    });
  }
};

exports.updateFooter = async (req, res) => {
  try {
    const updated = await Footer.findOneAndUpdate(
      {},
      {
        description: req.body.description,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        linkedin: req.body.linkedin,
        twitter: req.body.twitter,
        whatsapp: req.body.whatsapp,

        address: req.body.address,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        email: req.body.email,

        copyrightText: req.body.copyrightText
      },
      { new: true, upsert: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ 
      message: err.message 
    });
  }
};
