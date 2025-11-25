import { Response } from "express";
import { uploader } from "@utils/upload";
import * as service from "@modules/file/services/file.service";
import { AuthRequest } from "@middlewares/auth";

// 📂 ใช้ middleware สำหรับอัปโหลด
export const uploadMiddleware = uploader.single("file");

// 📋 ดึงไฟล์ทั้งหมดของ user
export const listMyFiles = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const files = await service.listByUser(req.user!.id);
        res.status(200).json(files);
    } catch (e: any) {
        console.error("❌ [File:listMyFiles]", e.message);
        res.status(500).json({ message: e.message });
    }
};

// ⬆️ อัปโหลดไฟล์ CSV
export const uploadFile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "กรุณาอัปโหลดไฟล์" });
            return;
        }

        // ✅ บันทึกทั้งชื่อไฟล์เดิมและชื่อจริงในระบบ
        const expiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 ชม.
        const doc = await service.createFile({
            userId: req.user!.id as any,
            fileName: req.file.originalname,      // ชื่อที่ user อัปโหลด
            storedName: req.file.filename,        // ✅ ชื่อไฟล์จริงในระบบ (ใช้กับ FastAPI)
            size: req.file.size,
            path: req.file.path,
            expiredAt,
            status: "uploaded",
            createdAt: new Date(),
        });

        console.log("✅ Uploaded File:", {
            fileName: req.file.originalname,
            storedName: req.file.filename,
        });

        res.status(201).json({ message: "อัปโหลดสำเร็จ", file: doc });
    } catch (e: any) {
        console.error("❌ [File:uploadFile]", e.message);
        res.status(500).json({ message: e.message });
    }
};

// 🗑️ ลบไฟล์
export const deleteFile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        await service.removeFile(req.params.id, req.user!.id);
        res.status(200).json({ message: "ลบไฟล์สำเร็จ" });
    } catch (e: any) {
        console.error("❌ [File:deleteFile]", e.message);
        res.status(404).json({ message: e.message });
    }
};
