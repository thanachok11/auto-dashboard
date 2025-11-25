import { api } from "./axios";
import type { IInsight } from "../types/api";

// ✅ Type สำหรับผลลัพธ์ที่ได้จาก FastAPI
// ✅ Type ของข้อมูลสรุปจาก FastAPI (เช่น describe())
export interface ISummaryStats {
    [columnName: string]: {
        count?: number;
        mean?: number;
        std?: number;
        min?: number;
        max?: number;
        [key: string]: string | number | null | undefined;
    };
}

// ✅ Type ของผลลัพธ์ที่ส่งกลับจาก FastAPI
export interface IAnalyzeResult {
    summary: ISummaryStats;
    charts: Array<{
        label: string;
        data: number[];
    }>;
    message: string;
    chartUrl?: string;
}

// ✅ ดึงข้อมูล insight ทั้งหมดของไฟล์ (จาก Mongo)
export const getInsights = async (fileId: string): Promise<IInsight[]> => {
    const { data } = await api.get<IInsight[]>(`/insights/${fileId}`);
    return data;
};

// ✅ สร้าง insight ใหม่จากไฟล์ (เรียก FastAPI ผ่าน backend → Mongo)
export const generateInsight = async (fileId: string): Promise<IInsight> => {
    const { data } = await api.post<{ insight: IInsight }>(`/insights/${fileId}`);
    return data.insight;
};

// ✅ วิเคราะห์ CSV โดยตรงผ่าน FastAPI (ไม่ผ่าน Mongo)
export const analyzeFile = async (fileName: string): Promise<IAnalyzeResult> => {
    const { data } = await api.post<IAnalyzeResult>(`/insights/analyze`, { fileName });
    return data;
};
