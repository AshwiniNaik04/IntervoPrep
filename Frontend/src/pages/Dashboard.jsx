import "./Dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import DashboardCard from "../components/DashboardCard/DashboardCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [resumeUploaded, setResumeUploaded] = useState(false);

  useEffect(() => {
    const checkResume = async () => {
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

        setResumeUploaded(true);

      } catch (error) {
        setResumeUploaded(false);
      }
    };

    checkResume();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Welcome back, {user?.name} 👋</h1>

        <p className="dashboard-subtitle">
          Ready to ace your next interview?
        </p>

        <div className="dashboard-grid">
          <DashboardCard
            title="AI Interview"
            description="Practice role-based interviews with AI."
            buttonText="Start Interview"
            onClick={() => navigate("/interview-setup")}
          />

          {resumeUploaded ? (
            <DashboardCard
              title="Resume Uploaded"
              description="Your resume has been uploaded successfully! Generate personalized interview questions based on your resume."
              buttonText="Generate Resume Interview"
              onClick={() => alert("Resume Interview Coming Soon")}
            />
          ) : (
            <DashboardCard
              title="Resume"
              description="Upload and analyze your resume."
              buttonText="Upload Resume"
              onClick={() => navigate("/resume")}
            />
          )}

          <DashboardCard
            title="Interview History"
            description="View your previous interviews."
            buttonText="View History"
            onClick={() => navigate("/history")}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;