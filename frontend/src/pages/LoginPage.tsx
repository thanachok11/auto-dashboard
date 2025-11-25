import React, { useState } from "react";
import { login, register } from "../api/auth";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/auth/LoginPage.css";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [message, setMessage] = useState("");
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            if (isRegister) {
                await register(email, password);
                setMessage("สมัครสำเร็จ! กรุณาเข้าสู่ระบบ");
                setIsRegister(false);
            } else {
                await login(email, password);
                setToken(localStorage.getItem("token"));
                navigate("/");
            }
        } catch (error: unknown) {
            setMessage(error instanceof Error ? error.message : "เกิดข้อผิดพลาด");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">{isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        placeholder="อีเมล"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="รหัสผ่าน"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">
                        {isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
                    </button>
                </form>
                <p className="login-switch" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "มีบัญชีแล้ว? เข้าสู่ระบบ" : "ยังไม่มีบัญชี? สมัครเลย"}
                </p>
                {message && <p className="login-error">{message}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
