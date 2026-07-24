const Resume = require("../models/Resume");

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume!",
            });
        }

        let resume = await Resume.findOne({
            user: req.user.id,
        });

        if (resume) {
            resume.resumeUrl = req.file.path;
            resume.publicId = req.file.filename;

            await resume.save();
        } else {
            resume = await Resume.create({
                user: req.user.id,
                resumeUrl: req.file.path,
                publicId: req.file.filename,
            });
        }

        res.status(200).json({
            success: true,
            message: "Resume uploaded successfully.",
            resume,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Resume upload failed.",
        });
    }
};

const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            user: req.user.id,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found.",
            });
        }

        res.status(200).json({
            success: true,
            resume,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    uploadResume,
    getResume,
};