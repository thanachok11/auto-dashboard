from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import os

app = FastAPI(title="Auto Dashboard Analyzer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../backend/uploads"))

@app.post("/analyze")
def analyze(payload: dict):
    file_name = payload.get("fileName")
    header_row = payload.get("headerRow", 0)

    if not file_name:
        raise HTTPException(status_code=400, detail="fileName is required")

    file_path = os.path.join(UPLOAD_DIR, file_name)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    # ✅ อ่านไฟล์ CSV พร้อมระบุ header ที่เลือก
    try:
        df = pd.read_csv(file_path, header=header_row)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Read CSV error: {e}")

    # ✅ ล้าง NaN / inf / out of range
    df = df.replace([np.inf, -np.inf], np.nan)

    # ✅ สรุปข้อมูลพื้นฐาน
    summary = {
        "columns": list(df.columns),
        "row_count": int(len(df)),
        "numeric_columns": list(df.select_dtypes("number").columns),
        "non_numeric_columns": list(df.select_dtypes(exclude="number").columns),
        "preview": df.head(5).fillna("").to_dict(orient="records")
    }

    # ✅ chartData: ถ้ามีคอลัมน์ "Status"
    chart_labels = []
    chart_values = []
    if "Status" in df.columns:
        status_counts = df["Status"].value_counts(dropna=False)
        chart_labels = list(status_counts.index.astype(str))
        chart_values = [int(v) for v in status_counts.values]

    # ✅ ป้องกัน NaN ที่ JSON serialize ไม่ได้
    result = {
        "summary": summary,
        "chartData": {
            "labels": chart_labels,
            "values": chart_values
        }
    }

    return result


@app.post("/summarize")
def summarize(payload: dict):
    file_id = payload.get("fileId")
    if not file_id:
        raise HTTPException(status_code=400, detail="fileId is required")
    return {"message": f"Summarized for fileId {file_id}"}
