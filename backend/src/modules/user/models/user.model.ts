import { Schema, model } from "mongoose";


export interface IUser {
    email: string;
    passwordHash: string;
    credits: number;
    role: "user" | "admin";
    createdAt: Date;
}


const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    credits: { type: Number, default: 5 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt: { type: Date, default: Date.now }
});


export default model<IUser>("User", UserSchema);