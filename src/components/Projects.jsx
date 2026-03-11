import { useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import projects from "../data/projects.json";
import { useLang } from "../context/LangContext";
import { AnimatePresence, motion } from "framer-motion";

export default function Projects() {
  const { lang } = useLang();

  const translations = {
    en: { all: "All" },
    es: { all: "Todos" },
  };

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const sortedProjects = [...filteredProjects].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <section id="projects" className="max-w-6xl mx-auto p-6">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {lang === "en" ? "Projects" : "Proyectos"}
      </motion.h2>

      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {categories.map((cat) => {
          const label = cat === "All" ? translations[lang].all : cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full border transition ${
                filter === cat
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {sortedProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ProjectCard
                title={project.title}
                shortDescription={project.shortDescription}
                mainImage={project.mainImage}
                tags={project.tags}
                lang={lang}
                slug={project.slug}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
