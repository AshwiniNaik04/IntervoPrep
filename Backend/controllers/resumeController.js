const Resume = require("../models/Resume");
const cloudinary = require("../config/cloudinary");
const axios = require("axios");
const pdfParse = require("pdf-parse");

const {
    validateResume,
    generateResumeQuestions
} = require("../utils/geminiResume");


const uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume!",
            });
        }

        // Download uploaded PDF from Cloudinary
        const pdfResponse = await axios.get(req.file.path, {
            responseType: "arraybuffer",
        });

        // Extract text from PDF
        const pdfData = await pdfParse(pdfResponse.data);

        const text = pdfData.text.trim();

        // Check whether readable text was extracted
        if (!text || text.length < 200) {

            if (req.file.filename) {
                await cloudinary.uploader.destroy(
                    req.file.filename,
                    {
                        resource_type: "raw",
                    }
                );
            }

            return res.status(400).json({
                success: false,
                message: "The uploaded document could not be read. Please upload a text-based resume PDF.",
            });
        }


        // AI-based resume validation
        const validation = await validateResume(text);

        if (!validation.isResume) {

            // Delete rejected document from Cloudinary
            if (req.file.filename) {
                await cloudinary.uploader.destroy(
                    req.file.filename,
                    {
                        resource_type: "raw",
                    }
                );
            }

            return res.status(400).json({
                success: false,
                message: "The uploaded document does not appear to be a resume or CV. Please upload a valid resume.",
            });
        }


        // Resume is valid
        let resume = await Resume.findOne({
            user: req.user.id,
        });


        if (resume) {

            // Delete old resume
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


        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully.",
            resume,
        });

    } catch (error) {

        console.error(error);

        // Delete uploaded file if something fails
        if (req.file?.filename) {
            try {
                await cloudinary.uploader.destroy(
                    req.file.filename,
                    {
                        resource_type: "raw",
                    }
                );
            } catch (deleteError) {
                console.error(
                    "Failed to delete uploaded file:",
                    deleteError
                );
            }
        }

        return res.status(500).json({
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

        const questions = await generateResumeQuestions(pdfData.text);

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