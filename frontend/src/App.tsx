import { Routes, Route } from "react-router";
import Home from "./pages/home/homePage";
import AiDebatePage from "./pages/main/aiDebatePage";

const isAuthenticated = sessionStorage.getItem("isAuthenticated");

if (isAuthenticated !== "iloveai") {
  const pass: string = (prompt("enter password to access the app") as string)
    .trim()
    .toLowerCase();
  sessionStorage.setItem(
    "isAuthenticated",
    pass === "iloveai" ? pass : "not-authenticated"
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai-debate" element={<AiDebatePage />} />
    </Routes>
  );
}

export default App;
