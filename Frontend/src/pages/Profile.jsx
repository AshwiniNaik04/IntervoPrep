import "./Profile.css";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="profile-container">

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
          title="Back to Dashboard"
        >
          <IoArrowBack />
        </button>

        <div className="profile-card">

          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h2>{user?.name}</h2>

          <p>{user?.email}</p>

          <div className="profile-info">

            <div className="info-box">
              <span>Name</span>
              <h4>{user?.name}</h4>
            </div>

            <div className="info-box">
              <span>Email</span>
              <h4>{user?.email}</h4>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;