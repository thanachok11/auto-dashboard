import { useEffect, useState } from "react";

const useAuth = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        const handler = () => setToken(localStorage.getItem("token"));
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return { token, setToken, logout };
};

export default useAuth;
