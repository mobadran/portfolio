import { useEffect, useRef, useState } from 'react';

export function useClock() {
  const [date, setDate] = useState(new Date());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setDate(now);

      const secondsUntilNextMinute = 60 - now.getSeconds();
      const msUntilNextMinute = secondsUntilNextMinute * 1000;

      timeoutRef.current = setTimeout(updateClock, msUntilNextMinute);
    }

    updateClock(); // start the loop

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return date;
}
