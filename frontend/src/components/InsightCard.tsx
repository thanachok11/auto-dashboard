import React from "react";
import type { IInsight } from "../types/api";
import "../styles/layout/InsightCard.css";

interface Props {
    insight: IInsight;
}

const InsightCard: React.FC<Props> = ({ insight }) => (
    <div className="insightcard">
        <h4 className="insightcard-title">🔍 สรุป Insight</h4>
        <p className="insightcard-summary">{insight.summary}</p>
        {insight.aiText && (
            <p className="insightcard-ai">💡 {insight.aiText}</p>
        )}
    </div>
);

export default InsightCard;
