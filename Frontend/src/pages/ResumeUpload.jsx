import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import "./ResumeUpload.css";
import toast from "react-hot-toast";

function ResumeUpload() {
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [hasResume, setHasResume] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    useEffect(() => {
        const fetchResume = async () => {
            try {
                const token = localStorage.getItem("token");

                await axios.get(
                    "http://localhost:5000/api/resume",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setHasResume(true);

            } catch (error) {
                setHasResume(false);
            }
        };

        fetchResume();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedFile(file);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();

        setDragActive(false);

        const file = e.dataTransfer.files[0];

        if (!file) return;

        if (file.type !== "application/pdf") {
            toast.error("Only PDF files are allowed.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Maximum file size is 5 MB.");
            return;
        }

        setSelectedFile(file);
    };
    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select a resume first!");
            return;
        }

        try {
            const formData = new FormData();
            setUploading(true);
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
            toast.success(
                hasResume
                    ? "Resume replaced successfully!"
                    : "Resume uploaded successfully!"
            );
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Resume upload failed!"
            );
        }
        finally {
            setUploading(false);
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

                <h1>
                    {hasResume
                        ? "Replace Resume"
                        : "Upload Resume"}
                </h1>
                <p>
                    {hasResume
                        ? "Uploading a new resume will replace your existing one and be used for future AI interviews."
                        : "Upload your resume to receive personalized AI interview questions."}
                </p>

                <div
                    className={`upload-box ${dragActive ? "drag-active" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >

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
                        disabled={!selectedFile || uploading}
                        onClick={handleUpload}
                    >
                        {uploading
                            ? "Uploading..."
                            : selectedFile
                                ? hasResume
                                    ? "Replace Resume"
                                    : "Upload Resume"
                                : "Select a Resume First"}
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