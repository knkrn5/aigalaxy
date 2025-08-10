import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import Home from "./pages/home/homePage";
import AiDebatePage from "./pages/main/aiDebatePage";
import axios from "axios";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const appPassInSS = sessionStorage.getItem("appPassInSS");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/envvar/get-app-pass`)
      .then((response) => {
        const appPass = response.data.trim().toLowerCase();

        if (appPassInSS && appPassInSS === appPass) {
          setIsAuthenticated(true);
          return;
        }

        if (!isAuthenticated) {
          const pass = prompt("Enter password to access the app");
          if (!pass) {
            setIsAuthenticated(false);
            return;
          }
          if (pass.trim().toLowerCase() === appPass) {
            sessionStorage.setItem("appPassInSS", appPass);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching app password:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [appPassInSS, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <h1 className="text-4xl font-bold mb-4 text-white">Access Denied</h1>
          <p className="text-lg text-gray-200 mb-6">
            Invalid password. Please refresh the page to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai-debate" element={<AiDebatePage />} />

      {/* <Route path="/test" element={<Redirect />} /> */}
    </Routes>
  );
}

export default App;
