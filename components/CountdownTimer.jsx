"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const targetDate = new Date("2026-02-26T23:59:59+08:00").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center min-w-[32px]">
      <span className="tabular-nums text-[18px] md:text-[22px] font-medium leading-none text-white drop-shadow-sm">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] md:text-[10px] font-medium uppercase tracking-[0.22em] text-[#b0b6c6] mt-0.5">
        {label}
      </span>
    </div>
  );

  return (
    <motion.div
      className="absolute top-20 right-2 md:right-10 z-40"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative">
        <div className="relative rounded-md border border-[#23263a] bg-[#10131c]/95 px-4 py-2.5 md:py-3 shadow-lg flex flex-col items-center min-w-[260px]">
          {/* <span className="w-full tracking-[0.22em] items-center justify-center font-medium flex mb-2 uppercase text-[8px]">
            Sign ups close in
          </span> */}
          <div className="flex items-end justify-center gap-3">
            <TimeUnit value={timeLeft.days} label="DAYS" />
            <span className="text-[#3a3e54] text-lg font-bold mb-2">:</span>
            <TimeUnit value={timeLeft.hours} label="HRS" />
            <span className="text-[#3a3e54] text-lg font-bold mb-2">:</span>
            <TimeUnit value={timeLeft.minutes} label="MIN" />
            <span className="text-[#3a3e54] text-lg font-bold mb-2">:</span>
            <TimeUnit value={timeLeft.seconds} label="SEC" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CountdownTimer;
