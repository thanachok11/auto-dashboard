import cron from "node-cron";
import { connectDB } from "@config/database";
import FileModel from "@modules/file/models/file.model";


export const cleanupExpiredFiles = async (): Promise<void> => {
    await connectDB();
    const now = new Date();
    const expired = await FileModel.find({ expiredAt: { $lte: now } });
    for (const f of expired) {
        await FileModel.deleteOne({ _id: f._id });
        console.log(`🧹 Deleted expired file: ${f.fileName}`);
    }
};


if (require.main === module) {
    cleanupExpiredFiles().then(() => process.exit(0));
} else {
    const expr = process.env.CLEANUP_CRON || "0 0 * * *";
    cron.schedule(expr, cleanupExpiredFiles);
}