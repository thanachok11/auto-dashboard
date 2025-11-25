import "dotenv/config";
import { createServer } from "http";
import app from "./app";
import { connectDB } from "@config/database";


const PORT = process.env.PORT || 5000;


const bootstrap = async (): Promise<void> => {
    await connectDB();
    const server = createServer(app);
    server.listen(PORT, () => {
        console.log(`⚡ Server running on http://localhost:${PORT}`);
    });
};


bootstrap().catch((err) => {
    console.error("❌ Bootstrap error:", err);
    process.exit(1);
});