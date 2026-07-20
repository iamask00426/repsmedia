import React, { useEffect, useState, useRef } from 'react';

const Counter = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    // Extract numerical value from target (e.g., "1500" from "1500+")
    const parsedTarget = parseInt(target.toString().replace(/[^0-9]/g, ''), 10);
    if (isNaN(parsedTarget)) {
      setCount(target);
      return;
    }

    const stepTime = Math.max(Math.floor(duration / parsedTarget), 15);
    const timer = setInterval(() => {
      start += Math.ceil(parsedTarget / (duration / stepTime));
      if (start >= parsedTarget) {
        clearInterval(timer);
        setCount(parsedTarget);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  // Format count to standard string (e.g. 1,500)
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <span ref={elementRef}>
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

export default Counter;
