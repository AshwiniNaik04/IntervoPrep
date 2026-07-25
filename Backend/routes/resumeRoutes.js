const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    uploadResume,
    getResume,
    generateResumeInterview,
} = require("../controllers/resumeController");

router.post(
    "/upload",
    protect,
    upload.single("resume"),
    uploadResume
);

router.post(
    "/generate-interview",
    protect,
    generateResumeInterview
);

router.get(
    "/",
    protect,
    getResume
);

module.exports = router;