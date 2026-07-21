const {
    generateInterviewQuestions,
} = require("../services/geminiService");

const generateInterview = async (req, res) => {
    try {
        const { role, experience, difficulty, questions } = req.body;

        // Validate input
        if (!role || !experience || !difficulty || !questions) {
            return res.status(400).json({
                message: "Please provide all interview details.",
            });
        }

        // Generate questions from Gemini
        const result = await generateInterviewQuestions({
            role,
            experience,
            difficulty,
            questions,
        });

        res.status(200).json({
            success: true,
            questions: result,
        });
    } catch (error) {
        console.error("Interview Generation Error:", error);

        res.status(error.status || 500).json({
            success: false,
            message:
                error.message || "Failed to generate interview questions.",
        });
    }
};

module.exports = {
    generateInterview,
};