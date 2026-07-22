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
                question: "Explain the difference between var, let and const in JavaScript."
            },
            {
                id: 2,
                question: "What is the Virtual DOM in React?"
            },
            {
                id: 3,
                question: "Explain closures in JavaScript."
            },
            {
                id: 4,
                question: "What is event bubbling?"
            },
            {
                id: 5,
                question: "Difference between == and ===?"
            }
        ];

        return res.status(200).json({
            success: true,
            questions: sampleQuestions,
            fallback: true,
        });
    }
};

module.exports = {
    generateInterview,
};