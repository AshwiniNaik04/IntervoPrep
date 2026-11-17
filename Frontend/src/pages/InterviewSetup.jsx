
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./InterviewSetup.css";
import { IoArrowBack } from "react-icons/io5";
import {
    IoBriefcaseOutline,
    IoSchoolOutline,
    IoTrendingUpOutline,
    IoRocketOutline,
    IoCheckmarkCircle,
    IoFlashOutline,
    IoLayersOutline,
    IoHelpCircleOutline
} from "react-icons/io5";

function InterviewSetup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        role: "",
        experience: "Fresher",
        difficulty: "Easy",
        questions: 5,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStartInterview = async () => {
        if (!formData.role.trim()) {
            alert("Please enter a job role.");
            return;
        }

        try {
            setLoading(true);

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
        } finally {
            setLoading(false);
        }
    };

    const experienceOptions = [
        {
            value: "Fresher",
            label: "Fresher",
            description: "Just starting my career",
            icon: <IoSchoolOutline />
        },
        {
            value: "0-1 Years",
            label: "0–1 Years",
            description: "Beginner experience",
            icon: <IoRocketOutline />
        },
        {
            value: "1-3 Years",
            label: "1–3 Years",
            description: "Some professional experience",
            icon: <IoTrendingUpOutline />
        },
        {
            value: "3+ Years",
            label: "3+ Years",
            description: "Experienced professional",
            icon: <IoBriefcaseOutline />
        }
    ];

    const difficultyOptions = [
        {
            value: "Easy",
            description: "Fundamental concepts",
        },
        {
            value: "Medium",
            description: "Practical problem solving",
        },
        {
            value: "Hard",
            description: "Advanced challenges",
        }
    ];

    const questionOptions = [5, 10, 15];

    return (
        <div className="setup-container">

            <button
                className="back-btn"
                onClick={() => navigate("/dashboard")}
                title="Back to Dashboard"
            >
                <IoArrowBack />

            </button>

            <div className="setup-wrapper">

                <div className="setup-heading">
                    <span className="setup-tag">
                        <IoFlashOutline /> AI POWERED PRACTICE
                    </span>

                    <h1>Build Your <span>Interview</span></h1>

                    <p>
                        Customize your interview experience and get ready
                        to practice with your AI interviewer.
                    </p>
                </div>

                <div className="setup-card">

                    <div className="setup-section">
                        <div className="section-heading">
                            <div className="section-icon">
                                <IoBriefcaseOutline />
                            </div>

                            <div>
                                <h3>What role are you preparing for?</h3>
                                <p>Enter the job position you want to practice.</p>
                            </div>
                        </div>

                        <input
                            className="role-input"
                            type="text"
                            name="role"
                            placeholder="e.g. Frontend Developer"
                            value={formData.role}
                            onChange={(e) =>
                                handleChange("role", e.target.value)
                            }
                        />
                    </div>

                    <div className="setup-divider"></div>

                    <div className="setup-section">
                        <div className="section-heading">
                            <div className="section-icon">
                                <IoSchoolOutline />
                            </div>

                            <div>
                                <h3>Experience level</h3>
                                <p>Choose the level that describes you best.</p>
                            </div>
                        </div>

                        <div className="experience-grid">
                            {experienceOptions.map((option) => (
                                <button
                                    type="button"
                                    key={option.value}
                                    className={`selection-card ${formData.experience === option.value
                                            ? "selected"
                                            : ""
                                        }`}
                                    onClick={() =>
                                        handleChange("experience", option.value)
                                    }
                                >
                                    <span className="option-icon">
                                        {option.icon}
                                    </span>

                                    <span className="option-content">
                                        <strong>{option.label}</strong>
                                        <small>{option.description}</small>
                                    </span>

                                    {formData.experience === option.value && (
                                        <IoCheckmarkCircle className="selected-check" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="setup-divider"></div>

                    <div className="setup-section">
                        <div className="section-heading">
                            <div className="section-icon">
                                <IoFlashOutline />
                            </div>

                            <div>
                                <h3>Choose difficulty</h3>
                                <p>How challenging should your interview be?</p>
                            </div>
                        </div>

                        <div className="difficulty-grid">
                            {difficultyOptions.map((option) => (
                                <button
                                    type="button"
                                    key={option.value}
                                    className={`difficulty-card ${formData.difficulty === option.value
                                            ? "selected"
                                            : ""
                                        }`}
                                    onClick={() =>
                                        handleChange("difficulty", option.value)
                                    }
                                >
                                    <strong>{option.value}</strong>
                                    <small>{option.description}</small>

                                    {formData.difficulty === option.value && (
                                        <IoCheckmarkCircle className="selected-check" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="setup-divider"></div>

                    <div className="setup-section">
                        <div className="section-heading">
                            <div className="section-icon">
                                <IoLayersOutline />
                            </div>

                            <div>
                                <h3>Number of questions</h3>
                                <p>Choose how many questions you want to answer.</p>
                            </div>
                        </div>

                        <div className="question-grid">
                            {questionOptions.map((count) => (
                                <button
                                    type="button"
                                    key={count}
                                    className={`question-card ${Number(formData.questions) === count
                                            ? "selected"
                                            : ""
                                        }`}
                                    onClick={() =>
                                        handleChange("questions", count)
                                    }
                                >
                                    <strong>{count}</strong>
                                    <small>Questions</small>

                                    {Number(formData.questions) === count && (
                                        <IoCheckmarkCircle className="selected-check" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="setup-footer">
                        <div className="setup-summary">
                            <IoHelpCircleOutline />
                            <span>
                                {formData.questions} questions · {formData.difficulty} level
                            </span>
                        </div>

                        <button
                            className="start-btn"
                            onClick={handleStartInterview}
                            disabled={loading}
                        >
                            {loading ? "Generating Questions..." : "Start Interview"}
                            {!loading && <IoArrowBack className="start-arrow" />}
                        </button>
                    </div>

                </div>

                <p className="setup-bottom-text">
                    Practice confidently. Improve continuously. Get interview-ready.
                </p>

            </div>
        </div>
    );
}

export default InterviewSetup;
