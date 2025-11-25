import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInsights, generateInsight } from "../api/insight";
import InsightCard from "../components/InsightCard";
import type { IInsight } from "../types/api";
import "../styles/page/InsightsPage.css";

const InsightsPage: React.FC = () => {
    const { fileId } = useParams<{ fileId: string }>();
    const [insights, setInsights] = useState<IInsight[]>([]);
    const [loading, setLoading] = useState(false);

    const loadInsights = async (): Promise<void> => {
        setLoading(true);
        const data = await getInsights(fileId!);
        setInsights(data);
        setLoading(false);
    };

    const handleGenerate = async (): Promise<void> => {
        setLoading(true);
        await generateInsight(fileId!);
        await loadInsights();
    };

    useEffect(() => {
        loadInsights();
    }, []);

    return (
        <div className="insight-container">
            <h2 className="insight-title">📈 Insights</h2>
            <button onClick={handleGenerate} className="insight-button" disabled={loading}>
                {loading ? "⏳ กำลังสร้าง..." : "🔄 สร้าง Insight ใหม่"}
            </button>
            <div className="insight-list">
                {loading && insights.length === 0 ? (
                    <p>กำลังโหลด...</p>
                ) : (
                    insights.map((i) => <InsightCard key={i._id} insight={i} />)
                )}
            </div>
        </div>
    );
};

export default InsightsPage;
