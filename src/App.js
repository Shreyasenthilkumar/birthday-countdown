import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

export default function App() {
  const targetDate = new Date("2025-08-17T00:00:00+05:30"); 
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [kisses, setKisses] = useState([]);

  function getTimeRemaining() {
    const now = new Date();
    const difference = targetDate - now;
    if (difference <= 0) return null;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // spawn flying kisses every 1.5s
  useEffect(() => {
    const kissTimer = setInterval(() => {
      const id = Date.now();
      const left = Math.random() * 80 + 10; // 10%–90% across screen
      const emojis = ["💋", "😘", "💖", "💕", "💞"];
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      setKisses((prev) => [...prev, { id, left, emoji }]);

      // remove after 5s so list doesn’t grow forever
      setTimeout(() => {
        setKisses((prev) => prev.filter((k) => k.id !== id));
      }, 5000);
    }, 1500);

    return () => clearInterval(kissTimer);
  }, []);

  return (
    <div className="container">
      {timeLeft ? (
        <>
          <motion.h1
            className="title"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🎂 Birthday Countdown 🎉
          </motion.h1>

          <div className="countdown">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <motion.div
                key={unit}
                className="time-box"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                {value}
                <span>{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="sub-text"
            animate={{ y: [0, -10, 0], color: ["#fff", "#d0a6ff", "#a77bff"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Just a little more until you sparkle in the twenties ✨
          </motion.p>
        </>
      ) : (
        <motion.div
          className="birthday-message"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          🎉 Happy Birthday My Love 💜 🎂
          <div className="balloons">
            <div className="balloon violet"></div>
            <div className="balloon pink"></div>
            <div className="balloon lavender"></div>
            <div className="balloon purple"></div>
          </div>
        </motion.div>
      )}

      {/* Flying kisses always visible */}
      <div className="kisses">
        {kisses.map((kiss) => (
          <div
            key={kiss.id}
            className="kiss"
            style={{ left: `${kiss.left}%` }}
          >
            {kiss.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
