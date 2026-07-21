import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InterviewSetup.css";

function InterviewSetup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        role: "",
        experience: "Fresher",
        difficulty: "Easy",
        questions: 5,
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleStartInterview = () => {
        navigate("/interview");
    };

    return (
        <div className="setup-container">
            <div className="setup-card">
                <h1>Configure Your Interview</h1>

                <p>
                    Choose your interview preferences before starting your AI interview.
                </p>

                <div className="form-group">
                    <label>Job Role</label>

                    <input
                        type="text"
                        name="role"
                        placeholder="e.g. Frontend Developer"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Experience Level</label>

                    <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                    >
                        <option>Fresher</option>
                        <option>0-1 Years</option>
                        <option>1-3 Years</option>
                        <option>3+ Years</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Difficulty</label>

                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Number of Questions</label>

                    <select
                        name="questions"
                        value={formData.questions}
                        onChange={handleChange}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>

                <button
                    className="start-btn"
                    onClick={handleStartInterview}
                >
                    Start Interview
                </button>
            </div>
        </div>
    );
}

export default InterviewSetup;