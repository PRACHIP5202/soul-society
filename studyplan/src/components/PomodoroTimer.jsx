import  { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

export function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      if (isBreak) {
        setTime(25 * 60);
        setIsBreak(false);
      } else {
        setTime(5 * 60);
        setIsBreak(true);
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setIsActive(false);
    setIsBreak(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">
        {isBreak ? "Break Time" : "Focus Time"}
      </h2>
      <div className="text-4xl font-bold text-center">{formatTime(time)}</div>
      <Progress value={(time / (isBreak ? 300 : 1500)) * 100} />
      <div className="flex justify-center space-x-2">
        <Button onClick={toggleTimer}>
          {isActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}

