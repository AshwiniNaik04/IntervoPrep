const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateResumeQuestions = async (resumeText) => {

    const prompt = `
You are an expert software engineering interviewer.

The following is a candidate's resume.

${resumeText}

Generate EXACTLY 15 personalized interview questions based ONLY on this resume.

Guidelines:
- Ask questions about projects.
- Ask questions about technical skills.
- Ask React.js questions if React is mentioned.
- Ask JavaScript questions if JavaScript is mentioned.
- Ask Node.js/Express.js questions if backend is mentioned.
- Ask MongoDB/MySQL questions if databases are mentioned.
- Include 2-3 behavioral questions.
- Include 2 project-based questions.
- Questions should be suitable for campus placements.

IMPORTANT:
Return ONLY valid JSON.

Format:

[
  {
    "id": 1,
    "question": "Explain your IntervoPrep project."
  }
]
`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });

    const text = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return text;
};

module.exports = {
    generateResumeQuestions,
};