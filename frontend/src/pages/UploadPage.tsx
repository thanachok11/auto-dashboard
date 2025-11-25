import React, { useState } from "react";
import { uploadFile } from "../api/file";
import "../styles/page/UploadPage.css";

const UploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState("");

    const handleUpload = async (): Promise<void> => {
        if (!file) return;
        setStatus("⏳ กำลังอัปโหลด...");
        try {
            await uploadFile(file);
            setStatus("✅ อัปโหลดสำเร็จ!");
            setFile(null);
        } catch {
            setStatus("❌ อัปโหลดไม่สำเร็จ");
        }
    };

    return (
        <div className="upload-container">
            <h2 className="upload-title">📁 อัปโหลดไฟล์ CSV</h2>
            <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="upload-input"
            />
            <button onClick={handleUpload} className="upload-button">
                Upload
            </button>
            {status && <p className="upload-status">{status}</p>}
        </div>
    );
};

export default UploadPage;
