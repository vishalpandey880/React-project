import { useEffect, useState } from 'react';

export function AnimatedNumber({ value, formatter = (item) => item }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const numeric = Number(value) || 0;
    const duration = 650;
    const started = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min(1, (now - started) / duration);
      setDisplay(Math.round(numeric * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return formatter(display);
}
