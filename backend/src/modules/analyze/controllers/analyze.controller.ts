import { Request, Response } from "express";
import * as service from "../services/analyze.service";

export const analyze = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fileName } = req.body;
        if (!fileName) {
            res.status(400).json({ message: "กรุณาระบุชื่อไฟล์ (fileName)" });
            return;
        }

        const result = await service.analyzeFile(fileName);
        res.status(200).json({
            message: "วิเคราะห์สำเร็จ",
            ...result,
        });
    } catch (e) {
        console.error("❌ [ANALYZE:ERROR]", e);
        res.status(500).json({ message: e instanceof Error ? e.message : "เกิดข้อผิดพลาด" });
    }
};
