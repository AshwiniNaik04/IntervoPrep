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

const generateResumeInterview = async (req, res) => {
    try {

        const questions = [
            {
                id: 1,
                question: "Tell me about yourself."
            },
            {
                id: 2,
                question: "Explain your major project."
            },
            {
                id: 3,
                question: "What are your strongest technical skills?"
            },
            {
                id: 4,
                question: "Which programming language are you most comfortable with?"
            },
            {
                id: 5,
                question: "Explain one challenge you faced while building your project."
            },
            {
                id: 6,
                question: "What is JWT Authentication?"
            },
            {
                id: 7,
                question: "What is REST API?"
            },
            {
                id: 8,
                question: "Explain MongoDB Collections."
            },
            {
                id: 9,
                question: "What is React?"
            },
            {
                id: 10,
                question: "Difference between let and const?"
            },
            {
                id: 11,
                question: "What is Docker?"
            },
            {
                id: 12,
                question: "Why do you want this job?"
            },
            {
                id: 13,
                question: "Tell me about your strengths."
            },
            {
                id: 14,
                question: "Where do you see yourself in five years?"
            },
            {
                id: 15,
                question: "Do you have any questions for us?"
            }
        ];

        res.status(200).json({
            success: true,
            questions,
        });

    } catch (error) {

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

module.exports = {
    uploadResume,
    getResume,
    generateResumeInterview,
};