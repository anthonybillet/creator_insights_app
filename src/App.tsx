import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Analytics } from "./pages/Analytics";
import { Chat } from "./pages/Chat";
import { DeviceSimulator } from "./components/DeviceSimulator";

// A simple requirement for demo, adding a comment for publish
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default function App() {
  return (
    <DeviceSimulator>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/analytics" replace />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DeviceSimulator>
  );
}
