import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResumeLoading.css";
import { ImSpinner8 } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";

function ResumeLoading() {
    const navigate = useNavigate();

    const [step, setStep] = useState(0);

    const loadingSteps = [
        "Reading Resume...",
        "Extracting Skills...",
        "Understanding Projects...",
        "Identifying Technologies...",
        "Generating Personalized Questions..."
    ];

    useEffect(() => {
        const generateResumeInterview = async () => {
            try {
                const token = localStorage.getItem("token");

                // Loading animation
                for (let i = 0; i < loadingSteps.length - 1; i++) {
                    await new Promise((resolve) => setTimeout(resolve, 900));
                    setStep(i);
                }

                setStep(loadingSteps.length - 1);

                // Call Backend
                const response = await axios.post(
                    "http://localhost:5000/api/resume/generate-interview",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                await new Promise((resolve) => setTimeout(resolve, 800));

                // Open Interview
                navigate("/interview", {
                    state: {
                        questions: response.data.questions,
                        interviewType: "resume",
                    },
                });

            } catch (error) {
                console.error(error);

                toast.error(
                    error.response?.data?.message ||
                    "Unable to generate your interview."
                );

                navigate("/dashboard");
            }
        };

        generateResumeInterview();

    }, [navigate]);

    return (
        <div className="loading-container">

            <div className="loading-card">

                <div className="loader">
                    <ImSpinner8 />
                </div>

                <h1>Preparing Your Personalized Interview</h1>

                <p className="loading-subtitle">
                    Our AI is analyzing your resume to create a
                    personalized interview experience.
                </p>

                <div className="loading-steps">

                    {loadingSteps.map((item, index) => (
                        <div
                            key={index}
                            className={`loading-step ${index <= step ? "active" : ""
                                }`}
                        >
                            <span className="step-icon">
                                {index < step ? (
                                    <FaCheckCircle className="completed-icon" />
                                ) : index === step ? (
                                    <ImSpinner8 className="current-icon" />
                                ) : (
                                    <FiCircle className="pending-icon" />
                                )}
                            </span>

                            <span>{item}</span>
                        </div>
                    ))}

                </div>

                <p className="loading-footer">
                    This usually takes just a few seconds...
                </p>

            </div>

        </div>
    );
}

export default ResumeLoading;