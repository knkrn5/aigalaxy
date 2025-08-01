import { Routes, Route } from "react-router";
import Home from "./home/homePage";
import AiDebatePage from "./main/aiDebatePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai-debate" element={<AiDebatePage />} />
    </Routes>
  );
}

export default App;
