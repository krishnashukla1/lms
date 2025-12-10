
// import { useEffect, useState, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../api/axios";
// import {
//   FiLogOut,
//   FiChevronLeft,
//   FiChevronRight,
//   FiAward,
//   FiBookOpen,
//   FiBarChart2,
//   FiTarget,
//   FiStar,
//   FiUpload,
//   FiFileText,
//   FiCheckCircle,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { useAuth } from "../store/authStore";
// import VideoEmbed from "../components/VideoEmbed";

// export default function StudentDashboard() {
//   const [dashboard, setDashboard] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hasSubmitted, setHasSubmitted] = useState(false); // Track final assignment status

//   const [currentPage, setCurrentPage] = useState(1);
//   const modulesPerPage = 5;
//   const navigate = useNavigate();
//   const logout = useAuth((s) => s.logout);
//   const location = useLocation();
//   const moduleRefs = useRef({});
//   const justCompletedModuleId = location.state?.justCompletedModuleId;

//   useEffect(() => {
//     async function fetchDashboard() {
//       try {
//         const [dashRes, assignRes] = await Promise.all([
//           api.get("/student/dashboard"),
//           api.get("/assignments/assignment-status"), // Your backend must provide this
//         ]);
//         setDashboard(dashRes.data);
//         setHasSubmitted(!!assignRes.data.submitted); // true if already submitted
//       } catch (err) {
//         console.error(err);
//         if (err.response?.status === 401) {
//           navigate("/");
//         } else {
//           toast.error("Failed to load dashboard");
//         }
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchDashboard();
//   }, [navigate]);

//   // Auto-scroll to next module
//   useEffect(() => {
//     if (loading || !dashboard) return;

//     let targetModule = null;
//     if (justCompletedModuleId) {
//       const idx = dashboard.modules.findIndex((m) => m._id === justCompletedModuleId);
//       if (idx !== -1) {
//         targetModule = dashboard.modules.slice(idx + 1).find((m) => m.unlocked && !m.completed);
//       }
//     }

//     if (!targetModule) {
//       const lastCompletedIdx = dashboard.modules.reduce((last, m, i) => (m.completed ? i : last), -1);
//       targetModule = dashboard.modules.slice(lastCompletedIdx + 1).find((m) => m.unlocked && !m.completed);
//     }

//     if (targetModule && moduleRefs.current[targetModule._id]) {
//       moduleRefs.current[targetModule._id]?.scrollIntoView({ behavior: "smooth", block: "center" });
//       moduleRefs.current[targetModule._id]?.classList.add("ring-4", "ring-amber-400", "ring-opacity-70");
//       setTimeout(() => {
//         moduleRefs.current[targetModule._id]?.classList.remove("ring-4", "ring-amber-400", "ring-opacity-70");
//       }, 3000);
//     }

//     if (justCompletedModuleId) {
//       window.history.replaceState({}, document.title);
//     }
//   }, [dashboard, justCompletedModuleId, loading]);

//   // Pagination
//   const indexOfLastModule = currentPage * modulesPerPage;
//   const indexOfFirstModule = indexOfLastModule - modulesPerPage;
//   const currentModules = dashboard?.modules?.slice(indexOfFirstModule, indexOfLastModule) || [];
//   const totalPages = Math.ceil((dashboard?.modules?.length || 0) / modulesPerPage);

//   const handleLogout = () => {
//     logout();
//     toast.success("Logged out successfully!");
//     setTimeout(() => navigate("/", { replace: true }), 800);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//           className="w-16 h-16 border-4 border-t-indigo-600 border-r-transparent border-b-indigo-600 border-l-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   if (!dashboard) return null;

//   const completedModules = dashboard.modules.filter((m) => m.completed).length;
//   const totalModules = dashboard.modules.length;
//   const currentNextModule = dashboard.modules
//     .slice(dashboard.modules.reduce((last, m, i) => (m.completed ? i : last), -1) + 1)
//     .find((m) => m.unlocked && !m.completed);

//   return (
//     <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100">
//       <div className="max-w-7xl mx-auto p-6">

//         {/* Header */}
//         <motion.header initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
//           <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-lg border border-white/20 p-6">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//               <div>
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-3 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-md">
//                     <FiBookOpen className="text-white text-2xl" />
//                   </div>
//                   <div>
//                     <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                       Student Dashboard
//                     </h1>
//                     <p className="text-gray-600">
//                       Welcome back, <span className="font-semibold text-indigo-600">{dashboard.student.name}</span>!
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-3 bg-white/80 backdrop-blur px-4 py-3 rounded-2xl shadow-sm border border-gray-100">
//                   <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
//                     {dashboard.student.name.charAt(0).toUpperCase()}
//                   </div>
//                   <span className="font-medium text-gray-700">{dashboard.student.name}</span>
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleLogout}
//                   className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-rose-500 to-pink-600 text-white rounded-2xl shadow-md hover:shadow-lg font-medium"
//                 >
//                   <FiLogOut /> Logout
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.header>

//         {/* STATS + FINAL ASSIGNMENT – Perfect 3-Column Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           {/* 1. Course Progress */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-xl border border-white/30 p-6 flex flex-col h-full"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-indigo-100 rounded-2xl">
//                 <FiBarChart2 className="text-indigo-600 text-2xl" />
//               </div>
//               <span className="text-3xl font-bold text-indigo-600">{dashboard.progressPercentage}%</span>
//             </div>
//             <h3 className="font-bold text-gray-800 text-lg mb-3">Course Progress</h3>
//             <div className="w-full bg-gray-200/70 rounded-full h-3 overflow-hidden mb-3">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${dashboard.progressPercentage}%` }}
//                 transition={{ duration: 1.5, ease: "easeOut" }}
//                 className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full"
//               />
//             </div>
//             <p className="text-sm text-gray-600 mt-auto">
//               {completedModules} / {totalModules} modules completed
//             </p>
//           </motion.div>

//           {/* 2. Next Module */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="backdrop-blur-xl bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-3xl shadow-xl border border-amber-200/50 p-6 flex flex-col h-full"
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-3 bg-amber-100 rounded-2xl">
//                 <FiTarget className="text-amber-600 text-2xl" />
//               </div>
//               <h3 className="font-bold text-gray-800 text-lg">Next Up</h3>
//             </div>
//             <p className="font-bold text-lg text-gray-800 line-clamp-2 flex-1">
//               {currentNextModule ? currentNextModule.title : "All modules completed!"}
//             </p>
//             <p className="text-sm text-gray-600 mt-2">
//               {currentNextModule ? "Ready to continue" : "Congratulations! Course completed"}
//             </p>
//           </motion.div>

//           {/* 3. Final Assignment – Same Height & Width */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="backdrop-blur-xl bg-linear-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl shadow-xl border border-emerald-300/40 p-6 flex flex-col h-full"
//           >
//             <div className="flex flex-col items-center justify-center flex-1 text-center">
//               <div className="p-4ってる bg-emerald-100 rounded-full mb-4">
//                 <FiFileText className="text-4xl text-emerald-600" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">Final Assignment</h3>
//               <p className="text-sm text-gray-600 mb-6">One-time submission for the course</p>

//               {hasSubmitted ? (
//                 <div className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white font-bold text-lg rounded-3xl shadow-lg">
//                   <FiCheckCircle className="text-2xl" />
//                   Submitted
//                 </div>
//               ) : (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => navigate("/assignment")}
//                   className="inline-flex items-center gap-3 px-8 py-5 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-lg rounded-3xl shadow-xl hover:shadow-emerald-500/50 transition-all"
//                 >
//                   <FiUpload className="text-2xl" />
//                   Submit Assignment
//                 </motion.button>
//               )}
//             </div>
//           </motion.div>
//         </div>

//         {/* SEPARATE FINAL ASSIGNMENT CARD */}


//         {/* Modules Section */}
//         <section className="mb-10">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//               <FiStar className="text-yellow-500" />
//               Your Learning Modules
//             </h2>
//             <span className="text-sm font-medium text-gray-600 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gray-200">
//               Page {currentPage} of {totalPages}
//             </span>
//           </div>

//           <div className="flex flex-col gap-8">
//             {currentModules.map((mod) => {
//               const isNext = currentNextModule?._id === mod._id;
//               const isLocked = !mod.unlocked || (!mod.completed && !isNext);

//               return (
//                 <motion.div
//                   key={mod._id}
//                   ref={(el) => (moduleRefs.current[mod._id] = el)}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   whileHover={{ scale: 1.01 }}
//                   className={`relative overflow-hidden rounded-3xl shadow-xl border-2 transition-all duration-500
//                     ${mod.completed
//                       ? "bg-linear-to-br from-emerald-500/10 to-teal-500/10 border-emerald-400"
//                       : isNext
//                         ? "bg-linear-to-br from-amber-500/20 to-orange-500/20 border-amber-500 shadow-2xl ring-4 ring-amber-300/50"
//                         : "bg-white/80 backdrop-blur border-gray-300 opacity-90"
//                     }`}
//                 >
//                   <div className="absolute top-6 right-6 z-10">
//                     <span className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg
//                       ${mod.completed ? "bg-emerald-500 text-white" : isNext ? "bg-linear-to-r from-amber-500 to-orange-500 text-white animate-pulse" : "bg-gray-500 text-white"}`}>
//                       {mod.completed ? "Completed" : isNext ? "Next Up" : "Locked"}
//                     </span>
//                   </div>

//                   <div className="p-8">
//                     <h3 className={`text-2xl font-bold mb-4 ${isLocked ? "text-gray-500" : "text-gray-800"}`}>
//                       {mod.title}
//                     </h3>
//                     <p className={`text-gray-600 mb-6 text-lg leading-relaxed ${isLocked ? "italic" : ""}`}>
//                       {mod.description}
//                     </p>

//                     {/* {mod.materials.length > 0 && (
//                       <div className="flex flex-wrap gap-3 mb-8">
//                         {mod.materials.map((m, i) => (
//                           <a key={i} href={isLocked ? "#" : m.url} target="_blank" rel="noopener noreferrer"
//                             className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all
//                               ${isLocked ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 hover:shadow-md border border-indigo-200"}`}>
//                             {m.type === "video" && "Video"}
//                             {m.type === "pdf" && "PDF"}
//                             {m.type === "link" && "Link"}
//                           </a>
//                         ))}
//                       </div>
//                     )} */}


//                     {mod.materials.length > 0 && (
//   <div className="space-y-6 mb-8">
//     {mod.materials.map((mat, i) => {
//       const isVideo = mat.type === "video" && (mat.url.includes("youtube") || mat.url.includes("youtu.be") || mat.url.includes("vimeo"));

//       // Locked module → show disabled button
//       if (isLocked) {
//         return (
//           <div key={i} className="flex items-center gap-3 px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl cursor-not-allowed">
//             {mat.type === "video" && "Video"}
//             {mat.type === "pdf" && "PDF"}
//             {mat.type === "link" && "Link"}
//             {mat.title && <span className="font-medium">{mat.title}</span>}
//           </div>
//         );
//       }

//       // Embedded Video
//       if (isVideo) {
//         return (
//           <div key={i} className="space-y-3">
//             {(mat.title || mat.description) && (
//               <h4 className="font-bold text-gray-800 text-lg">
//                 {mat.title || `Video ${i + 1}`}
//               </h4>
//             )}
//             <VideoEmbed url={mat.url} title={mat.title || mod.title} />
//           </div>
//         );
//       }

//       // Regular Links (PDF, external link, etc.)
//       return (
//         <a
//           key={i}
//           href={mat.url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-flex items-center gap-3 px-6 py-4 bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-2xl font-medium hover:shadow-lg border border-indigo-200 transition-all"
//         >
//           {mat.type === "video" && "Video"}
//           {mat.type === "pdf" && "PDF"}
//           {mat.type === "link" && "Link"}
//           {mat.title || `Resource ${i + 1}`}
//         </a>
//       );
//     })}
//   </div>
// )}

//                     <div className="flex justify-end gap-5">
//                       {mod.completed && mod.hasQuiz ? (
//                         <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
//                           onClick={() => navigate(`/quiz/review/${mod._id}`)}
//                           className="px-8 py-4 rounded-3xl font-bold text-lg flex items-center gap-3 bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-lg hover:shadow-xl">
//                           <FiBookOpen className="text-xl" /> Review Quiz
//                         </motion.button>
//                       ) : isLocked || !mod.hasQuiz ? (
//                         <button disabled className="px-8 py-4 rounded-3xl font-bold text-lg bg-gray-300 text-gray-500 cursor-not-allowed flex items-center gap-3">
//                           <FiAward className="text-xl" /> {mod.hasQuiz ? "Locked" : "No Quiz"}
//                         </button>
//                       ) : (
//                         <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
//                           onClick={() => navigate(`/quiz/module/${mod._id}`)}
//                           className="px-8 py-4 rounded-3xl font-bold text-lg flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-700 text-white shadow-lg hover:shadow-xl">
//                           <FiAward className="text-xl" /> Start Quiz
//                         </motion.button>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </section>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center items-center gap-3 mt-12">
//             <button onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} disabled={currentPage === 1}
//               className={`px-5 py-3 rounded-xl font-medium flex items-center gap-2 ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 shadow-md hover:shadow-lg"}`}>
//               <FiChevronLeft /> Prev
//             </button>
//             <div className="flex gap-2">
//               {[...Array(totalPages)].map((_, i) => (
//                 <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
//                   className={`w-12 h-12 rounded-xl font-bold ${currentPage === i + 1 ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg" : "bg-white text-gray-700 shadow hover:shadow-md"}`}>
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//             <button onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}
//               className={`px-5 py-3 rounded-xl font-medium flex items-center gap-2 ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 shadow-md hover:shadow-lg"}`}>
//               Next <FiChevronRight />
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }



//================correct===========

// import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiArrowLeft, FiAward, FiBookOpen } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import VideoEmbed from "../components/VideoEmbed";

// export default function ModuleQuiz() {
//   const { courseType } = useParams(); // "basic" | "intermediate" | "advanced"
//   const navigate = useNavigate();
//   const [modules, setModules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [courseName, setCourseName] = useState("");
//   const moduleRefs = useRef({});

//   const courseDisplayNames = {
//     basic: "Course Basic",
//     intermediate: "Course Intermediate",
//     advanced: "Course Advanced",
//   };

//   const courseColors = {
//     basic: "from-blue-500 to-indigo-600",
//     intermediate: "from-purple-500 to-pink-600",
//     advanced: "from-amber-500 to-red-600",
//   };

//   useEffect(() => {
//     if (!courseType || !courseDisplayNames[courseType]) {
//       toast.error("Invalid course");
//       navigate("/student");
//       return;
//     }

//     async function fetchCourseModules() {
//       try {
//         const res = await api.get("/student/dashboard");
//         const allModules = res.data.modules || [];

//         const filtered = allModules.filter(
//           (m) => (m.courseType || "basic") === courseType
//         );

//         setModules(filtered);
//         setCourseName(courseDisplayNames[courseType]);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load course modules");
//         navigate("/student");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCourseModules();
//   }, [courseType, navigate]);

//   // Find next unlocked module
//   const nextModule = modules
//     .slice(modules.reduce((last, m, i) => (m.completed ? i : last), -1) + 1)
//     .find((m) => m.unlocked && !m.completed);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100 flex items-center justify-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//           className="w-16 h-16 border-4 border-t-indigo-600 border-r-transparent border-b-indigo-600 border-l-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100">
//       <div className="max-w-6xl mx-auto p-6 py-12">

//         {/* Back Button + Course Title */}
//         <div className="mb-10 flex items-center justify-between">
//           <button
//             onClick={() => navigate("/student")}
//             className="flex items-center gap-3 text-indigo-600 hover:text-indigo-800 font-semibold text-lg transition-colors"
//           >
//                         <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//  Back to Dashboard
//           </button>



//           <h1 className="text-5xl font-bold bg-linear-to-r bg-clip-text text-transparent"
//             style={{ backgroundImage: `linear-gradient(to right, ${courseColors[courseType]})` }}>
//             {courseName}
//           </h1>

//           <div className="w-32" /> {/* Spacer */}
//         </div>

//         <p className="text-center text-xl text-gray-600 mb-12">
//           {modules.length} modules • Complete them in sequence
//         </p>

//         {/* Modules List */}
//         <div className="space-y-12">
//           {modules.map((mod, index) => {
//             const isCompleted = mod.completed;
//             const isNext = nextModule?._id === mod._id;
//             const isLocked = !mod.unlocked;

//             return (
//               <motion.div
//                 key={mod._id}
//                 ref={(el) => (moduleRefs.current[mod._id] = el)}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 transition-all duration-500
//                   ${isCompleted
//                     ? "bg-linear-to-br from-emerald-500/10 to-teal-500/10 border-emerald-400"
//                     : isNext
//                     ? "bg-linear-to-br from-amber-500/20 to-orange-500/20 border-amber-500 ring-4 ring-amber-300/50 shadow-amber-500/20"
//                     : "bg-white/80 backdrop-blur border-gray-300"
//                   }`}
//               >
//                 {/* Status Badge */}
//                 <div className="absolute top-6 right-6 z-10">
//                   <span
//                     className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg
//                       ${isCompleted
//                         ? "bg-emerald-500 text-white"
//                         : isNext
//                         ? "bg-linear-to-r from-amber-500 to-orange-500 text-white animate-pulse"
//                         : "bg-gray-500 text-white"
//                       }`}
//                   >
//                     {isCompleted ? "Completed" : isNext ? "Next Up" : "Locked"}
//                   </span>
//                 </div>

//                 <div className="p-10">
//                   <h3 className="text-3xl font-bold text-gray-800 mb-4">
//                     Module {index + 1}: {mod.title}
//                   </h3>
//                   <p className="text-gray-600 text-lg leading-relaxed mb-8">
//                     {mod.description}
//                   </p>

//                   {/* Materials */}
//                   {mod.materials.length > 0 && (
//                     <div className="space-y-6 mb-10">
//                       {mod.materials.map((mat, i) => {
//                         const isVideo =
//                           mat.type === "video" &&
//                           (mat.url.includes("youtube") ||
//                             mat.url.includes("youtu.be") ||
//                             mat.url.includes("vimeo"));

//                         if (isLocked) {
//                           return (
//                             <div
//                               key={i}
//                               className="flex items-center gap-3 px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl"
//                             >
//                               {mat.type === "video" && "Video"}
//                               {mat.type === "pdf" && "PDF"}
//                               {mat.type === "link" && "Link"}
//                               {mat.title && <span>{mat.title}</span>}
//                             </div>
//                           );
//                         }

//                         if (isVideo) {
//                           return (
//                             <div key={i} className="space-y-3">
//                               {mat.title && (
//                                 <h4 className="font-bold text-gray-800 text-xl">
//                                   {mat.title}
//                                 </h4>
//                               )}
//                               <VideoEmbed url={mat.url} title={mat.title || mod.title} />
//                             </div>
//                           );
//                         }

//                         return (
//                           <a
//                             key={i}
//                             href={mat.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-3 px-6 py-4 bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-2xl font-medium hover:shadow-lg border border-indigo-200 transition-all"
//                           >
//                             {mat.type === "video" && "Video"}
//                             {mat.type === "pdf" && "PDF"}
//                             {mat.type === "link" && "Link"}
//                             {mat.title || `Resource ${i + 1}`}
//                           </a>
//                         );
//                       })}
//                     </div>
//                   )}

//                   {/* Quiz Button */}
//                   <div className="flex justify-end">
//                     {isCompleted && mod.hasQuiz ? (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => navigate(`/quiz/review/${mod._id}`)}
//                         className="px-10 py-5 rounded-3xl font-bold text-xl flex items-center gap-3 bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-xl"
//                       >
//                         <FiBookOpen /> Review Quiz
//                       </motion.button>
//                     ) : isLocked || !mod.hasQuiz ? (
//                       <button
//                         disabled
//                         className="px-10 py-5 rounded-3xl font-bold text-xl bg-gray-300 text-gray-500 cursor-not-allowed flex items-center gap-3"
//                       >
//                         <FiAward /> {mod.hasQuiz ? "Locked" : "No Quiz"}
//                       </button>
//                     ) : (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => navigate(`/quiz/module/${mod._id}`)}
//                         className="px-10 py-5 rounded-3xl font-bold text-xl flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-700 text-white shadow-xl hover:shadow-2xl"
//                       >
//                         <FiAward /> Start Quiz
//                       </motion.button>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {modules.length === 0 && (
//           <div className="text-center py-20">
//             <p className="text-2xl text-gray-600">No modules available for this course yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//=========

// import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import {
//   FiArrowLeft,
//   FiAward,
//   FiBookOpen,
//   FiBarChart2,
//   FiTarget,
//   FiFileText,
//   FiCheckCircle,
//   FiUpload,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import VideoEmbed from "../components/VideoEmbed";

// export default function ModuleQuiz() {
//   const { courseType } = useParams();
//   const navigate = useNavigate();
//   const [modules, setModules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [courseName, setCourseName] = useState("");
//   const [dashboard, setDashboard] = useState(null); // Full dashboard data
//   const [hasSubmitted, setHasSubmitted] = useState(false);
//   const moduleRefs = useRef({});

//   const courseDisplayNames = {
//     basic: "Course Basic",
//     intermediate: "Course Intermediate",
//     advanced: "Course Advanced",
//   };

//   const courseColors = {
//     basic: "from-blue-500 to-indigo-600",
//     intermediate: "from-purple-500 to-pink-600",
//     advanced: "from-amber-500 to-red-600",
//   };

//   useEffect(() => {
//     if (!courseType || !courseDisplayNames[courseType]) {
//       toast.error("Invalid course");
//       navigate("/student");
//       return;
//     }

//     async function fetchData() {
//       try {
//         const [dashRes, assignRes] = await Promise.all([
//           api.get("/student/dashboard"),
//           api.get("/assignments/assignment-status"),
//         ]);

//         const allModules = dashRes.data.modules || [];
//         const filtered = allModules.filter(
//           (m) => (m.courseType || "basic") === courseType
//         );

//         setModules(filtered);
//         setCourseName(courseDisplayNames[courseType]);
//         setDashboard(dashRes.data);
//         setHasSubmitted(!!assignRes.data.submitted);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load data");
//         navigate("/student");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [courseType, navigate]);

//   if (loading || !dashboard) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100 flex items-center justify-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//           className="w-16 h-16 border-4 border-t-indigo-600 border-r-transparent border-b-indigo-600 border-l-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   const completedModules = dashboard.modules.filter((m) => m.completed).length;
//   const totalModules = dashboard.modules.length;

//   const nextModuleGlobal = dashboard.modules
//     .slice(dashboard.modules.reduce((last, m, i) => (m.completed ? i : last), -1) + 1)
//     .find((m) => m.unlocked && !m.completed);

//   const nextModuleInCourse = modules
//     .slice(modules.reduce((last, m, i) => (m.completed ? i : last), -1) + 1)
//     .find((m) => m.unlocked && !m.completed);

//   return (
//     <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100">
//       <div className="max-w-7xl mx-auto p-6 py-12">

//         {/* Back Button + Course Title */}
//         <div className="mb-10 flex items-center justify-between">
//           <button
//             onClick={() => navigate("/student")}
//             className="flex items-center gap-3 text-indigo-600 hover:text-indigo-800 font-semibold text-lg transition-colors group"
//           >
//             <FiArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Dashboard
//           </button>

//           <h1
//             className="text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r"
//             style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, "--tw-gradient-stops": courseColors[courseType] }}
//           >
//             {courseName}
//           </h1>

//           <div className="w-32" />
//         </div>

//         {/* TOP STATS CARDS – EXACTLY LIKE DASHBOARD */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//           {/* 1. Overall Progress */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/30 p-8"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <div className="p-4 bg-indigo-100 rounded-3xl">
//                 <FiBarChart2 className="text-indigo-600 text-3xl" />
//               </div>
//               <span className="text-5xl font-bold text-indigo-600">
//                 {dashboard.progressPercentage}%
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">Overall Progress</h3>
//             <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${dashboard.progressPercentage}%` }}
//                 className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full"
//               />
//             </div>
//             <p className="text-gray-600 mt-4">
//               {completedModules} of {totalModules} modules completed
//             </p>
//           </motion.div>

//           {/* 2. Next Up */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="backdrop-blur-xl bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-3xl shadow-2xl border border-amber-300 p-8"
//           >
//             <div className="flex items-center gap-4 mb-6">
//               <div className="p-4 bg-amber-100 rounded-3xl">
//                 <FiTarget className="text-amber-600 text-3xl" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800">Next Up</h3>
//             </div>
//             <p className="text-2xl font-bold text-gray-800">
//               {nextModuleGlobal ? nextModuleGlobal.title : "All modules completed!"}
//             </p>
//             <p className="text-gray-600 mt-3">
//               {nextModuleGlobal
//                 ? "Ready to continue your journey"
//                 : "Congratulations! You've completed everything"}
//             </p>
//           </motion.div>

//           {/* 3. Final Assignment */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="backdrop-blur-xl bg-linear-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl shadow-2xl border border-emerald-300 p-8 text-center"
//           >
//             <div className="p-6 bg-emerald-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
//               <FiFileText className="text-emerald-600 text-5xl" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-3">Final Assignment</h3>
//             <p className="text-gray-600 mb-8">One-time submission to complete the course</p>
//             {hasSubmitted ? (
//               <div className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 text-white font-bold text-xl rounded-3xl shadow-xl">
//                 <FiCheckCircle className="text-3xl" /> Submitted
//               </div>
//             ) : (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate("/assignment")}
//                 className="inline-flex items-center gap-4 px-10 py-6 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-emerald-500/50"
//               >
//                 <FiUpload className="text-3xl" /> Submit Assignment
//               </motion.button>
//             )}
//           </motion.div>
//         </div>

//         {/* Course Modules */}
//         <p className="text-center text-xl text-gray-600 mb-12">
//           {modules.length} modules in this course • Complete in sequence
//         </p>

//         <div className="space-y-12">
//           {modules.map((mod, index) => {
//             const isCompleted = mod.completed;
//             const isNext = nextModuleInCourse?._id === mod._id;
//             const isLocked = !mod.unlocked;

//             return (
//               <motion.div
//                 key={mod._id}
//                 ref={(el) => (moduleRefs.current[mod._id] = el)}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 transition-all duration-500
//                   ${isCompleted
//                     ? "bg-linear-to-br from-emerald-500/10 to-teal-500/10 border-emerald-400"
//                     : isNext
//                     ? "bg-linear-to-br from-amber-500/20 to-orange-500/20 border-amber-500 ring-4 ring-amber-300/50 shadow-amber-500/20"
//                     : "bg-white/80 backdrop-blur border-gray-300"
//                   }`}
//               >
//                 <div className="absolute top-6 right-6 z-10">
//                   <span
//                     className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg
//                       ${isCompleted
//                         ? "bg-emerald-500 text-white"
//                         : isNext
//                         ? "bg-linear-to-r from-amber-500 to-orange-500 text-white animate-pulse"
//                         : "bg-gray-500 text-white"
//                       }`}
//                   >
//                     {isCompleted ? "Completed" : isNext ? "Next Up" : "Locked"}
//                   </span>
//                 </div>

//                 <div className="p-10">
//                   <h3 className="text-3xl font-bold text-gray-800 mb-4">
//                     Module {index + 1}: {mod.title}
//                   </h3>
//                   <p className="text-gray-600 text-lg leading-relaxed mb-8">{mod.description}</p>

//                   {/* Materials */}
//                   {mod.materials.length > 0 && (
//                     <div className="space-y-6 mb-10">
//                       {mod.materials.map((mat, i) => {
//                         const isVideo =
//                           mat.type === "video" &&
//                           (mat.url.includes("youtube") || mat.url.includes("youtu.be") || mat.url.includes("vimeo"));

//                         if (isLocked) {
//                           return (
//                             <div key={i} className="flex items-center gap-3 px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl">
//                               {mat.type === "video" && "Video"}
//                               {mat.type === "pdf" && "PDF"}
//                               {mat.type === "link" && "Link"}
//                               {mat.title && <span>{mat.title}</span>}
//                             </div>
//                           );
//                         }

//                         if (isVideo) {
//                           return (
//                             <div key={i} className="space-y-3">
//                               {mat.title && <h4 className="font-bold text-gray-800 text-xl">{mat.title}</h4>}
//                               <VideoEmbed url={mat.url} title={mat.title || mod.title} />
//                             </div>
//                           );
//                         }

//                         return (
//                           <a
//                             key={i}
//                             href={mat.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-3 px-6 py-4 bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-2xl font-medium hover:shadow-lg border border-indigo-200 transition-all"
//                           >
//                             {mat.type === "video" && "Video"}
//                             {mat.type === "pdf" && "PDF"}
//                             {mat.type === "link" && "Link"}
//                             {mat.title || `Resource ${i + 1}`}
//                           </a>
//                         );
//                       })}
//                     </div>
//                   )}

//                   {/* Quiz Button */}
//                   <div className="flex justify-end">
//                     {isCompleted && mod.hasQuiz ? (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => navigate(`/quiz/review/${mod._id}`)}
//                         className="px-10 py-5 rounded-3xl font-bold text-xl flex items-center gap-3 bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-xl"
//                       >
//                         <FiBookOpen /> Review Quiz
//                       </motion.button>
//                     ) : isLocked || !mod.hasQuiz ? (
//                       <button
//                         disabled
//                         className="px-10 py-5 rounded-3xl font-bold text-xl bg-gray-300 text-gray-500 cursor-not-allowed flex items-center gap-3"
//                       >
//                         <FiAward /> {mod.hasQuiz ? "Locked" : "No Quiz"}
//                       </button>
//                     ) : (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => navigate(`/quiz/module/${mod._id}`)}
//                         className="px-10 py-5 rounded-3xl font-bold text-xl flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-700 text-white shadow-xl hover:shadow-2xl"
//                       >
//                         <FiAward /> Start Quiz
//                       </motion.button>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {modules.length === 0 && (
//           <div className="text-center py-20">
//             <p className="text-2xl text-gray-600">No modules available for this course yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//===========correct================

// import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import {
//   FiArrowLeft,
//   FiAward,
//   FiBookOpen,
//   FiBarChart2,
//   FiTarget,
//   FiFileText,
//   FiCheckCircle,
//   FiUpload,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import VideoEmbed from "../components/VideoEmbed";

// export default function ModuleQuiz() {
//   const { courseType } = useParams();
//   const navigate = useNavigate();
//   const [modules, setModules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [courseName, setCourseName] = useState("");
//   const [hasSubmitted, setHasSubmitted] = useState(false);
//   const moduleRefs = useRef({}); // Added missing ref

//   const courseDisplayNames = {
//     basic: "Course Basic",
//     intermediate: "Course Intermediate",
//     advanced: "Course Advanced",
//   };

//   const courseColors = {
//     basic: "from-blue-500 to-indigo-600",
//     intermediate: "from-purple-500 to-pink-600",
//     advanced: "from-amber-500 to-red-600",
//   };

//   useEffect(() => {
//     if (!courseType || !courseDisplayNames[courseType]) {
//       toast.error("Invalid course");
//       navigate("/student");
//       return;
//     }

//     async function fetchData() {
//       try {
//         const [dashRes, assignRes] = await Promise.all([
//           api.get("/student/dashboard"),
//           api.get("/assignments/assignment-status"),
//         ]);

//         const allModules = dashRes.data.modules || [];
//         const filtered = allModules.filter(
//           (m) => (m.courseType || "basic") === courseType
//         );

//         setModules(filtered);
//         setCourseName(courseDisplayNames[courseType]);

//         // Check submission status for this specific course
//         const submissionForThisCourse = assignRes.data.submissions?.find(
//           (sub) => sub.courseType === courseType
//         );
//         setHasSubmitted(!!submissionForThisCourse?.submitted);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load course");
//         navigate("/student");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, [courseType, navigate]);

//   // Calculate progress
//   const completedInCourse = modules.filter((m) => m.completed).length;
//   const totalInCourse = modules.length;
//   const courseProgressPercentage =
//     totalInCourse > 0 ? Math.round((completedInCourse / totalInCourse) * 100) : 0;

//   // Determine next module correctly
//   const lastCompletedIndex = modules.reduce((last, m, i) => (m.completed ? i : last), -1);
//   const nextModuleInCourse = modules.find((m, i) => i === lastCompletedIndex + 1 && m.unlocked);
//   const firstUnlocked = modules.find((m) => m.unlocked);

//   // Course completion status
//   const isCourseActuallyCompleted = completedInCourse === totalInCourse && totalInCourse > 0;

//   const nextUpTitle = () => {
//     if (isCourseActuallyCompleted) return "Course Completed!";
//     if (nextModuleInCourse) return nextModuleInCourse.title;
//     if (firstUnlocked) return firstUnlocked.title;
//     return "No modules available";
//   };

//   const nextUpSubtitle = () => {
//     if (isCourseActuallyCompleted) return "Great job! You've finished this course";
//     if (nextModuleInCourse || firstUnlocked) return "Ready to continue your learning";
//     return "Check back later for new content";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100 flex items-center justify-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//           className="w-16 h-16 border-4 border-t-indigo-600 border-r-transparent border-b-indigo-600 border-l-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100">
//       <div className="max-w-7xl mx-auto p-6 py-12">
//         {/* Header */}
//         <div className="mb-10 flex items-center justify-between">
//           <button
//             onClick={() => navigate("/student")}
//             className="flex items-center gap-3 text-indigo-600 hover:text-indigo-800 font-semibold text-lg transition-colors group"
//           >
//             <FiArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Dashboard
//           </button>
//           <h1
//             className="text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r"
//             style={{
//               backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
//               "--tw-gradient-stops": courseColors[courseType] || "from-blue-500 to-indigo-600",
//             }}
//           >
//             {courseName}
//           </h1>
//           <div className="w-32" />
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//           {/* Progress Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/30 p-8"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <div className="p-4 bg-indigo-100 rounded-3xl">
//                 <FiBarChart2 className="text-indigo-600 text-3xl" />
//               </div>
//               <span className="text-5xl font-bold text-indigo-600">
//                 {courseProgressPercentage}%
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">{courseName} Progress</h3>
//             <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${courseProgressPercentage}%` }}
//                 transition={{ duration: 1, ease: "easeOut" }}
//                 className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full"
//               />
//             </div>
//             <p className="text-gray-600 mt-4">
//               {completedInCourse} of {totalInCourse} modules completed
//             </p>
//           </motion.div>

//           {/* Next Up Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="backdrop-blur-xl bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-3xl shadow-2xl border border-amber-300 p-8"
//           >
//             <div className="flex items-center gap-4 mb-6">
//               <div className="p-4 bg-amber-100 rounded-3xl">
//                 <FiTarget className="text-amber-600 text-3xl" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800">Next Up</h3>
//             </div>
//             <p className="text-2xl font-bold text-gray-800">{nextUpTitle()}</p>
//             <p className="text-gray-600 mt-3">{nextUpSubtitle()}</p>
//           </motion.div>

//           {/* Final Assignment Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="backdrop-blur-xl bg-linear-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl shadow-2xl border border-emerald-300 p-8 text-center"
//           >
//             <div className="p-6 bg-emerald-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
//               <FiFileText className="text-emerald-600 text-5xl" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-3">Final Assignment</h3>
//             <p className="text-gray-600 mb-8">One-time submission to complete the course</p>

//             {hasSubmitted ? (
//               <div className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 text-white font-bold text-xl rounded-3xl shadow-xl">
//                 <FiCheckCircle className="text-3xl" /> Submitted
//               </div>
//             ) : (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate("/assignment")}
//                 className="inline-flex items-center gap-4 px-10 py-6 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-emerald-500/50 transition-shadow"
//               >
//                 <FiUpload className="text-3xl" /> Submit Assignment
//               </motion.button>
//             )}
//           </motion.div>
//         </div>

//         {/* Modules Title */}
//         <p className="text-center text-xl text-gray-600 mb-12">
//           {totalInCourse} modules in this course • Complete in sequence
//         </p>

//         {/* Modules List */}
//         <div className="space-y-12">
//           {modules.map((mod, index) => {
//             const isCompleted = mod.completed;
//             const isNext = nextModuleInCourse?._id === mod._id;
//             const isLocked = !mod.unlocked;

//             return (
//               <motion.div
//                 key={mod._id}
//                 ref={(el) => (moduleRefs.current[mod._id] = el)}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 transition-all duration-500
//                   ${isCompleted
//                     ? "bg-linear-to-br from-emerald-500/10 to-teal-500/10 border-emerald-400"
//                     : isNext
//                     ? "bg-linear-to-br from-amber-500/20 to-orange-500/20 border-amber-500 ring-4 ring-amber-300/50"
//                     : "bg-white/80 backdrop-blur border-gray-300"
//                   }`}
//               >
//                 <div className="absolute top-6 right-6 z-10">
//                   <span
//                     className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg
//                       ${isCompleted
//                         ? "bg-emerald-500 text-white"
//                         : isNext
//                         ? "bg-linear-to-r from-amber-500 to-orange-500 text-white animate-pulse"
//                         : "bg-gray-500 text-white"
//                       }`}
//                   >
//                     {isCompleted ? "Completed" : isNext ? "Next Up" : "Locked"}
//                   </span>
//                 </div>

//                 <div className="p-10">
//                   <h3 className="text-3xl font-bold text-gray-800 mb-4">
//                     Module {index + 1}: {mod.title}
//                   </h3>
//                   <p className="text-gray-600 text-lg leading-relaxed mb-8">{mod.description}</p>

//                   {/* Materials */}
//                   {mod.materials.length > 0 && (
//                     <div className="space-y-6 mb-10">
//                       {mod.materials.map((mat, i) => {
//                         const isVideo =
//                           mat.type === "video" &&
//                           (mat.url.includes("youtube") || mat.url.includes("youtu.be") || mat.url.includes("vimeo"));

//                         if (isLocked) {
//                           return (
//                             <div
//                               key={i}
//                               className="flex items-center gap-3 px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl"
//                             >
//                               <span>
//                                 {mat.type === "video" && "Video"}
//                                 {mat.type === "pdf" && "PDF"}
//                                 {mat.type === "link" && "Link"} {mat.title && `• ${mat.title}`}
//                               </span>
//                             </div>
//                           );
//                         }

//                         if (isVideo) {
//                           return (
//                             <div key={i} className="space-y-3">
//                               {mat.title && (
//                                 <h4 className="font-bold text-gray-800 text-xl">{mat.title}</h4>
//                               )}
//                               <VideoEmbed url={mat.url} title={mat.title || mod.title} />
//                             </div>
//                           );
//                         }

//                         return (
//                           <a
//                             key={i}
//                             href={mat.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-3 px-6 py-4 bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-2xl font-medium hover:shadow-lg border border-indigo-200 transition-all"
//                           >
//                             {mat.type === "video" && "Video"}
//                             {mat.type === "pdf" && "PDF"}
//                             {mat.type === "link" && "Link"}
//                             {" "}
//                             {mat.title || `Resource ${i + 1}`}
//                           </a>
//                         );
//                       })}
//                     </div>
//                   )}

//                   {/* Quiz Button */}
//                   <div className="flex justify-end">
//                     {isCompleted && mod.hasQuiz ? (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => navigate(`/quiz/review/${mod._id}`)}
//                         className="px-10 py-5 rounded-3xl font-bold text-xl flex items-center gap-3 bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-xl"
//                       >
//                         <FiBookOpen /> Review Quiz
//                       </motion.button>
//                     ) : isLocked || !mod.hasQuiz ? (
//                       <button
//                         disabled
//                         className="px-10 py-5 rounded-3xl font-bold text-xl bg-gray-300 text-gray-500 cursor-not-allowed flex items-center gap-3"
//                       >
//                         <FiAward /> {mod.hasQuiz ? "Locked" : "No Quiz"}
//                       </button>
//                     ) : (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => navigate(`/quiz/module/${mod._id}`)}
//                         className="px-10 py-5 rounded-3xl font-bold text-xl flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-700 text-white shadow-xl hover:shadow-2xl"
//                       >
//                         <FiAward /> Start Quiz
//                       </motion.button>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Empty State */}
//         {modules.length === 0 && (
//           <div className="text-center py-20">
//             <p className="text-2xl text-gray-600">No modules available for this course yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//=============kp===============
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { toast } from "react-toastify";
// import { FiArrowLeft, FiLock, FiCheckCircle, FiBookOpen } from "react-icons/fi";
// import VideoEmbed from "../components/VideoEmbed";

// export default function ModuleQuiz() {
//   const { courseType } = useParams();
//   const navigate = useNavigate();
//   const [modules, setModules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hasSubmitted, setHasSubmitted] = useState(false);

//   const courseNames = {
//     basic: "Basic Course",
//     intermediate: "Intermediate Course",
//     advanced: "Advanced Course",
//   };

//   useEffect(() => {
//     if (!courseType || !courseNames[courseType]) {
//       toast.error("Invalid course");
//       navigate("/student");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const [dashRes, statusRes] = await Promise.all([
//           api.get("/student/dashboard"),
//           api.get("/finalAssignments/assignment-status")
//         ]);

//         const filtered = dashRes.data.modules.filter(m => m.courseType === courseType);
//         setModules(filtered);
//         setHasSubmitted(statusRes.data.submitted);
//       } catch (err) {
//         toast.error("Failed to load course");
//         navigate("/student");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [courseType, navigate]);

//   const completedCount = modules.filter(m => m.completed).length;
//   const nextModule = modules.find(m => m.unlocked && !m.completed);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-10">
//           <button onClick={() => navigate("/student")} className="flex items-center gap-3 text-indigo-700 font-bold">
//             <FiArrowLeft size={24} /> Back to Dashboard
//           </button>
//           <h1 className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-700">
//             {courseNames[courseType]}
//           </h1>
//           <div />
//         </div>

//         {/* Progress */}
//         <div className="text-center mb-12">
//           <p className="text-2xl font-bold">{completedCount} / {modules.length} Modules Completed</p>
//           <div className="w-full max-w-2xl mx-auto bg-gray-200 rounded-full h-4 mt-4">
//             <div
//               className="bg-linear-to-r from-indigo-600 to-purple-700 h-4 rounded-full transition-all duration-1000"
//               style={{ width: `${(completedCount / modules.length) * 100 || 0}%` }}
//             />
//           </div>
//         </div>

//         {/* Modules */}
//         <div className="space-y-8">
//           {modules.map((mod, i) => {
//             const isLocked = !mod.unlocked;
//             const isNext = nextModule?._id === mod._id;

//             return (
//               <div
//                 key={mod._id}
//                 className={`bg-white rounded-3xl shadow-2xl p-10 border-4 transition-all ${
//                   mod.completed ? "border-green-500" : isNext ? "border-yellow-500 ring-4 ring-yellow-200" : "border-gray-200"
//                 }`}
//               >
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-3xl font-bold">Module {i + 1}: {mod.title}</h2>
//                   {mod.completed ? <FiCheckCircle className="text-green-600" size={40} /> : isLocked ? <FiLock className="text-gray-400" size={40} /> : null}
//                 </div>

//                 <p className="text-gray-700 mb-8 text-lg">{mod.description}</p>

//                 {/* Materials */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   {mod.materials?.map((mat, j) => (
//                     <div key={j} className="bg-gray-50 rounded-2xl p-6">
//                       {mat.type === "video" ? (
//                         <VideoEmbed url={mat.url} />
//                       ) : (
//                         <a href={mat.url} target="_blank" className="text-blue-600 hover:underline flex items-center gap-2">
//                           <FiBookOpen /> Open {mat.type.toUpperCase()}
//                         </a>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Quiz Button */}
//                 <div className="text-right">
//                   {mod.completed ? (
//                     <button onClick={() => navigate(`/quiz/review/${mod._id}`)} className="bg-blue-600 text-white px-8 py-4 rounded-xl">
//                       Review Quiz
//                     </button>
//                   ) : isLocked ? (
//                     <button disabled className="bg-gray-300 text-gray-500 px-8 py-4 rounded-xl">Locked</button>
//                   ) : (
//                     <button onClick={() => navigate(`/quiz/module/${mod._id}`)} className="bg-linear-to-r from-indigo-600 to-purple-700 text-white px-10 py-5 rounded-xl text-xl font-bold">
//                       Start Quiz
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Final Assignment */}
//         <div className="mt-16 text-center">
//           {hasSubmitted ? (
//             <div className="text-6xl">Checkmark</div>
//           ) : (
//             <button onClick={() => navigate("/assignment")} className="bg-linear-to-r from-green-600 to-teal-600 text-white px-12 py-6 rounded-2xl text-2xl font-bold">
//               Submit Final Assignment
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//============11 pm 6 dec========

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { toast } from "react-toastify";
// import { FiArrowLeft, FiLock, FiCheckCircle, FiBookOpen, FiAward } from "react-icons/fi";
// import VideoEmbed from "../components/VideoEmbed";

// export default function ModuleQuiz() {
//   const { courseType } = useParams();
//   const navigate = useNavigate();
//   const [modules, setModules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

//   const courseNames = {
//     basic: "Basic Course",
//     intermediate: "Intermediate Course",
//     advanced: "Advanced Course",
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [dashRes, statusRes] = await Promise.all([
//           api.get("/student/dashboard"),
//           api.get("/finalAssignments/assignment-status")
//         ]);

//         const filtered = dashRes.data.modules.filter(m => m.courseType === courseType);
//         setModules(filtered);
//         setAssignmentSubmitted(statusRes.data.submitted);
//       } catch (err) {
//         toast.error("Failed to load course");
//         navigate("/student");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [courseType, navigate]);

//   const completedCount = modules.filter(m => m.completed).length;
//   const nextModule = modules.find(m => m.unlocked && !m.completed);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
//         <div className="w-20 h-20 border-8 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <button
//           onClick={() => navigate("/student")}
//           className="mb-12 flex items-center gap-4 text-indigo-700 font-bold text-xl"
//         >
//           <FiArrowLeft size={32} /> Back to Dashboard
//         </button>

//         <h1 className="text-7xl font-black text-center mb-16 bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
//           {courseNames[courseType]}
//         </h1>

//         <div className="text-center mb-12">
//           <p className="text-3xl font-bold">{completedCount} / {modules.length} Modules Completed</p>
//           <div className="w-full max-w-3xl mx-auto bg-gray-200 rounded-full h-6 mt-6">
//             <div
//               className="bg-linear-to-r from-indigo-600 to-purple-700 h-6 rounded-full transition-all duration-1000"
//               style={{ width: `${(completedCount / modules.length) * 100 || 0}%` }}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {modules.map((mod, i) => {
//             const isLocked = !mod.unlocked;
//             const isNext = nextModule?._id === mod._id;

//             return (
//               <motion.div
//                 key={mod._id}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 whileHover={mod.unlocked ? { scale: 1.05, y: -10 } : {}}
//                 className={`bg-white rounded-3xl shadow-2xl p-10 border-4 transition-all
//                   ${mod.completed ? "border-emerald-500" : 
//                     isNext ? "border-amber-500 ring-4 ring-amber-200" : 
//                     "border-gray-300"}`}
//               >
//                 <div className="text-center">
//                   <div className="text-6xl font-black text-indigo-700 mb-6">#{i + 1}</div>
//                   <h2 className="text-3xl font-bold mb-4">{mod.title}</h2>
//                   <p className="text-gray-600 mb-10">{mod.description}</p>

//                   {/* Materials Preview */}
//                   {mod.materials?.[0] && mod.materials[0].type === "video" && (
//                     <div className="mb-8">
//                       <VideoEmbed url={mod.materials[0].url} />
//                     </div>
//                   )}

//                   {/* Quiz Button */}
//                   {mod.completed ? (
//                     <button
//                       onClick={() => navigate(`/quiz/review/${mod._id}`)}
//                       className="w-full bg-linear-to-r from-blue-600 to-cyan-600 text-white py-6 rounded-2xl text-2xl font-bold"
//                     >
//                       <FiBookOpen className="inline mr-3" size={32} />
//                       Review Quiz
//                     </button>
//                   ) : isLocked ? (
//                     <button disabled className="w-full bg-gray-300 text-gray-600 py-6 rounded-2xl text-2xl font-bold cursor-not-allowed">
//                       <FiLock className="inline mr-3" size={32} />
//                       Locked
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => navigate(`/quiz/module/${mod._id}`)}
//                       className="w-full bg-linear-to-r from-emerald-500 to-teal-600 text-white py-6 rounded-2xl text-2xl font-bold animate-pulse"
//                     >
//                       <FiAward className="inline mr-3" size={32} />
//                       Start Quiz
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Final Assignment */}
//         <div className="text-center mt-20">
//           {assignmentSubmitted ? (
//             <div className="text-8xl text-emerald-600">Checkmark</div>
//           ) : (
//             <button
//               onClick={() => navigate("/assignment")}
//               className="bg-linear-to-r from-emerald-600 to-teal-600 text-white px-20 py-10 rounded-3xl text-3xl font-bold shadow-2xl"
//             >
//               Submit Final Assignment
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//==

// src/pages/QuizPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { FiArrowLeft } from "react-icons/fi";

export default function QuizPage() {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const finalModuleId = moduleId || id;

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    if (!finalModuleId) {
      setFeedback({ type: "error", message: "Invalid module ID" });
      setLoading(false);
      return;
    }
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await api.get(`/quiz/by-module/${finalModuleId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const quizData = res.data?.quiz || res.data[0] || res.data;
        if (!quizData || !quizData.questions?.length) {
          setFeedback({ type: "error", message: "No quiz found for this module" });
          return;
        }

        setQuiz(quizData);
        setAnswers(new Array(quizData.questions.length).fill(null));
      } catch (err) {
        const message = err.response?.data?.message || "Failed to load quiz";
        setFeedback({ type: "error", message });
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [finalModuleId]);

  // SUBMIT QUIZ
  const submitQuiz = async () => {
    if (answers.includes(null)) {
      setFeedback({ type: "error", message: "Please answer all questions!" });
      return;
    }

    setSubmitDisabled(true);

    try {
      const res = await api.post("/quiz/evaluate", {
        moduleId: finalModuleId,
        answers,
      });

      const { score, total } = res.data;

      // Map correct answers
      const correct = quiz.questions.map((q) => {
        if (typeof q.correct === "number") return q.correct;
        return q.options.indexOf(q.correct);
      });

      setCorrectAnswers(correct);

      setFeedback({
        type: "info",
        message: `You scored ${score}/${total}. Preparing results...`,
      });

      // SAVE using quiz._id to match review page
      // CORRECT
      localStorage.setItem(`quiz-answers-${finalModuleId}`, JSON.stringify(answers));
      setTimeout(() => {
        setShowResults(true);
        setFeedback({
          type: score === total ? "success" : "error",
          message: `Final Score: ${score}/${total}`,
        });
      }, 1500);
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "Submission failed",
      });
      setSubmitDisabled(false);
    }
  };

  // LOADING SCREEN
  if (loading)
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p className="text-indigo-700 font-semibold">Loading quiz...</p>
        </div>
      </div>
    );

  // NO QUIZ
  if (!quiz)
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-6">
        <div className="bg-white/90 backdrop-blur rounded-3xl p-10 shadow-2xl text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <p className="text-xl font-bold text-gray-800 mb-4">{feedback?.message}</p>

          <button
            onClick={() => navigate("/student")}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="relative max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            Module Quiz
          </h1>
          <p className="text-gray-600 mt-2 font-medium">Answer all questions to continue</p>
        </div>

        {/* FEEDBACK */}
        {feedback && (
          <div
            className={`mb-6 p-5 rounded-2xl text-center font-bold text-lg shadow-xl transition-all ${feedback.type === "success"
              ? "bg-linear-to-r from-green-500 to-emerald-600 text-white"
              : feedback.type === "error"
                ? "bg-linear-to-r from-red-500 to-pink-600 text-white"
                : "bg-linear-to-r from-blue-500 to-indigo-600 text-white"
              }`}
          >
            {feedback.message}
          </div>
        )}

        {/* QUESTIONS */}
        <div className="space-y-8">
          {quiz.questions.map((q, i) => {
            const isCorrect = showResults && answers[i] === correctAnswers[i];
            const isWrong = showResults && answers[i] !== correctAnswers[i];

            return (
              <div
                key={i}
                className={`rounded-3xl shadow-xl p-6 backdrop-blur bg-white/90 border transition-all duration-300 ${isCorrect
                  ? "border-green-500 bg-green-50"
                  : isWrong
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                  }`}
              >
                <h3 className="font-bold text-lg text-gray-800 mb-4">
                  {i + 1}. {q.question}
                </h3>

                <div className="space-y-4">
                  {q.options.map((opt, idx) => {
                    let highlight = "";

                    if (showResults) {
                      if (idx === correctAnswers[i])
                        highlight = "bg-green-200 border-green-600";
                      else if (idx === answers[i])
                        highlight = "bg-red-200 border-red-600";
                    }

                    return (
                      <label
                        key={idx}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${answers[i] === idx
                          ? "bg-indigo-100 border-indigo-500 shadow-md"
                          : "bg-gray-50 hover:bg-gray-100 border-gray-300"
                          } ${highlight}`}
                      >
                        <input
                          type="radio"
                          disabled={showResults}
                          checked={answers[i] === idx}
                          onChange={() => {
                            const newAns = [...answers];
                            newAns[i] = idx;
                            setAnswers(newAns);
                          }}
                          className="w-5 h-5 text-indigo-600 focus:ring-indigo-400"
                        />
                        <span className="text-gray-800 font-medium">{opt}</span>
                      </label>
                    );
                  })}
                </div>

                {showResults && (
                  <div className="mt-4 text-sm font-bold">
                    <p>
                      Correct Answer:{" "}
                      <span className="text-green-700">{q.options[correctAnswers[i]]}</span>
                    </p>
                    <p>
                      Your Answer:{" "}
                      <span className={answers[i] === correctAnswers[i] ? "text-green-700" : "text-red-700"}>
                        {answers[i] !== null ? q.options[answers[i]] : "Not Answered"}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          {/* <button
            onClick={() => navigate("/student")}
            className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
          >
            <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Student Dashboard
          </button> */}

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
          >
            <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>


          <button
            onClick={submitQuiz}
            disabled={submitDisabled || answers.includes(null)}
            className="cursor-pointer px-12 py-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
