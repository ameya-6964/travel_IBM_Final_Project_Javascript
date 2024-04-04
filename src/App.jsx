import Navigation from "./components/Navigation";
import AboutUsPage from "./components/AboutUsPage";
import ContactUsPage from "./components/ContactusPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
