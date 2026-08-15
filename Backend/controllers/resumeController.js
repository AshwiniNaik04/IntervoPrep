const Resume = require("../models/Resume");
const cloudinary = require("../config/cloudinary");
const axios = require("axios");
const pdfParse = require("pdf-parse");
const { generateResumeQuestions } = require("../utils/geminiResume");

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

            if (resume.publicId) {
                await cloudinary.uploader.destroy(
                    resume.publicId,
                    {
                        resource_type: "raw",
                    }
                );
            }

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

const generateResumeInterview = async (req, res) => {
    try {

        const resume = await Resume.findOne({
            user: req.user.id,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Please upload your resume first.",
            });
        }

        const pdfResponse = await axios.get(resume.resumeUrl, {
            responseType: "arraybuffer",
        });

        const pdfData = await pdfParse(pdfResponse.data);

        const aiResponse = await generateResumeQuestions(pdfData.text);

        let questions;

        try {
            questions = JSON.parse(aiResponse);
        } catch (error) {
            console.error("Gemini returned invalid JSON:");
            console.error(aiResponse);

            return res.status(500).json({
                success: false,
                message: "Failed to parse AI response.",
            });
        }

        return res.status(200).json({
            success: true,
            questions,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate interview.",
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

const deleteResume = async (req, res) => {
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

        if (resume.publicId) {
            await cloudinary.uploader.destroy(
                resume.publicId,
                {
                    resource_type: "raw",
                }
            );
        }

        await Resume.findByIdAndDelete(resume._id);

        res.status(200).json({
            success: true,
            message: "Resume deleted successfully.",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete resume.",
        });
    }
};

module.exports = {
    uploadResume,
    getResume,
    generateResumeInterview,
    deleteResume,
};