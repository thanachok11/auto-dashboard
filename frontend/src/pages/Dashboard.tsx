import React, { useEffect, useState } from "react";
import { getMyFiles } from "../api/file";
import { getMe } from "../api/auth";
import FileList from "../components/FileList";
import type { IUser, IFile } from "../types/api";
import "../styles/page/Dashboard.css";

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [files, setFiles] = useState<IFile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async (): Promise<void> => {
            try {
                const [u, f] = await Promise.all([getMe(), getMyFiles()]);
                setUser(u);
                setFiles(f);
            } catch {
                console.warn("🔐 Not logged in");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">📊 Auto Dashboard</h1>
            {loading ? (
                <p className="dashboard-loading">⏳ กำลังโหลดข้อมูล...</p>
            ) : user ? (
                <>
                    <p className="dashboard-welcome">ยินดีต้อนรับ {user.email}</p>
                    <FileList files={files} />
                </>
            ) : (
                <p className="dashboard-login">กรุณาเข้าสู่ระบบก่อนใช้งาน</p>
            )}
        </div>
    );
};

export default Dashboard;
