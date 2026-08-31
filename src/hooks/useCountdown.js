import { useState, useEffect } from 'react';

export function useCountdown(targetHours = 8, targetMinutes = 42, targetSeconds = 19) {
  // Initialize with fixed target duration from current time
  const [timeLeft, setTimeLeft] = useState({
    hours: targetHours,
    minutes: targetMinutes,
    seconds: targetSeconds,
    milliseconds: 88
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let ms = prev.milliseconds - 4;
        let s = prev.seconds;
        let m = prev.minutes;
        let h = prev.hours;

        if (ms < 0) {
          ms = 99;
          s -= 1;
        }
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) {
          // loop back
          return { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 };
        }

        return { hours: h, minutes: m, seconds: s, milliseconds: ms };
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}
