import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import "./ResumeReady.css";
import toast from "react-hot-toast";
import {
    FaCheckCircle,
    FaCode,
    FaFolderOpen,
    FaUserTie,
    FaChartLine,
    FaClipboardList,
} from "react-icons/fa";

function ResumeReady() {
    const navigate = useNavigate();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const handleDeleteResume = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                "http://localhost:5000/api/resume",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setShowDeletePopup(false);

            toast.success("Resume deleted successfully!");

            setTimeout(() => {
                navigate("/profile");
            }, 1200);

        } catch (error) {
            console.error("Failed to delete resume:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete resume. Please try again."
            );
        }
    };
    return (
        <div className="ready-container">

            <button
                className="back-btn"
                onClick={() => navigate("/dashboard")}
            >
                <IoArrowBack />
            </button>

            <div className="ready-card">

                <div className="ready-icon">
                </div>

                <h1>Personalized Interview Ready</h1>

                <p className="subtitle">
                    Your resume has been analyzed successfully.
                </p>

                <p className="description">
                    We'll generate an interview tailored to your:
                </p>
                <div className="features">
                    <p><FaCheckCircle className="feature-icon" /> Skills</p>
                    <p><FaCheckCircle className="feature-icon" /> Projects</p>
                    <p><FaCheckCircle className="feature-icon" /> Education</p>
                    <p><FaCheckCircle className="feature-icon" /> Experience</p>
                </div>

                <div className="includes">
                    <h3>You'll receive</h3>

                    <ul>
                        <li><FaClipboardList className="include-icon" /> 15 Personalized AI Questions</li>
                        <li><FaCode className="include-icon" /> Technical Questions</li>
                        <li><FaFolderOpen className="include-icon" /> Project Discussion</li>
                        <li><FaUserTie className="include-icon" /> HR & Behavioral Questions</li>
                        <li><FaChartLine className="include-icon" /> AI Performance Evaluation</li>
                    </ul>
                </div>

                <div className="resume-actions">

                    <button
                        className="start-btn"
                        onClick={() => navigate("/resume-loading")}
                    >
                        Start AI Interview
                    </button>

                    <div className="secondary-actions">

                        <button
                            className="replace-btn"
                            onClick={() => navigate("/resume")}
                        >
                            Replace Resume
                        </button>

                        <button
                            className="delete-resume-btn"
                            onClick={() => setShowDeletePopup(true)}
                        >
                            Delete Resume
                        </button>

                    </div>

                </div>
            </div>
            {showDeletePopup && (
                <div className="delete-overlay">
                    <div className="delete-modal">

                        <h3>Delete Resume?</h3>

                        <p>
                            Are you sure you want to delete your uploaded resume?
                            You can upload a new one anytime.
                        </p>

                        <div className="delete-actions">

                            <button
                                className="cancel-delete-btn"
                                onClick={() => setShowDeletePopup(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-delete-btn"
                                onClick={handleDeleteResume}
                            >
                                Delete Resume
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div >
    );
}

export default ResumeReady;