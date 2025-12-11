
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  FiArrowLeft, FiSearch, FiTrash2, FiEye, FiEdit3, FiPlus,
  FiBook, FiVideo, FiFileText, FiLink
} from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";

export default function ModuleList() {
  const [modules, setModules] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadModules();
  }, []);



  const loadModules = async () => {
    try {
      setLoading(true);
      const res = await api.get("/modules");
      setModules(res.data || []);
    } catch (err) {
      alert("Failed to load modules");
    } finally {
      setLoading(false);
    }
  };

  const deleteModule = async (id) => {
    if (!window.confirm("Delete this module permanently?")) return;
    try {
      await api.delete(`/modules/${id}`);
      setModules(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  // const filtered = modules.filter(m =>
  //   m.title?.toLowerCase().includes(search.toLowerCase()) ||
  //   m.description?.toLowerCase().includes(search.toLowerCase())
  // );

  const filtered = modules.filter(m => {
  const query = search.toLowerCase();

  return (
    m.title?.toLowerCase().includes(query) ||
    m.description?.toLowerCase().includes(query) ||
    m.courseType?.toLowerCase().includes(query) ||
    m.materials?.some(mat =>
      mat.materialType?.toLowerCase().includes(query)
    )
  );
});


  const getIcon = (type) => {
 

    switch (type) {
      case "video": return <FiVideo className="text-red-500" />;
      case "pdf": return <FaFilePdf className="text-red-600" />;
      case "link": return <FiLink className="text-blue-500" />;
      default: return <FiFileText className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => navigate("/admin")}
            className="cursor-pointer flex items-center gap-3 text-gray-700 hover:text-purple-700 font-bold"
          >
            <FiArrowLeft size={24} /> Back to Dashboard
          </button>
          <Link
            to="/admin/add-module"
            className="cursor-pointer bg-linear-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-3 hover:shadow-xl transition"
          >
            <FiPlus /> New Module
          </Link>
        </div>

        <h1 className="text-5xl font-black text-center bg-linear-to-r from-purple-600 to-blue-700 bg-clip-text text-transparent mb-10">
          All Modules
        </h1>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-10">
          <FiSearch className="absolute left-4 top-4 text-gray-400" size={20} />
          <input
            type="text"
            // placeholder="Search modules..."
            placeholder="Search by module, course type, or material..."

            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-purple-300 focus:border-purple-500"
          />
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((module) => (
            <div
              key={module._id}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                  {module.order}
                </div>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
                  {module.courseType?.toUpperCase() || "GENERAL"}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">{module.title}</h3>
              <p className="text-gray-600 mb-6 line-clamp-3">{module.description}</p>

              {/* Materials */}
              <div className="flex flex-wrap gap-3 mb-6">
                {/* {module.materials?.map((mat, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    {getIcon(mat.type)}
                    <span className="text-sm text-gray-700 capitalize">{mat.type}</span>
                  </div>
                ))} */}

                {module.materials?.map((mat, i) => (
  <div key={i} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
    {getIcon(mat.materialType)}
    <span className="text-sm text-gray-700 capitalize">{mat.materialType}</span>
  </div>
))}


              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                {/* <Link
                  to={`/module/${module._id}`}
                  className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition"
                >
             
                  <FiEye size={18} />
                </Link>
                <Link
                  to={`/module/edit/${module._id}`}
                  className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition"
                  title="Edit"
                >
                  <FiEdit3 size={18} />
                </Link> */}

                <Link
                  to={`/admin/module/${module._id}`}
                  className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition"
                >
                  <FiEye size={18} />
                </Link>

                <Link
                  to={`/admin/module/edit/${module._id}`}
                  className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition"
                >
                  <FiEdit3 size={18} />
                </Link>


                <button
                  onClick={() => deleteModule(module._id)}
                  className="cursor-pointer p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition"
                  title="Delete"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No modules found</p>
          </div>
        )}
      </div>
    </div>
  );
}