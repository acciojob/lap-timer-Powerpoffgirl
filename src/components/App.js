import React, { useState, useEffect } from "react";
import "./../styles/App.css";

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showLap, setShowLap] = useState(0);
  const [items, setItems] = useState([]);

  const addItem = () => {
    const newItem =
      showLapInHours +
      ":" +
      showLapInMinutes +
      ":" +
      showLapInSeconds +
      ":" +
      showLapInMilliseconds;
    setItems([...items, newItem]);
  };

  const timeInHours = Math.floor(time / 360000);
  const timeInMinutes = Math.floor((time % 360000) / 6000);
  const timeInSeconds = Math.floor((time % 6000) / 100);
  const timeInMilliseconds = Math.floor(time % 100);

  const showLapInHours = Math.floor(showLap / 360000);
  const showLapInMinutes = Math.floor((showLap % 360000) / 6000);
  const showLapInSeconds = Math.floor((showLap % 6000) / 100);
  const showLapInMilliseconds = Math.floor(showLap % 100);

  const array = [];

  useEffect(() => {
    let intervalId = null;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      });
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  // Start timer
  const startTimer = () => {
    setIsRunning(true);
  };

  // Stop timer
  const stopTimer = () => {
    setIsRunning(false);
  };

  // Lap timer
  const lapTimer = () => {
    setShowLap(time);
    addItem();
  };

  // Reset timer
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h1>Lap Timer</h1>
      <p>
        {timeInHours}:{timeInMinutes}:{timeInSeconds}:{timeInMilliseconds}{" "}
      </p>
      <span>
        <button onClick={startTimer}>Start Timer</button>
        <button onClick={stopTimer}>Stop Timer</button>
        <button onClick={lapTimer}>Lap Timer</button>
        <button onClick={resetTimer}>Reset Timer</button>
      </span>
      <p>
        {" "}
        {showLapInHours}:{showLapInMinutes}:{showLapInSeconds}:
        {showLapInMilliseconds}
      </p>

      {items.map((item) => {
        return (
          <div>
            <li>{item}</li>
          </div>
        );
      })}
    </div>
  );
};

export default App;
