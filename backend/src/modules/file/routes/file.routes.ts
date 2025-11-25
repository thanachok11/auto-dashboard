import { Router } from "express";
import { auth } from "@middlewares/auth";
import { listMyFiles, uploadFile, deleteFile, uploadMiddleware } from "../controller/file.controller";


const router = Router();


router.get("/", auth, listMyFiles);
router.post("/", auth, uploadMiddleware, uploadFile);
router.delete("/:id", auth, deleteFile);


export default router;