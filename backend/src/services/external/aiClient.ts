import axios, { AxiosError } from "axios";

// ✅ Client สำหรับเชื่อมต่อ FastAPI
const client = axios.create({
    baseURL: process.env.FASTAPI_URL || "http://localhost:8000",
    timeout: 10000, // 10 วินาที
});

export interface ISummaryResponse {
    summary: string;
    charts?: any;
    aiText?: string;
    message?: string;
}

/**
 * ⚙️ Handler กลางสำหรับจัดการ error ของ axios
 */
const handleAxiosError = (error: unknown, context: string): never => {
    const err = error as AxiosError;

    if (err.response) {
        console.error(
            `❌ [FastAPI Response Error: ${context}]`,
            `Status: ${err.response.status}`,
            "Data:",
            JSON.stringify(err.response.data, null, 2)
        );
        throw new Error(
            `FastAPI responded with ${err.response.status}: ${(err.response.data as any)?.detail ||
            (err.response.data as any)?.message ||
            "Unknown error"
            }`
        );
    } else if (err.request) {
        console.error(`❌ [FastAPI Request Error: ${context}] No response received from FastAPI server.`);
        throw new Error("FastAPI server not responding. Check URL or server status.");
    } else {
        console.error(`❌ [FastAPI Unknown Error: ${context}]`, err.message);
        throw new Error(`FastAPI client error: ${err.message}`);
    }
};

/**
 * 🔍 สรุป Insight จาก FastAPI (AI)
 */
export const summarizeCsv = async (fileId: string): Promise<ISummaryResponse> => {
    try {
        const { data } = await client.post("/summarize", { fileId });
        return data;
    } catch (error) {
        return handleAxiosError(error, "summarizeCsv"); // ✅ TS จะรู้ว่าเป็น never (ไม่คืน undefined)
    }
};

/**
 * 📊 วิเคราะห์ไฟล์ CSV (Data Insight)
 */
export const analyzeFile = async (fileName: string): Promise<ISummaryResponse> => {
    try {
        const { data } = await client.post("/analyze", { fileName });
        return data;
    } catch (error) {
        return handleAxiosError(error, "analyzeFile");
    }
};
