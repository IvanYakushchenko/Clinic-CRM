import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Moon,
  Sun,
  Home,
  User,
  Calendar,
  History,
  Settings,
  Stethoscope,
  Menu,
  X,
} from "lucide-react";

export default function Navbar({ toggleTheme, isDark }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home", icon: <Home size={16} /> },
    { to: "/doctors", label: "Doctors", icon: <Stethoscope size={16} /> },
    { to: "/appointments", label: "Appointments", icon: <Calendar size={16} /> },
    { to: "/history", label: "History", icon: <History size={16} /> },
    { to: "/profile", label: "Profile", icon: <User size={16} /> },
    { to: "/about", label: "About", icon: <Settings size={16} /> },
  ];

  const renderLink = (link) => (
    <div
      key={link.to}
      className="relative group overflow-hidden px-2 py-1 rounded-md"
    >
      <span className="absolute inset-0 bg-blue-300/40 dark:bg-blue-950/70 opacity-0 group-hover:opacity-100 scale-105 transition-all duration-300 z-0 rounded-md backdrop-blur-sm"></span>

      <Link
        to={link.to}
        onClick={() => setIsOpen(false)}
        className={`relative z-10 flex items-center gap-2 text-sm font-medium px-3 py-2 transition-all duration-300 ease-in-out ${
          location.pathname === link.to
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        }`}
      >
        {link.icon}
        {link.label}
      </Link>

      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300 ease-in-out z-10 rounded"></span>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clinic Admin</h1>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-6">
          {links.map(renderLink)}
        </div>

        {/* Right side: theme toggle + mobile toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            title="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-3 px-4 pb-4">
          {links.map(renderLink)}
        </div>
      )}
    </nav>
  );
}