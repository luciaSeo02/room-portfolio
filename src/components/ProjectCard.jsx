import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";

export default function ProjectCard({
  slug,
  title,
  shortDescription,
  mainImage,
  tags,
}) {
  const { lang } = useLang();
  return (
    <Link to={`/projects/${slug}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300">
        <img
          src={mainImage}
          alt={title[lang]}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 flex flex-col gap-2">
          <h4 className="text-lg font-semibold">{title[lang]}</h4>
          <p className="text-sm text-gray-600">{shortDescription[lang]}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full transition hover:bg-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
