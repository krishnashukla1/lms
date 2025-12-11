
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
