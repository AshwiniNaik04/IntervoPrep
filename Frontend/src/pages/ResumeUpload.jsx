import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import "./ResumeUpload.css";

function ResumeUpload() {
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a resume first!");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("resume", selectedFile);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/api/resume/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            navigate("/resume-ready");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Resume upload failed!"
            );
        }
    };

    return (
        <div className="resume-container">

            <button
                className="back-btn"
                onClick={() => navigate("/dashboard")}
                title="Back to Dashboard"
            >
                <IoArrowBack />
            </button>

            <div className="resume-card">

                <h1>Resume Manager</h1>


                <p>
                    Upload your latest resume to receive personalized AI interview
                    questions.
                </p>

                <div className="upload-box">

                    <div className="pdf-icon">📄</div>

                    <h3>Drag & Drop your Resume</h3>

                    <span>or</span>

                    <label className="choose-btn">
                        Choose Resume

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            hidden
                        />
                    </label>

                    {selectedFile ? (
                        <div className="file-info">

                            <h4 className="selected-title">
                                Resume Selected
                            </h4>

                            <p className="file-name">
                                {selectedFile.name}
                            </p>

                            <small className="file-size">
                                Size : {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </small>

                        </div>
                    ) : (
                        <p className="no-file">
                            No file selected
                        </p>
                    )}

                    <button
                        className="upload-btn"
                        disabled={!selectedFile}
                        onClick={handleUpload}
                    >
                        {selectedFile ? "Upload Resume" : "Select a Resume First"}
                    </button>

                    <p className="security-note">
                        Your resume is securely stored and used only to generate
                        personalized AI interview questions.
                    </p>

                    <small className="support-text">
                        Supported Format: PDF • Maximum Size: 5 MB
                    </small>

                </div>
            </div>
        </div>
    );
}

export default ResumeUpload;