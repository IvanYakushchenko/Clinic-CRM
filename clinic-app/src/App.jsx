import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Doctors from "./pages/Doctors";
import About from "./pages/AboutPage";
import AppointmentPage from "./pages/AppointmentPage";

function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Please select a section from the menu.
      </p>
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/appointments" element={<AppointmentPage />} />
        </Routes>
      </div>
    </div>
  );
}