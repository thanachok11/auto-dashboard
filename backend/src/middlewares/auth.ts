import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {
    user?: { id: string; email: string; role?: string };
}


export const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const header = req.headers.authorization;
    if (!header) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const token = header.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
        next();
    } catch (e) {
        res.status(401).json({ message: "Invalid token" });
    }
};