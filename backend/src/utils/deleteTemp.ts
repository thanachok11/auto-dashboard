import fs from "fs";
import path from "path";


export const deleteFileSafe = (filePath: string): void => {
    try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (e) {
        console.error("Delete error:", e);
    }
};


export const listFiles = (dir = process.env.UPLOAD_DIR || "uploads"): string[] => {
    const full = path.join(process.cwd(), dir);
    if (!fs.existsSync(full)) return [];
    return fs.readdirSync(full).map((f) => path.join(full, f));
};