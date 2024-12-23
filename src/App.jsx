import Navbar from "./components/Navbar";
import RecommendedTrades from "./pages/RecommendedTrades";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import CompletedTrades from "./pages/CompletedTrades";
import Connect from "./pages/Connect";
import { useState } from "react";

const App = () => {
  const [navbarVisible, setNavbarVisible] = useState(true);

  return (
    <div className="app">
      {navbarVisible && <Navbar />}
      <div className="main">
        <Routes>
          <Route
            path="/:username/:chatId/connect"
            element={<Connect setNavbarVisible={setNavbarVisible} />}
          />
          <Route path={"/:username/:chatId/trades/recommended/"} element={<RecommendedTrades />} />
          <Route path={"/:username/:chatId/trades/completed/"} element={<CompletedTrades />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
