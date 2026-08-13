import "./Profile.css";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(response.data.profile);

      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />
      <div className="profile-page">
      <div className="profile-container">

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
          title="Back to Dashboard"
        >
          <IoArrowBack />
        </button>

        <div className="profile-card">
          <div className="profile-header">

            <div className="profile-avatar">
              {(profile?.name || user?.name)?.charAt(0).toUpperCase()}
            </div>

            <h2>{profile?.name || user?.name}</h2>

            <p>{profile?.email || user?.email}</p>
          </div>

          <div className="profile-stats">

            <div className="stat-card">
              <span>Total Interviews</span>
              <h3>{profile?.totalInterviews || 0}</h3>
            </div>

            <div className="stat-card">
              <span>Average Score</span>
              <h3>{profile?.averageScore || 0}%</h3>
            </div>

            <div className="stat-card">
              <span>Best Score</span>
              <h3>{profile?.bestScore || 0}%</h3>
            </div>

            <div className="stat-card">
              <span>Resume Status</span>

              <h3>
                {profile?.resumeUploaded
                  ? "Uploaded"
                  : "Not Uploaded"}
              </h3>
            </div>

          </div>

          <div className="resume-section">

            <div className="resume-card">

              <div className="resume-header">

                <h3>Resume</h3>

                <span
                  className={
                    profile?.resumeUploaded
                      ? "resume-status uploaded"
                      : "resume-status not-uploaded"
                  }
                >
                  {profile?.resumeUploaded
                    ? "Uploaded"
                    : "Not Uploaded"}
                </span>

              </div>

              <p className="resume-description">
                {profile?.resumeUploaded
                  ? "Your resume is ready for AI-powered personalized interviews."
                  : "Upload your resume to unlock personalized AI interview questions."}
              </p>

              <button
                className="replace-btn"
                onClick={() => navigate("/resume")}
              >
                {profile?.resumeUploaded
                  ? "Replace Resume"
                  : "Upload Resume"}
              </button>

            </div>

          </div>

        </div>
      </div>
      </div>
    </>
  );
}

export default Profile;