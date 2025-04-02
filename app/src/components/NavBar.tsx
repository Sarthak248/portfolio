import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NavBar = () => {
    return (
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed left-0 top-0 h-full w-40 bg-gray-900 text-white p-5 flex flex-col gap-6"
      >
        <h2 className="text-xl font-bold">Sarthak Jain</h2>
        <ul className="space-y-4 text-gray-400">
          <li className="hover:text-white cursor-pointer">About</li>
          <li className="hover:text-white cursor-pointer">Experience</li>
          <li className="hover:text-white cursor-pointer">Projects</li>
        </ul>
      </motion.nav>
    );
  };

export default NavBar;