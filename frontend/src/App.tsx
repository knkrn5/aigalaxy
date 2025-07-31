import Home from "./pages/home/homePage";
import AiDebatePage from "./pages/main/aiDebatePage";

function App() {
  return (
    <>
      {window.location.pathname === "/" && <Home />}
      {window.location.pathname === "/ai-debate" && <AiDebatePage />}
    </>
  );
}

export default App;
