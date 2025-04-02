"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import NavBar from "../components/NavBar";
import PortfolioContent from "../components/PortfolioContent";

export default function Home() {
  const [typedName, setTypedName] = useState("|");
  const [showArrow, setShowArrow] = useState(false);
  const [enterPressed, setEnterPressed] = useState(false);
  const name = "  Sarthak Jain";
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i < name.length - 1) {
        setTypedName((prev) => prev.slice(0, -1) + name[i] + "|");
        i++;
      } else {
        setTypedName((prev) => prev.slice(0, -1)); // Remove cursor at end
        clearInterval(interval);
        setTimeout(() => setShowArrow(true), 500);
      }
    }, 100 + Math.random() * 50); // Human-like delays

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    if (showArrow) setEnterPressed(true);
  };

  return (
    <main
      className="flex flex-col h-screen bg-black text-white items-center justify-center"
      onKeyDown={(e) => e.key === "Enter" && handleEnter()}
      tabIndex={0} // Ensures keypress is detected
    >
      {!enterPressed ? (
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 text-white">Google</h1>
          <motion.div
            className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-md w-[280px]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <input
              ref={inputRef}
              type="text"
              value={typedName}
              readOnly
              className="text-black text-lg px-4 py-2 rounded-full outline-none w-full min-w-[220px]"
            />
            <button
              onClick={handleEnter}
              className="text-white px-4 py-2 rounded-full transition"
            >
              🔍
            </button>
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="flex w-full h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <NavBar />
          <PortfolioContent />
        </motion.div>
      )}
    </main>
  );
}