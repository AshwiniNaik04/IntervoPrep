const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateInterview, getInterviewHistory,
} = require("../controllers/interviewController");

router.post("/generate", protect, generateInterview);
router.get("/history", protect, getInterviewHistory);

module.exports = router;