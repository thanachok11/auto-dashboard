import axios from "axios";
import type { IAnalyzeResult } from "../types/api";

export const analyzeFile = async (
    fileName: string,
    headerRow: number
): Promise<IAnalyzeResult> => {
    const res = await axios.post("http://localhost:8000/analyze", {
        fileName,
        headerRow, // ✅ ส่ง headerRow ไป backend
    });
    return res.data;
};
