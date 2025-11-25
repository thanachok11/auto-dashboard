import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Morgan สีสวย
app.use(morgan("dev"));

// ✅ Custom Logger — log ทั้ง request และ response แบบไม่ซ้ำ
app.use((req, res, next) => {
    const start = Date.now();
    const { method, originalUrl, body } = req;

    console.log(`\n📩 [${new Date().toLocaleTimeString("th-TH")}] ${method} ${originalUrl}`);
    if (Object.keys(body || {}).length > 0) {
        console.log("📦 Request Body:", JSON.stringify(body, null, 2));
    }

    res.on("finish", () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        let color = "\x1b[32m"; // เขียว = 2xx

        if (status >= 400 && status < 500) color = "\x1b[33m"; // เหลือง = 4xx
        else if (status >= 500) color = "\x1b[31m"; // แดง = 5xx

        console.log(`${color}📤 [${method}] ${originalUrl} → ${status} (${duration}ms)\x1b[0m`);
    });

    next();
});

// ✅ Static + Routes
app.use("/uploads", express.static(path.join(process.cwd(), process.env.UPLOAD_DIR || "uploads")));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", router);

// ✅ Root HTML
app.get("/", (_req, res) => {
    const html = `
    <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <title>🚀 Auto Dashboard Backend</title>
        <style>
          body {
            font-family: "Segoe UI", sans-serif;
            background: linear-gradient(135deg, #141e30, #243b55);
            color: #f2f2f2;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          h1 {
            font-size: 2rem;
            margin-bottom: 8px;
            color: #4ade80;
          }
          h2 {
            font-size: 1.2rem;
            font-weight: 400;
            margin-bottom: 20px;
            color: #a5f3fc;
          }
          .card {
            background: rgba(255, 255, 255, 0.08);
            padding: 24px 32px;
            border-radius: 16px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            max-width: 600px;
            line-height: 1.6;
          }
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          li {
            margin: 8px 0;
          }
          code {
            background: rgba(255, 255, 255, 0.1);
            padding: 4px 8px;
            border-radius: 6px;
            color: #93c5fd;
          }
          footer {
            margin-top: 24px;
            font-size: 0.9rem;
            opacity: 0.85;
          }
          footer a {
            color: #60a5fa;
            text-decoration: none;
            font-weight: 500;
          }
          footer a:hover {
            text-decoration: underline;
            color: #93c5fd;
          }
        </style>
      </head>
      <body>
        <h1>🚀 Auto Dashboard Backend</h1>
        <h2>API สำหรับอัปโหลด วิเคราะห์ และสร้าง Insight จาก CSV</h2>
        <div class="card">
          <strong>🧩 Features:</strong>
          <ul>
            <li>✅ <code>/api/users</code> — สมัคร / เข้าสู่ระบบ / ตรวจสอบผู้ใช้</li>
            <li>📁 <code>/api/files</code> — อัปโหลดไฟล์ CSV / จัดการไฟล์ / ลบไฟล์หมดอายุ</li>
            <li>📊 <code>/api/insights</code> — วิเคราะห์ข้อมูลและสร้างสรุปจาก AI (FastAPI)</li>
          </ul>
          <p><strong>🩺 Health Check:</strong> <code>/health</code></p>
          <p><strong>🕓 Server Time:</strong> ${new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}</p>
        </div>
        <footer>
          Made with ❤️ <a href="https://github.com/thanachok11" target="_blank">Thanachok11</a>
        </footer>
      </body>
    </html>`;
    res.status(200).send(html);
});

app.get("/api", (_req, res) => {
    res.json({
        message: "API Ready",
        endpoints: ["/api/users", "/api/files", "/api/insights"],
    });
});

export default app;
