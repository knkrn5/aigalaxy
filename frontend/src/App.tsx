import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import Home from "./pages/home/homePage";
import AiDebatePage from "./pages/main/aiDebatePage";
import axios from "axios";
import Loading from "./components/ui/loading";
import AppAccessDenied from "./pages/appAccess/appAccessDenied";
import AppAccessLogin from "./pages/appAccess/appAccessLogin";
import PageNotFound from "./pages/pageNotFound/pageNotFound";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAuthLogin, setShowAuthLogin] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [appPassword, setAppPassword] = useState<string>("");

  const appPassInSS = sessionStorage.getItem("appPassInSS");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/envvar/get-app-pass`)
      .then((response) => {
        const appPass = response.data.trim().toLowerCase();
        setAppPassword(appPass);

        if (appPassInSS && appPassInSS === appPass) {
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        // If not authenticated, show the login form
        setShowAuthLogin(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching app password:", error);
        setIsLoading(false);
        setShowAuthLogin(true);
      });
  }, [appPassInSS]);

  const handleAuthentication = (password: string) => {
    setAuthLoading(true);
    setAuthError("");

    // Simulate a brief loading delay for better UX
    setTimeout(() => {
      if (password.trim().toLowerCase() === appPassword) {
        sessionStorage.setItem("appPassInSS", appPassword);
        setIsAuthenticated(true);
        setShowAuthLogin(false);
        setAuthLoading(false);
      } else {
        setAuthError("Invalid access code. Please try again.");
        setAuthLoading(false);
        setShowAuthLogin(false);
      }
    }, 1000);
  };

  if (isLoading) {
    return <Loading type="full-page" message="Initializing Galaxy..." />;
  }

  if (showAuthLogin && !isAuthenticated) {
    return (
      <AppAccessLogin
        onAuthentication={handleAuthentication}
        isLoading={authLoading}
        error={authError}
      />
    );
  }

  if (!isAuthenticated) {
    return <AppAccessDenied />;
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
