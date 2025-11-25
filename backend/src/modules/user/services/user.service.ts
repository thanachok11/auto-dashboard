import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "@modules/user/models/user.model";


const sanitize = (u: IUser & { _id?: any }) => ({
    id: u._id?.toString?.(),
    email: u.email,
    credits: u.credits,
    role: u.role,
    createdAt: u.createdAt,
});


export const register = async (email: string, password: string) => {
    const exists = await User.findOne({ email });
    if (exists) throw new Error("อีเมลนี้ถูกใช้งานแล้ว");
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });
    return sanitize(user);
};


export const login = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("ไม่พบบัญชีผู้ใช้");


    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error("รหัสผ่านไม่ถูกต้อง");


    const token = jwt.sign(
        { id: user._id.toString(), email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    );


    return { token, user: sanitize(user) };
};


export const getMe = async (id: string) => {
    const user = await User.findById(id);
    if (!user) throw new Error("ไม่พบบัญชีผู้ใช้");
    return sanitize(user);
};


export const updateCredits = async (id: string, delta: number) => {
    const user = await User.findByIdAndUpdate(id, { $inc: { credits: delta } }, { new: true });
    if (!user) throw new Error("ไม่พบบัญชีผู้ใช้");
    return sanitize(user);
};