

//===============stylish============

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import {
//   FiArrowLeft,
//   FiBook,
//   FiFileText,
//   FiVideo,
//   FiLink,
//   FiDownload,
//   FiExternalLink,
//   FiPlay,
//   FiEye,
//   FiBarChart2,
//   FiClock
// } from "react-icons/fi";
// import { FaFilePdf } from "react-icons/fa";

// export default function ModuleView() {
//   const { id } = useParams();
//   const [moduleData, setModuleData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeVideo, setActiveVideo] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!id) return;
//     async function loadModule() {
//       try {
//         const res = await api.get(`/modules/${id}`);
//         setModuleData(res.data.module || res.data);
//       } catch (err) {
//         console.error("Error loading module:", err);
//         setError("Failed to load module");
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadModule();
//   }, [id]);

//   const getMaterialIcon = (type) => {
//     switch (type) {
//       case "video": return <FiVideo className="text-red-500" size={24} />;
//       case "pdf": return <FaFilePdf className="text-red-500" size={24} />;
//       case "link": return <FiLink className="text-blue-500" size={24} />;
//       default: return <FiFileText className="text-gray-500" size={24} />;
//     }
//   };

//   const getMaterialTypeColor = (type) => {
//     switch (type) {
//       case "video": return "from-red-500 to-red-600";
//       case "pdf": return "from-orange-500 to-orange-600";
//       case "link": return "from-blue-500 to-blue-600";
//       default: return "from-gray-500 to-gray-600";
//     }
//   };

//   const getMaterialTypeLabel = (type) => {
//     switch (type) {
//       case "video": return "Video Lesson";
//       case "pdf": return "PDF Document";
//       case "link": return "External Resource";
//       default: return "Learning Material";
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg font-medium">Loading module content...</p>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
//             <FiBook className="text-red-500" size={32} />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Module Not Found</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={() => navigate("/admin/modules")}
//             className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
//           >
//             Back to Modules
//           </button>
//         </div>
//       </div>
//     );

//   if (!moduleData)
//     return (
//       <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
//             <FiBook className="text-gray-400" size={32} />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Module Not Available</h2>
//           <p className="text-gray-600 mb-6">The requested module could not be loaded.</p>
//           <button
//             onClick={() => navigate("/admin/modules")}
//             className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
//           >
//             Back to Modules
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-8">
//       {/* Background Decorative Elements */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

//       <div className="relative w-full max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-8">
//           <button
//             onClick={() => navigate("/admin/modules")}
//             className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//           >
//             <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Modules
//           </button>

//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
//               <FiBook className="text-white" size={28} />
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
//           {/* Module Header */}
//           <div className="text-center mb-10">
//             <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
//               <FiBook size={16} />
//               Module {moduleData.order || "N/A"}
//             </div>
//             <h1 className="text-5xl font-black bg-linear-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent mb-4">
//               {moduleData.title}
//             </h1>
//             {moduleData.description && (
//               <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
//                 {moduleData.description}
//               </p>
//             )}
//           </div>

//           {/* Module Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
//             <div className="bg-linear-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 text-center border border-blue-200/50">
//               <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
//                 <FiFileText className="text-white" size={20} />
//               </div>
//               <p className="text-2xl font-black text-blue-600">{moduleData.materials?.length || 0}</p>
//               <p className="text-sm text-gray-600 font-medium">Total Materials</p>
//             </div>

//             <div className="bg-linear-to-br from-red-50 to-red-100/50 rounded-2xl p-4 text-center border border-red-200/50">
//               <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
//                 <FiVideo className="text-white" size={20} />
//               </div>
//               <p className="text-2xl font-black text-red-600">
//                 {moduleData.materials?.filter(m => m.type === 'video').length || 0}
//               </p>
//               <p className="text-sm text-gray-600 font-medium">Video Lessons</p>
//             </div>

//             <div className="bg-linear-to-br from-orange-50 to-orange-100/50 rounded-2xl p-4 text-center border border-orange-200/50">
//               <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
//                 <FaFilePdf className="text-white" size={20} />
//               </div>
//               <p className="text-2xl font-black text-orange-600">
//                 {moduleData.materials?.filter(m => m.type === 'pdf').length || 0}
//               </p>
//               <p className="text-sm text-gray-600 font-medium">PDF Resources</p>
//             </div>

//             <div className="bg-linear-to-br from-green-50 to-green-100/50 rounded-2xl p-4 text-center border border-green-200/50">
//               <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
//                 <FiLink className="text-white" size={20} />
//               </div>
//               <p className="text-2xl font-black text-green-600">
//                 {moduleData.materials?.filter(m => m.type === 'link').length || 0}
//               </p>
//               <p className="text-sm text-gray-600 font-medium">External Links</p>
//             </div>
//           </div>

//           {/* Materials Section */}
//           {moduleData.materials?.length > 0 ? (
//             <div>
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-black bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                   Learning Materials
//                 </h2>
//                 <div className="flex items-center gap-2 text-gray-500">
//                   <FiBarChart2 size={20} />
//                   <span className="font-semibold">{moduleData.materials.length} resources</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {moduleData.materials.map((material, index) => (
//                   <div
//                     key={index}
//                     className="bg-linear-to-br from-white to-gray-50/80 rounded-2xl p-6 
//                              border-2 border-gray-200/50 hover:border-blue-300/50 
//                              shadow-lg hover:shadow-2xl transition-all duration-500 
//                              transform hover:-translate-y-2 group cursor-pointer"
//                   >
//                     <div className="flex items-start justify-between mb-4">
//                       <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${getMaterialTypeColor(material.type)} flex items-center justify-center shadow-lg`}>
//                         {getMaterialIcon(material.type)}
//                       </div>
//                       <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
//                         {getMaterialTypeLabel(material.type)}
//                       </span>
//                     </div>

//                     <div className="mb-4">
//                       <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
//                         {material.type.toUpperCase()} Resource {index + 1}
//                       </h3>
//                       <p className="text-gray-600 text-sm break-all">
//                         {material.url}
//                       </p>
//                     </div>

//                     <div className="flex gap-3">
//                       {material.type === "video" && (
//                         <>
//                           <button
//                             onClick={() => setActiveVideo(material.url)}
//                             className="flex-1 bg-linear-to-r from-red-500 to-red-600 text-white 
//                                      py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 
//                                      transition-all duration-300 cursor-pointer flex items-center 
//                                      justify-center gap-2 group/play"
//                           >
//                             <FiPlay className="group-hover/play:scale-110 transition-transform" size={18} />
//                             <span>Play Video</span>
//                           </button>
//                           <a
//                             href={material.url}
//                             download
//                             className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center 
//                                      text-gray-600 hover:bg-gray-200 transition-all duration-300 
//                                      cursor-pointer hover:scale-110"
//                             title="Download Video"
//                           >
//                             <FiDownload size={18} />
//                           </a>
//                         </>
//                       )}

//                       {(material.type === "pdf" || material.type === "link") && (
//                         <a
//                           href={material.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white 
//                                    py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 
//                                    transition-all duration-300 cursor-pointer flex items-center 
//                                    justify-center gap-2 group/link"
//                         >
//                           <FiExternalLink className="group-hover/link:scale-110 transition-transform" size={18} />
//                           <span>{material.type === "pdf" ? "View PDF" : "Open Link"}</span>
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
//                 <FiFileText className="text-gray-400" size={40} />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-700 mb-3">No Learning Materials</h3>
//               <p className="text-gray-500 max-w-md mx-auto mb-6">
//                 This module doesn't have any learning materials yet. Materials will be added soon to enhance your learning experience.
//               </p>
//               <button
//                 onClick={() => navigate("/admin/modules")}
//                 className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold 
//                          hover:bg-blue-700 transition-all duration-300 cursor-pointer
//                          transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
//               >
//                 Browse Other Modules
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Video Modal */}
//       {activeVideo && (
//         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl transform animate-scale-in">
//             <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//               <h3 className="text-xl font-bold text-gray-800">Video Player</h3>
//               <button
//                 onClick={() => setActiveVideo(null)}
//                 className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center 
//                          hover:bg-gray-200 transition-colors cursor-pointer"
//               >
//                 <span className="text-xl">×</span>
//               </button>
//             </div>
//             <div className="p-6">
//               <video
//                 controls
//                 autoPlay
//                 className="w-full rounded-2xl shadow-lg"
//                 controlsList="nodownload"
//               >
//                 <source src={activeVideo} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//               <div className="flex justify-center mt-6">
//                 <a
//                   href={activeVideo}
//                   download
//                   className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 
//                            rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
//                 >
//                   <FiDownload size={18} />
//                   <span>Download Video</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//==========emebed===============

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import {
//   FiArrowLeft,
//   FiBook,
//   FiFileText,
//   FiVideo,
//   FiLink,
//   FiExternalLink,
//   FiEye,
//   FiBarChart2,
// } from "react-icons/fi";
// import { FaFilePdf } from "react-icons/fa";

// export default function ModuleView() {
//   const { id } = useParams();
//   const [moduleData, setModuleData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeEmbedUrl, setActiveEmbedUrl] = useState(null); // For YouTube/Vimeo embed
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!id) return;
//     async function loadModule() {
//       try {
//         const res = await api.get(`/modules/${id}`);
//         setModuleData(res.data.module || res.data);
//       } catch (err) {
//         console.error("Error loading module:", err);
//         setError("Failed to load module");
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadModule();
//   }, [id]);

//   // Helper: Convert YouTube/Vimeo URL to embed URL

//   const getEmbedUrl = (url) => {
//     if (!url) return null;

//     try {
//       const urlObj = new URL(url.trim());
//       let videoId = "";

//       // Case 1: youtube.com/watch?v=ABC123
//       if (urlObj.hostname.includes("youtube.com") && urlObj.searchParams.has("v")) {
//         videoId = urlObj.searchParams.get("v");
//       }
//       // Case 2: youtu.be/ABC123
//       else if (urlObj.hostname.includes("youtu.be")) {
//         videoId = urlObj.pathname.slice(1).split("?")[0];
//       }
//       // Case 3: youtube.com/shorts/ABC123  ← This is the missing one!
//       else if (urlObj.pathname.includes("/shorts/")) {
//         videoId = urlObj.pathname.split("/shorts/")[1].split("?")[0];
//       }
//       // Case 4: Already an embed URL
//       else if (urlObj.pathname.includes("/embed/")) {
//         videoId = urlObj.pathname.split("/embed/")[1].split("?")[0];
//       }

//       if (!videoId) return null;

//       // Return embed URL with autoplay + clean UI
//       return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&cc_load_policy=0`;
//     } catch (e) {
//       console.warn("Invalid URL for embed:", url);
//       return null;
//     }
//   };

//   const getMaterialIcon = (type) => {
//     switch (type) {
//       case "video": return <FiVideo className="text-red-500" size={24} />;
//       case "pdf": return <FaFilePdf className="text-red-500" size={24} />;
//       case "link": return <FiLink className="text-blue-500" size={24} />;
//       default: return <FiFileText className="text-gray-500" size={24} />;
//     }
//   };

//   const getMaterialTypeColor = (type) => {
//     switch (type) {
//       case "video": return "from-red-500 to-red-600";
//       case "pdf": return "from-orange-500 to-orange-600";
//       case "link": return "from-blue-500 to-blue-600";
//       default: return "from-gray-500 to-gray-600";
//     }
//   };

//   const getMaterialTypeLabel = (type) => {
//     switch (type) {
//       case "video": return "Video Lesson";
//       case "pdf": return "PDF Document";
//       case "link": return "External Resource";
//       default: return "Learning Material";
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg font-medium">Loading module content...</p>
//         </div>
//       </div>
//     );

//   if (error || !moduleData)
//     return (
//       <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
//             <FiBook className="text-red-500" size={32} />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Module Not Found</h2>
//           <p className="text-gray-600 mb-6">{error || "The requested module could not be loaded."}</p>
//           <button
//             onClick={() => navigate("/admin/modules")}
//             className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
//           >
//             Back to Modules
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-8">
//       {/* Background Decorative Elements */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

//       <div className="relative w-full max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <button
//             onClick={() => navigate("/admin/modules")}
//             className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//           >
//             <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Modules
//           </button>

//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
//               <FiBook className="text-white" size={28} />
//             </div>
//           </div>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
//           {/* Title */}
//           <div className="text-center mb-10">
//             <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
//               <FiBook size={16} />
//               Module {moduleData.order || "N/A"}
//             </div>
//             <h1 className="text-5xl font-black bg-linear-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent mb-4">
//               {moduleData.title}
//             </h1>
//             {moduleData.description && (
//               <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
//                 {moduleData.description}
//               </p>
//             )}
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
//             <div className="bg-linear-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 text-center border border-blue-200/50">
//               <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
//                 <FiFileText className="text-white" size={20} />
//               </div>
//               <p className="text-2xl font-black text-blue-600">{moduleData.materials?.length || 0}</p>
//               <p className="text-sm text-gray-600 font-medium">Total Materials</p>
//             </div>
//             <div className="bg-linear-to-br from-red-50 to-red-100/50 rounded-2xl p-4 text-center border border-red-200/50">
//               <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
//                 <FiVideo className="text-white" size={20} />
//               </div>
//               <p className="text-2xl font-black text-red-600">
//                 {moduleData.materials?.filter(m => m.type === 'video').length || 0}
//               </p>
//               <p className="text-sm text-gray-600 font-medium">Video Lessons</p>
//             </div>
//             <div className="bg-linear-to-br from-orange-50 to-orange-100/50 rounded-2xl p-4 text-center border border-orange-200/50">
//               <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
//                 <FaFilePdf className="text-white" size={20} />
//               </div>
//               <p className="text-2xl font-black text-orange-600">
//                 {moduleData.materials?.filter(m => m.type === 'pdf').length || 0}
//               </p>
//               <p className="text-sm text-gray-600 font-medium">PDF Resources</p>
//             </div>
//             <div className="bg-linear-to-br from-green-50 to-green-100/50 rounded-2xl p-4 text-center border border-green-200/50">
//               <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
//                 <FiLink className="text-white" size={20} />
//               </div>
//               <p className="text-2xl font-black text-green-600">
//                 {moduleData.materials?.filter(m => m.type === 'link').length || 0}
//               </p>
//               <p className="text-sm text-gray-600 font-medium">External Links</p>
//             </div>
//           </div>

//           {/* Materials */}
//           {moduleData.materials?.length > 0 ? (
//             <div>
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-black bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                   Learning Materials
//                 </h2>
//                 <div className="flex items-center gap-2 text-gray-500">
//                   <FiBarChart2 size={20} />
//                   <span className="font-semibold">{moduleData.materials.length} resources</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {moduleData.materials.map((material, index) => {
//                   const embedUrl = getEmbedUrl(material.url);

//                   return (
//                     <div
//                       key={index}
//                       className="bg-linear-to-br from-white to-gray-50/80 rounded-2xl p-6 
//                                border-2 border-gray-200/50 hover:border-blue-300/50 
//                                shadow-lg hover:shadow-2xl transition-all duration-500 
//                                transform hover:-translate-y-2 group"
//                     >
//                       <div className="flex items-start justify-between mb-4">
//                         <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${getMaterialTypeColor(material.type)} flex items-center justify-center shadow-lg`}>
//                           {getMaterialIcon(material.type)}
//                         </div>
//                         <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
//                           {getMaterialTypeLabel(material.type)}
//                         </span>
//                       </div>

//                       <div className="mb-4">
//                         <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
//                           {material.type === "video" ? "Video Lesson" : material.type === "pdf" ? "PDF Document" : "External Link"} {index + 1}
//                         </h3>
//                         <p className="text-gray-600 text-sm break-all line-clamp-2">
//                           {material.url}
//                         </p>
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="flex gap-3">


//                         {material.type === "video" && (
//                           <>
//                             {getEmbedUrl(material.url) ? (
//                               <button
//                                 onClick={() => setActiveEmbedUrl(getEmbedUrl(material.url))}
//                                 className="flex-1 bg-linear-to-r from-red-500 to-red-600 text-white 
//                  py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 
//                  transition-all duration-300 cursor-pointer flex items-center 
//                  justify-center gap-2 group/play"
//                               >
//                                 <FiEye className="group-hover/play:scale-110 transition-transform" size={18} />
//                                 Watch Video
//                               </button>
//                             ) : (
//                               <a
//                                 href={material.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex-1 bg-linear-to-r from-red-500 to-red-600 text-white 
//                  py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 
//                  transition-all duration-300 cursor-pointer flex items-center 
//                  justify-center gap-2"
//                               >
//                                 <FiExternalLink size={18} />
//                                 Open on YouTube
//                               </a>
//                             )}
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
//                 <FiFileText className="text-gray-400" size={40} />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-700 mb-3">No Learning Materials</h3>
//               <p className="text-gray-500 max-w-md mx-auto mb-6">
//                 This module doesn't have any learning materials yet.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Embedded Video Modal (YouTube/Vimeo) */}
//       {activeEmbedUrl && (
//         <div
//           className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
//           onClick={() => setActiveEmbedUrl(null)}
//         >
//           <div className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden shadow-2xl">
//             {/* Close Button */}
//             <button
//               onClick={() => setActiveEmbedUrl(null)}
//               className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white text-3xl font-light transition-all hover:scale-110"
//             >
//               ×
//             </button>

//             {/* Embedded Player */}
//             <div className="relative pb-[56.25%]">
//               <iframe
//                 src={activeEmbedUrl}
//                 title="Video Player"
//                 className="absolute inset-0 w-full h-full"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>

//             <div className="p-4 text-center text-white/80 text-sm">
//               Click anywhere outside to close
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//==============kp=========
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiArrowLeft, FiVideo, FiFileText, FiLink, FiExternalLink } from "react-icons/fi";
// import VideoEmbed from "../components/VideoEmbed";

// export default function ModuleView() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [module, setModule] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get(`/modules/${id}`)
//       .then(res => setModule(res.data))
//       .catch(() => alert("Failed to load module"))
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <div className="p-20 text-center text-2xl">Loading...</div>;
//   if (!module) return <div className="p-20 text-center text-red-600">Module not found</div>;

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
//       <div className="max-w-5xl mx-auto">
//         <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-blue-700 font-bold mb-8">
//           <FiArrowLeft size={24} /> Back
//         </button>

//         <div className="bg-white rounded-3xl shadow-2xl p-12">
//           <h1 className="text-5xl font-black mb-6 bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
//             {module.title}
//           </h1>
//           <p className="text-xl text-gray-700 mb-12">{module.description}</p>

//           <h2 className="text-3xl font-bold mb-8">Learning Materials</h2>

//           <div className="space-y-8">
//             {module.materials?.map((mat, i) => (
//               <div key={i} className="bg-linear-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-gray-200">
//                 <div className="flex items-center gap-4 mb-4">
//                   {mat.type === "video" && <FiVideo className="text-red-600" size={32} />}
//                   {mat.type === "pdf" && <FiFileText className="text-orange-600" size={32} />}
//                   {mat.type === "link" && <FiLink className="text-blue-600" size={32} />}
//                   <h3 className="text-2xl font-bold capitalize">{mat.type} Resource</h3>
//                 </div>

//                 {mat.type === "video" ? (
//                   <VideoEmbed url={mat.url} />
//                 ) : (
//                   <a
//                     href={mat.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700"
//                   >
//                     <FiExternalLink /> Open {mat.type.toUpperCase()}
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//===========11 pm 6 dec==========
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiArrowLeft, FiVideo, FiFileText, FiLink, FiExternalLink } from "react-icons/fi";
// import VideoEmbed from "../components/VideoEmbed";
// import { motion } from "framer-motion";

// export default function ModuleView() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [module, setModule] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchModule = async () => {
//       try {
//         const res = await api.get("/student/dashboard");
//         const found = res.data.modules.find(m => m._id === id);
//         setModule(found || null);
//       } catch (err) {
//         alert("Failed to load module");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchModule();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="w-20 h-20 border-8 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!module) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-3xl text-red-600">
//         Module not found
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-5xl mx-auto">
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-10 flex items-center gap-4 text-indigo-700 font-bold text-xl"
//         >
//           <FiArrowLeft size={32} /> Back
//         </button>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-3xl shadow-2xl p-12"
//         >
//           <h1 className="text-6xl font-black mb-8 bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
//             {module.title}
//           </h1>
//           <p className="text-2xl text-gray-700 mb-16">{module.description}</p>

//           <h2 className="text-4xl font-bold mb-10">Learning Materials</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//             {module.materials?.map((mat, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 border-2 border-indigo-200"
//               >
//                 <div className="flex items-center gap-6 mb-8">
//                   {mat.materialType === "video" && <FiVideo className="text-red-600" size={48} />}
//                   {mat.materialType === "pdf" && <FiFileText className="text-orange-600" size={48} />}
//                   {mat.materialType === "link" && <FiLink className="text-blue-600" size={48} />}
//                   <div>
//                     <h3 className="text-3xl font-bold capitalize">{mat.materialType}</h3>
//                     {mat.title && <p className="text-xl text-gray-700">{mat.title}</p>}
//                   </div>
//                 </div>

//                 {mat.materialType === "video" ? (
//                   <VideoEmbed url={mat.url} />
//                 ) : (
//                   <a
//                     href={mat.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-6 bg-linear-to-r from-indigo-600 to-purple-700 text-white px-12 py-8 rounded-3xl text-2xl font-bold shadow-2xl hover:shadow-3xl"
//                   >
//                     <FiExternalLink size={36} />
//                     Open {mat.materialType.toUpperCase()}
//                   </a>
//                 )}
//               </motion.div>
//             ))}
//           </div>

//           {module.hasQuiz && (
//             <div className="text-center mt-20">
//               <button
//                 onClick={() => navigate(`/quiz/module/${module._id}`)}
//                 className="bg-linear-to-r from-emerald-600 to-teal-600 text-white px-20 py-10 rounded-3xl text-3xl font-bold shadow-2xl"
//               >
//                 Start Quiz
//               </button>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }


// src/pages/ModuleView.jsx

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiArrowLeft, FiVideo, FiFileText, FiLink, FiExternalLink, FiCheckCircle } from "react-icons/fi";
// import VideoEmbed from "../components/VideoEmbed";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";

// export default function ModuleView() {
//   const { moduleId } = useParams();
//   const navigate = useNavigate();
//   const [module, setModule] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchModule = async () => {
//       try {
//         const res = await api.get("/student/dashboard");
//         const found = res.data.modules.find(m => m._id === moduleId);
        
//         if (!found) {
//           toast.error("Module not found");
//           navigate(-1);
//           return;
//         }
        
//         // If module has quiz and is not completed → redirect to quiz directly
//         if (found.hasQuiz && !found.completed) {
//           navigate(`/quiz/module/${moduleId}`);
//           return;
//         }

//         setModule(found);
//       } catch (err) {
//         toast.error("Failed to load module");
//         navigate(-1);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchModule();
//   }, [moduleId, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-100">
//         <div className="w-20 h-20 border-8 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!module) return null;

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100">
//       <div className="max-w-6xl mx-auto p-8 py-12">

//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-10 flex items-center gap-4 text-indigo-700 font-bold text-xl hover:text-indigo-900 transition"
//         >
//           <FiArrowLeft size={32} /> Back to Modules
//         </button>

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-16"
//         >
//           <h1 className="text-7xl font-black mb-6 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//             {module.title}
//           </h1>
//           {module.completed && (
//             <div className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white rounded-full text-xl font-bold">
//               <FiCheckCircle size={32} /> Completed
//             </div>
//           )}
//         </motion.div>

//         {/* Description */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="text-2xl text-gray-700 text-center max-w-4xl mx-auto mb-16 leading-relaxed"
//         >
//           {module.description}
//         </motion.p>

//         {/* Learning Materials */}
//         {module.materials && module.materials.length > 0 && (
//           <div className="mb-20">
//             <h2 className="text-5xl font-black text-center mb-12 bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
//               Learning Materials
//             </h2>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//               {module.materials.map((mat, i) => {
//                 const isVideo = mat.materialType === "video" || 
//                   (mat.type === "video" && (mat.url.includes("youtube") || mat.url.includes("vimeo")));

//                 return (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: i * 0.15 }}
//                     className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-indigo-100 hover:border-indigo-300 transition-all"
//                   >
//                     <div className="p-8 bg-linear-to-br from-indigo-50 to-purple-50">
//                       <div className="flex items-center gap-5 mb-6">
//                         {mat.materialType === "video" || mat.type === "video" ? (
//                           <FiVideo className="text-red-600" size={48} />
//                         ) : mat.materialType === "pdf" || mat.type === "pdf" ? (
//                           <FiFileText className="text-orange-600" size={48} />
//                         ) : (
//                           <FiLink className="text-blue-600" size={48} />
//                         )}
//                         <div>
//                           <h3 className="text-3xl font-bold capitalize">
//                             {mat.materialType || mat.type}
//                           </h3>
//                           {mat.title && <p className="text-xl text-gray-700">{mat.title}</p>}
//                         </div>
//                       </div>

//                       {isVideo ? (
//                         <div className="mt-6">
//                           <VideoEmbed url={mat.url} title={mat.title || module.title} />
//                         </div>
//                       ) : (
//                         <a
//                           href={mat.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-4 mt-6 bg-linear-to-r from-indigo-600 to-purple-700 text-white px-12 py-8 rounded-3xl text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all"
//                         >
//                           <FiExternalLink size={36} />
//                           Open {mat.materialType?.toUpperCase() || mat.type?.toUpperCase()}
//                         </a>
//                       )}
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Quiz Actions */}
//         <div className="text-center">
//           {module.hasQuiz && (
//             <>
//               {module.completed ? (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => navigate(`/quiz/review/${moduleId}`)}
//                   className="bg-linear-to-r from-blue-600 to-cyan-600 text-white px-20 py-10 rounded-3xl text-3xl font-bold shadow-2xl"
//                 >
//                   Review Quiz Answers
//                 </motion.button>
//               ) : (
//                 <p className="text-2xl text-gray-600">Quiz completed after materials</p>
//               )}
//             </>
//           )}

//           {!module.hasQuiz && module.completed && (
//             <div className="inline-flex items-center gap-4 px-12 py-8 bg-emerald-500 text-white rounded-3xl text-3xl font-bold">
//               <FiCheckCircle size={48} /> Module Completed!
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// //============
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import {
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiAward,
  FiBookOpen,
  FiBarChart2,
  FiTarget,
  FiStar,
  FiUpload,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../store/authStore";
import VideoEmbed from "../components/VideoEmbed";

export default function StudentDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false); // Track final assignment status

  const [currentPage, setCurrentPage] = useState(1);
  const modulesPerPage = 5;
  const navigate = useNavigate();
  const logout = useAuth((s) => s.logout);
  const location = useLocation();
  const moduleRefs = useRef({});
  const justCompletedModuleId = location.state?.justCompletedModuleId;

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const [dashRes, assignRes] = await Promise.all([
          api.get("/student/dashboard"),
          api.get("/assignments/assignment-status"), // Your backend must provide this
        ]);
        setDashboard(dashRes.data);
        setHasSubmitted(!!assignRes.data.submitted); // true if already submitted
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          navigate("/");
        } else {
          toast.error("Failed to load dashboard");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, [navigate]);

  // Auto-scroll to next module
  useEffect(() => {
    if (loading || !dashboard) return;

    let targetModule = null;
    if (justCompletedModuleId) {
      const idx = dashboard.modules.findIndex((m) => m._id === justCompletedModuleId);
      if (idx !== -1) {
        targetModule = dashboard.modules.slice(idx + 1).find((m) => m.unlocked && !m.completed);
      }
    }

    if (!targetModule) {
      const lastCompletedIdx = dashboard.modules.reduce((last, m, i) => (m.completed ? i : last), -1);
      targetModule = dashboard.modules.slice(lastCompletedIdx + 1).find((m) => m.unlocked && !m.completed);
    }

    if (targetModule && moduleRefs.current[targetModule._id]) {
      moduleRefs.current[targetModule._id]?.scrollIntoView({ behavior: "smooth", block: "center" });
      moduleRefs.current[targetModule._id]?.classList.add("ring-4", "ring-amber-400", "ring-opacity-70");
      setTimeout(() => {
        moduleRefs.current[targetModule._id]?.classList.remove("ring-4", "ring-amber-400", "ring-opacity-70");
      }, 3000);
    }

    if (justCompletedModuleId) {
      window.history.replaceState({}, document.title);
    }
  }, [dashboard, justCompletedModuleId, loading]);

  // Pagination
  const indexOfLastModule = currentPage * modulesPerPage;
  const indexOfFirstModule = indexOfLastModule - modulesPerPage;
  const currentModules = dashboard?.modules?.slice(indexOfFirstModule, indexOfLastModule) || [];
  const totalPages = Math.ceil((dashboard?.modules?.length || 0) / modulesPerPage);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/", { replace: true }), 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-indigo-600 border-r-transparent border-b-indigo-600 border-l-transparent rounded-full"
        />
      </div>
    );
  }

  if (!dashboard) return null;

  const completedModules = dashboard.modules.filter((m) => m.completed).length;
  const totalModules = dashboard.modules.length;
  const currentNextModule = dashboard.modules
    .slice(dashboard.modules.reduce((last, m, i) => (m.completed ? i : last), -1) + 1)
    .find((m) => m.unlocked && !m.completed);

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <motion.header initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-lg border border-white/20 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-md">
                    <FiBookOpen className="text-white text-2xl" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Student Dashboard
                    </h1>
                    {/* <p className="text-gray-600">
                      Welcome back, <span className="font-semibold text-indigo-600">{dashboard.student.name}</span>!
                                        Username: <span className="font-semibold text-indigo-600">{dashboard.student.username}</span>                             

                    </p> */}

                    <p className="text-gray-600">
                      Welcome back,{" "}
                      <span className="font-semibold text-indigo-600">
                        {dashboard?.student?.name || "Student"}
                      </span>
                      !
                      <br />
                      Username:{" "}
                      <span className="font-semibold text-indigo-600">
                        {dashboard?.student?.username || "No username"}
                      </span>
                    </p>


                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur px-4 py-3 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {dashboard.student.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-700">{dashboard.student.name}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="cursor-pointer flex items-center gap-2 px-5 py-3 bg-linear-to-r from-rose-500 to-pink-600 text-white rounded-2xl shadow-md hover:shadow-lg font-medium"
                >
                  <FiLogOut /> Logout
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* STATS + FINAL ASSIGNMENT – Perfect 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 1. Course Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-xl border border-white/30 p-6 flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-2xl">
                <FiBarChart2 className="text-indigo-600 text-2xl" />
              </div>
              <span className="text-3xl font-bold text-indigo-600">{dashboard.progressPercentage}%</span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-3">Course Progress</h3>
            <div className="w-full bg-gray-200/70 rounded-full h-3 overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${dashboard.progressPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full"
              />
            </div>
            <p className="text-sm text-gray-600 mt-auto">
              {completedModules} / {totalModules} modules completed
            </p>
          </motion.div>

          {/* 2. Next Module */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-xl bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-3xl shadow-xl border border-amber-200/50 p-6 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 rounded-2xl">
                <FiTarget className="text-amber-600 text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Next Up</h3>
            </div>
            <p className="font-bold text-lg text-gray-800 line-clamp-2 flex-1">
              {currentNextModule ? currentNextModule.title : "All modules completed!"}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {currentNextModule ? "Ready to continue" : "Congratulations! Course completed"}
            </p>
          </motion.div>

          {/* 3. Final Assignment – Same Height & Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl bg-linear-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl shadow-xl border border-emerald-300/40 p-6 flex flex-col h-full"
          >
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <div className="p-4ってる bg-emerald-100 rounded-full mb-4">
                <FiFileText className="text-4xl text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Final Assignment</h3>
              <p className="text-sm text-gray-600 mb-6">One-time submission for the course</p>

              {hasSubmitted ? (
                <div className="cursor-pointer inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white font-bold text-lg rounded-3xl shadow-lg">
                  <FiCheckCircle className="text-2xl" />
                  Submitted
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/assignment")}
                  className="inline-flex items-center gap-3 px-8 py-5 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-lg rounded-3xl shadow-xl hover:shadow-emerald-500/50 transition-all"
                >
                  <FiUpload className="text-2xl" />
                  Submit Assignment
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* SEPARATE FINAL ASSIGNMENT CARD */}


        {/* Modules Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FiStar className="text-yellow-500" />
              Your Learning Modules
            </h2>
            <span className="text-sm font-medium text-gray-600 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gray-200">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <div className="flex flex-col gap-8">
            {currentModules.map((mod) => {
              const isNext = currentNextModule?._id === mod._id;
              const isLocked = !mod.unlocked || (!mod.completed && !isNext);

              return (
                <motion.div
                  key={mod._id}
                  ref={(el) => (moduleRefs.current[mod._id] = el)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className={`relative overflow-hidden rounded-3xl shadow-xl border-2 transition-all duration-500
                    ${mod.completed
                      ? "bg-linear-to-br from-emerald-500/10 to-teal-500/10 border-emerald-400"
                      : isNext
                        ? "bg-linear-to-br from-amber-500/20 to-orange-500/20 border-amber-500 shadow-2xl ring-4 ring-amber-300/50"
                        : "bg-white/80 backdrop-blur border-gray-300 opacity-90"
                    }`}
                >
                  <div className="absolute top-6 right-6 z-10">
                    <span className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg
                      ${mod.completed ? "bg-emerald-500 text-white" : isNext ? "bg-linear-to-r from-amber-500 to-orange-500 text-white animate-pulse" : "bg-gray-500 text-white"}`}>
                      {mod.completed ? "Completed" : isNext ? "Next Up" : "Locked"}
                    </span>
                  </div>

                  <div className="p-8">
                    <h3 className={`text-2xl font-bold mb-4 ${isLocked ? "text-gray-500" : "text-gray-800"}`}>
                      {mod.title}
                    </h3>
                    <p className={`text-gray-600 mb-6 text-lg leading-relaxed ${isLocked ? "italic" : ""}`}>
                      {mod.description}
                    </p>

                    {/* {mod.materials.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-8">
                        {mod.materials.map((m, i) => (
                          <a key={i} href={isLocked ? "#" : m.url} target="_blank" rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all
                              ${isLocked ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 hover:shadow-md border border-indigo-200"}`}>
                            {m.type === "video" && "Video"}
                            {m.type === "pdf" && "PDF"}
                            {m.type === "link" && "Link"}
                          </a>
                        ))}
                      </div>
                    )} */}


                    {mod.materials.length > 0 && (
                      <div className="space-y-6 mb-8">
                        {mod.materials.map((mat, i) => {
                          const isVideo = mat.type === "video" && (mat.url.includes("youtube") || mat.url.includes("youtu.be") || mat.url.includes("vimeo"));

                          // Locked module → show disabled button
                          if (isLocked) {
                            return (
                              <div key={i} className="flex items-center gap-3 px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl cursor-not-allowed">
                                {mat.type === "video" && "Video"}
                                {mat.type === "pdf" && "PDF"}
                                {mat.type === "link" && "Link"}
                                {mat.title && <span className="font-medium">{mat.title}</span>}
                              </div>
                            );
                          }

                          // Embedded Video
                          if (isVideo) {
                            return (
                              <div key={i} className="space-y-3">
                                {(mat.title || mat.description) && (
                                  <h4 className="font-bold text-gray-800 text-lg">
                                    {mat.title || `Video ${i + 1}`}
                                  </h4>
                                )}
                                <VideoEmbed url={mat.url} title={mat.title || mod.title} />
                              </div>
                            );
                          }

                          // Regular Links (PDF, external link, etc.)
                          return (
                            <a
                              key={i}
                              href={mat.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 px-6 py-4 bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-2xl font-medium hover:shadow-lg border border-indigo-200 transition-all"
                            >
                              {mat.type === "video" && "Video"}
                              {mat.type === "pdf" && "PDF"}
                              {mat.type === "link" && "Link"}
                              {mat.title || `Resource ${i + 1}`}
                            </a>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex justify-end gap-5">
                      {mod.completed && mod.hasQuiz ? (
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/quiz/review/${mod._id}`)}
                          className="cursor-pointer  px-8 py-4 rounded-3xl font-bold text-lg flex items-center gap-3 bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-lg hover:shadow-xl">
                          <FiBookOpen className="text-xl" /> Review Quiz
                        </motion.button>
                      ) : isLocked || !mod.hasQuiz ? (
                        <button disabled className="px-8 py-4 rounded-3xl font-bold text-lg bg-gray-300 text-gray-500 cursor-not-allowed flex items-center gap-3">
                          <FiAward className="text-xl" /> {mod.hasQuiz ? "Locked" : "No Quiz"}
                        </button>
                      ) : (
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/quiz/module/${mod._id}`)}
                          className="cursor-pointer px-8 py-4 rounded-3xl font-bold text-lg flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-700 text-white shadow-lg hover:shadow-xl">
                          <FiAward className="text-xl" /> Start Quiz
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center items-center gap-3 mt-12">
            <button onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} disabled={currentPage === 1}
              className={`px-5 py-3 rounded-xl font-medium flex items-center gap-2 ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 shadow-md hover:shadow-lg"}`}>
              <FiChevronLeft /> Prev
            </button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-xl font-bold ${currentPage === i + 1 ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg" : "bg-white text-gray-700 shadow hover:shadow-md"}`}>
                  {i + 1}
                </button>
              ))}
            </div>
            <button onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}
              className={`px-5 py-3 rounded-xl font-medium flex items-center gap-2 ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 shadow-md hover:shadow-lg"}`}>
              Next <FiChevronRight />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
