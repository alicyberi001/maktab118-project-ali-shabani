"use client";

import { useState } from "react";
import { FaHome, FaCog, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <aside className="fixed right-0 top-0 h-screen w-64 bg-gray-100 dark:bg-gray-800 shadow-lg flex flex-col justify-between">
      {/* بخش بالا */}
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-6">
          Dashboard
        </h1>
        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <FaHome className="mr-3" /> Home
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <FaCog className="mr-3" /> Settings
          </a>
        </nav>
      </div>
      {/* بخش پایین */}
      <div className="p-4">
        <button
          onClick={toggleDarkMode}
          className="flex items-center justify-center w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg shadow-soft hover:shadow-md transition-all"
        >
          {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <a
          href="#"
          className="flex items-center mt-4 px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <FaSignOutAlt className="mr-3" /> Logout
        </a>
      </div>
    </aside>
  );
}
