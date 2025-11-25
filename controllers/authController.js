const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

// // In controller
// if (!product) {
//   return next(new ErrorResponse("Product not found", 404));
// }

// exports.registerAdmin = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const adminExists = await Admin.findOne({ username });
//     if (adminExists) return res.status(400).json({ message: "Admin already exists" });

//     const hashed = await bcrypt.hash(password, 10);

//     const admin = await Admin.create({ username, password: hashed });

//     res.json(admin);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admin.create({ username, email, password: hashed });

    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// exports.loginAdmin = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const admin = await Admin.findOne({ username });
//     if (!admin) return res.status(404).json({ message: "Admin not found" });

//     const match = await bcrypt.compare(password, admin.password);
//     if (!match) return res.status(400).json({ message: "Invalid Password" });

//     const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
