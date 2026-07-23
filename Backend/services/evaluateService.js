const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const evaluateInterview = async ({ questions, answers }) => {
  const prompt = `
You are an expert technical interviewer.

Below are the interview questions and candidate answers.

Questions:
${JSON.stringify(questions, null, 2)}

Answers:
${JSON.stringify(answers, null, 2)}

Evaluate the candidate.

Return ONLY valid JSON.

{
  "overallScore": 0,
  "technicalKnowledge": 0,
  "communication": 0,
  "confidence": 0,
  "strengths":[
    ""
  ],
  "improvements":[
    ""
  ],
  "finalFeedback":""
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return JSON.parse(response.text);
};

module.exports = {
  evaluateInterview,
};