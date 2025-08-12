import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import Home from "./pages/home/homePage";
import AiDebatePage from "./pages/main/aiDebatePage";
import axios from "axios";
import Loading from "./components/ui/loading";
import AuthDenied from "./pages/auth/authDenied";
import PageNotFound from "./pages/pageNotFound/pageNotFound";

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
    return <Loading type="full-page" message="Loading..." />;
  }

  if (!isAuthenticated) {
    return <AuthDenied />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="ai-debate" element={<AiDebatePage />} />

      {/* Catch-all route for 404 pages */}
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  );
}

export default App;
