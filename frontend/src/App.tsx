import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import InsightsPage from "./pages/InsightsPage";
import Dashboard from "./pages/Dashboard";
import useAuth from "./hooks/useAuth";
import AnalyzePage from "./pages/AnalyzePage";

const App: React.FC = () => {
  const { token } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/upload" element={token ? <UploadPage /> : <Navigate to="/login" />} />
          <Route path="/insights/:fileId" element={token ? <InsightsPage /> : <Navigate to="/login" />} />
          <Route path="/analyze" element={token ? <AnalyzePage /> : <Navigate to="/login" />} /> {/* ✅ เพิ่มบรรทัดนี้ */}
          <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
