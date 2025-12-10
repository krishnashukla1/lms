//===========correct==============

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/axios";
// import { Trash2, Eye, Edit, ChevronLeft, ChevronRight } from "lucide-react";

// export default function ModuleList() {
//   const [modules, setModules] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     loadModules();
//   }, []);

//   async function loadModules() {
//     try {
//       const res = await api.get("/modules");
//       setModules(res.data.modules || res.data);
//     } catch (err) {
//       console.error("Error loading modules:", err);
//     }
//   }

//   async function deleteModule(id) {
//     if (!window.confirm("Are you sure you want to delete this module?")) return;
//     try {
//       await api.delete(`/modules/${id}`);
//       setModules((prev) => prev.filter((m) => m._id !== id));
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Failed to delete module");
//     }
//   }

//   // Filter + Pagination
//   const filtered = modules.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const displayed = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <div className="p-6 min-h-screen bg-gray-100 flex justify-center">
//       <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8">
//   <button
//           onClick={() => (window.location.href = "http://localhost:5173/admin")}
//           className="mb-6 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition cursor-pointer"
//         >
//           ← Back to Admin Dashboard
//         </button>
//         <h1 className="text-3xl font-bold text-blue-600 mb-6">📘 All Modules</h1>

//         <input
//           type="text"
//           placeholder="Search modules..."
//           className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
//           value={search}
//           onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
//         />

//         <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
//           <table className="w-full">
//             <thead className="bg-linear-to-r from-blue-500 to-indigo-500 text-white">
//               <tr>
//                 <th className="p-3 text-left">#</th>
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {displayed.length === 0 ? (
//                 <tr>
//                   <td colSpan={3} className="p-6 text-center text-gray-500">
//                     No modules found
//                   </td>
//                 </tr>
//               ) : (
//                 displayed.map((m, index) => (
//                   <tr key={m._id} className="hover:bg-blue-50 transition-all duration-300 border-b">
//                     <td className="p-3 text-gray-700 font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                     <td className="p-3 text-gray-700 font-medium">{m.title}</td>
//                     <td className="p-3 flex justify-center gap-4">
//                       <Link
//                         to={`/module/${m._id}`}
//                         className="cursor-pointer flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 hover:scale-110 transition-all duration-200"
//                       >
//                         <Eye size={18} /> View
//                       </Link>
//                       <Link
//                         to={`/module/edit/${m._id}`}
//                         className="cursor-pointer flex items-center gap-2 text-green-600 font-semibold hover:text-green-800 hover:scale-110 transition-all duration-200"
//                       >
//                         <Edit size={18} /> Edit
//                       </Link>
//                       <button
//                         onClick={() => deleteModule(m._id)}
//                         className="cursor-pointer flex items-center gap-2 text-red-600 font-semibold hover:text-red-800 hover:scale-110 transition-all duration-200"
//                       >
//                         <Trash2 size={18} /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {totalPages > 1 && (
//           <div className="flex justify-center items-center gap-4 mt-6">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
//               disabled={currentPage === 1}
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <span className="font-semibold">Page {currentPage} of {totalPages}</span>
//             <button
//               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//               className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
//               disabled={currentPage === totalPages}
//             >
//               <ChevronRight size={20} />
//             </button>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

//================stylish=============


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import {
//   FiArrowLeft, FiSearch, FiTrash2, FiEye, FiEdit3, FiChevronLeft,
//   FiChevronRight, FiBook, FiFileText, FiVideo, FiLink, FiPlus,
//   FiBarChart2, FiUsers
// } from "react-icons/fi";
// import { FaFilePdf } from "react-icons/fa";

// export default function ModuleList() {
//   const [modules, setModules] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     loadModules();
//   }, []);

//   async function loadModules() {
//     try {
//       setLoading(true);
//       const res = await api.get("/modules");
//       setModules(res.data.modules || res.data);
//     } catch (err) {
//       console.error("Error loading modules:", err);
//       alert("Failed to load modules");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function deleteModule(id) {
//     if (!window.confirm("Are you sure you want to delete this module? This will also remove all associated materials.")) return;
//     try {
//       await api.delete(`/modules/${id}`);
//       setModules((prev) => prev.filter((m) => m._id !== id));
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Failed to delete module");
//     }
//   }

//   // Filter + Pagination
//   const filtered = modules.filter((m) =>
//     m.title?.toLowerCase().includes(search.toLowerCase()) ||
//     m.description?.toLowerCase().includes(search.toLowerCase())
//   );
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const displayed = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const getMaterialIcon = (materialType) => {
//     switch (materialType) {
//       case 'video': return <FiVideo className="text-red-500" size={16} />;
//       case 'pdf': return <FaFilePdf className="text-red-500" size={16} />;
//       case 'link': return <FiLink className="text-blue-500" size={16} />;
//       default: return <FiFileText className="text-gray-500" size={16} />;
//     }
//   };

//   const countMaterialsByType = (materials) => {
//     const counts = { video: 0, pdf: 0, link: 0, total: materials?.length || 0 };
//     materials?.forEach(material => {
//       if (counts.hasOwnProperty(material.type)) {
//         counts[material.type]++;
//       }
//     });
//     return counts;
//   };

//   const StatCard = ({ title, value, color, icon }) => (
//     <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-600 font-medium text-sm">{title}</p>
//           <p className={`text-3xl font-black mt-2 bg-linear-to-r ${color} bg-clip-text text-transparent`}>
//             {value}
//           </p>
//         </div>
//         <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${color.split(' ')[1]} flex items-center justify-center`}>
//           <span className="text-white text-xl">{icon}</span>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 p-8">
//       {/* Background Decorative Elements */}
//       <div className="absolute top-0 left-0 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

//       <div className="relative w-full max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-8">
//           {/* <button
//             // onClick={() => window.history.back()}
//             onClick={() => (window.location.href = "http://localhost:5173/admin")}
//             className="flex items-center gap-3 text-gray-600 hover:text-purple-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//           >
//             <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Admin Dashboard
//           </button> */}

//           {/* <button
//             onClick={() => (window.location.href = `${import.meta.env.VITE_API_BASE_URL}/admin`)}
//             className="flex items-center gap-3 text-gray-600 hover:text-purple-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//           >
//             <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Admin Dashboard
//           </button> */}


//           <button
//             onClick={() => navigate("/admin")}
//             className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//           >
//             <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Dashboard
//           </button>



//           <div className="flex items-center gap-4">
//             <Link
//               to="/admin/add-module"
//               className="flex items-center gap-3 bg-linear-to-r from-purple-600 to-blue-600 
//                        text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 
//                        transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer
//                        shadow-lg hover:shadow-xl group/add"
//             >
//               <FiPlus className="group-hover/add:scale-110 transition-transform" size={20} />
//               <span>New Module</span>
//             </Link>
//             <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
//               <FiBook className="text-white" size={28} />
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="text-center mb-10">
//           <h1 className="text-5xl font-black bg-linear-to-r from-purple-600 to-blue-700 bg-clip-text text-transparent mb-4">
//             Course Modules
//           </h1>
//           <p className="text-gray-600 text-lg font-medium">
//             Manage and organize your learning content effectively
//           </p>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Modules"
//             value={modules.length}
//             color="from-purple-500 to-purple-700"
//             icon="📚"
//           />
//           <StatCard
//             title="Learning Materials"
//             value={modules.reduce((acc, m) => acc + (m.materials?.length || 0), 0)}
//             color="from-blue-500 to-blue-700"
//             icon="📖"
//           />
//           <StatCard
//             title="Video Lessons"
//             value={modules.reduce((acc, m) => acc + (m.materials?.filter(mat => mat.type === 'video').length || 0), 0)}
//             color="from-red-500 to-red-700"
//             icon="🎥"
//           />
//           <StatCard
//             title="PDF Resources"
//             value={modules.reduce((acc, m) => acc + (m.materials?.filter(mat => mat.type === 'pdf').length || 0), 0)}
//             color="from-emerald-500 to-emerald-700"
//             icon="📄"
//           />
//         </div>

//         {/* Search and Content Card */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
//           {/* Search Bar */}
//           <div className="relative mb-8">
//             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//               <FiSearch className="text-gray-400" size={20} />
//             </div>
//             <input
//               type="text"
//               placeholder="Search modules by title or description..."
//               className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 
//                        bg-white/60 backdrop-blur-sm
//                        focus:ring-4 focus:ring-purple-200 focus:border-purple-500 
//                        transition-all duration-300 placeholder-gray-400
//                        hover:border-gray-300 hover:bg-white/80
//                        text-lg font-medium cursor-text"
//               value={search}
//               onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
//             />
//           </div>

//           {/* Modules Grid */}
//           {loading ? (
//             <div className="flex justify-center items-center p-12">
//               <div className="flex flex-col items-center space-y-4">
//                 <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
//                 <span className="text-gray-600 text-lg font-medium">Loading modules...</span>
//               </div>
//             </div>
//           ) : displayed.length === 0 ? (
//             <div className="text-center p-12">
//               <div className="flex flex-col items-center space-y-6">
//                 <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center">
//                   <FiBook className="text-gray-400" size={40} />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-700 mb-2">No modules found</h3>
//                   <p className="text-gray-500 max-w-md">
//                     {search ? "Try adjusting your search terms" : "Get started by creating your first learning module"}
//                   </p>
//                 </div>
//                 <Link
//                   to="/admin/add-module"
//                   className="flex items-center gap-3 bg-linear-to-r from-purple-600 to-blue-600 
//                            text-white px-8 py-4 rounded-2xl font-bold hover:from-purple-700 hover:to-blue-700 
//                            transform hover:-translate-y-1 transition-all duration-300 cursor-pointer
//                            shadow-lg hover:shadow-xl mt-4"
//                 >
//                   <FiPlus size={20} />
//                   <span>Create First Module</span>
//                 </Link>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
//                 {displayed.map((module, index) => {
//                   const materialCounts = countMaterialsByType(module.materials);
//                   return (
//                     <div
//                       key={module._id}
//                       className="bg-linear-to-br from-white to-gray-50/80 rounded-2xl p-6 
//                                border-2 border-gray-200/50 hover:border-purple-300/50 
//                                shadow-lg hover:shadow-2xl transition-all duration-500 
//                                transform hover:-translate-y-2 group cursor-pointer"
//                     >
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">

//                           {/* <span className="text-white font-bold text-lg">
//                               {module.order || index + 1}
//                             </span> */}

//                           <span className="text-white font-bold text-lg">
//                             {(currentPage - 1) * itemsPerPage + index + 1}
//                           </span>

//                         </div>
//                         <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <Link
//                             to={`/module/${module._id}`}
//                             className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center 
//                                      text-blue-600 hover:bg-blue-600 hover:text-white 
//                                      transition-all duration-300 cursor-pointer hover:scale-110"
//                             title="View Module"
//                           >
//                             <FiEye size={16} />
//                           </Link>
//                           <Link
//                             to={`/module/edit/${module._id}`}
//                             className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center 
//                                      text-emerald-600 hover:bg-emerald-600 hover:text-white 
//                                      transition-all duration-300 cursor-pointer hover:scale-110"
//                             title="Edit Module"
//                           >
//                             <FiEdit3 size={16} />
//                           </Link>
//                           <button
//                             onClick={() => deleteModule(module._id)}
//                             className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center 
//                                      text-red-600 hover:bg-red-600 hover:text-white 
//                                      transition-all duration-300 cursor-pointer hover:scale-110"
//                             title="Delete Module"
//                           >
//                             <FiTrash2 size={16} />
//                           </button>
//                         </div>
//                       </div>

//                       <h3 className="font-bold text-gray-800 text-lg mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors">
//                         {module.title}
//                       </h3>

//                       <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                         {module.description || "No description provided"}
//                       </p>

//                       {/* Materials Summary */}
//                       <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/50">
//                         <div className="flex items-center justify-between mb-3">
//                           <span className="text-sm font-semibold text-gray-700">Materials</span>
//                           <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
//                             {materialCounts.total} items
//                           </span>
//                         </div>
//                         <div className="flex items-center justify-between text-xs text-gray-600">
//                           {materialCounts.video > 0 && (
//                             <div className="flex items-center space-x-1">
//                               <FiVideo className="text-red-500" size={12} />
//                               <span>{materialCounts.video}</span>
//                             </div>
//                           )}
//                           {materialCounts.pdf > 0 && (
//                             <div className="flex items-center space-x-1">
//                               <FaFilePdf className="text-red-500" size={12} />
//                               <span>{materialCounts.pdf}</span>
//                             </div>
//                           )}
//                           {materialCounts.link > 0 && (
//                             <div className="flex items-center space-x-1">
//                               <FiLink className="text-blue-500" size={12} />
//                               <span>{materialCounts.link}</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-200/50">
//                   <button
//                     onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/80 border border-gray-200 
//                              text-gray-700 font-semibold hover:bg-gray-50 hover:shadow-lg 
//                              transition-all duration-300 cursor-pointer disabled:opacity-50 
//                              disabled:cursor-not-allowed disabled:hover:bg-white/80
//                              hover:-translate-x-0.5 disabled:hover:translate-x-0"
//                   >
//                     <FiChevronLeft size={18} />
//                     <span>Previous</span>
//                   </button>

//                   <div className="flex items-center gap-2">
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => setCurrentPage(page)}
//                         className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 cursor-pointer
//                                  ${currentPage === page
//                             ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg'
//                             : 'bg-white/80 text-gray-700 hover:bg-gray-50 hover:shadow-md'
//                           }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/80 border border-gray-200 
//                              text-gray-700 font-semibold hover:bg-gray-50 hover:shadow-lg 
//                              transition-all duration-300 cursor-pointer disabled:opacity-50 
//                              disabled:cursor-not-allowed disabled:hover:bg-white/80
//                              hover:translate-x-0.5 disabled:hover:translate-x-0"
//                   >
//                     <span>Next</span>
//                     <FiChevronRight size={18} />
//                   </button>
//                 </div>
//               )}

//               {/* Results Count */}
//               <div className="text-center mt-6">
//                 <p className="text-gray-600 font-medium">
//                   Showing <span className="font-bold text-purple-600">{displayed.length}</span> of{" "}
//                   <span className="font-bold text-gray-700">{filtered.length}</span> modules
//                   {search && " matching your search"}
//                 </p>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//==========kp==correct============


// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import {
//   FiArrowLeft, FiSearch, FiTrash2, FiEye, FiEdit3, FiPlus,
//   FiBook, FiVideo, FiFileText, FiLink
// } from "react-icons/fi";
// import { FaFilePdf } from "react-icons/fa";

// export default function ModuleList() {
//   const [modules, setModules] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadModules();
//   }, []);



//   const loadModules = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/modules");
//       setModules(res.data || []);
//     } catch (err) {
//       alert("Failed to load modules");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteModule = async (id) => {
//     if (!window.confirm("Delete this module permanently?")) return;
//     try {
//       await api.delete(`/modules/${id}`);
//       setModules(prev => prev.filter(m => m._id !== id));
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   const filtered = modules.filter(m =>
//     m.title?.toLowerCase().includes(search.toLowerCase()) ||
//     m.description?.toLowerCase().includes(search.toLowerCase())
//   );

//   const getIcon = (type) => {
//     switch (type) {
//       case "video": return <FiVideo className="text-red-500" />;
//       case "pdf": return <FaFilePdf className="text-red-600" />;
//       case "link": return <FiLink className="text-blue-500" />;
//       default: return <FiFileText className="text-gray-500" />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-10">
//           <button
//             onClick={() => navigate("/admin")}
//             className="cursor-pointer flex items-center gap-3 text-gray-700 hover:text-purple-700 font-bold"
//           >
//             <FiArrowLeft size={24} /> Back to Dashboard
//           </button>
//           <Link
//             to="/admin/add-module"
//             className="cursor-pointer bg-linear-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-3 hover:shadow-xl transition"
//           >
//             <FiPlus /> New Module
//           </Link>
//         </div>

//         <h1 className="text-5xl font-black text-center bg-linear-to-r from-purple-600 to-blue-700 bg-clip-text text-transparent mb-10">
//           All Modules
//         </h1>

//         {/* Search */}
//         <div className="relative max-w-xl mx-auto mb-10">
//           <FiSearch className="absolute left-4 top-4 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search modules..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-purple-300 focus:border-purple-500"
//           />
//         </div>

//         {/* Modules Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filtered.map((module) => (
//             <div
//               key={module._id}
//               className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
//             >
//               <div className="flex justify-between items-start mb-6">
//                 <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
//                   {module.order}
//                 </div>
//                 <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
//                   {module.courseType?.toUpperCase() || "GENERAL"}
//                 </span>
//               </div>

//               <h3 className="text-2xl font-bold text-gray-800 mb-3">{module.title}</h3>
//               <p className="text-gray-600 mb-6 line-clamp-3">{module.description}</p>

//               {/* Materials */}
//               <div className="flex flex-wrap gap-3 mb-6">
//                 {module.materials?.map((mat, i) => (
//                   <div key={i} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
//                     {getIcon(mat.type)}
//                     <span className="text-sm text-gray-700 capitalize">{mat.type}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Actions */}
//               <div className="flex justify-end gap-3">
//                 {/* <Link
//                   to={`/module/${module._id}`}
//                   className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition"
//                 >
             
//                   <FiEye size={18} />
//                 </Link>
//                 <Link
//                   to={`/module/edit/${module._id}`}
//                   className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition"
//                   title="Edit"
//                 >
//                   <FiEdit3 size={18} />
//                 </Link> */}

//                 <Link
//                   to={`/admin/module/${module._id}`}
//                   className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition"
//                 >
//                   <FiEye size={18} />
//                 </Link>

//                 <Link
//                   to={`/admin/module/edit/${module._id}`}
//                   className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition"
//                 >
//                   <FiEdit3 size={18} />
//                 </Link>


//                 <button
//                   onClick={() => deleteModule(module._id)}
//                   className="cursor-pointer p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition"
//                   title="Delete"
//                 >
//                   <FiTrash2 size={18} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="text-center py-20">
//             <p className="text-2xl text-gray-500">No modules found</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//======================


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