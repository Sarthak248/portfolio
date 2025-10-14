import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PortfolioContent = () => {
    return (
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="ml-40 p-10 text-white"
      >
        <h1 className="text-3xl font-semibold">About Me</h1>
        <p className="text-gray-400 mt-2">
          Software Engineer passionate about building high-impact applications.
        </p>
        {/* Other sections go below */}
      </motion.section>
    );
  };
  
export default PortfolioContent;