import InsightModel from "@modules/insight/models/insight.model";
import { summarizeCsv } from "../../../services/external/aiClient";


export const createFromFile = async (fileId: string) => {
    const { summary, charts, aiText } = await summarizeCsv(fileId);
    const doc = await InsightModel.create({ fileId, summary, chartConfig: charts, aiText });
    return doc;
};


export const listByFile = async (fileId: string) => {
    return InsightModel.find({ fileId }).sort({ createdAt: -1 });
};