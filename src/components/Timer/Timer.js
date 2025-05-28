import React from "react";
import "./Timer.css";

const Timer = ({ minutes, seconds, currentMinute }) => {
  const time = minutes + ":" + (seconds < 10 ? `0${seconds}` : seconds);

  // Calculate progress percentage
  const totalSeconds = currentMinute * 60;
  const remainingSeconds = minutes * 60 + seconds;
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  return (
    <div>
      <div className="timer">{time}</div>
      <div className="timer-progress-bar-container">
        <div
          className="timer-progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
