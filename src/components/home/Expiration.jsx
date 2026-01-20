import React from "react";
import { useState, useEffect } from "react";

const Expiration = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(expiryDate).getTime() - Date.now();
    if (difference <= 0) {
      return null;
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  if(!timeLeft) {
    return <span>Auction Ended</span>
  }

  return <span>
    {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
  </span>;
};

export default Expiration;
