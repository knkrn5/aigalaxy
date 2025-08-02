import { Routes, Route } from "react-router";
import Home from "./pages/home/homePage";
import AiDebatePage from "./pages/main/aiDebatePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai-debate" element={<AiDebatePage />} />
    </Routes>
  );
}

export default App;
