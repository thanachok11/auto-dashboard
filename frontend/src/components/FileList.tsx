import React from "react";
import { Link } from "react-router-dom";
import type { IFile } from "../types/api";
import "../styles/layout/FileList.css";

interface Props {
    files: IFile[];
}

const FileList: React.FC<Props> = ({ files }) => (
    <div className="filelist-container">
        <h3 className="filelist-title">📂 ไฟล์ของคุณ</h3>
        {files.length === 0 ? (
            <p className="filelist-empty">ยังไม่มีไฟล์อัปโหลด</p>
        ) : (
            <ul className="filelist-list">
                {files.map((f) => (
                    <li key={f._id} className="filelist-item">
                        <span>{f.fileName}</span>
                        <Link to={`/insights/${f._id}`} className="filelist-link">
                            ดู Insight
                        </Link>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default FileList;
