const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateInterviewQuestions = async ({
    role,
    experience,
    difficulty,
    questions,
}) => {
    const prompt = `
You are an expert technical interviewer.

Generate ${questions} interview questions.

Job Role: ${role}
Experience Level: ${experience}
Difficulty: ${difficulty}

IMPORTANT:
- Return ONLY valid JSON.
- Do not include markdown.
- Do not include explanation.

Format:

[
  {
    "id": 1,
    "question": "Question here"
  }
]
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });

    return response.text;
};

module.exports = {
    generateInterviewQuestions,
};