import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [showMenu, setShowMenu] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar">
                <h2
                    className="logo"
                    onClick={() => navigate("/dashboard")}
                >
                    IntervoPrep
                </h2>

                <div className="profile-container">
                    <button
                        className="profile-btn"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        👤 {user?.name} ▼
                    </button>

                    {showMenu && (
                        <div className="profile-menu">
                            <div
                                className="menu-item"
                                onClick={() => navigate("/profile")}
                            >
                                Profile
                            </div>

                            <div
                                className="menu-item"
                                onClick={() => {
                                    setShowMenu(false);
                                    setShowLogoutPopup(true);
                                }}
                            >
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {showLogoutPopup && (
                <div className="logout-overlay">
                    <div className="logout-modal">
                        <h3>Logout?</h3>

                        <p>
                            Are you sure you want to logout from IntervoPrep?
                        </p>

                        <div className="logout-actions">
                            <button
                                className="cancel-btn"
                                onClick={() => setShowLogoutPopup(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-logout-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;