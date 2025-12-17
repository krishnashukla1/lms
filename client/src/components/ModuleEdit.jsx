
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  FiArrowLeft,
  FiSave,
  FiEdit3,
  FiBook,
  FiFileText,
  FiRefreshCw,
  FiTrash2,
  FiPlusCircle,
  FiAlertCircle,
  FiVideo,
  FiLink,
} from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";

export default function ModuleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("");
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    async function loadModule() {
      try {
        const res = await api.get(`/modules/${id}`);
        const mod = res.data.module || res.data;

        setTitle(mod.title);
        setDescription(mod.description || "");
        setOrder(mod.order);
        // setMaterials(mod.materials || []);
        setMaterials(
          (mod.materials || []).map(m => ({
            type: m.type || m.materialType || "",
            url: m.url || ""
          }))
        );

        setModuleData(mod);
      } catch (err) {
        setError("Failed to load module data");
      } finally {
        setLoading(false);
      }
    }
    loadModule();
  }, [id]);

  const handleMaterialChange = (index, key, value) => {
    const updated = [...materials];
    updated[index][key] = value;
    setMaterials(updated);
  };

  const addMaterial = () => {
    setMaterials([...materials, { type: "", url: "" }]);
  };

  const deleteMaterial = (index) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    if (moduleData) {
      setTitle(moduleData.title);
      setDescription(moduleData.description || "");
      setOrder(moduleData.order);
      setMaterials(moduleData.materials || []);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");
    if (!order) return alert("Order required");

    setSaving(true);
    try {
      // await api.put(`/modules/${id}`, { title, description, order: Number(order), materials });
      await api.put(`/modules/${id}`, {
        title,
        description,
        order: Number(order),
        materials: materials.map(m => ({
          materialType: m.type,
          url: m.url
        }))
      });

      alert("Module updated successfully!");
      navigate("/admin/modules");
    } catch (err) {
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  // Helper: Get embed URL for YouTube/Vimeo
  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("youtu.be")) {
      const id = url.split("/").pop()?.split("?")[0];
      return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
    }
    if (url.includes("youtube.com")) {
      const id = url.split("v=")[1]?.split("&")[0];
      return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : null;
    }
    if (url.includes("vimeo.com")) {
      const id = url.split("/").pop()?.split("?")[0];
      return `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`;
    }
    return null;
  };

  // Loading State
  if (loading)
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading module data...</p>
        </div>
      </div>
    );

  // Error State
  if (error)
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="text-red-500" size={30} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Module</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/admin/modules")}
            className="cursor-pointer bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Back to Modules
          </button>

        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-8 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate("/admin/modules")}
            className="cursor-pointer flex items-center gap-3 text-gray-700 hover:text-blue-700 font-bold text-lg transition-all duration-300 hover:gap-5 group bg-white/70 hover:bg-white/90 px-8 py-4 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100"
          >
            <FiArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" />
            Back to Modules
          </button>

          <div className="w-16 h-15 bg-linear-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <FiEdit3 className="text-white" size={36} />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="p-10">
            {/* Title Section */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-lg font-bold mb-2">
                <FiBook size={22} />
                Editing Module #{moduleData?.order || "N/A"}
              </div>
              <h1 className="text-5xl font-black bg-linear-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent mb-2">
                Edit Learning Module
              </h1>
              <p className="text-gray-600 text-lg font-medium ">Update title, description, order, and learning materials</p>
            </div>

            {/* Current Module Info */}
            {moduleData && (
              <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-3xl p-4 mb-8 border border-blue-200/50 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
                  <div>
                    <p className="text-gray-600 font-medium">Current Title</p>
                    <p className="text-2xl font-black text-gray-800 mt-1">{moduleData.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Module Order</p>
                    <p className="text-3xl font-black text-blue-600">{moduleData.order}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Materials</p>
                    <p className="text-3xl font-black text-purple-600">{materials.length}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-10">

              {/* Title */}
              <div className="group">
                <label className="block mb-3 text-xl font-bold text-gray-800">Module Title <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <FiBook className="text-gray-400 group-focus-within:text-blue-600 transition-colors" size={26} />
                  </div>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 rounded-3xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm
                               focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all duration-300
                               hover:border-gray-300 hover:bg-white/90 text-lg font-medium"
                    placeholder="Enter a powerful module title..."
                  />
                </div>
              </div>

              {/* Description */}
              <div className="group">
                <label className="block mb-3 text-xl font-bold text-gray-800">Description</label>
                <div className="relative">
                  <div className="absolute top-6 left-6 pointer-events-none">
                    <FiFileText className="text-gray-800 group-focus-within:text-purple-600 transition-colors" size={26} />
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full pl-16 pr-6 py-5 rounded-3xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm
                               focus:ring-4 focus:ring-purple-200 focus:border-purple-600 transition-all duration-300
                               hover:border-gray-300 hover:bg-white/90 text-lg resize-none"
                    placeholder="Explain what learners will achieve in this module..."
                  />
                </div>
              </div>

              {/* Order */}
              <div className="group">
                <label className="block mb-3 text-xl font-bold text-gray-800">Module Order <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="w-full px-6 py-5 rounded-3xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm
                             focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all duration-300
                             hover:border-gray-300 hover:bg-white/90 text-lg font-medium"
                  placeholder="e.g. 1, 2, 3..."
                />
              </div>

              {/* Materials */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-black text-gray-800">Learning Materials</h3>
                  <span className="text-lg font-bold text-purple-600">{materials.length} item(s)</span>
                </div>

                {materials.map((mat, index) => (
                  <div key={index} className="bg-linear-to-r from-gray-50 to-gray-100/50 rounded-3xl p-8 mb-8 border border-gray-200/50 shadow-lg relative group/item hover:shadow-xl transition-shadow">

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => deleteMaterial(index)}
                      className="cursor-pointer absolute top-6 right-6 text-red-500 hover:text-red-700 bg-white/80 p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all z-10"
                    >
                      <FiTrash2 size={22} />
                    </button>

                    <div className="grid md:grid-cols-2 gap-8 mb-6">
                      {/* Type Selector */}
                      <div>
                        <label className="block mb-3 font-bold text-gray-700">Material Type</label>
                        <div className="relative">
                          <select
                            value={mat.type}
                            onChange={(e) => handleMaterialChange(index, "type", e.target.value)}
                            className="cursor-pointer w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all appearance-none text-lg font-medium"
                          >
                            <option value="">Choose type</option>
                            <option value="video">Video Lesson</option>
                            <option value="pdf">PDF Document</option>
                            <option value="link">External Link</option>
                          </select>
                          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                            {mat.type === "video" && <FiVideo className="text-red-600" size={26} />}
                            {mat.type === "pdf" && <FaFilePdf className="text-red-600" size={26} />}
                            {mat.type === "link" && <FiLink className="text-blue-600" size={26} />}
                            {!mat.type && <FiFileText className="text-gray-400" size={26} />}
                          </div>
                        </div>
                      </div>

                      {/* URL Input */}
                      <div>
                        <label className="block mb-3 font-bold text-gray-700">Resource URL</label>
                        <input
                          value={mat.url}
                          onChange={(e) => handleMaterialChange(index, "url", e.target.value)}
                          className="w-full px-6 py-5 rounded-3xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm focus:ring-4 focus:ring-purple-200 focus:border-purple-600 transition-all text-lg"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    {/* LIVE PREVIEWS */}


                    <div className="mt-6 -mx-4 -mb-4 rounded-b-2xl overflow-hidden">

                      {/* Video Preview */}
                      {mat.type === "video" && getEmbedUrl(mat.url) && (
                        <div className="bg-black rounded-b-2xl overflow-hidden shadow-inner max-w-xl mx-auto">
                          <div className="relative pb-[56.25%]">
                            <iframe
                              src={getEmbedUrl(mat.url)}
                              title={`Video preview ${index + 1}`}
                              className="absolute inset-0 w-full h-full"
                              allowFullScreen
                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            />
                          </div>
                          <div className="p-2 bg-linear-to-t from-black/80 to-transparent text-white text-center text-xs font-medium">
                            Live Video Preview
                          </div>
                        </div>
                      )}

                      {/* PDF Preview */}
                      {mat.type === "pdf" && mat.url && (
                        <div className="bg-gray-100 rounded-b-2xl overflow-hidden border-t-4 border-purple-500 max-w-xl mx-auto">
                          <iframe
                            src={`${mat.url}#view=FitH&toolbar=0&navpanes=0`}
                            title="PDF preview"
                            className="w-full h-64"
                            frameBorder="0"
                          />
                          <div className="p-2 bg-linear-to-r from-purple-600 to-blue-600 text-white text-center text-sm font-medium">
                            PDF Preview
                          </div>
                        </div>
                      )}

                      {/* Link Preview */}
                      {mat.type === "link" && mat.url && (
                        <a
                          href={mat.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 bg-linear-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all rounded-b-2xl border-t-4 border-blue-400 group max-w-xl mx-auto"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center shrink-0">
                              {mat.url.includes("youtube") || mat.url.includes("vimeo") ? (
                                <FiVideo className="text-red-600" size={24} />
                              ) : mat.url.includes("pdf") ? (
                                <FaFilePdf className="text-red-600" size={24} />
                              ) : (
                                <FiLink className="text-blue-600" size={24} />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-800 group-hover:text-purple-700 text-sm">
                                {new URL(mat.url).hostname.replace("www.", "")}
                              </p>
                              <p className="text-xs text-gray-600 truncate">{mat.url}</p>
                            </div>
                            <span className="text-purple-600 group-hover:translate-x-2 transition-transform text-lg">→</span>
                          </div>
                        </a>
                      )}

                    </div>

                  </div>
                ))}

                {/* Add New Material */}
                <button
                  type="button"
                  onClick={addMaterial}
                  className="cursor-pointer w-full border-2 border-dashed border-blue-400 bg-blue-50/50 hover:bg-blue-100/70 text-blue-700 font-bold py-3 rounded-3xl text-xl transition-all hover:border-blue-600 flex items-center justify-center gap-3"
                >
                  <FiPlusCircle size={32} />
                  Add New Material
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t-2 border-gray-200/50">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={saving}
                  className="cursor-pointer flex-1 flex items-center justify-center gap-4 px-8 py-4 rounded-3xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 group/reset"
                >
                  <FiRefreshCw size={28} className="group-hover/reset:rotate-180 transition-transform duration-500" />
                  Reset All Changes
                </button>

                <button
                  type="submit"
                  disabled={saving || !title.trim() || !order}
                  className="cursor-pointer flex-1 flex items-center justify-center gap-4 px-8 py-4 rounded-3xl bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none relative overflow-hidden group/save"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/save:translate-x-full transition-transform duration-1000"></div>
                  {saving ? (
                    <>
                      <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating Module...</span>
                    </>
                  ) : (
                    <>
                      <FiSave size={28} className="group-hover/save:scale-110 transition-transform" />
                      <span>Update Module</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tips */}
              <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-200/50 mt-6">
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
      <span className="text-lg font-bold">Tip</span>
    </div>

    <div>
      <h3 className="text-base font-bold text-gray-800 mb-2">Quick Tips</h3>
      <ul className="flex gap-4 text-gray-700 text-sm">
  <li>• Use clear titles</li>
  <li>• Add 2–6 good materials</li>
  <li>• Keep module order logical</li>
  <li>• Check all links</li>
</ul>

    </div>
  </div>
</div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

















