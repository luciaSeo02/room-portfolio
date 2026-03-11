import { Instagram, Youtube, Music2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialLinks({ lang = "en" }) {
  const label =
    lang === "en"
      ? "See more timelapses & animations"
      : "Ver más timelapses y animaciones";

  const socials = [
    {
      icon: Instagram,
      href: "https://instagram.com/loozziasart",
      baseColor: "text-gray-500",
      hoverColor: "hover:text-pink-500",
    },
    {
      icon: Music2,
      href: "https://tiktok.com/@loozziasart",
      baseColor: "text-gray-500",
      hoverColor: "hover:text-black",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@loozzia",
      baseColor: "text-gray-500",
      hoverColor: "hover:text-red-600",
    },
  ];

  return (
    <div className="mt-5">
      <h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold mb-5"
      >
        {label}
      </h3>

      <div className="flex gap-6 mb-10">
        {socials.map((social, idx) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${social.baseColor} ${social.hoverColor} transition text-2xl`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={28} />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
