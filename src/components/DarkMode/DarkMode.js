import React from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import "./DarkMode.css";

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button className="dark-mode-toggle" onClick={onToggle}>
      {isDarkMode ? <IoSunny /> : <IoMoon />}
    </button>
  );
};

export default DarkModeToggle;
