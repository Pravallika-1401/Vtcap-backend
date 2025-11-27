const AboutPage = require("../models/AboutPage");
const cloudinary = require("../config/cloudinary");

exports.getAboutPage = async (req, res) => {
  try {
    const data = await AboutPage.findOne();
    if (!data) return res.status(404).json({ message: "About Page not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching About Page", error: err.message });
  }
};

exports.updateAboutPage = async (req, res) => {
  try {
    const existing = await AboutPage.findOne();

    // -------------------------
    // MULTIPLE IMAGE UPLOADS
    // -------------------------
    let ceoImages = existing?.ceoImages || [];
    let teamImages = existing?.teamImages || [];

    if (req.files?.ceoImages) {
      ceoImages = [];
      for (const file of req.files.ceoImages) {
        const uploaded = await cloudinary.uploader.upload(file.path, { folder: "about/ceo" });
        ceoImages.push(uploaded.secure_url);
      }
    }

    if (req.files?.teamImages) {
      teamImages = [];
      for (const file of req.files.teamImages) {
        const uploaded = await cloudinary.uploader.upload(file.path, { folder: "about/team" });
        teamImages.push(uploaded.secure_url);
      }
    }

    const updated = await AboutPage.findOneAndUpdate(
      {},
      {
        pageTitle: req.body.pageTitle,
        heroText: req.body.heroText,

        mission: req.body.mission,
        vision: req.body.vision,

        ceoName: req.body.ceoName,
        ceoDescription1: req.body.ceoDescription1,
        ceoDescription2: req.body.ceoDescription2,
        ceoImages,

        teamTitle: req.body.teamTitle,
        teamDescription1: req.body.teamDescription1,
        teamDescription2: req.body.teamDescription2,
        teamImages,

        milestones: req.body.milestones ? JSON.parse(req.body.milestones) : existing?.milestones,
        whyChooseUs: req.body.whyChooseUs ? JSON.parse(req.body.whyChooseUs) : existing?.whyChooseUs
      },
      { new: true, upsert: true }
    );

    res.json({ message: "About Page Updated Successfully", data: updated });

  } catch (err) {
    res.status(500).json({ message: "Error updating About page", error: err.message });
  }
};
