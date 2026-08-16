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

Evaluate the candidate's complete interview.

Give scores from 0 to 100.

The "strengths" array should contain specific strengths based on the candidate's answers.

The "improvements" array should contain specific areas where the candidate can improve.

"finalFeedback" MUST contain a meaningful overall evaluation of the candidate.
"finalFeedback" MUST be exactly 1 or 2 sentences.
Keep it concise and specific.
Do not use more than 2 sentences.

Return ONLY valid JSON. Do not use markdown or code fences.

{
    "overallScore": 0,
    "technicalKnowledge": 0,
    "communication": 0,
    "confidence": 0,
    "strengths": [
        ""
    ],
    "improvements": [
        ""
    ],
    "finalFeedback": ""
}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    let text = response.text.trim();

    if (text.startsWith("```json")) {
      text = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (text.startsWith("```")) {
      text = text.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const result = JSON.parse(text);

    return result;

  } catch (error) {
    console.error("Gemini evaluation error:", error);

    throw error;
  }
};

module.exports = {
  evaluateInterview,
};