import pandas as pd
import numpy as np
import random

def summarize_csv(file_id: str):
    """
    Mock summarizer สำหรับทดสอบเชื่อม backend.
    ในอนาคตสามารถเปลี่ยนเป็นเวอร์ชันที่อ่านไฟล์จริงจาก storage ได้
    """

    # ตัวอย่างข้อมูลจำลอง
    df = pd.DataFrame({
        "Month": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "Revenue": [random.randint(1000, 5000) for _ in range(6)],
        "Expense": [random.randint(500, 3000) for _ in range(6)],
    })
    df["Profit"] = df["Revenue"] - df["Expense"]

    avg_profit = np.mean(df["Profit"])
    best_month = df.loc[df["Profit"].idxmax(), "Month"]
    worst_month = df.loc[df["Profit"].idxmin(), "Month"]

    summary = (
        f"💹 สรุปข้อมูลเบื้องต้นของไฟล์ {file_id}\n"
        f"- กำไรเฉลี่ยต่อเดือน: {avg_profit:.2f}\n"
        f"- เดือนที่กำไรสูงสุด: {best_month}\n"
        f"- เดือนที่กำไรต่ำสุด: {worst_month}"
    )

    charts = {
        "bar": {
            "labels": df["Month"].tolist(),
            "datasets": [
                {"label": "Revenue", "data": df["Revenue"].tolist()},
                {"label": "Expense", "data": df["Expense"].tolist()},
                {"label": "Profit", "data": df["Profit"].tolist()},
            ],
        }
    }

    return {
        "summary": summary,
        "charts": charts,
        "aiText": f"จากการวิเคราะห์ข้อมูล พบว่าธุรกิจมีกำไรเฉลี่ยเดือนละ {avg_profit:.2f} บาท โดยเดือนที่มีกำไรดีที่สุดคือ {best_month}.",
    }
