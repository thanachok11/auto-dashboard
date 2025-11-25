// ======================================
// 📦 file.model.ts
// ======================================
import { Schema, model, Types } from "mongoose";

export interface IFile {
    userId: Types.ObjectId;
    fileName: string;
    storedName: string;
    size: number;
    path: string; // local path or remote URL
    status: "uploaded" | "processed" | "expired";
    createdAt: Date;
    expiredAt?: Date;
}

const fileSchema = new Schema<IFile>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, required: true }, // ชื่อที่อัปโหลดมา
    storedName: { type: String, required: true }, // ✅ ชื่อจริงใน /uploads
    path: { type: String, required: true },
    size: { type: Number, required: true },
    status: {
        type: String,
        enum: ["uploaded", "processed", "expired"],
        default: "uploaded",
    },
    createdAt: { type: Date, default: Date.now },
    expiredAt: { type: Date },
});

export const FileModel = model<IFile>("File", fileSchema);
