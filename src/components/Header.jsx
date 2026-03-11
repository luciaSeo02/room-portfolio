import { useState } from "react";
import { Menu, X } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { useLang } from "../context/LangContext";
import ReactCountryFlag from "react-country-flag";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLang();

  const labels = {
    en: { about: "About me", projects: "Projects", contact: "Contact" },
    es: { about: "Sobre mí", projects: "Proyectos", contact: "Contacto" },
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-white/90 backdrop-blur shadow z-50 transition-all">
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
        <HashLink smooth to="/#hero" className="flex items-center">
          <img
            src="assets/logo02.png"
            alt="Lucía Seoane Logo"
            className="h-10 w-auto select-none pointer-events-none"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </HashLink>

        <nav className="hidden md:flex space-x-6 items-center">
          {Object.entries(labels[lang]).map(([key, label]) => (
            <HashLink
              key={key}
              smooth
              to={`/#${key}`}
              className="relative nav-link hover:text-blue-500 transition font-medium"
            >
              {label}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </HashLink>
          ))}

          <div className="flex items-center space-x-3 ml-4">
            <button onClick={() => setLang("en")}>
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  opacity: lang === "en" ? 1 : 0.5,
                  border: lang === "en" ? "1px solid #2563EB" : "none",
                  borderRadius: "50%",
                }}
                title="English"
              />
            </button>
            <button onClick={() => setLang("es")}>
              <ReactCountryFlag
                countryCode="ES"
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  opacity: lang === "es" ? 1 : 0.5,
                  border: lang === "es" ? "1px solid #2563EB" : "none",
                  borderRadius: "50%",
                }}
                title="Español"
              />
            </button>
          </div>
        </nav>

        <button
          className="md:hidden ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial="hidden"
            animate="show"
            exit="exit"
            variants={menuVariants}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <ul className="flex flex-col p-4 space-y-3">
              {Object.entries(labels[lang]).map(([key, label]) => (
                <li key={key}>
                  <HashLink
                    smooth
                    to={`/#${key}`}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-blue-500 transition font-medium"
                  >
                    {label}
                  </HashLink>
                </li>
              ))}
              <li className="flex justify-center space-x-6 pt-3">
                <button onClick={() => setLang("en")}>
                  <ReactCountryFlag
                    countryCode="US"
                    svg
                    style={{
                      width: "1.8em",
                      height: "1.8em",
                      opacity: lang === "en" ? 1 : 0.5,
                      border: lang === "en" ? "1px solid #2563EB" : "none",
                      borderRadius: "50%",
                    }}
                  />
                </button>
                <button onClick={() => setLang("es")}>
                  <ReactCountryFlag
                    countryCode="ES"
                    svg
                    style={{
                      width: "1.8em",
                      height: "1.8em",
                      opacity: lang === "es" ? 1 : 0.5,
                      border: lang === "es" ? "1px solid #2563EB" : "none",
                      borderRadius: "50%",
                    }}
                  />
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
