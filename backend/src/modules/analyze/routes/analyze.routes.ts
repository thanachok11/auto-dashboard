import express from "express";
import * as controller from "../controllers/analyze.controller";

const router = express.Router();

// ✅ Endpoint หลักสำหรับวิเคราะห์ไฟล์ CSV (ผ่าน FastAPI)
router.post("/", controller.analyze);

export default router;
