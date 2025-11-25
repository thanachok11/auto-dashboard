import { Router } from "express";
import { generate, list } from "../controller/insight.controller";
import { auth } from "@middlewares/auth";


const router = Router();


router.post("/:fileId", auth, generate);
router.get("/:fileId", auth, list);


export default router;