import React from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { MdBrightnessAuto } from "react-icons/md";
import "./DarkMode.css";

const DarkModeToggle = ({ isDarkMode, mode, onModeChange }) => {
  return (
    <div className="dark-mode-toggle-group">
      <button
        className={`dark-mode-toggle${mode === "auto" ? " active" : ""}`}
        onClick={() => onModeChange("auto")}
        title="Auto (System)"
      >
        <MdBrightnessAuto className="dark-mode-icon" />
      </button>
      <button
        className={`dark-mode-toggle${mode === "manual-light" ? " active" : ""}`}
        onClick={() => onModeChange("manual-light")}
        title="Light Mode"
      >
        <IoSunny className="dark-mode-icon" />
      </button>
      <button
        className={`dark-mode-toggle${mode === "manual-dark" ? " active" : ""}`}
        onClick={() => onModeChange("manual-dark")}
        title="Dark Mode"
      >
        <IoMoon className="dark-mode-icon" />
      </button>
    </div>
  );
};

export default DarkModeToggle;
