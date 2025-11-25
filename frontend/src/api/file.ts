import { api } from "./axios";

export const uploadFile = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const { data } = await api.post("/files", form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data.file;
};

export const getMyFiles = async () => {
    const { data } = await api.get("/files");
    return data;
};

export const deleteFile = async (id: string) => {
    await api.delete(`/files/${id}`);
};
