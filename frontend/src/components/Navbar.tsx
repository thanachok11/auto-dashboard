import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/layout/Navbar.css";

const Navbar: React.FC = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (): void => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">📊 Auto Dashboard</Link>
            </div>

            <div className="navbar-links">
                {token ? (
                    <>
                        <Link to="/upload" className="navbar-link">
                            📤 อัปโหลดไฟล์
                        </Link>
                        <Link to="/analyze" className="navbar-link">
                            🔍 วิเคราะห์ CSV
                        </Link>
                        <button className="navbar-button" onClick={handleLogout}>
                            🚪 ออกจากระบบ
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="navbar-link">
                        🔑 เข้าสู่ระบบ
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
