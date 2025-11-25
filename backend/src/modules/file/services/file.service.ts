import { FileModel, IFile } from "@modules/file/models/file.model";

export const listByUser = async (userId: string) => {
    return FileModel.find({ userId }).sort({ createdAt: -1 });
};

export const createFile = async (doc: Partial<IFile>) => {
    return FileModel.create(doc);
};

export const removeFile = async (id: string, userId: string) => {
    const file = await FileModel.findOne({ _id: id, userId });
    if (!file) throw new Error("File not found");
    await FileModel.deleteOne({ _id: id });
    return true;
};
