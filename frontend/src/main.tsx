import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { BrowserRouter } from 'react-router'
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";

const isAuthenticated = sessionStorage.getItem("isAuthenticated");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {isAuthenticated === "iloveai" ? (
        <App />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Authentication Required</h1>
            <p className="text-lg">Please log in to access this page.</p>
          </div>
        </div>
      )}
    </BrowserRouter>
  </StrictMode>
);
