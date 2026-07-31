import { useState } from "react";
import axios from "axios";
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

    const handleStartInterview = async () => {
        if (!formData.role.trim()) {
            alert("Please enter a job role.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/api/interview/generate",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate("/interview", {
                state: {
                    questions: response.data.questions,
                },
            });
        } catch (error) {
            console.error(error);

            if (error.response) {
                console.log(error.response.data);
                alert(error.response.data.message || "Something went wrong.");
            } else {
                alert(error.message);
            }
        }
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