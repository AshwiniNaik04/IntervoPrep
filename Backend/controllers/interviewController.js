const Interview = require("../models/Interview");

const {
    generateInterviewQuestions,
} = require("../services/geminiService");

const generateInterview = async (req, res) => {
    const { role, experience, difficulty, questions } = req.body;

    if (!role || !experience || !difficulty || !questions) {
        return res.status(400).json({
            success: false,
            message: "Please provide all interview details.",
        });
    }

    try {
        const result = await generateInterviewQuestions({
            role,
            experience,
            difficulty,
            questions,
        });

        const parsedQuestions = JSON.parse(result);

        return res.status(200).json({
            success: true,
            questions: parsedQuestions,
        });

    } catch (error) {

        console.error("Gemini Error:", error.message);

        // Temporary fallback while Gemini is unavailable
        const sampleQuestions = [
            {
                id: 1,
                question: "Tell me about yourself."
            },
            {
                id: 2,
                question: "Walk me through your latest project."
            },
            {
                id: 3,
                question: "Explain your strongest technical skill."
            },
            {
                id: 4,
                question: "Describe a challenging bug or technical issue you fixed."
            },
            {
                id: 5,
                question: "What technologies are you most comfortable working with?"
            },
            {
                id: 6,
                question: "What is a REST API, and why is it used?"
            },
            {
                id: 7,
                question: "Explain the difference between SQL and NoSQL databases."
            },
            {
                id: 8,
                question: "How do you approach debugging an application?"
            },
            {
                id: 9,
                question: "Describe a situation where you worked effectively as part of a team."
            },
            {
                id: 10,
                question: "How do you prioritize tasks and manage deadlines?"
            },
            {
                id: 11,
                question: "What do you consider your greatest professional strength?"
            },
            {
                id: 12,
                question: "What is one area where you're currently working to improve?"
            },
            {
                id: 13,
                question: "Tell me about a difficult problem you solved and how you approached it."
            },
            {
                id: 14,
                question: "Why are you interested in this role and our company?"
            },
            {
                id: 15,
                question: "Do you have any questions for the interviewer?"
            }
        ];

        return res.status(200).json({
            success: true,
            questions: sampleQuestions,
            fallback: true,
        });
    }
};

const getInterviewHistory = async (req, res) => {
    try {
        const interviews = await Interview.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            interviews,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch interview history.",
        });
    }
};

module.exports = {
    generateInterview,
    getInterviewHistory,
};