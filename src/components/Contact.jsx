import { useState } from "react";
import {
  Mail,
  Linkedin,
  Instagram,
  Music,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useLang } from "../context/LangContext";
import { motion } from "framer-motion";

export default function Contact() {
  const [toast, setToast] = useState(null);
  const { lang } = useLang();

  const texts = {
    en: {
      title: "Contact me",
      description:
        "If you'd like to get in touch, feel free to send me a message through the form or connect with me on social media.",
      placeholders: {
        name: "Your name",
        email: "Your email",
        message: "Your message...",
      },
      button: "Send Message",
      success: "Thank you! Your message has been sent successfully.",
      error: "Oops, there was an error. Please try again.",
    },
    es: {
      title: "Contáctame",
      description:
        "Si quieres ponerte en contacto, puedes enviarme un mensaje mediante el formulario o conectar conmigo en redes sociales.",
      placeholders: {
        name: "Tu nombre",
        email: "Tu correo electrónico",
        message: "Tu mensaje...",
      },
      button: "Enviar mensaje",
      success: "¡Gracias! Tu mensaje fue enviado con éxito.",
      error: "Oops, hubo un error. Intenta otra vez.",
    },
  };

  const t = texts[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await fetch("https://formspree.io/f/mkgqnrwb", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setToast({ type: "success", message: t.success });
      e.target.reset();
    } else {
      setToast({ type: "error", message: t.error });
    }

    setTimeout(() => setToast(null), 4000);
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gray-100 relative flex items-center justify-center px-6 py-16"
    >
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span>{toast.message}</span>
        </motion.div>
      )}

      <motion.div
        className="max-w-5xl w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">{t.title}</h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.form
            onSubmit={handleSubmit}
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-md space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder={t.placeholders.name}
              required
              variants={itemVariants}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder={t.placeholders.email}
              required
              variants={itemVariants}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              placeholder={t.placeholders.message}
              rows="5"
              required
              variants={itemVariants}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              variants={itemVariants}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              {t.button}
            </button>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center gap-4"
          >
            {[
              {
                icon: Mail,
                label: "luciaseo20@gmail.com",
                href: "mailto:luciaseo20@gmail.com",
                color: "text-blue-600",
              },
              {
                icon: Linkedin,
                label: "lucia-seo",
                href: "https://www.linkedin.com/in/lucia-seo",
                color: "text-blue-600",
              },
              {
                icon: Instagram,
                label: "loozziasart",
                href: "https://www.instagram.com/loozziasart/",
                color: "text-pink-500",
              },
              {
                icon: Music,
                label: "loozziasart",
                href: "https://tiktok.com/@loozziasart/",
                color: "text-black",
              },
            ].map((contact, i) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={i}
                  href={contact.href}
                  target="_blank"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -2,
                    boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
                  }}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow transition"
                >
                  <Icon className={contact.color} />
                  <span>{contact.label}</span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
