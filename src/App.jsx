import Navbar from "./components/Navbar";
import Connect from "./pages/Connect";
import { useState } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  const [navbarVisible, setNavbarVisible] = useState(true);

  return (
    <div className="app">
      {navbarVisible && <Navbar />}
      <Analytics />
      <Toaster />
      <div className="main">
        <Routes>
          <Route
            path="/:username/:chatId/connect"
            element={<Connect setNavbarVisible={setNavbarVisible} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
