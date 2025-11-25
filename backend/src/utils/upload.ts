import multer from "multer";
import fs from "fs";
import path from "path";


const uploadDir = process.env.UPLOAD_DIR || "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });


const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const ts = Date.now();
        const ext = path.extname(file.originalname);
        cb(null, `${ts}-${Math.random().toString(16).slice(2)}${ext}`);
    },
});


export const uploader = multer({ storage });