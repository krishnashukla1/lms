
// src/pages/ModuleDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { FiArrowLeft, FiVideo, FiLink, FiFileText } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";

export default function ModuleDetail() {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const res = await api.get(`/modules/${id}`);
        // setModule(res.data.module || res.data);

        const mod = res.data.module || res.data;

setModule({
  ...mod,
  materials: (mod.materials || []).map(m => ({
    type: m.type || m.materialType || "",
    url: m.url || ""
  }))
});



      } catch (err) {
        alert("Module not found");
      } finally {
        setLoading(false);
      }
    };
    fetchModule();
  }, [id]);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("youtu.be")) return `https://www.youtube.com/embed/${url.split("/").pop().split("?")[0]}`;
    if (url.includes("youtube.com")) {
      const match = url.match(/[?&]v=([^&]+)/);
      if (match) return `https://www.youtube.com/embed/${match[1]}`;
    }
    if (url.includes("vimeo.com")) return `https://player.vimeo.com/video/${url.split("/").pop()}`;
    return null;
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!module) return <div className="p-20 text-center text-red-600">Module not found</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/admin/modules"
          className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 font-bold mb-8"
        >
          <FiArrowLeft /> Back to Modules
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-purple-600 to-blue-600 text-white p-10 text-center">
            <span className="inline-block px-6 py-2 bg-white/20 rounded-full font-bold mb-4">
              Module {module.order}
            </span>
            <h1 className="text-4xl font-black">{module.title}</h1>
            {module.description && <p className="mt-4 text-xl opacity-90">{module.description}</p>}
          </div>

          <div className="p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Learning Materials</h2>

            {module.materials?.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No materials added yet.</p>
            ) : (
              <div className="space-y-8">
                {module.materials.map((mat, i) => (
                  <div key={i} className="border rounded-2xl overflow-hidden shadow-lg">
                    <div className="bg-gray-50 px-6 py-4 font-bold flex items-center gap-3">
                      {mat.type === "video" && <FiVideo className="text-blue-600" />}
                      {mat.type === "pdf" && <FaFilePdf className="text-red-600" />}
                      {mat.type === "link" && <FiLink className="text-green-600" />}
                      <span>Material {i + 1} — {mat.type?.toUpperCase() || "FILE"}</span>
                    </div>

                    {/* <div className="p-6 bg-white">
                      {mat.type === "video" && getEmbedUrl(mat.url) ? (
                        <div className="relative pb-[56.25%] rounded-xl overflow-hidden shadow-xl">
                          <iframe
                            src={getEmbedUrl(mat.url)}
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen
                            title="Video"
                          ></iframe>
                        </div>
                      ) : mat.type === "pdf" ? (
                        <iframe src={mat.url} className="w-full h-96 border-0" title="PDF" />
                      ) : (
                        <a
                          href={mat.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700"
                        >
                          <FiLink /> Open Link in New Tab
                        </a>
                      )}
                    </div> */}

                    <div className="p-6 bg-white">
  {mat.type === "video" && getEmbedUrl(mat.url) ? (
    <div className="rounded-xl overflow-hidden shadow-xl h-64">
      <iframe
        src={getEmbedUrl(mat.url)}
        className="w-full h-full border-0"
        allowFullScreen
        title="Video"
      ></iframe>
    </div>
  ) : mat.type === "pdf" ? (
    <iframe src={mat.url} className="w-full h-64 border-0" title="PDF" />
  ) : (
    <a
      href={mat.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700"
    >
      <FiLink /> Open Link in New Tab
    </a>
  )}
</div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}