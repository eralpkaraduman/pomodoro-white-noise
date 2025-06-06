import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Timer from "./components/Timer/Timer";
import TimerTypeButton from "./components/TimerTypeButton/TimerTypeButton";
import StartButton from "./components/StartButton/StartButton";
import Logo from "./components/Logo/Logo";
import LogoBottom from "./components/Logo/LogoBottom";
import RestartButton from "./components/RestartButton/RestartButton";
import PlayButton from "./components/AudioPlayerButtons/PlayButton";
import MoreButton from "./components/AudioPlayerButtons/MoreButton";
import SoundButton from "./components/AudioPlayerButtons/SoundButton";
import VolumeSlider from "./components/AudioPlayerButtons/VolumeSlider";
import NextSongButton from "./components/AudioPlayerButtons/NextSongButton";
import DarkMode from "./components/DarkMode/DarkMode";
import SilentSound from "./assets/15-seconds-of-silence.mp3";
import useTimer from "./hooks/useTimer";
import useAudioPlayer from "./hooks/useAudioPlayer";

const App = () => {
  const audioRef = useRef(null);
  const [selectedButton, setSelectedButton] = useState(0);
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("darkModeMode");
    return savedMode || "auto";
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (mode === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    if (mode === "manual-dark") return true;
    if (mode === "manual-light") return false;
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const {
    isPlayClicked,
    isVolumeClicked,
    isVolumeMuted,
    volume,
    handleAudioPlayer,
    handleVolumeClick,
    handleVolumeChange,
    handleNextButton,
    handleAudioSelection,
  } = useAudioPlayer(audioRef, setSelectedButton);

  const {
    timerRunning,
    minutes,
    seconds,
    isStartClicked,
    clickedIndex,
    handleStartTimer,
    handleRestartButton,
    handleTimerTypeButton,
    currentMinute,
  } = useTimer({
    handleAudioPlayer,
    isPlayClicked,
    initialMinute: 90,
  });

  useEffect(() => {
    localStorage.setItem("darkModeMode", mode);
    if (mode === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => setIsDarkMode(e.matches);
      setIsDarkMode(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else if (mode === "manual-dark") {
      setIsDarkMode(true);
    } else if (mode === "manual-light") {
      setIsDarkMode(false);
    }
  }, [mode]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const timerBar = [
    { name: "90", time: 90 },
    { name: "25", time: 25 },
    { name: "5", time: 5 },
    { name: "10", time: 10 },
  ];

  return (
    <div className="global-container">
      <div className="nav-bar">
        <DarkMode
          isDarkMode={isDarkMode}
          mode={mode}
          onModeChange={handleModeChange}
        />
      </div>
      <div className="main-container">
        <div className="logo-timer-container">
          <Logo name={`Pomodoro.`} />
          <LogoBottom name={`and white noise.`} />
          <Timer
            timerRunning={timerRunning}
            minutes={minutes}
            seconds={seconds}
            currentMinute={currentMinute}
          />
          <div className="left-empty-space">&nbsp;</div>
        </div>
        <div className="larger-matrix-container">
          <div className="matrix-container">
            <div className="timer-row">
              {timerBar.map((value, index) => (
                <TimerTypeButton
                  key={index}
                  name={value.name}
                  index={index}
                  clickedIndex={clickedIndex}
                  onTypeClick={() => handleTimerTypeButton(value.time, index)}
                />
              ))}
            </div>
            <div className="start-row">
              <MoreButton
                onAudioSelected={handleAudioSelection}
                selectedButton={selectedButton}
                setSelectedButton={setSelectedButton}
              />
              <StartButton
                className="start-button"
                isStartClicked={isStartClicked}
                onStartClick={handleStartTimer}
              />
              <RestartButton onRestartClick={handleRestartButton} />
            </div>
            <div>
              <div className="audio-row">
                <SoundButton
                  onVolumeClick={handleVolumeClick}
                  isVolumeMuted={isVolumeMuted}
                />
                <PlayButton
                  alt="audio"
                  isPlayClicked={isPlayClicked}
                  onPlayClick={handleAudioPlayer}
                />
                <NextSongButton onNextClick={handleNextButton} />
              </div>
              <div className="volume-slider">
                {isVolumeClicked ? (
                  <VolumeSlider
                    onVolumeChange={handleVolumeChange}
                    vol={volume}
                  />
                ) : (
                  <div>&nbsp;</div>
                )}
                <div>
                  <audio id="myAudio" ref={audioRef} loop>
                    <source src={SilentSound} type="audio/mpeg" />
                  </audio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        This is an open source project, forked from{' '}
        <a href="https://github.com/benyoon1/pomodoro-white-noise" target="_blank" rel="noopener noreferrer">benyoon1/pomodoro-white-noise</a>.<br />
        You can find this fork at{' '}
        <a href="https://github.com/eralpkaraduman/pomodoro-white-noise" target="_blank" rel="noopener noreferrer">github.com/eralpkaraduman/pomodoro-white-noise</a>.<br />
        Feel free to contribute or open issues and feature requests!
      </div>
    </div>
  );
};

export default App;
