// const express = require("express");
// const router = express.Router();
// const protect = require("../middleware/authMiddleware");
// const { getContact, updateContact } = require("../controllers/contactController");

// router.get("/", getContact);
// router.put("/", protect, updateContact);
// router.post("/", submitMessage);


// module.exports = router;



const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { 
  getContact, 
  updateContact, 
  submitMessage 
} = require("../controllers/contactController");

// USER FORM MESSAGE
router.post("/", submitMessage);

// ADMIN GET CONTACT DETAILS
router.get("/", getContact);

// ADMIN UPDATE CONTACT
router.put("/", protect, updateContact);

module.exports = router;
