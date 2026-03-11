import { useLang } from "../context/LangContext";
import { motion } from "framer-motion";

export default function About() {
  const { lang } = useLang();
  const content = {
    en: {
      title: "About me",
      paragraphs: [
        "Hi! I’m Lucía, a fullstack web developer and 3D artist from A Coruña, Spain.",
        "I’ve always been drawn to the digital and creative world, so when the new Bachelor’s Degree in Digital Creation (2020–24) was launched, I didn’t hesitate to enroll. It was a multidisciplinary program that covered everything from film production and direction to animation, 3D, programming, and video games.",
        "During my studies I realized that what I enjoyed most was programming. I learned object-oriented programming, OpenGL, Python, Unreal Engine... and even developed small video games as part of my coursework. I also completed an internship where I was able to apply my skills in a real environment.",
        "After graduating, I decided to specialize further in web development, learning technologies such as React, Node.js, databases and version control, which gave me a solid fullstack perspective.",
        "Beyond academics, I’ve always loved creating. I share my 3D projects on Instagram, TikTok and YouTube, and I’m passionate about video games, both as a player and as an organizer: every year I volunteer at the Euskal Encounter, helping to manage tournaments and activities, which has strengthened my communication and teamwork skills.",
        "I’m currently looking for my first professional opportunity as a web developer, where I can combine my technical skills with my creative background and continue to grow as a professional.",
      ],
      skillsTitle: "Skills & Tools",
      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "TailwindCSS",
        "Three.js",
        "Python",
        "OpenGL",
        "SQL",
        "Git & GitHub",
        "3D Modeling (Blender, ZBrush)",
        "Animation",
        "Unreal Engine",
        "DaVinci Resolve",
      ],
    },
    es: {
      title: "Sobre mí",
      paragraphs: [
        "¡Hola! Soy Lucía, desarrolladora web fullstack y artista 3D de A Coruña.",
        "Siempre me ha atraído el mundo digital y creativo, así que cuando apareció el Grado en Creación Digital, Animación y Videojuegos (2020–24), no dudé en matricularme: era una carrera multidisciplinar que combinaba desde producción y dirección audiovisual hasta animación, 3D, programación y videojuegos.",
        "Durante esos años descubrí que la parte que más me apasionaba era la programación. Aprendí conceptos como programación orientada a objetos, OpenGL, Python, Unreal Engine... con los que incluso llegué a crear pequeños videojuegos. También realicé prácticas que me permitieron aplicar lo aprendido en un entorno real.",
        "Al graduarme decidí profundizar en el desarrollo web, formándome en tecnologías como React, Node.js, bases de datos y control de versiones, con lo que consolidé un perfil fullstack.",
        "Además de lo académico, siempre me ha gustado crear. Comparto mis proyectos 3D en redes como Instagram, TikTok y YouTube, y disfruto explorando nuevas formas de expresión digital. También soy una apasionada de los videojuegos, tanto como jugadora como organizadora: cada año participo como voluntaria en la Euskal Encounter, colaborando en la gestión de torneos y actividades, lo que me ha dado experiencia en comunicación y trabajo en equipo.",
        "Actualmente busco mi primera experiencia profesional como desarrolladora web, donde pueda unir mi perfil técnico con mi lado creativo y seguir creciendo como profesional.",
      ],
      skillsTitle: "Habilidades y herramientas",
      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "TailwindCSS",
        "Three.js",
        "Python",
        "OpenGL",
        "SQL",
        "Git & GitHub",
        "Modelado 3D (Blender, ZBrush)",
        "Animación",
        "Unreal Engine",
        "DaVinci Resolve",
      ],
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
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="about"
      className="relative min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pt-20 pb-16"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_70%)]"></div>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center md:flex-row md:items-center md:gap-12">
          <motion.div
            variants={item}
            className="flex-shrink-0 mb-10 md:mb-0 md:mr-6"
          >
            <motion.img
              src="assets/me2.jpg"
              alt="Lucía"
              className="w-60 h-60 md:w-80 md:h-80 rounded-full object-cover shadow-2xl border-4 border-white
             select-none pointer-events-none"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              animate={{ y: [0, -8, 0], rotate: [0, 1, 0, -1, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div variants={item} className="md:flex-1 md:max-w-3xl">
            <motion.h3
              variants={item}
              className="text-3xl font-bold mb-2 text-center md:text-left"
            >
              {content[lang].title}
            </motion.h3>

            <motion.div
              variants={item}
              className="w-16 md:w-20 h-[2px] bg-blue-500 mb-6 mx-auto md:mx-0 rounded"
            />
            <div className="space-y-4 text-gray-700 text-lg leading-loose max-w-2xl text-justify md:text-left">
              {content[lang].paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  variants={item}
                  className={i === 0 ? "text-gray-800 font-medium" : ""}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={item} className="mt-16">
          <h4 className="text-2xl font-semibold mb-4 text-center md:text-left">
            {content[lang].skillsTitle}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-center md:justify-start">
            {content[lang].skills.map((skill, i) => (
              <motion.span
                key={i}
                variants={item}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-100 text-blue-600 text-sm font-medium px-4 py-2 rounded-full shadow-md hover:bg-blue-200 transition"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
