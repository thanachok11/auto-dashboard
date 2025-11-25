import { Router } from "express";
import { postLogin, postRegister, getMe } from "../controller/user.controller";
import { auth } from "@middlewares/auth";


const router = Router();


router.post("/register", postRegister);
router.post("/login", postLogin);
router.get("/me", auth, getMe);


export default router;