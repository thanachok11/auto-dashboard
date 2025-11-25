import matplotlib.pyplot as plt
import pandas as pd
import base64
from io import BytesIO


def generate_chart(df: pd.DataFrame, file_name: str) -> str:
    """
    แปลงข้อมูลใน DataFrame เป็นกราฟภาพ (base64)
    """
    try:
        plt.switch_backend("Agg")  # ปิด interactive backend (ใช้สำหรับ server)
        plt.figure(figsize=(8, 4))

        # ✅ เลือกเฉพาะคอลัมน์ตัวเลข
        numeric_cols = df.select_dtypes(include="number").columns
        if len(numeric_cols) == 0:
            raise ValueError("ไม่มีคอลัมน์ตัวเลขสำหรับสร้างกราฟ")

        # วาดกราฟ
        df[numeric_cols].plot(kind="line", linewidth=2)
        plt.title(f"📊 Data Overview: {file_name}")
        plt.xlabel("Row Index")
        plt.ylabel("Value")
        plt.grid(True)
        plt.tight_layout()

        # แปลงเป็น base64 string
        buf = BytesIO()
        plt.savefig(buf, format="png")
        plt.close()
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode("utf-8")

        return f"data:image/png;base64,{img_base64}"

    except Exception as e:
        raise RuntimeError(f"Error generating chart: {e}")
