import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
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
                            onClick={handleLogout}
                        >
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;