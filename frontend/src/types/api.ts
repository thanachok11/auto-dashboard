// ========================================
// 🧩 Global Type Definitions
// ========================================

// ========================================
// 📊 วิเคราะห์ไฟล์ (ผลลัพธ์จาก FastAPI)
// ========================================
export interface IAnalyzeResult {
    summary: {
        row_count: number;
        numeric_columns: string[];
        non_numeric_columns: string[];
    };
    chartData?: {
        labels: string[];
        values: number[];
    };
}

// Remove IAnalysisResult if it exists, or update it to match IAnalyzeResult
export type IAnalysisResult = IAnalyzeResult;

// ========================================
// 👤 User
// ========================================
export interface IUser {
    id: string;
    email: string;
    credits: number;
    role: "user" | "admin";
    createdAt?: string;
}

// ========================================
// 📂 File (ที่อัปโหลดโดยผู้ใช้)
// ========================================
export interface IFile {
    _id: string;
    userId: string;
    fileName: string;       // ชื่อไฟล์จริงจากผู้ใช้
    storedName: string;     // ชื่อไฟล์จริงในระบบ
    size: number;           // ขนาดไฟล์ (bytes)
    path: string;           // path หรือ URL
    status: "uploaded" | "processed" | "expired";
    createdAt?: string;
    expiredAt?: string;
}

// ========================================
// 📈 Chart Configuration (ใช้กับทุก chart lib)
// ========================================
export interface IChartConfig {
    type: "bar" | "line" | "pie" | "scatter" | "radar" | string;
    data: Record<string, unknown>; // datasets / labels
    options?: Record<string, unknown>; // ตัวเลือกเสริม
}

// ========================================
// 💡 Insight (ผลการวิเคราะห์/กราฟที่บันทึกไว้)
// ========================================
export interface IInsight {
    _id: string;
    fileId: string;
    summary: string;
    aiText?: string;
    chartConfig?: IChartConfig;
    createdAt?: string;
}

// ========================================
// 🔐 Auth Responses
// ========================================
export interface IAuthResponse {
    token: string;
    user: IUser;
}

// ========================================
// 🧱 Generic API Response (ใช้ได้ทุก endpoint)
// ========================================
export interface IApiResponse<T = unknown> {
    success?: boolean;
    message?: string;
    data?: T;
}
