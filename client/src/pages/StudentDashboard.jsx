

// import { useEffect, useState, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../api/axios";
// import {
//   FiLogOut,
//   FiAward,
//   FiBookOpen,
//   FiBarChart2,
//   FiTarget,
//   FiStar,
//   FiUpload,
//   FiFileText,
//   FiCheckCircle,
//   FiChevronDown,
//   FiClock,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { useAuth } from "../store/authStore";
// import VideoEmbed from "../components/VideoEmbed";

// export default function StudentDashboard() {
//   const [dashboard, setDashboard] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hasSubmitted, setHasSubmitted] = useState(false);
//   const [openCourse, setOpenCourse] = useState(null); // "basic" | "intermediate" | "advanced" | null

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
//           api.get("/assignments/assignment-status"),
//         ]);
//         setDashboard(dashRes.data);
//         setHasSubmitted(!!assignRes.data.submitted);
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

//   // Auto-open course + scroll to next module after quiz
//   useEffect(() => {
//     if (loading || !dashboard || !justCompletedModuleId) return;

//     const completedModule = dashboard.modules.find(m => m._id === justCompletedModuleId);
//     if (!completedModule) return;

//     const courseType = completedModule.courseType || "basic";
//     setOpenCourse(courseType);

//     setTimeout(() => {
//       const nextModule = dashboard.modules
//         .filter(m => (m.courseType || "basic") === courseType)
//         .find(m => m.unlocked && !m.completed);

//       if (nextModule && moduleRefs.current[nextModule._id]) {
//         moduleRefs.current[nextModule._id].scrollIntoView({ behavior: "smooth", block: "center" });
//         moduleRefs.current[nextModule._id].classList.add("ring-4", "ring-amber-400", "ring-opacity-70");
//         setTimeout(() => {
//           moduleRefs.current[nextModule._id]?.classList.remove("ring-4", "ring-amber-400", "ring-opacity-70");
//         }, 3000);
//       }
//     }, 600);

//     window.history.replaceState({}, document.title);
//   }, [dashboard, justCompletedModuleId, loading]);

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

//   const completedModules = dashboard.modules.filter(m => m.completed).length;
//   const totalModules = dashboard.modules.length;

//   const globalNextModule = dashboard.modules
//     .slice(dashboard.modules.reduce((last, m, i) => (m.completed ? i : last), -1) + 1)
//     .find(m => m.unlocked && !m.completed);

//   const courses = {
//     basic: { name: "Course Basic", duration: "6 months", color: "from-blue-500 to-indigo-600" },
//     intermediate: { name: "Course Intermediate", duration: "6 months", color: "from-purple-500 to-pink-600" },
//     advanced: { name: "Course Advanced", duration: "12 months", color: "from-amber-500 to-red-600" },
//   };

//   const groupedModules = {
//     basic: dashboard.modules.filter(m => m.courseType === "basic"),
//     intermediate: dashboard.modules.filter(m => m.courseType === "intermediate"),
//     advanced: dashboard.modules.filter(m => m.courseType === "advanced"),
//   };

//   // Render full list of modules for a selected course
//   const renderCourseModules = (courseKey) => {
//     const modules = groupedModules[courseKey] || [];
//     const nextModuleInCourse = modules
//       .slice(modules.reduce((last, m, i) => (m.completed ? i : last), -1) + 1)
//       .find(m => m.unlocked && !m.completed);

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.5 }}
//         className="mt-10 space-y-10"
//       >
//         <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-4">
//           <FiStar className="text-yellow-500 text-4xl" />
//           All Modules
//         </h2>

//         <div className="space-y-8">
//           {modules.map((mod) => {
//             const isNext = nextModuleInCourse?._id === mod._id;
//             const isLocked = !mod.unlocked || (!mod.completed && !isNext);

//             return (
//               <motion.div
//                 key={mod._id}
//                 ref={(el) => (moduleRefs.current[mod._id] = el)}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 whileHover={{ scale: 1.01 }}
//                 className={`relative overflow-hidden rounded-3xl shadow-2xl border-2 transition-all duration-500
//                   ${mod.completed
//                     ? "bg-linear-to-br from-emerald-500/10 to-teal-500/10 border-emerald-400"
//                     : isNext
//                       ? "bg-linear-to-br from-amber-500/20 to-orange-500/20 border-amber-500 shadow-2xl ring-4 ring-amber-300/50"
//                       : "bg-white/80 backdrop-blur border-gray-300 opacity-90"
//                   }`}
//               >
//                 <div className="absolute top-6 right-6 z-10">
//                   <span className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg
//                     ${mod.completed
//                       ? "bg-emerald-500 text-white"
//                       : isNext
//                         ? "bg-linear-to-r from-amber-500 to-orange-500 text-white animate-pulse"
//                         : "bg-gray-500 text-white"
//                     }`}>
//                     {mod.completed ? "Completed" : isNext ? "Next Up" : "Locked"}
//                   </span>
//                 </div>

//                 <div className="p-10">
//                   <h3 className={`text-3xl font-bold mb-5 ${isLocked ? "text-gray-500" : "text-gray-800"}`}>
//                     {mod.title}
//                   </h3>
//                   <p className={`text-gray-600 mb-8 text-lg leading-relaxed ${isLocked ? "italic" : ""}`}>
//                     {mod.description}
//                   </p>

//                   {mod.materials.length > 0 && (
//                     <div className="space-y-6 mb-10">
//                       {mod.materials.map((mat, i) => {
//                         const isVideo = mat.type === "video" && (
//                           mat.url.includes("youtube") ||
//                           mat.url.includes("youtu.be") ||
//                           mat.url.includes("vimeo")
//                         );

//                         if (isLocked) {
//                           return (
//                             <div key={i} className="flex items-center gap-3 px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl cursor-not-allowed">
//                               {mat.type === "video" && "Video"}
//                               {mat.type === "pdf" && "PDF"}
//                               {mat.type === "link" && "Link"}
//                               {mat.title && <span className="font-medium">{mat.title}</span>}
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

//                   <div className="flex justify-end">
//                     {mod.completed && mod.hasQuiz ? (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => navigate(`/quiz/review/${mod._id}`)}
//                         className="px-10 py-5 rounded-3xl font-bold text-xl flex items-center gap-3 bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-xl hover:shadow-2xl"
//                       >
//                         <FiBookOpen /> Review Quiz
//                       </motion.button>
//                     ) : isLocked || !mod.hasQuiz ? (
//                       <button disabled className="px-10 py-5 rounded-3xl font-bold text-xl bg-gray-300 text-gray-500 cursor-not-allowed flex items-center gap-3">
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
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100">
//       <div className="max-w-7xl mx-auto p-6">

//         {/* Header */}
//         <motion.header initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
//           <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-lg border border-white/20 p-6">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-4 bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl">
//                   <FiBookOpen className="text-white text-4xl" />
//                 </div>
//                 <div>
//                   <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                     Student Dashboard
//                   </h1>
//                   <p className="text-lg text-gray-600 mt-1">
//                     Welcome back, <span className="font-bold text-indigo-600">{dashboard.student.name}</span>!
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="bg-white/80 backdrop-blur px-5 py-3 rounded-2xl shadow-md border border-gray-100 flex items-center gap-3">
//                   <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
//                     {dashboard.student.name.charAt(0).toUpperCase()}
//                   </div>
//                   <span className="font-medium text-gray-700">{dashboard.student.name}</span>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleLogout}
//                   className="flex items-center gap-3 px-6 py-4 bg-linear-to-r from-rose-500 to-pink-600 text-white rounded-2xl shadow-lg font-medium text-lg"
//                 >
//                   <FiLogOut /> Logout
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.header>

//         {/* Stats Row */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//           {/* Progress */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//             className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/30 p-8">
//             <div className="flex justify-between items-center mb-6">
//               <div className="p-4 bg-indigo-100 rounded-3xl">
//                 <FiBarChart2 className="text-indigo-600 text-3xl" />
//               </div>
//               <span className="text-5xl font-bold text-indigo-600">{dashboard.progressPercentage}%</span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">Overall Progress</h3>
//             <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
//               <motion.div initial={{ width: 0 }} animate={{ width: `${dashboard.progressPercentage}%` }}
//                 className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full" />
//             </div>
//             <p className="text-gray-600 mt-4">{completedModules} of {totalModules} modules completed</p>
//           </motion.div>

//           {/* Next Up */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
//             className="backdrop-blur-xl bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-3xl shadow-2xl border border-amber-300 p-8">
//             <div className="flex items-center gap-4 mb-6">
//               <div className="p-4 bg-amber-100 rounded-3xl">
//                 <FiTarget className="text-amber-600 text-3xl" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800">Next Up</h3>
//             </div>
//             <p className="text-2xl font-bold text-gray-800">
//               {globalNextModule ? globalNextModule.title : "All modules completed!"}
//             </p>
//             <p className="text-gray-600 mt-3">
//               {globalNextModule ? "Ready to continue your journey" : "Congratulations! You've completed everything"}
//             </p>
//           </motion.div>

//           {/* Final Assignment */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
//             className="backdrop-blur-xl bg-linear-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl shadow-2xl border border-emerald-300 p-8 text-center">
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

//         {/* Enrolled Courses */}
//         <section className="mb-20">
//           <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Your Enrolled Courses</h2>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//             {Object.entries(courses).map(([key, course]) => (
//               <motion.div
//                 key={key}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => navigate(`/modules/${key}`)}  // This is the key change
//                 className="cursor-pointer"
//               >
//                 <div className={`backdrop-blur-xl bg-white/90 rounded-3xl shadow-2xl border-2 border-white/40 p-10 transition-all duration-300 hover:ring-4 hover:ring-indigo-400 hover:ring-opacity-60 hover:shadow-3xl`}>
//                   <div className="flex justify-between items-start mb-8">
//                     <div className={`p-6 rounded-3xl bg-linear-to-br ${course.color} shadow-xl`}>
//                       <FiBookOpen className="text-white text-5xl" />
//                     </div>
//                     <FiChevronDown className="text-4xl text-gray-500" />
//                   </div>
//                   <h3 className="text-3xl font-bold text-gray-800 mb-4">{course.name}</h3>
//                   <div className="flex items-center gap-3 text-gray-600 mb-6">
//                     <FiClock className="text-2xl" />
//                     <span className="text-lg font-medium">{course.duration}</span>
//                   </div>
//                   <p className="text-lg text-gray-600">
//                     {groupedModules[key]?.length || 0} modules • Click to start
//                   </p>
//                   <div className="mt-8 text-center">
//                     <span className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold">
//                       Open Course →
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

//================kp==============
// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import {
//   FiLogOut,
//   FiAward,
//   FiBookOpen,
//   FiBarChart2,
//   FiTarget,
//   FiStar,
//   FiUpload,
//   FiFileText,
//   FiCheckCircle,
//   FiChevronDown,
//   FiClock,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { useAuth } from "../store/authStore";
// import VideoEmbed from "../components/VideoEmbed";

// export default function StudentDashboard() {
//   const [dashboard, setDashboard] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hasSubmitted, setHasSubmitted] = useState(false);
//   const [openCourse, setOpenCourse] = useState(null); // "basic" | "intermediate" | "advanced" | null

//   const navigate = useNavigate();
//   const { logout } = useAuth(); // Fixed from useAuth((s) => s.logout)

//   const moduleRefs = useRef({});

//   useEffect(() => {
//     async function fetchDashboard() {
//       try {
//         const [dashRes, assignRes] = await Promise.all([
//           api.get("/student/dashboard"),
//           api.get("/finalAssignments/assignment-status"), // FIXED: Match server.js route
//         ]);
//         setDashboard(dashRes.data);
//         setHasSubmitted(!!assignRes.data.submitted);
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

//   const completedModules = dashboard.modules.filter(m => m.completed).length;
//   const totalModules = dashboard.modules.length;

//   const globalNextModule = dashboard.modules
//     .slice(dashboard.modules.reduce((last, m, i) => (m.completed ? i : last), -1) + 1)
//     .find(m => m.unlocked && !m.completed);

//   const courses = {
//     basic: { name: "Course Basic", duration: "6 months", color: "from-blue-500 to-indigo-600" },
//     intermediate: { name: "Course Intermediate", duration: "6 months", color: "from-purple-500 to-pink-600" },
//     advanced: { name: "Course Advanced", duration: "12 months", color: "from-amber-500 to-red-600" },
//   };

//   const groupedModules = {
//     basic: dashboard.modules.filter(m => m.courseType === "basic"),
//     intermediate: dashboard.modules.filter(m => m.courseType === "intermediate"),
//     advanced: dashboard.modules.filter(m => m.courseType === "advanced"),
//   };

//   // Render full list of modules for a selected course
//   const renderCourseModules = (courseKey) => {
//     const modules = groupedModules[courseKey] || [];
//     const nextModuleInCourse = modules
//       .slice(modules.reduce((last, m, i) => (m.completed ? i : last), -1) + 1)
//       .find(m => m.unlocked && !m.completed);

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.5 }}
//         className="mt-10 space-y-10"
//       >
//         <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-4">
//           <FiStar className="text-yellow-500 text-4xl" />
//           All Modules
//         </h2>

//         <div className="space-y-8">
//           {modules.map((mod) => {
//             const isNext = nextModuleInCourse?._id === mod._id;
//             const isLocked = !mod.unlocked || (!mod.completed && !isNext);

//             return (
//               <motion.div
//                 key={mod._id}
//                 ref={(el) => (moduleRefs.current[mod._id] = el)}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 whileHover={{ scale: 1.01 }}
//                 className={`relative overflow-hidden rounded-3xl shadow-2xl border-2 transition-all duration-500
//                   ${mod.completed
//                     ? "bg-linear-to-br from-emerald-500/10 to-teal-500/10 border-emerald-400"
//                     : isNext
//                       ? "bg-linear-to-br from-amber-500/20 to-orange-500/20 border-amber-500 shadow-2xl ring-4 ring-amber-300/50"
//                       : "bg-white/80 backdrop-blur border-gray-300 opacity-90"
//                   }`}
//               >
//                 <div className="absolute top-6 right-6 z-10">
//                   <span className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg
//                     ${mod.completed
//                       ? "bg-emerald-500 text-white"
//                       : isNext
//                         ? "bg-linear-to-r from-amber-500 to-orange-500 text-white animate-pulse"
//                         : "bg-gray-500 text-white"
//                     }`}>
//                     {mod.completed ? "Completed" : isNext ? "Next Up" : "Locked"}
//                   </span>
//                 </div>

//                 <div className="p-10">
//                   <h3 className={`text-3xl font-bold mb-5 ${isLocked ? "text-gray-500" : "text-gray-800"}`}>
//                     {mod.title}
//                   </h3>
//                   <p className={`text-gray-600 mb-8 text-lg leading-relaxed ${isLocked ? "italic" : ""}`}>
//                     {mod.description}
//                   </p>

//                   {mod.materials.length > 0 && (
//                     <div className="space-y-6 mb-10">
//                       {mod.materials.map((mat, i) => {
//                         const isVideo = mat.type === "video" && (
//                           mat.url.includes("youtube") ||
//                           mat.url.includes("youtu.be") ||
//                           mat.url.includes("vimeo")
//                         );

//                         if (isLocked) {
//                           return (
//                             <div key={i} className="flex items-center gap-3 px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl cursor-not-allowed">
//                               {mat.type === "video" && "Video"}
//                               {mat.type === "pdf" && "PDF"}
//                               {mat.type === "link" && "Link"}
//                               {mat.title && <span className="font-medium">{mat.title}</span>}
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

//                   <div className="flex justify-end">
//                     {mod.completed && mod.hasQuiz ? (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => navigate(`/quiz/review/${mod._id}`)}
//                         className="px-10 py-5 rounded-3xl font-bold text-xl flex items-center gap-3 bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-xl hover:shadow-2xl"
//                       >
//                         <FiBookOpen /> Review Quiz
//                       </motion.button>
//                     ) : isLocked || !mod.hasQuiz ? (
//                       <button disabled className="px-10 py-5 rounded-3xl font-bold text-xl bg-gray-300 text-gray-500 cursor-not-allowed flex items-center gap-3">
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
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100">
//       <div className="max-w-7xl mx-auto p-6">

//         {/* Header */}
//         <motion.header initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
//           <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-lg border border-white/20 p-6">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-4 bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl">
//                   <FiBookOpen className="text-white text-4xl" />
//                 </div>
//                 <div>
//                   <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                     Student Dashboard
//                   </h1>
//                   <p className="text-lg text-gray-600 mt-1">
//                     Welcome back, <span className="font-bold text-indigo-600">{dashboard.student.name}</span>!
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="bg-white/80 backdrop-blur px-5 py-3 rounded-2xl shadow-md border border-gray-100 flex items-center gap-3">
//                   <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
//                     {dashboard.student.name.charAt(0).toUpperCase()}
//                   </div>
//                   <span className="font-medium text-gray-700">{dashboard.student.name}</span>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleLogout}
//                   className="flex items-center gap-3 px-6 py-4 bg-linear-to-r from-rose-500 to-pink-600 text-white rounded-2xl shadow-lg font-medium text-lg"
//                 >
//                   <FiLogOut /> Logout
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.header>

//         {/* Stats Row */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//           {/* Progress */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//             className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/30 p-8">
//             <div className="flex justify-between items-center mb-6">
//               <div className="p-4 bg-indigo-100 rounded-3xl">
//                 <FiBarChart2 className="text-indigo-600 text-3xl" />
//               </div>
//               <span className="text-5xl font-bold text-indigo-600">{dashboard.progressPercentage}%</span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">Overall Progress</h3>
//             <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
//               <motion.div initial={{ width: 0 }} animate={{ width: `${dashboard.progressPercentage}%` }}
//                 className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full" />
//             </div>
//             <p className="text-gray-600 mt-4">{completedModules} of {totalModules} modules completed</p>
//           </motion.div>

//           {/* Next Up */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
//             className="backdrop-blur-xl bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-3xl shadow-2xl border border-amber-300 p-8">
//             <div className="flex items-center gap-4 mb-6">
//               <div className="p-4 bg-amber-100 rounded-3xl">
//                 <FiTarget className="text-amber-600 text-3xl" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800">Next Up</h3>
//             </div>
//             <p className="text-2xl font-bold text-gray-800">
//               {globalNextModule ? globalNextModule.title : "All modules completed!"}
//             </p>
//             <p className="text-gray-600 mt-3">
//               {globalNextModule ? "Ready to continue your journey" : "Congratulations! You've completed everything"}
//             </p>
//           </motion.div>

//           {/* Final Assignment */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
//             className="backdrop-blur-xl bg-linear-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl shadow-2xl border border-emerald-300 p-8 text-center">
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

//         {/* Enrolled Courses */}
//         <section className="mb-20">
//           <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Your Enrolled Courses</h2>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//             {Object.entries(courses).map(([key, course]) => (
//               <motion.div
//                 key={key}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => navigate(`/modules/${key}`)}  // This is the key change
//                 className="cursor-pointer"
//               >
//                 <div className={`backdrop-blur-xl bg-white/90 rounded-3xl shadow-2xl border-2 border-white/40 p-10 transition-all duration-300 hover:ring-4 hover:ring-indigo-400 hover:ring-opacity-60 hover:shadow-3xl`}>
//                   <div className="flex justify-between items-start mb-8">
//                     <div className={`p-6 rounded-3xl bg-linear-to-br ${course.color} shadow-xl`}>
//                       <FiBookOpen className="text-white text-5xl" />
//                     </div>
//                     <FiChevronDown className="text-4xl text-gray-500" />
//                   </div>
//                   <h3 className="text-3xl font-bold text-gray-800 mb-4">{course.name}</h3>
//                   <div className="flex items-center gap-3 text-gray-600 mb-6">
//                     <FiClock className="text-2xl" />
//                     <span className="text-lg font-medium">{course.duration}</span>
//                   </div>
//                   <p className="text-lg text-gray-600">
//                     {groupedModules[key]?.length || 0} modules • Click to start
//                   </p>
//                   <div className="mt-8 text-center">
//                     <span className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold">
//                       Open Course →
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
//============================

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiLogOut, FiAward, FiBookOpen, FiBarChart2, FiTarget, FiUpload, FiFileText, FiCheckCircle, FiStar } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { useAuth } from "../store/authStore";

// export default function StudentDashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
// const [assignmentStatus, setAssignmentStatus] = useState({});
// const [examResults, setExamResults] = useState([]);

//   const navigate = useNavigate();
//   const { logout } = useAuth();




// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const [enrollRes, assignRes, examRes] = await Promise.all([
//         api.get("/enrollments/my"),
//         api.get("/final-assignments/assignment-status"),
//         api.get("/final-exams/results/my"),
//       ]);

//       setEnrolledCourses(enrollRes.data?.activeCourses || []);
//       setAssignmentStatus(assignRes.data || {});
//       setExamResults(examRes.data?.results || []);

//     } catch (err) {
//       console.error("Dashboard load failed:", err);
//       toast.error("Please refresh the page");
//     }
//   };

//   fetchData();
// }, []);


//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
//         <div className="w-20 h-20 border-8 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!data) return null;

//   // const courses = {
//   //   basic: "Basic Course",
//   //   intermediate: "Intermediate Course",
//   //   advanced: "Advanced Course"
//   // };

//   const courses = {
//     basic: { line1: "Basic", line2: "Course" },
//     intermediate: { line1: "Intermediate", line2: "Course" },
//     advanced: { line1: "Advanced", line2: "Course" }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-full mx-auto">
//         {/* Header */}
//         <div className="bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-8 mb-12">




//           {/* <div className="flex justify-between items-center">
//             <div className="space-y-4">
//               <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
//                 <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   Welcome, {data?.student?.name || "Student"}!
//                 </span>
//               </h1>

//               <div className="bg-white/60 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-indigo-200">
//                 <p className="text-gray-700 text-lg">
//                   We're glad to have you back,
//                   <span className="font-semibold text-indigo-700">
//                     {" "}{data?.student?.name || "Student"}
//                   </span>
//                   .
//                 </p>

//                 <p className="text-gray-700 text-lg mt-2">
//                   Username:{" "}
//                   <span className="font-semibold text-purple-700">
//                     {data?.student?.username || "No username"}
//                   </span>
//                 </p>
//               </div>

//               <p className="text-2xl font-semibold text-gray-600 mt-3">
//                 Keep learning and growing 🚀
//               </p>
//             </div>

//             <button
//               onClick={() => {
//                 logout();
//                 toast.success("Logged out");
//                 navigate("/");
//               }}
//               className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-red-700"
//             >
//               <FiLogOut /> Logout
//             </button>
//           </div> */}



//           {/* <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
//             <div className="flex-1 space-y-6">

//               <div className="space-y-2">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-3 h-8 bg-linear-to-b from-indigo-500 to-purple-600 rounded-full"></div>
//                   <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
//                     Student Dashboard
//                   </p>
//                 </div>

//                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
//                   <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                     Welcome back,
//                   </span>
//                   <br />
//                   <span className="text-gray-800">
//                     {data?.student?.name?.split(' ')[0] || "Student"}! 👋
//                   </span>
//                 </h1>
//               </div>


//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-linear-to-r from-indigo-400 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
//                 <div className="relative bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/50">
//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                     <div className="space-y-3">
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-linear-to-br from-indigo-100 to-purple-100 rounded-lg">
//                           <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                           </svg>
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-500">Full Name</p>
//                           <p className="text-xl font-bold text-gray-800">
//                             {data?.student?.name || "Not specified"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-linear-to-br from-purple-100 to-pink-100 rounded-lg">
//                           <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
//                           </svg>
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-500">Username</p>
//                           <p className="text-xl font-bold text-gray-800">
//                             @{data?.student?.username || "No username"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 text-gray-600">
//                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       <span className="text-sm font-medium">Active Now</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>


//               <div className="pt-4">
//                 <p className="text-lg font-semibold text-gray-700">
//                   <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
//                     Keep pushing forward!
//                   </span>
//                   <span className="text-gray-600 ml-2">
//                     Today's progress leads to tomorrow's success 🚀
//                   </span>
//                 </p>
//               </div>
//             </div>


//             <div className="w-full lg:w-auto">
//               <button
//                 onClick={() => {
//                   logout();
//                   toast.success("Successfully logged out");
//                   navigate("/");
//                 }}
//                 className="group relative w-full lg:w-auto bg-linear-to-r from-white to-gray-50 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-red-200"
//               >
//                 <div className="absolute -inset-0.5 bg-linear-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
//                 <div className="relative flex items-center gap-3">
//                   <div className="p-2 bg-linear-to-br from-red-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
//                     <FiLogOut className="w-5 h-5 text-white" />
//                   </div>
//                   <span className="bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent group-hover:text-red-700 transition-colors duration-300">
//                     Logout
//                   </span>
//                 </div>
//               </button>
//             </div>
//           </div> */}


//           <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6">
//             {/* LEFT SECTION */}
//             <div className="space-y-4 max-w-2xl">
//               <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
//                 <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   {/* Welcome, {data?.student?.name || "Student"} 👋 */}

//                   Welcome, <span className="text-blue-600">{data?.student?.name || "Student"}</span> 👋

//                 </span>
//               </h1>

//               <div className="bg-white/50 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-indigo-200">
//                 <p className="text-gray-700 text-lg">
//                   Great to have you back,
//                   <span className="font-semibold text-indigo-700">
//                     {" "}{data?.student?.name || "Student"}
//                   </span>.
//                 </p>

//                 <p className="text-gray-700 text-lg mt-2">
//                   Username:{" "}
//                   <span className="font-semibold text-purple-700">
//                     {data?.student?.username || "Not available"}
//                   </span>
//                 </p>
//               </div>

//               <p className="text-2xl font-semibold text-gray-600 mt-3">
//                 Stay consistent and keep achieving 🚀
//               </p>
//             </div>

//             {/* LOGOUT BUTTON */}
//             <button
//               onClick={() => {
//                 logout(); toast.success("Logged out"); navigate("/");
//               }}
//               className=" bg-red-600  text-white  px-8 py-4  rounded-2xl font-bold  flex items-center gap-3 shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200 "
//             >
//               <FiLogOut className="text-xl" />
//               Logout
//             </button>
//           </div>




//         </div>

//         {/* Stats */}
//         {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//           <div className="bg-linear-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-3xl shadow-2xl text-center">
//             <FiBarChart2 size={48} className="mx-auto mb-4" />
//             <p className="text-5xl font-black">{data.progressPercentage}%</p>
//             <p className="text-2xl">Progress</p>
//           </div>
//           <div className="bg-linear-to-br from-emerald-500 to-teal-600 text-white p-8 rounded-3xl shadow-2xl text-center">
//             <FiTarget size={48} className="mx-auto mb-4" />
//             <p className="text-5xl font-black">{data.completedModules}</p>
//             <p className="text-2xl">Modules Done</p>
//           </div>
//           <div className="bg-linear-to-br from-purple-500 to-pink-600 text-white p-8 rounded-3xl shadow-2xl text-center">
//             <FiAward size={48} className="mx-auto mb-4" />
//             <p className="text-5xl font-black">{data.totalModules}</p>
//             <p className="text-2xl">Total Modules</p>
//           </div>
//         </div> */}

//         {/* === STUNNING TOP STATS CARDS - NOW SHOWS REAL DATA === */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

//           {/* 1. Overall Progress */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="relative overflow-hidden bg-linear-to-br from-blue-500 via-indigo-600 to-purple-700 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <div className="absolute inset-0 bg-black/10"></div>

//             <div className="relative z-10">
//               <FiBarChart2 size={56} className="mx-auto mb-5 drop-shadow-lg" />
//               <p className="text-6xl font-black mb-2 drop-shadow-md">
//                 {data?.progressPercentage || 0}%
//               </p>
//               <p className="text-2xl font-bold">Overall Progress</p>
//             </div>

//             <div className="absolute top-4 right-4 text-white/30 text-8xl font-black select-none">
//               %
//             </div>
//           </motion.div>

//           {/* 2. Modules Completed */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="relative overflow-hidden bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <div className="absolute inset-0 bg-black/10"></div>

//             <div className="relative z-10">
//               <FiTarget size={56} className="mx-auto mb-5 drop-shadow-lg" />
//               <p className="text-6xl font-black mb-2 drop-shadow-md">
//                 {data?.modules?.filter(m => m.completed).length || 0}
//               </p>
//               <p className="text-2xl font-bold">Modules Done</p>
//             </div>

//             <div className="absolute bottom-4 left-4 text-white/20">
//               <FiCheckCircle size={80} />
//             </div>
//           </motion.div>

//           {/* 3. Total Modules */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="relative overflow-hidden bg-linear-to-br from-purple-600 via-pink-600 to-rose-600 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <div className="absolute inset-0 bg-black/10"></div>

//             <div className="relative z-10">
//               <FiAward size={56} className="mx-auto mb-5 drop-shadow-lg" />
//               <p className="text-6xl font-black mb-2 drop-shadow-md">
//                 {data?.modules?.length || 0}
//               </p>
//               <p className="text-2xl font-bold">Total Modules</p>
//             </div>

//             <div className="absolute top-4 left-4 text-white/20 rotate-12">
//               <FiStar size={90} />
//             </div>
//           </motion.div>

//         </div>


//         {/* Course Cards */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
//           {Object.keys(courses).map(key => {
//             const modulesInCourse = data.modules.filter(m => m.courseType === key);
//             const completed = modulesInCourse.filter(m => m.completed).length;

//             return (
//               <motion.div
//                 key={key}
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => navigate(`/modules/${key}`)}
//                 className="bg-white rounded-3xl shadow-2xl p-10 cursor-pointer text-center"
//               >
//                 {/* <h2 className="text-4xl font-bold mb-4">{courses[key]}</h2> */}
//                 <h2 className="text-3xl font-extrabold mb-4 leading-tight">
//                   {courses[key].line1}
//                   <br />
//                   {courses[key].line2}
//                 </h2>

//                 <p className="text-6xl font-black text-indigo-600 mb-4">
//                   {completed} / {modulesInCourse.length}
//                 </p>
//                 <p className="text-xl text-gray-600">Modules Completed</p>
//                 <button className="mt-8 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold">
//                   Open Course
//                 </button>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Final Assignment */}
//         {/* <div className="text-center">
//           {assignmentSubmitted ? (
//             <div className="text-6xl text-green-600">Checkmark Final Assignment Submitted!</div>
//           ) : (
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               onClick={() => navigate("/assignment")}
//               className="bg-linear-to-r from-green-600 to-teal-600 text-white px-16 py-8 rounded-3xl text-3xl font-bold shadow-2xl"
//             >
//               <FiUpload className="inline mr-4" size={40} />
//               Submit Final Assignment
//             </motion.button>
//           )}
//         </div> */}
//       </div>
//     </div>
//   );
// }


//=========correct===============


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiLogOut, FiAward, FiBookOpen, FiBarChart2, FiTarget, FiUpload, FiFileText, FiCheckCircle, FiStar } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { useAuth } from "../store/authStore";

// export default function StudentDashboard() {
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [assignmentStatus, setAssignmentStatus] = useState({});
//   const [examResults, setExamResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [enrollRes, assignRes, examRes] = await Promise.all([
//           api.get("/enrollments/my"),
//           api.get("/final-assignments/assignment-status"),
//           api.get("/final-exams/results/my"),
//         ]);

//         setEnrolledCourses(enrollRes.data?.activeCourses || []);
//         setAssignmentStatus(assignRes.data || {});
//         setExamResults(examRes.data?.results || []);

//       } catch (err) {
//         console.error("Dashboard load failed:", err);
//         toast.error("Failed to load dashboard. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const courses = {
//     basic: { line1: "Basic", line2: "Course" },
//     intermediate: { line1: "Intermediate", line2: "Course" },
//     advanced: { line1: "Advanced", line2: "Course" }
//   };

//   const getExamStatus = (type) => {
//     const result = examResults.find(r => r.courseType === type);
//     if (!result) return { text: "Not Taken", color: "gray" };
//     return result.passed
//       ? { text: "PASSED", score: result.score, color: "emerald" }
//       : { text: "FAILED", score: result.score, color: "red" };
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
//         <div className="w-20 h-20 border-8 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-full mx-auto">

//         {/* Header */}
//         <div className="bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-8 mb-12">
//           <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6">
//             {/* LEFT SECTION */}
//             <div className="space-y-4 max-w-2xl">
//               <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
//                 <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   Welcome, <span className="text-blue-600">Student</span>
//                 </span>
//               </h1>

//               <div className="bg-white/50 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-indigo-200">
//                 <p className="text-gray-700 text-lg">
//                   Great to have you back,
//                   <span className="font-semibold text-indigo-700"> Student</span>.
//                 </p>
//                 <p className="text-gray-700 text-lg mt-2">
//                   Username: <span className="font-semibold text-purple-700">Not available</span>
//                 </p>
//               </div>

//               <p className="text-2xl font-semibold text-gray-600 mt-3">
//                 Stay consistent and keep achieving
//               </p>
//             </div>


//             {/* LOGOUT BUTTON */}
//             <button
//               onClick={() => {
//                 logout();
//                 toast.success("Logged out");
//                 navigate("/");
//               }}
//               className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200"
//             >
//               <FiLogOut className="text-xl" />
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* STUNNING TOP STATS CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//           {/* 1. Enrolled Courses */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="relative overflow-hidden bg-linear-to-br from-blue-500 via-indigo-600 to-purple-700 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <div className="absolute inset-0 bg-black/10"></div>
//             <div className="relative z-10">
//               <FiBarChart2 size={56} className="mx-auto mb-5 drop-shadow-lg" />
//               <p className="text-6xl font-black mb-2 drop-shadow-md">{enrolledCourses.length}</p>
//               <p className="text-2xl font-bold">Enrolled Courses</p>
//             </div>
//             <div className="absolute top-4 right-4 text-white/30 text-8xl font-black select-none">★</div>
//           </motion.div>

//           {/* 2. Assignments Completed */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="relative overflow-hidden bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <div className="absolute inset-0 bg-black/10"></div>
//             <div className="relative z-10">
//               <FiTarget size={56} className="mx-auto mb-5 drop-shadow-lg" />
//               <p className="text-6xl font-black mb-2 drop-shadow-md">
//                 {Object.values(assignmentStatus).filter(Boolean).length}
//               </p>
//               <p className="text-2xl font-bold">Assignments Done</p>
//             </div>
//             <div className="absolute bottom-4 left-4 text-white/20">
//               <FiCheckCircle size={80} />
//             </div>
//           </motion.div>

//           {/* 3. Exams Passed */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="relative overflow-hidden bg-linear-to-br from-purple-600 via-pink-600 to-rose-600 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <div className="absolute inset-0 bg-black/10"></div>
//             <div className="relative z-10">
//               <FiAward size={56} className="mx-auto mb-5 drop-shadow-lg" />
//               <p className="text-6xl font-black mb-2 drop-shadow-md">
//                 {examResults.filter(r => r.passed).length}
//               </p>
//               <p className="text-2xl font-bold">Exams Passed</p>
//             </div>
//             <div className="absolute top-4 left-4 text-white/20 rotate-12">
//               <FiStar size={90} />
//             </div>
//           </motion.div>
//         </div>

//         {/* Course Cards */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
//           {Object.keys(courses).map(key => {
//             const isEnrolled = enrolledCourses.some(c => c.courseType === key);
//             // const assignmentDone = assignmentStatus[key] || false;
//             const assignmentDone = assignmentStatus[key]?.submitted || false;

//             const exam = getExamStatus(key);

//             return (
//               <motion.div
//                 key={key}
//                 whileHover={{ scale: isEnrolled ? 1.05 : 1 }}
//                 onClick={() => isEnrolled && navigate(`/modules/${key}`)}
//                 className={`bg-white rounded-3xl shadow-2xl p-10 text-center transition-all duration-300 ${isEnrolled ? "cursor-pointer ring-4 ring-indigo-300/30" : "opacity-70"
//                   }`}
//               >
//                 <h2 className="text-3xl font-extrabold mb-4 leading-tight">
//                   {courses[key].line1}
//                   <br />
//                   <span className="text-indigo-600">{courses[key].line2}</span>
//                 </h2>

//                 <div className="space-y-6 mt-8">
//                   <div className={`text-2xl font-bold ${isEnrolled ? "text-green-600" : "text-gray-400"}`}>
//                     {isEnrolled ? "ENROLLED" : "NOT ENROLLED"}
//                   </div>

//                   <div className="flex justify-center items-center gap-3">
//                     <FiFileText size={28} />
//                     {/* <span className={`text-lg font-bold ${assignmentDone ? "text-emerald-600" : "text-orange-600"}`}>
//                       {assignmentDone ? "Submitted" : "Pending"}
//                     </span> */}

//                     <span
//                       className={`text-lg font-bold ${!isEnrolled
//                           ? "text-gray-400"
//                           : assignmentDone
//                             ? "text-emerald-600"
//                             : "text-orange-600"
//                         }`}
//                     >
//                       {!isEnrolled
//                         ? "Not Taken"
//                         : assignmentDone
//                           ? "Submitted"
//                           : "Pending"}
//                     </span>


//                   </div>

//                   <div className="flex justify-center items-center gap-3">
//                     <FiBookOpen size={32} />
//                     <span className={`text-xl font-black text-${exam.color}-600`}>
//                       {exam.text} {exam.score !== undefined && `(${exam.score}%)`}
//                     </span>
//                   </div>

//                   {isEnrolled && (
//                     <button className="mt-8 w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-xl hover:shadow-xl transition">
//                       Open Course
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


//================username showing dynamic==CORRECT=======

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiLogOut, FiAward, FiBookOpen, FiBarChart2, FiTarget, FiFileText, FiCheckCircle, FiStar } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { useAuth } from "../store/authStore";

// export default function StudentDashboard() {
//   const [data, setData] = useState(null);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [assignmentStatus, setAssignmentStatus] = useState({});
//   const [examResults, setExamResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [studentInfo, setStudentInfo] = useState(null);

//   const navigate = useNavigate();

//   // FIXED: single useAuth call
//   const { user, logout } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [enrollRes, assignRes, examRes] = await Promise.all([
//           api.get("/enrollments/my"),
//           api.get("/final-assignments/assignment-status"),
//           api.get("/final-exams/results/my"),
//         ]);

//         setEnrolledCourses(enrollRes.data?.activeCourses || []);
//         setAssignmentStatus(assignRes.data || {});
//         setExamResults(examRes.data?.results || []);

//       } catch (err) {
//         console.error("Dashboard load failed:", err);
//         toast.error("Failed to load dashboard. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     api.get("/student/dashboard")
//       .then(res => setStudentInfo(res.data.student))
//       .catch(console.error);
//   }, []);


//   const courses = {
//     basic: { line1: "Basic", line2: "Course" },
//     intermediate: { line1: "Intermediate", line2: "Course" },
//     advanced: { line1: "Advanced", line2: "Course" }
//   };

//   // const getExamStatus = (type) => {
//   //   const result = examResults.find(r => r.courseType === type);
//   //   if (!result) return { text: "Not Taken", color: "gray" };
//   //   return result.passed
//   //     ? { text: "PASSED", score: result.score, color: "emerald" }
//   //     : { text: "FAILED", score: result.score, color: "red" };
//   // };

//   const getExamStatus = (type) => {
//   const result = examResults.find(r => r.courseType === type);

//   if (!result) return { text: "Not Taken", color: "gray" };

//   return {
//     // text: `${result.score}%`,
//     text: `Final Exam: ${result.score}%`,

//     color: result.score >= 75 ? "emerald" : result.score >= 50 ? "amber" : "red"
//   };
// };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
//         <div className="w-20 h-20 border-8 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }



//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-full mx-auto">

//         {/* Header */}
//         {/* <div className="bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-8 mb-12"> */}
//         {/* <div className="bg-blue-200 backdrop-blur rounded-3xl shadow-2xl p-8 mb-12">
//           <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6">

//             <div className="space-y-4 max-w-2xl">
//               <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
//                 <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   Welcome, <span className="text-blue-600">{studentInfo?.name || "Student"}</span>
//                 </span>
//               </h1>

//               <div>

//                 <h2 className="text-gray-700 text-lg mt-2">
//                   Username:{" "}
//                   <span className="font-semibold text-purple-700">
//                     {studentInfo?.username || "Not available"}
//                   </span>
//                 </h2>
//               </div>
//             </div>

//             <button
//               onClick={() => {
//                 logout();
//                 toast.success("Logged out");
//                 navigate("/");
//               }}
//               className="cursor-pointer bg-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200"
//             >
//               <FiLogOut className="text-xl" />
//               Logout
//             </button>
//           </div>
//         </div> */}






//         <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-12">

//           <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6">

//             {/* LEFT SECTION */}
//             <div className="space-y-4 max-w-2xl">
//               <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
//                 <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   Welcome,{" "}
//                 </span>
//                 <span className="text-blue-700">
//                   {studentInfo?.name || "Student"}
//                 </span>
//               </h1>

//               {/* USERNAME */}
//               <h3 className="text-gray-700 text-lg">
//                 Username:{" "}
//                 <span className="font-bold text-purple-700 text-2xl">
//                   {studentInfo?.username || "Not available"}
//                 </span>
//               </h3>
//             </div>

//             {/* LOGOUT BUTTON */}
//             <button
//               onClick={() => {
//                 logout();
//                 toast.success("Logged out");
//                 navigate("/");
//               }}
//               className="cursor-pointer bg-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200"
//             >
//               <FiLogOut className="text-xl" />
//               Logout
//             </button>

//           </div>
//         </div>

//         {/* STATS CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ">

//           {/* Enrolled Courses */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="relative overflow-hidden bg-linear-to-br from-blue-500 via-indigo-600 to-purple-700 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <div className="absolute inset-0 bg-black/10"></div>
//             <div className="relative z-10">
//               <FiBarChart2 size={56} className="mx-auto mb-5 drop-shadow-lg" />
//               <p className="text-6xl font-black mb-2 drop-shadow-md">{enrolledCourses.length}</p>
//               <p className="text-2xl font-bold">Enrolled Courses</p>
//             </div>
//           </motion.div>

//           {/* Assignments Completed */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="relative overflow-hidden bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <div className="absolute inset-0 bg-black/10"></div>
//             <div className="relative z-10">
//               <FiTarget size={56} className="mx-auto mb-5 drop-shadow-lg" />
//               <p className="text-6xl font-black mb-2 drop-shadow-md">
//                 {/* {Object.values(assignmentStatus).filter(Boolean).length} */}
//                 {Object.values(assignmentStatus).filter(s => s.submitted === true).length}

//               </p>
//               <p className="text-2xl font-bold">Assignments Done</p>
//             </div>
//           </motion.div>

//           {/* Exams Passed */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="relative overflow-hidden bg-linear-to-br from-purple-600 via-pink-600 to-rose-600 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <div className="absolute inset-0 bg-black/10"></div>
//             <div className="relative z-10">
//               <FiAward size={56} className="mx-auto mb-5 drop-shadow-lg" />
//               <p className="text-6xl font-black mb-2 drop-shadow-md">
//                 {examResults.filter(r => r.passed).length}
//               </p>
//               <p className="text-2xl font-bold">Exams Done</p>
//             </div>
//           </motion.div>

//         </div>

//         {/* COURSE CARDS */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20 ">
//           {Object.keys(courses).map(key => {
//             const isEnrolled = enrolledCourses.some(c => c.courseType === key);
//             const assignmentDone = assignmentStatus[key]?.submitted || false;

//             // const exam = getExamStatus(key);
//             const exam = isEnrolled ? getExamStatus(key) : { text: "Not Taken", color: "gray" };


//             return (
//               <motion.div
//                 key={key}
//                 whileHover={{ scale: isEnrolled ? 1.05 : 1 }}
//                 onClick={() => isEnrolled && navigate(`/modules/${key}`)}
//                 className={`hover:bg-yellow-100 bg-white rounded-3xl shadow-2xl p-10 text-center transition-all duration-300 ${isEnrolled ? "cursor-pointer ring-4 ring-indigo-300/30" : "opacity-70"
//                   }`}
//               >
//                 <h2 className="text-3xl font-extrabold mb-4 leading-tight">
//                   {courses[key].line1}
//                   <br />
//                   <span className="text-indigo-600">{courses[key].line2}</span>
//                 </h2>

//                 <div className="space-y-6 mt-8">
//                   <div className={`text-2xl font-bold ${isEnrolled ? "text-green-600" : "text-gray-400"}`}>
//                     {isEnrolled ? "ENROLLED" : "NOT ENROLLED"}
//                   </div>

//                   <div className="flex justify-center items-center gap-3">
//                     <FiFileText size={28} />
//                     <span
//                       className={`text-lg font-bold ${!isEnrolled
//                         ? "text-gray-400"
//                         : assignmentDone
//                           ? "text-emerald-600"
//                           : "text-orange-600"
//                         }`}
//                     >
//                       {!isEnrolled
//                         ? "Not Taken"
//                         : assignmentDone
//                           ? "Submitted"
//                           : "Pending"}
//                     </span>
//                   </div>

//                   <div className="flex justify-center items-center gap-3">
//                     <FiBookOpen size={32} />

//                     {/* FIXED SAFE TAILWIND CLASS */}
//                     <span
//                       className={`text-xl font-black ${exam.color === "emerald"
//                         ? "text-emerald-600"
//                         : exam.color === "red"
//                           ? "text-red-600"
//                           : "text-gray-600"
//                         }`}
//                     >
//                       {exam.text} {exam.score !== undefined && `(${exam.score}%)`}
//                     </span>
//                   </div>

//                   {isEnrolled && (
//                     <button className="cursor-pointer mt-8 w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-xl hover:shadow-xl transition">
//                       Open Course
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }



//=============WITH EXPIRETAION DURATION============


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import {
//   FiLogOut,
//   FiAward,
//   FiBookOpen,
//   FiBarChart2,
//   FiTarget,
//   FiFileText,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { useAuth } from "../store/authStore";

// export default function StudentDashboard() {
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [assignmentStatus, setAssignmentStatus] = useState({});
//   const [examResults, setExamResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [studentInfo, setStudentInfo] = useState(null);

//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [enrollRes, assignRes, examRes] = await Promise.all([
//           api.get("/enrollments/my"),
//           api.get("/final-assignments/assignment-status"),
//           api.get("/final-exams/results/my"),
//         ]);

//         setEnrolledCourses(enrollRes.data?.activeCourses || []);
//         setAssignmentStatus(assignRes.data || {});
//         setExamResults(examRes.data?.results || []);
//       } catch (err) {
//         console.error("Dashboard load failed:", err);
//         toast.error("Failed to load dashboard. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     api
//       .get("/student/dashboard")
//       .then((res) => setStudentInfo(res.data.student))
//       .catch(console.error);
//   }, []);

//   // COURSE LABELS
//   const courses = {
//     basic: { line1: "Basic", line2: "Course" },
//     intermediate: { line1: "Intermediate", line2: "Course" },
//     advanced: { line1: "Advanced", line2: "Course" },
//   };

//   // Get exam score result
//   const getExamStatus = (type) => {
//     const result = examResults.find((r) => r.courseType === type);

//     if (!result) return { text: "Not Taken", color: "gray" };

//     return {
//       text: `Final Exam: ${result.score}%`,
//       score: result.score,
//       color:
//         result.score >= 75 ? "emerald" : result.score >= 50 ? "amber" : "red",
//     };
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
//         <div className="w-20 h-20 border-8 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-full mx-auto">
//         {/* HEADER */}
//         <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-12">
//           <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6">
//             <div className="space-y-4 max-w-2xl">
//               <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
//                 <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   Welcome,{" "}
//                 </span>
//                 <span className="text-blue-700">
//                   {studentInfo?.name || "Student"}
//                 </span>
//               </h1>

//               <h3 className="text-gray-700 text-lg">
//                 Username:{" "}
//                 <span className="font-bold text-purple-700 text-2xl">
//                   {studentInfo?.username || "Not available"}
//                 </span>
//               </h3>
//             </div>

//             <button
//               onClick={() => {
//                 logout();
//                 toast.success("Logged out");
//                 navigate("/");
//               }}
//               className="cursor-pointer bg-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200"
//             >
//               <FiLogOut className="text-xl" />
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* STATS CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//           {/* Enrolled Courses */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="relative overflow-hidden bg-linear-to-br from-blue-500 via-indigo-600 to-purple-700 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <FiBarChart2 size={56} className="mx-auto mb-5 drop-shadow-lg" />
//             <p className="text-6xl font-black mb-2">
//               {enrolledCourses.length}
//             </p>
//             <p className="text-2xl font-bold">Enrolled Courses</p>
//           </motion.div>

//           {/* Assignments */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="relative overflow-hidden bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <FiTarget size={56} className="mx-auto mb-5" />
//             <p className="text-6xl font-black mb-2">
//               {Object.values(assignmentStatus).filter((s) => s.submitted).length}
//             </p>
//             <p className="text-2xl font-bold">Assignments Done</p>
//           </motion.div>

//           {/* Exams */}

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="relative overflow-hidden bg-linear-to-br from-purple-600 via-pink-600 to-rose-600 text-white p-10 rounded-3xl shadow-2xl text-center"
//           >
//             <FiAward size={56} className="mx-auto mb-5" />

//             {/* Total Exams Done */}
//             <p className="text-6xl font-black mb-2">
//               {examResults.length}
//             </p>
//             <p className="text-2xl font-bold mb-2">Exams Done</p>

//             {/* Optional: Pass / Fail */}
//             <div className="flex justify-center gap-6 mt-2 text-lg font-semibold">
//               <span className="text-green-300">Passed: {examResults.filter(r => r.passed).length}</span>
//               <span className="text-red-300">Failed: {examResults.filter(r => r.passed === false).length}</span>
//             </div>
//           </motion.div>

//         </div>

//         {/* COURSE CARDS */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
//           {Object.keys(courses).map((key) => {
//             const enrollment = enrolledCourses.find(
//               (c) => c.courseType === key
//             );
//             const isEnrolled = Boolean(enrollment);
//             const assignmentDone = assignmentStatus[key]?.submitted || false;

//             const exam = isEnrolled
//               ? getExamStatus(key)
//               : { text: "Not Taken", color: "gray" };

//             return (
//               <motion.div
//                 key={key}
//                 whileHover={{ scale: isEnrolled ? 1.05 : 1 }}
//                 onClick={() => isEnrolled && navigate(`/modules/${key}`)}
//                 className={`hover:bg-yellow-100 bg-white rounded-3xl shadow-2xl p-10 text-center transition-all duration-300 ${isEnrolled
//                     ? "cursor-pointer ring-4 ring-indigo-300/30"
//                     : "opacity-70"
//                   }`}
//               >
//                 <h2 className="text-3xl font-extrabold mb-4 leading-tight">
//                   {courses[key].line1}
//                   <br />
//                   <span className="text-indigo-600">
//                     {courses[key].line2}
//                   </span>
//                 </h2>

//                 <div className="space-y-6 mt-8">
//                   {/* ENROLLED */}
//                   <div
//                     className={`text-2xl font-bold ${isEnrolled ? "text-green-600" : "text-gray-400"
//                       }`}
//                   >
//                     {isEnrolled ? "ENROLLED" : "NOT ENROLLED"}
//                   </div>

//                   {/* ASSIGNMENT */}
//                   <div className="flex justify-center items-center gap-3">
//                     <FiFileText size={28} />
//                     <span
//                       className={`text-lg font-bold ${!isEnrolled
//                           ? "text-gray-400"
//                           : assignmentDone
//                             ? "text-emerald-600"
//                             : "text-orange-600"
//                         }`}
//                     >
//                       {!isEnrolled
//                         ? "Not Taken"
//                         : assignmentDone
//                           ? "Submitted"
//                           : "Pending"}
//                     </span>
//                   </div>

//                   {/* EXAM */}
//                   <div className="flex justify-center items-center gap-3">
//                     <FiBookOpen size={32} />
//                     <span
//                       className={`text-xl font-black ${exam.color === "emerald"
//                           ? "text-emerald-600"
//                           : exam.color === "red"
//                             ? "text-red-600"
//                             : exam.color === "amber"
//                               ? "text-amber-600"
//                               : "text-gray-600"
//                         }`}
//                     >
//                       {exam.text}
//                     </span>
//                   </div>

//                   {/* NEW: Duration + Expiry */}
//                   {isEnrolled && (
//                     <div className="bg-indigo-50 rounded-2xl p-4 text-center mt-6">
//                       <p className="text-lg font-semibold text-indigo-700">
//                         Duration:{" "}
//                         <span className="font-bold">
//                           {enrollment.duration?.toUpperCase()}
//                         </span>
//                       </p>
//                       <p className="text-md text-gray-700 mt-1">
//                         Expires On:{" "}
//                         <span className="font-bold text-red-600">
//                           {new Date(
//                             enrollment.expiresAt
//                           ).toLocaleDateString()}
//                         </span>
//                       </p>
//                     </div>
//                   )}

//                   {isEnrolled && (
//                     <button className="cursor-pointer mt-8 w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-xl hover:shadow-xl transition">
//                       Open Course
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  FiLogOut,
  FiAward,
  FiBookOpen,
  FiBarChart2,
  FiTarget,
  FiFileText,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../store/authStore";

export default function StudentDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [assignmentStatus, setAssignmentStatus] = useState({});
  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState(null);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollRes, assignRes, examRes] = await Promise.all([
          api.get("/enrollments/my"),
          api.get("/final-assignments/assignment-status"),
          api.get("/final-exams/results/my"),
        ]);

        setEnrolledCourses(enrollRes.data?.activeCourses || []);
        setAssignmentStatus(assignRes.data || {});
        setExamResults(examRes.data?.results || []);
      } catch (err) {
        console.error("Dashboard load failed:", err);
        toast.error("Failed to load dashboard. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    api
      .get("/student/dashboard")
      .then((res) => setStudentInfo(res.data.student))
      .catch(console.error);
  }, []);

  // COURSE LABELS
  const courses = {
    basic: { line1: "Basic", line2: "Course" },
    intermediate: { line1: "Intermediate", line2: "Course" },
    advanced: { line1: "Advanced", line2: "Course" },
  };

  // Get exam score result
  const getExamStatus = (type) => {
    const result = examResults.find((r) => r.courseType === type);

    if (!result) return { text: "Not Taken", color: "gray" };

    return {
      text: `Final Exam: ${result.score}%`,
      score: result.score,
      color:
        result.score >= 75 ? "emerald" : result.score >= 50 ? "amber" : "red",
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
        <div className="w-20 h-20 border-8 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-full mx-auto">
        {/* HEADER */}
        <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-12">
          <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome,{" "}
                </span>
                <span className="text-blue-700">
                  {studentInfo?.name || "Student"}
                </span>
              </h1>

              <h3 className="text-gray-700 text-lg">
                Username:{" "}
                <span className="font-bold text-purple-700 text-2xl">
                  {studentInfo?.username || "Not available"}
                </span>
              </h3>
            </div>

            <button
              onClick={() => {
                logout();
                toast.success("Logged out");
                navigate("/");
              }}
              className="cursor-pointer bg-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200"
            >
              <FiLogOut className="text-xl" />
              Logout
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Enrolled Courses */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden bg-linear-to-br from-blue-500 via-indigo-600 to-purple-700 text-white p-10 rounded-3xl shadow-2xl text-center"
          >
            <FiBarChart2 size={56} className="mx-auto mb-5 drop-shadow-lg" />
            <p className="text-6xl font-black mb-2">
              {enrolledCourses.length}
            </p>
            <p className="text-2xl font-bold">Enrolled Courses</p>
          </motion.div>

          {/* Assignments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white p-10 rounded-3xl shadow-2xl text-center"
          >
            <FiTarget size={56} className="mx-auto mb-5" />
            <p className="text-6xl font-black mb-2">
              {Object.values(assignmentStatus).filter((s) => s.submitted).length}
            </p>
            <p className="text-2xl font-bold">Assignments Done</p>
          </motion.div>

          {/* Exams */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden bg-linear-to-br from-purple-600 via-pink-600 to-rose-600 text-white p-10 rounded-3xl shadow-2xl text-center"
          >
            <FiAward size={56} className="mx-auto mb-5" />

            {/* Total Exams Done */}
            <p className="text-6xl font-black mb-2">
              {examResults.length}
            </p>
            <p className="text-2xl font-bold mb-2">Exams Done</p>

            {/* Optional: Pass / Fail */}
            <div className="flex justify-center gap-6 mt-2 text-lg font-semibold">
              <span className="text-green-300">Passed: {examResults.filter(r => r.passed).length}</span>
              <span className="text-red-300">Failed: {examResults.filter(r => r.passed === false).length}</span>
            </div>
          </motion.div>

        </div>

        {/* COURSE CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          {Object.keys(courses).map((key) => {
            const enrollment = enrolledCourses.find((c) => c.courseType === key);
            const isEnrolled = Boolean(enrollment);

            // Check if enrollment is expired
            const isExpired = enrollment
              ? new Date(enrollment.expiresAt) < new Date()
              : false;

            const assignmentDone = assignmentStatus[key]?.submitted || false;
            const exam = isEnrolled
              ? getExamStatus(key)
              : { text: "Not Taken", color: "gray" };

            // Calculate duration in months (if custom date, calculate months difference)
            let durationText = "";
            if (enrollment) {
              if (enrollment.duration) {
                // If duration is in "3m", "6m", "11y" format
                durationText = enrollment.duration.toUpperCase();
              } else if (enrollment.enrolledAt && enrollment.expiresAt) {
                const enrolledDate = new Date(enrollment.enrolledAt);
                const expiryDate = new Date(enrollment.expiresAt);
                const months =
                  (expiryDate.getFullYear() - enrolledDate.getFullYear()) * 12 +
                  (expiryDate.getMonth() - enrolledDate.getMonth());
                durationText = `${months} month${months > 1 ? "s" : ""}`;
              }
            }

            return (
              //               <motion.div
              //                 key={key}
              //                 whileHover={{ scale: isEnrolled ? 1.05 : 1 }}


              //                   className={`
              //   bg-white rounded-3xl shadow-xl p-10 text-center transition-all duration-500
              //   ${isEnrolled 
              //     ? "hover:-translate-y-1 hover:shadow-2xl hover:bg-indigo-50 hover:ring-4 hover:ring-indigo-300/40" 
              //     : "opacity-60 cursor-not-allowed"
              //   }
              // `}

              //               >
              //                 <h2 className="text-3xl font-extrabold mb-4 leading-tight">
              //                   {courses[key].line1}
              //                   <br />
              //                   <span className="text-indigo-600">{courses[key].line2}</span>
              //                 </h2>

              //                 <div className="space-y-6 mt-8">
              //                   <div className={`text-2xl font-bold ${isEnrolled ? "text-green-600" : "text-gray-400"}`}>
              //                     {isEnrolled ? "ENROLLED" : "NOT ENROLLED"}
              //                   </div>

              //                   <div className="flex justify-center items-center gap-3">
              //                     <FiFileText size={28} />


              //                     <span
              //   className={`text-lg font-bold 
              //     ${!isEnrolled 
              //       ? "text-gray-400" 
              //       : assignmentDone 
              //         ? "text-emerald-600" 
              //         : "text-orange-600"
              //     }`}
              // >
              //   {!isEnrolled 
              //     ? "Assignment: Not Submitted" 
              //     : assignmentDone 
              //       ? "Assignment: Submitted" 
              //       : "Assignment: Not Submitted"}
              // </span>

              //                   </div>

              //                   <div className="flex justify-center items-center gap-3">
              //                     <FiBookOpen size={32} />
              //                     <span
              //                       className={`text-xl font-black ${exam.color === "emerald"
              //                           ? "text-emerald-600"
              //                           : exam.color === "red"
              //                             ? "text-red-600"
              //                             : exam.color === "amber"
              //                               ? "text-amber-600"
              //                               : "text-gray-600"
              //                         }`}
              //                     >
              //                       {exam.text}
              //                     </span>
              //                   </div>

              //                   {isEnrolled && (
              //                     <div className="bg-indigo-50 rounded-2xl p-4 text-center mt-6">
              //                       <p className="text-lg font-semibold text-indigo-700">
              //                         Duration: <span className="font-bold">{durationText}</span>
              //                       </p>
              //                       <p className="text-md text-gray-700 mt-1">
              //                         {isExpired ? (
              //                           <span className="font-bold text-red-600">Course Expired</span>
              //                         ) : (
              //                           <>
              //                             Expires On:{" "}
              //                             {/* <span className="font-bold text-red-600">
              //                     {new Date(enrollment.expiresAt).toLocaleDateString()}
              //                   </span> */}

              //                             <span className="font-bold text-red-600">
              //                               {new Date(enrollment.expiresAt).toLocaleDateString("en-US", {
              //                                 day: "2-digit",
              //                                 month: "short",
              //                                 year: "numeric",
              //                               })}
              //                             </span>

              //                           </>
              //                         )}
              //                       </p>
              //                     </div>
              //                   )}

              //                   {isEnrolled && (
              //                     <button
              //                       onClick={() => !isExpired && navigate(`/modules/${key}`)}
              //                       disabled={isExpired}
              //                       className={`cursor-pointer mt-8 w-full py-4 rounded-2xl font-bold text-xl text-white transition ${isExpired
              //                           ? "bg-gray-400 cursor-not-allowed"
              //                           : "bg-linear-to-r from-indigo-600 to-purple-600 hover:shadow-xl"
              //                         }`}
              //                     >
              //                       Open Course
              //                     </button>
              //                   )}
              //                 </div>
              //               </motion.div>




              <motion.div
                key={key}
                whileHover={isEnrolled ? { scale: 1.03, y: -6 } : {}}
                className={`
    relative overflow-hidden
    bg-white/90 backdrop-blur-lg 
    rounded-3xl shadow-xl p-10 text-center 
    transition-all duration-500 group

    ${isEnrolled
                    ? "hover:shadow-3xl hover:bg-indigo-50 hover:ring-4 hover:ring-indigo-300/40"
                    : "opacity-60 cursor-not-allowed"
                  }
  `}
              >

                {/* Top Gradient Border */}
                {isEnrolled && (
                  <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>
                )}

                {/* Course Title */}
                <h2 className="text-3xl font-extrabold mb-6 leading-tight">
                  {courses[key].line1}
                  <br />
                  <span className="text-indigo-600">{courses[key].line2}</span>
                </h2>

                <div className="space-y-8">

                  {/* ENROLLED / NOT ENROLLED */}
                  <div
                    className={`
        inline-block px-5 py-2 rounded-full text-lg font-bold
        ${isEnrolled ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-500"}
      `}
                  >
                    {isEnrolled ? "ENROLLED" : "NOT ENROLLED"}
                  </div>

                  {/* ASSIGNMENT STATUS */}
                  <div className="flex justify-center items-center gap-3">
                    <FiFileText className="text-indigo-600" size={28} />

                    <span
                      className={`text-lg font-bold 
          ${!isEnrolled
                          ? "text-gray-400"
                          : assignmentDone
                            ? "text-emerald-600"
                            : "text-orange-600"
                        }`}
                    >
                      {!isEnrolled
                        ? "Assignment: Not Submitted"
                        : assignmentDone
                          ? "Assignment: Submitted"
                          : "Assignment: Not Submitted"}
                    </span>
                  </div>

                  {/* EXAM STATUS */}
                  <div className="flex justify-center items-center gap-3">
                    <FiBookOpen className="text-purple-600" size={30} />
                    <span
                      className={`text-xl font-black ${exam.color === "emerald"
                          ? "text-emerald-600"
                          : exam.color === "red"
                            ? "text-red-600"
                            : exam.color === "amber"
                              ? "text-amber-600"
                              : "text-gray-600"
                        }`}
                    >
                      {exam.text}
                    </span>
                  </div>

                  {/* COURSE DURATION & EXPIRY */}
                  {isEnrolled && (
                    <div className="bg-indigo-50 rounded-2xl p-5 shadow-inner">
                      <p className="text-lg font-semibold text-indigo-700">
                        Duration:{" "}
                        <span className="font-bold">{durationText}</span>
                      </p>

                      <p className="text-md text-gray-700 mt-2">
                        {isExpired ? (
                          <span className="font-bold text-red-600">Course Expired</span>
                        ) : (
                          <>
                            Expires On:{" "}
                            <span className="font-bold text-red-600">
                              {new Date(enrollment.expiresAt).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  )}

                  {/* OPEN COURSE BUTTON */}
                  {isEnrolled && (
                    <button
                      onClick={() => !isExpired && navigate(`/modules/${key}`)}
                      disabled={isExpired}
                      className={`
          w-full mt-5 py-4 rounded-2xl font-bold text-xl text-white
          transition-all duration-300 cursor-pointer
          ${isExpired
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:from-indigo-700 hover:to-purple-700"
                        }
        `}
                    >
                      Open Course
                    </button>
                  )}
                </div>
              </motion.div>

            );
          })}




        </div>
      </div>
    </div>
  );
}















//===========correct============

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiLogOut, FiCheckCircle, FiUpload, FiFileText, FiBookOpen, FiAward } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { useAuth } from "../store/authStore";

// export default function StudentDashboard() {
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [assignmentStatus, setAssignmentStatus] = useState({});
//   const [examResults, setExamResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [enrollRes, assignRes, examRes] = await Promise.all([
//           api.get("/enrollments/my"),
//           api.get("/final-assignments/assignment-status"),
//           api.get("/final-exams/results/my"),
//         ]);

//         setEnrolledCourses(enrollRes.data.activeCourses || []);
//         setAssignmentStatus(assignRes.data || {});
//         setExamResults(examRes.data.results || []);

//         console.log("Dashboard loaded:", {
//           enrolled: enrollRes.data.activeCourses,
//           assignments: assignRes.data,
//           exams: examRes.data.results,
//         });
//       } catch (err) {
//         console.error("Dashboard load failed:", err.response?.data || err.message);
//         toast.error("Failed to load dashboard. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const courseNames = {
//     basic: { line1: "Basic", line2: "Web Development" },
//     intermediate: { line1: "Intermediate", line2: "JavaScript" },
//     advanced: { line1: "Advanced", line2: "Full Stack" },
//   };

//   const getExamStatus = (courseType) => {
//     const result = examResults.find(r => r.courseType === courseType);
//     if (!result) return { text: "Not Taken", color: "gray", icon: FiFileText };
//     if (result.passed) return { text: "PASSED", score: result.score, color: "emerald", icon: FiAward };
//     return { text: "FAILED", score: result.score, color: "red", icon: FiFileText };
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
//         <div className="w-20 h-20 border-8 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-10 border border-white/50">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//             <div>
//               <h1 className="text-5xl font-extrabold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Welcome Back!
//               </h1>
//               <p className="text-2xl text-gray-700 mt-3">
//                 Ready to continue your learning journey?
//               </p>
//             </div>
//             <button
//               onClick={() => { logout(); toast.success("Logged out"); navigate("/"); }}
//               className="bg-linear-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl hover:shadow-2xl transition"
//             >
//               <FiLogOut /> Logout
//             </button>
//           </div>
//         </div>

//         {/* Course Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {["basic", "intermediate", "advanced"].map((type) => {
//             const isEnrolled = enrolledCourses.some(c => c.courseType === type);
//             const assignmentDone = assignmentStatus[type] || false;
//             const exam = getExamStatus(type);

//             return (
//               <motion.div
//                 key={type}
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => isEnrolled && navigate(`/modules/${type}`)}
//                 className={`relative overflow-hidden rounded-3xl shadow-2xl p-10 text-white cursor-pointer transition-all
//                   ${isEnrolled ? "bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600" : "bg-gray-400/70"}
//                 `}
//               >
//                 {/* Course Name */}
//                 <h2 className="text-4xl font-extrabold text-center mb-8">
//                   {courseNames[type].line1}
//                   <br />
//                   <span className="text-2xl">{courseNames[type].line2}</span>
//                 </h2>

//                 {/* Status Indicators */}
//                 <div className="space-y-6 text-center">
//                   {/* Enrollment */}
//                   <div className={`text-2xl font-bold ${isEnrolled ? "text-white" : "text-gray-300"}`}>
//                     {isEnrolled ? "ENROLLED" : "NOT ENROLLED"}
//                   </div>

//                   {/* Assignment */}
//                   <div className="flex justify-center items-center gap-3">
//                     <FiFileText size={32} />
//                     <span className={`text-xl font-bold ${assignmentDone ? "text-emerald-300" : "text-orange-300"}`}>
//                       {assignmentDone ? "Assignment Submitted" : "Assignment Pending"}
//                     </span>
//                   </div>

//                   {/* Exam */}
//                   <div className="flex justify-center items-center gap-3">
//                     <exam.icon size={36} />
//                     <div>
//                       <div className={`text-2xl font-black text-${exam.color}-300`}>
//                         {exam.text}
//                       </div>
//                       {exam.score !== undefined && (
//                         <div className="text-lg">Score: {exam.score}%</div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Action Button */}
//                   {isEnrolled && (
//                     <button className="mt-8 w-full bg-white/20 backdrop-blur py-4 rounded-2xl font-bold text-xl hover:bg-white/30 transition">
//                       {exam.text === "Not Taken" ? "Start Course" : "Continue Learning"}
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Footer Message */}
//         <div className="text-center mt-16 text-gray-600">
//           <p className="text-2xl font-semibold">Keep pushing forward — your certificate is waiting!</p>
//         </div>
//       </div>
//     </div>
//   );
// }


