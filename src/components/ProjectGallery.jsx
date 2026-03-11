import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import { Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "../context/LangContext";

const getMediaSrc = (src) => `${import.meta.env.BASE_URL}${src}`;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectGallery({ media = [], title }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { lang } = useLang();

  if (media.length === 0) return null;

  const mediaForLightbox = media.filter(
    (item) => item.type === "image" || item.type === "video",
  );

  const isSingleVideo =
    mediaForLightbox.length === 1 && mediaForLightbox[0].type === "video";

  if (isSingleVideo) {
    return (
      <div className="w-full mb-8">
        <video
          src={getMediaSrc(mediaForLightbox[0].src)}
          poster={getMediaSrc(
            mediaForLightbox[0].poster ||
              "assets/projects/video-placeholder.png",
          )}
          controls
          className="w-full rounded-lg shadow aspect-video"
        />
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {media.map((item, i) => {
          if (item.type === "section") {
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="col-span-2 sm:col-span-3 mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {item.title?.[lang]}
                </h3>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  {item.services?.map((service, idx) => (
                    <li key={idx}>{service}</li>
                  ))}
                </ul>
              </motion.div>
            );
          }

          if (item.type === "testimonial") {
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="col-span-2 sm:col-span-3 bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: item.rating || 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={18}
                        fill="currentColor"
                        strokeWidth={1}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {item.author} · {item.country}
                  </span>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  {item.text?.[lang]}
                </p>
              </motion.div>
            );
          }

          const lightboxIndex = mediaForLightbox.findIndex((m) => m === item);

          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative cursor-pointer rounded-lg shadow overflow-hidden aspect-square bg-gray-200 group"
              onClick={() => {
                setOpen(true);
                setIndex(lightboxIndex);
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {item.type === "image" ? (
                <img
                  src={getMediaSrc(item.src)}
                  alt={`${title} media ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={getMediaSrc(
                      item.poster || "assets/projects/video-placeholder.png",
                    )}
                    alt={`${title} video thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Play color="white" strokeWidth="2" size={50} />
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={mediaForLightbox.map((item) =>
          item.type === "image"
            ? { src: getMediaSrc(item.src) }
            : {
                type: "video",
                sources: [{ src: getMediaSrc(item.src), type: "video/mp4" }],
                autoplay: true,
                controls: true,
              },
        )}
        plugins={[Video]}
      />
    </>
  );
}
