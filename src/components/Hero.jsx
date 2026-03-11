import React, { useState, Suspense, lazy } from "react";
import { Loader } from "@react-three/drei";
import Popup from "./Popup";
import popupContent from "../data/popupData.json";
import { useLang } from "../context/LangContext";
import { motion } from "framer-motion";

const ThreeScene = lazy(() => import("../three/ThreeScene.jsx"));

export default function Hero() {
  const [active3D, setActive3D] = useState(false);
  const [popupKey, setPopupKey] = useState(null);

  const { lang } = useLang();

  const hour = new Date().getHours();
  const isDay = hour >= 7 && hour < 19;
  const posterDay = "assets/renderDay02.png";
  const posterNight = "assets/renderNight02.png";
  const poster = isDay ? posterDay : posterNight;

  const labels = {
    en: {
      title: "Lucía Seoane Loureda",
      title2: "Web Developer & 3D Artist",
      subtitle: "Frontend · React · Three.js · Animation",
      explore: "Explore in 3D",
      close: "Close 3D",
    },
    es: {
      title: "Lucía Seoane Loureda",
      title2: "Desarrolladora Web & Artista 3D",
      subtitle: "Frontend · React · Three.js · Animation",
      explore: "Explorar en 3D",
      close: "Cerrar 3D",
    },
  };

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  const handleObjectClick = (name) => setPopupKey(name);
  const closePopup = () => setPopupKey(null);

  return (
    <motion.section
      id="hero"
      className="relative flex flex-col items-center justify-between min-h-[calc(100vh-64px)] pt-8 pb-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="text-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">
          {labels[lang].title}
        </h1>

        <h2 className="text-lg md:text-2xl font-medium text-gray-700">
          {labels[lang].title2}
        </h2>

        <p className="text-gray-500 text-sm md:text-lg mt-1">
          {labels[lang].subtitle}
        </p>
      </motion.div>

      <motion.div
        variants={item}
        className={`transition-all duration-500 ${
          active3D
            ? "w-full max-w-6xl h-[60vh]"
            : "w-[90%] max-w-[400px] aspect-square border-8 border-gray-900"
        }`}
      >
        {!active3D ? (
          <picture>
            <source srcSet={poster} type="image/webp" />
            <img
              src={poster}
              alt="Setup poster"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </picture>
        ) : (
          <Suspense fallback={null}>
            <ThreeScene active3D={active3D} onObjectClick={handleObjectClick} />
          </Suspense>
        )}
      </motion.div>

      <motion.div variants={item} className="mt-3 md:mt-4">
        {!active3D ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive3D(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:bg-blue-700 transition"
          >
            {labels[lang].explore}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive3D(false)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800"
          >
            {labels[lang].close}
          </motion.button>
        )}
      </motion.div>

      {popupKey && (
        <Popup
          content={popupContent[popupKey]}
          lang={lang}
          onClose={closePopup}
        />
      )}
      <motion.a
        href="#about"
        className="flex items-center justify-center w-12 h-12 border border-gray-400 rounded-full text-gray-500 hover:text-gray-800 mt-6"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        ↓
      </motion.a>
    </motion.section>
  );
}
