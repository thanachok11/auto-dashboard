import { api } from "./axios";
import type { IAuthResponse, IUser } from "../types/api";

export const login = async (email: string, password: string): Promise<IUser> => {
    const { data } = await api.post<IAuthResponse>("/users/login", { email, password });
    localStorage.setItem("token", data.token);
    return data.user;
};

export const register = async (email: string, password: string) => {
    const { data } = await api.post("/users/register", { email, password });
    return data.user;
};

export const getMe = async () => {
    const { data } = await api.get("/users/me");
    return data;
};
