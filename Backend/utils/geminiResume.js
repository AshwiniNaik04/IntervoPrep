const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Validate whether the extracted document text represents
 * a professional resume/CV.
 */
const validateResume = async (resumeText) => {

    const prompt = `
You are a document classification system for an AI interview preparation application.

Your task is to determine whether the following document content represents a
professional RESUME or CV of a person.

A valid resume/CV generally presents a person's professional or academic profile
for employment or internships. It may contain information such as:
- Personal/professional summary
- Education
- Technical skills
- Work experience
- Internships
- Projects
- Certifications
- Achievements
- Positions of responsibility
- Publications
- Relevant professional information

Do NOT classify a document as a resume merely because it contains words such as
"skills", "projects", "education", "experience", or a person's name.

Evaluate the document as a whole.

The document may be from:
- A fresher
- A student
- An experienced professional
- A person with little or no work experience

A resume does NOT need to contain every typical resume section.

If the document is primarily another type of document, classify it as NOT_RESUME.
For example, documents such as academic assignments, project reports,
research papers, certificates, brochures, portfolios, notes, question papers,
theses, manuals, forms, or other non-resume documents should not be classified
as resumes.

DOCUMENT CONTENT:
----------------
${resumeText}
----------------

Return ONLY valid JSON.

Required format:

{
    "isResume": true,
    "documentType": "resume",
    "confidence": 0.95,
    "reason": "The document presents the candidate's education, skills, projects and professional profile."
}

Rules:
- isResume must be either true or false.
- documentType must be "resume" when isResume is true.
- documentType should describe the actual document when isResume is false.
- confidence must be a number between 0 and 1.
- reason must be short and clear.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });

    const text = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    try {
        return JSON.parse(text);
    } catch (error) {
        console.error("Invalid Gemini validation response:", text);
        throw new Error("Failed to validate resume");
    }
};


/**
 * Generate exactly 15 interview questions
 * based only on the validated resume.
 */
const generateResumeQuestions = async (resumeText) => {

    const prompt = `
You are an expert software engineering interviewer.

The following is a candidate's resume.

----------------
${resumeText}
----------------

Generate EXACTLY 15 personalized interview questions based ONLY on information
present in this resume.

Guidelines:
- Ask questions about projects mentioned in the resume.
- Ask questions about technical skills mentioned in the resume.
- Ask React.js questions if React.js is mentioned.
- Ask JavaScript questions if JavaScript is mentioned.
- Ask Node.js/Express.js questions if backend technologies are mentioned.
- Ask MongoDB/MySQL questions if those databases are mentioned.
- Ask questions about internships or work experience if mentioned.
- Ask questions about certifications or achievements when relevant.
- Include 2-3 behavioral questions.
- Include 2-3 project-based questions.
- Questions should be suitable for campus placements.
- Do not assume technologies, projects, experience, or skills that are not
  mentioned in the resume.
- Every question must be relevant to the candidate's resume.

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

    try {
        const questions = JSON.parse(text);

        if (!Array.isArray(questions) || questions.length !== 15) {
            throw new Error("Gemini did not return exactly 15 questions");
        }

        return questions;
    } catch (error) {
        console.error("Invalid Gemini questions response:", text);
        throw new Error("Failed to generate resume questions");
    }
};


module.exports = {
    validateResume,
    generateResumeQuestions,
};