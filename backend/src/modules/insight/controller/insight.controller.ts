import { Request, Response } from "express";
import * as service from "@modules/insight/services/insight.service";

export const generate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fileId } = req.params;
        const doc = await service.createFromFile(fileId);
        res.status(201).json({ message: "สร้าง Insight สำเร็จ", insight: doc });
    } catch (e: unknown) {
        const err = e as Error;
        console.error("❌ [INSIGHT:GENERATE]", err.message);
        if (err.stack) console.error("🧩 Stack:", err.stack);
        res.status(500).json({ message: err.message || "Internal Server Error" });
    }
};

export const list = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fileId } = req.params;
        const items = await service.listByFile(fileId);
        res.status(200).json(items);
    } catch (e: unknown) {
        const err = e as Error;
        console.error("❌ [INSIGHT:LIST]", err.message);
        if (err.stack) console.error("🧩 Stack:", err.stack);
        res.status(500).json({ message: err.message || "Internal Server Error" });
    }
};
