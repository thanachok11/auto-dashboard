import { Router } from "express";
import userModule from "@modules/user";
import fileModule from "@modules/file";
import insightModule from "@modules/insight";
import { analyzeRoutes } from "@modules/analyze"; // ✅ เพิ่ม


const router = Router();


router.use("/users", userModule);
router.use("/files", fileModule);
router.use("/insights", insightModule);
router.use("/analyze", analyzeRoutes); // ✅ แยกออกมาชัดเจน


export default router;