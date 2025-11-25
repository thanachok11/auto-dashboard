import { analyzeFile as fastApiAnalyze } from "../../../services/external/aiClient";

export const analyzeFile = async (fileName: string) => {
    const data = await fastApiAnalyze(fileName);
    return data;
};
