import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "../data/projects.json";
import ProjectGallery from "../components/ProjectGallery";
import { Link as LinkIcon } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { useLang } from "../context/LangContext";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const { lang } = useLang();

  if (!project) return <p className="text-center mt-10">Project not found</p>;

  return (
    <>
      <ScrollToTop />
      <motion.section
        className="max-w-5xl mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-3xl font-bold mb-4">{project.title[lang]}</h2>
          {Array.isArray(project.longDescription[lang]) ? (
            project.longDescription[lang].map((para, idx) => (
              <p key={idx} className="text-gray-600 mb-4">
                {para}
              </p>
            ))
          ) : (
            <p className="text-gray-600 mb-8 whitespace-pre-line">
              {project.longDescription[lang]}
            </p>
          )}
        </motion.div>

        {project.techHighlights?.length > 0 && (
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">
              {lang === "en"
                ? "Key Contributions & Highlights"
                : "Aportaciones y aspectos clave"}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {project.techHighlights.map((highlight, idx) => (
                <motion.li key={idx} variants={itemVariants}>
                  {highlight[lang]}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {project.media?.length > 0 && (
          <motion.div variants={itemVariants}>
            <ProjectGallery media={project.media} title={project.title[lang]} />
          </motion.div>
        )}

        {project.links?.length > 0 && (
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">
              {lang === "en" ? "Explore More" : "Explora más"}
            </h3>
            <div className="flex flex-col gap-3">
              {project.links.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, color: "#2563EB" }}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <LinkIcon size={18} /> {link.label[lang]}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {project.category === "3D" && <SocialLinks lang={lang} />}

        {project.tags?.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 mt-6"
          >
            {project.tags.map((tag, idx) => (
              <motion.span
                key={idx}
                whileHover={{
                  scale: 1.12,
                  backgroundColor: "#93C5FD",
                  color: "#1E3A8A",
                }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 text-xs font-medium cursor-pointer"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        )}
      </motion.section>
    </>
  );
}
