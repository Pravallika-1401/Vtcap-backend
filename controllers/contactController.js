const Contact = require("../models/Contact");
const ErrorResponse = require("../utils/errorResponse");

// // In controller
// if (!product) {
//   return next(new ErrorResponse("Product not found", 404));
// }

// exports.getContact = async (req, res) => {
//   const contact = await Contact.findOne();
//   res.json(contact);
// };

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    
    if (!contact) {
      return res.status(404).json({ message: "Contact information not found" });
    }
    
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contact info", error: err.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const updated = await Contact.findOneAndUpdate(
      {},
      {
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        mapEmbedUrl: req.body.mapEmbedUrl,
        whatsapp: req.body.whatsapp
      },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// exports.submitMessage = async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     if (!name || !email || !phone || !message) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     // In DB store or you can send email
//     // For now, just return success
//     res.json({ message: "Message received successfully" });

//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
exports.submitMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    res.json({ message: "Message received successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

