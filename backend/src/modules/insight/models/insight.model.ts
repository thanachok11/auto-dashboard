import { Schema, model, Types } from "mongoose";


export interface IInsight {
    fileId: Types.ObjectId;
    summary: string;
    chartConfig?: any;
    aiText?: string;
    createdAt: Date;
}


const InsightSchema = new Schema<IInsight>({
    fileId: { type: Schema.Types.ObjectId, ref: "File", required: true },
    summary: { type: String, required: true },
    chartConfig: { type: Schema.Types.Mixed },
    aiText: { type: String },
    createdAt: { type: Date, default: Date.now },
});


export default model<IInsight>("Insight", InsightSchema);