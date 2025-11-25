import React, { useState, useEffect } from "react";
import { analyzeFile } from "../api/analyze";
import { getMyFiles } from "../api/file";
import type { IFile, IAnalysisResult } from "../types/api";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "../styles/layout/AnalyzePage.css";

// ✅ Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyzePage: React.FC = () => {
    const [files, setFiles] = useState<IFile[]>([]);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [headerRow, setHeaderRow] = useState<number>(0); // ✅ แถว header
    const [result, setResult] = useState<IAnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ โหลดรายชื่อไฟล์
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const data = await getMyFiles();
                setFiles(data);
            } catch {
                setError("❌ โหลดรายชื่อไฟล์ไม่สำเร็จ");
            }
        };
        fetchFiles();
    }, []);

    // ✅ ฟังก์ชันวิเคราะห์ไฟล์ CSV ผ่าน backend
    const handleAnalyze = async (): Promise<void> => {
        try {
            if (!selectedFile) {
                setError("กรุณาเลือกไฟล์ก่อนวิเคราะห์");
                return;
            }
            setLoading(true);
            setError("");
            setResult(null);

            // ✅ ส่ง headerRow ไป backend
            const data = await analyzeFile(selectedFile, headerRow);
            setResult(data);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการวิเคราะห์ไฟล์";
            setError(`❌ ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="analyze-container">
            <h1 className="analyze-title">📊 วิเคราะห์ข้อมูลจาก CSV</h1>

            {/* =============================== */}
            {/* 📂 เลือกไฟล์ + เลือกแถว header */}
            {/* =============================== */}
            <div className="analyze-input-group">
                <select
                    value={selectedFile}
                    onChange={(e) => setSelectedFile(e.target.value)}
                    className="analyze-select"
                >
                    <option value="">-- เลือกไฟล์ของคุณ --</option>
                    {files.map((f) => (
                        <option key={f._id} value={f.storedName}>
                            {f.fileName}
                        </option>
                    ))}
                </select>

                {/* ✅ เลือกแถว header */}
                <select
                    className="analyze-select"
                    value={headerRow}
                    onChange={(e) => setHeaderRow(Number(e.target.value))}
                >
                    <option value={0}>แถวที่ 1 (ปกติ)</option>
                    <option value={1}>แถวที่ 2</option>
                    <option value={2}>แถวที่ 3</option>
                    <option value={3}>แถวที่ 4</option>
                    <option value={4}>แถวที่ 5</option>
                    <option value={5}>แถวที่ 6 (Test Case CSV)</option>
                </select>

                <button
                    className="analyze-button"
                    onClick={handleAnalyze}
                    disabled={loading || !selectedFile}
                >
                    {loading ? "⏳ กำลังวิเคราะห์..." : "🚀 วิเคราะห์เลย"}
                </button>
            </div>

            {error && <p className="analyze-error">{error}</p>}

            {/* =============================== */}
            {/* 📈 แสดงผลลัพธ์ */}
            {/* =============================== */}
            {result && (
                <div className="analyze-result">
                    <h2 className="analyze-subtitle">📈 ผลการวิเคราะห์</h2>

                    <div className="analyze-summary">
                        <p>
                            🧾 <strong>จำนวนแถวทั้งหมด:</strong>{" "}
                            {result.summary.row_count.toLocaleString()}
                        </p>
                        <p>
                            🔢 <strong>คอลัมน์เชิงตัวเลข:</strong>{" "}
                            {result.summary.numeric_columns.length > 0
                                ? result.summary.numeric_columns.join(", ")
                                : "ไม่มี"}
                        </p>
                        <p>
                            🔠 <strong>คอลัมน์ข้อความ:</strong>{" "}
                            {result.summary.non_numeric_columns.length > 0
                                ? result.summary.non_numeric_columns.join(", ")
                                : "ไม่มี"}
                        </p>
                    </div>

                    {/* 🎨 แสดงกราฟ */}
                    {result.chartData && result.chartData.labels.length > 0 && (
                        <div className="chart-container">
                            <Bar
                                data={{
                                    labels: result.chartData.labels,
                                    datasets: [
                                        {
                                            label: "📊 จำนวนสถานะ (Status)",
                                            data: result.chartData.values,
                                            backgroundColor: "rgba(59,130,246,0.6)",
                                            borderColor: "#2563eb",
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: { position: "top" as const },
                                        title: {
                                            display: true,
                                            text: "สรุปจำนวนสถานะในไฟล์ CSV",
                                        },
                                    },
                                }}
                            />
                        </div>
                    )}

                    {/* 🧩 JSON Summary */}
                    <details className="summary-box">
                        <summary>🧠 ดูข้อมูลสรุป (Raw JSON)</summary>
                        <pre>{JSON.stringify(result.summary, null, 2)}</pre>
                    </details>
                </div>
            )}
        </div>
    );
};

export default AnalyzePage;
