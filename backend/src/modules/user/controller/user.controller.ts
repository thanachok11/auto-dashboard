import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@modules/user/models/user.model";
import { AuthRequest } from "@middlewares/auth";


export const postRegister = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) {
            res.status(400).json({ message: "อีเมลนี้ถูกใช้งานแล้ว" });
            return;
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, passwordHash });
        res.status(201).json({ message: "สมัครสมาชิกสำเร็จ", user });
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
};


export const postLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "ไม่พบบัญชีผู้ใช้" });
            return;
        }


        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง" });
            return;
        }


        const token = jwt.sign(
            { id: user._id.toString(), email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );


        res.status(200).json({ token, user });
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
};


export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user!.id);
        if (!user) {
            res.status(404).json({ message: "ไม่พบบัญชีผู้ใช้" });
            return;
        }
        res.status(200).json(user);
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
};