
//==============with score card=============

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import {
  FiArrowLeft,
  FiAward,
  FiBookOpen,
  FiLock,
  FiBarChart2,
  FiTarget,
  FiFileText,
  FiUpload,
  FiCheckCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";
import VideoEmbed from "../components/VideoEmbed";

export default function CourseModules() {
  const { courseType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const moduleRefs = useRef({});

  const [modules, setModules] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [hasSubmittedAssignment, setHasSubmittedAssignment] = useState(false);
  const [examResult, setExamResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const highlightModuleId = location.state?.highlightModuleId;

  const courseNames = {
    basic: "Basic Web Development",
    intermediate: "Intermediate JavaScript",
    advanced: "Full Stack Mastery",
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseType) return;

      try {
        setLoading(true);
        const timestamp = Date.now();

        // Fetch all data in parallel
        const [enrollRes, assignRes, examRes, dashRes] = await Promise.all([
          api.get(`/enrollments/my?t=${timestamp}`),
          api.get(`/final-assignments/assignment-status?t=${timestamp}`),
          api.get(`/final-exams/results/my?t=${timestamp}`),
          api.get(`/student/dashboard?t=${timestamp}`),
        ]);

        // Enrollment check
        const enrolled = enrollRes.data.activeCourses?.some(
          (c) => c.courseType === courseType
        ) || false;
        setIsEnrolled(enrolled);

        // Assignment status
        const assignmentData = assignRes.data || {};
        setHasSubmittedAssignment(!!assignmentData[courseType]?.submittedAt);

        // Exam result
        const examResult = examRes.data.results?.find(
          (r) => r.courseType === courseType
        );

        // Get module scores for each module
        const allModules = dashRes.data.modules || [];
        const filteredModules = allModules.filter(
          (m) => (m.courseType || "basic") === courseType
        );

        // Fetch quiz review scores for each module that has been taken
        // const modulesWithScores = await Promise.all(
        //   filteredModules.map(async (module) => {
        //     try {
        //       // Only fetch if module has a quiz
        //       if (module.hasQuiz && module._id) {
        //         const reviewRes = await api.get(`/quiz/review/${module._id}`);
        //         if (reviewRes.data) {
        //           return {
        //             ...module,
        //             quizScore: reviewRes.data.score || 0,
        //             quizTotal: reviewRes.data.total || 0,
        //             quizPassed: reviewRes.data.passed || false,
        //             quizPercentage: reviewRes.data.total > 0
        //               ? Math.round((reviewRes.data.score / reviewRes.data.total) * 100)
        //               : 0,
        //             hasTakenQuiz: true,
        //             quizData: reviewRes.data
        //           };
        //         }
        //       }
        //       return {
        //         ...module,
        //         quizScore: 0,
        //         quizTotal: 0,
        //         quizPassed: false,
        //         quizPercentage: 0,
        //         hasTakenQuiz: false
        //       };
        //     } catch (err) {
        //       // Quiz not taken yet
        //       return {
        //         ...module,
        //         quizScore: 0,
        //         quizTotal: 0,
        //         quizPassed: false,
        //         quizPercentage: 0,
        //         hasTakenQuiz: false
        //       };
        //     }
        //   })
        // );



        const modulesWithScores = await Promise.all(
          filteredModules.map(async (module) => {
            // Skip modules without a quiz
            if (!module.hasQuiz) {
              return {
                ...module,
                quizScore: 0,
                quizTotal: 0,
                quizPassed: false,
                quizPercentage: 0,
                hasTakenQuiz: false
              };
            }

            try {
              const res = await api.get(`/quiz/review/${module._id}`);

              return {
                ...module,
                quizScore: res.data.score,
                quizTotal: res.data.total,
                quizPassed: res.data.passed,
                quizPercentage:
                  res.data.total > 0
                    ? Math.round((res.data.score / res.data.total) * 100)
                    : 0,
                hasTakenQuiz: true,
                quizData: res.data
              };
            } catch (err) {
              // ⛔ STOP 404 ERROR SPAM
              if (err.response?.status === 404) {
                return {
                  ...module,
                  quizScore: 0,
                  quizTotal: 0,
                  quizPassed: false,
                  quizPercentage: 0,
                  hasTakenQuiz: false
                };
              }

              // Log only REAL errors
              console.error("Unexpected quiz error:", err);
              return {
                ...module,
                quizScore: 0,
                quizTotal: 0,
                quizPassed: false,
                quizPercentage: 0,
                hasTakenQuiz: false
              };
            }
          })
        );


        setModules(modulesWithScores);
        setExamResult(examResult || null);
      } catch (err) {
        console.error("Failed to load course data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseType]);

  // Scroll to highlighted module
  useEffect(() => {
    if (!loading && highlightModuleId && moduleRefs.current[highlightModuleId]) {
      const el = moduleRefs.current[highlightModuleId];
      el.scrollIntoView({ behavior: "smooth", block: "center" });

      el.classList.add("ring-8", "ring-amber-400", "ring-opacity-70");
      setTimeout(() => {
        el.classList.remove("ring-8", "ring-amber-400", "ring-opacity-70");
      }, 3000);
    }
  }, [loading, highlightModuleId, modules]);

  // Early returns
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-100">
        <div className="w-20 h-20 border-8 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-pink-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Not Enrolled</h1>
          <p className="text-xl text-gray-700">You are not enrolled in this course.</p>
          <button
            onClick={() => navigate("/student")}
            className="mt-8 px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Calculate progress
  const completedModules = modules.filter((m) => m.completed).length;
  const totalModules = modules.length;
  const progressPercentage =
    totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  const nextModule = modules.find((m) => m.unlocked && !m.completed);

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100">
      {/* <div className="w-full min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100"> */}

      <div className="max-w-full mx-auto p-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/student")}
          className="cursor-pointer mb-8 flex items-center gap-4 text-indigo-700 font-bold text-xl hover:text-indigo-900 transition"
        >
          <FiArrowLeft size={32} /> Back to Dashboard
        </button>

        {/* Course Title */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-black text-center mb-16 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          {courseNames[courseType] || courseType.toUpperCase()}
        </motion.h1>

        {/* 5-Card Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-20">
          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl text-white p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-white/20 rounded-2xl">
                <FiBarChart2 className="text-4xl" />
              </div>
              <p className="text-6xl font-black">
                {progressPercentage}<span className="text-4xl">%</span>
              </p>
            </div>
            <h3 className="text-2xl font-extrabold mb-4">Course Progress</h3>
            <div className="w-full bg-white/30 rounded-full h-5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.8 }}
                className="h-full bg-linear-to-r from-yellow-400 to-pink-400 rounded-full"
              />
            </div>
            <p className="mt-4 text-lg font-semibold opacity-90">
              {completedModules} / {totalModules} Modules
            </p>
          </motion.div>

          {/* Next Module */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-linear-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl text-white p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-white/20 rounded-2xl">
                <FiTarget className="text-4xl" />
              </div>
              <h3 className="text-2xl font-extrabold">Next Lesson</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <p className="text-xl font-bold text-center">
                {nextModule?.title || "All modules completed!"}
              </p>
            </div>
          </motion.div>

          {/* Assignment */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-linear-to-br from-emerald-500/20 to-teal-600/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-300/40 p-8 text-center"
          >
            <div className="p-5 bg-emerald-100 rounded-full w-fit mx-auto mb-6">
              <FiFileText className="text-5xl text-emerald-600" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-800 mb-3">Final Assignment</h3>
            {hasSubmittedAssignment ? (
              <div className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white font-bold text-xl rounded-3xl shadow-xl">
                <FiCheckCircle className="text-3xl" /> Submitted
              </div>
            ) : (
              // <motion.button
              //   whileHover={{ scale: 1.05 }}
              //   whileTap={{ scale: 0.95 }}
              //   onClick={() => navigate("/assignment")}
              //   className="cursor-pointer inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-emerald-600 to-teal-700 text-white font-bold text-xl rounded-3xl shadow-2xl"
              // >
              //   <FiUpload className="text-3xl" /> Submit Now
              // </motion.button>


              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/assignment", { state: { courseType } })}
                className="cursor-pointer inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-emerald-600 to-teal-700 text-white font-bold text-xl rounded-3xl shadow-2xl"
              >
                <FiUpload className="text-3xl" /> Submit Now
              </motion.button>



            )}
          </motion.div>

          {/* Final Exam */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-linear-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-300/40 p-8 text-center"
          >
            <div className="p-5 bg-purple-100 rounded-full w-fit mx-auto mb-6">
              <FiBookOpen className="text-5xl text-purple-600" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-800 mb-3">Final Exam</h3>
            {examResult ? (
              // <div className={`inline-flex items-center gap-3 px-10 py-5 rounded-3xl shadow-xl font-bold text-xl text-white ${examResult.passed ? "bg-emerald-600" : "bg-red-600"}`}>
              //   <FiAward className="text-3xl" />
              //   {examResult.passed ? `PASSED (${examResult.score}%)` : `FAILED (${examResult.score}%)`}
              // </div>


              <div
                className={`inline-flex items-center gap-3 px-10 py-5 rounded-3xl shadow-xl font-bold text-xl text-white ${examResult.score >= 50 ? "bg-emerald-600" : "bg-red-600"
                  }`}
              >
                <FiAward className="text-3xl" />
                {`Final Exam: ${examResult.score}%`}
              </div>


            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/final-exam/${courseType}`)}
                className="cursor-pointer inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-3xl shadow-2xl"
              >
                <FiAward className="text-3xl" /> Start Exam
              </motion.button>
            )}
            {/* <p>Green if score ≥ 50 &nbsp; | &nbsp; Red if score &lt; 50</p> */}

          </motion.div>

          {/* View Scores Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-linear-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-300/40 p-8 text-center"
          >
            <div className="p-5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full w-fit mx-auto mb-6">
              <FiBarChart2 className="text-5xl text-white" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-800 mb-3">Performance Report</h3>

            {/* Calculate stats for the card */}
            {(() => {
              const modulesWithQuiz = modules.filter(m => m.hasTakenQuiz);
              const hasExam = !!examResult;
              const hasQuizScores = modulesWithQuiz.length > 0;

              // Calculate average quiz score
              const totalQuizScore = modulesWithQuiz.reduce((sum, m) => sum + m.quizScore, 0);
              const totalQuizPossible = modulesWithQuiz.reduce((sum, m) => sum + m.quizTotal, 0);
              const averageQuizScore = totalQuizPossible > 0
                ? Math.round((totalQuizScore / totalQuizPossible) * 100)
                : 0;

              return (
                <div className="space-y-4">
                  {/* Stats Preview */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 mb-4">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <div className="text-2xl font-black text-blue-700">
                          {modules.filter(m => m.completed).length}/{modules.length}
                        </div>
                        <div className="text-sm text-gray-600">Modules</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-emerald-700">
                          {hasExam ? `${examResult.score}%` : "N/A"}
                        </div>
                        <div className="text-sm text-gray-600">Exam</div>
                      </div>
                    </div>
                  </div>

                  {/* View Scores Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/courses/${courseType}/scores`)}
                    className="cursor-pointer w-full px-6 py-4 bg-linear-to-r from-blue-600 to-cyan-700 text-white font-bold rounded-3xl shadow-xl flex items-center justify-center gap-3"
                  >
                    <FiBarChart2 className="text-2xl" />
                    View All Scores
                  </motion.button>

                  {/* Quick Summary */}
                  <div className="text-sm text-gray-600">
                    {hasExam && hasQuizScores ? (
                      <p>Complete report available</p>
                    ) : hasExam ? (
                      <p>Exam taken, complete quizzes for full report</p>
                    ) : hasQuizScores ? (
                      <p>{modulesWithQuiz.length} quiz{modulesWithQuiz.length !== 1 ? 's' : ''} completed</p>
                    ) : (
                      <p>Complete activities to see scores</p>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </div>

        {/* Score Summary Encouragement */}
        {/* <div className="mb-20 text-center py-8">
          <div className="inline-flex items-center gap-4 px-8 py-6 bg-linear-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-200">
            <FiBarChart2 className="text-4xl text-blue-600" />
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-800">Track Your Progress</h3>
              <p className="text-gray-600">
                Click "View All Scores" to see your detailed performance report
              </p>
            </div>
          </div>
        </div> */}

        {/* Modules Section */}
        <h2 className="text-4xl font-black mb-12 bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Your Learning Journey
        </h2>

        {modules.length === 0 ? (
          <div className="text-center p-20 bg-white/80 backdrop-blur rounded-3xl shadow-xl">
            <p className="text-2xl text-gray-600">No modules available yet.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {modules.map((mod, index) => {
              const isNext = nextModule?._id === mod._id;
              const isLocked = !mod.unlocked;
              const isCompleted = mod.completed;

              return (
                <motion.div
                  key={mod._id}
                  ref={(el) => (moduleRefs.current[mod._id] = el)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  // className={`relative overflow-hidden rounded-3xl shadow-2xl border-4 transition-all
                  className={`relative overflow-hidden rounded-2xl shadow-xl border-2 transition-all

                    ${isCompleted
                      ? "bg-linear-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500"
                      : isNext
                        ? "bg-linear-to-br from-amber-500/20 to-orange-500/20 border-amber-500 ring-4 ring-amber-300/50"
                        : "bg-white/90 border-gray-300"
                    }`}
                >
                  {/* Badges */}
                  <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
                    {isCompleted && (
                      <span className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-full text-sm uppercase">
                        Completed
                      </span>
                    )}
                    {/* {mod.score !== null && (
                      <span className={`px-5 py-3 rounded-full text-white font-bold text-sm ${mod.score === mod.total ? "bg-emerald-600" : "bg-orange-600"}`}>
                        {mod.score}/{mod.total}
                      </span>
                    )} */}
                    {isNext && !isCompleted && (
                      <span className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full animate-pulse text-sm uppercase">
                        Next Up
                      </span>
                    )}
                    {isLocked && (
                      <span className="px-6 py-3 bg-gray-500 text-white font-bold rounded-full text-sm uppercase">
                        Locked
                      </span>
                    )}
                  </div>

                  {/* <div className="p-10"> */}
                  <div className="p-6">

                    {/* <div className="flex items-start gap-8 mb-8"> */}
                    <div className="flex items-start gap-4 mb-4">

                      {/* <div className="text-6xl font-black text-indigo-700">#{index + 1}</div> */}
                      <div className="text-4xl font-black text-indigo-700">#{index + 1}</div>

                      <div>
                        <h3 className={`text-2xl font-bold mb-2 ${isLocked ? "text-gray-500" : "text-gray-800"}`}>
                          {mod.title}
                        </h3>
                        <p className={`text-lg leading-relaxed ${isLocked ? "text-gray-500" : "text-gray-600"}`}>
                          {mod.description || "No description available."}
                        </p>
                      </div>
                    </div>

                    {/* Materials */}
                    {mod.materials?.length > 0 && !isLocked && (
                      <div className="mb-12">
                        <h4 className="text-xl font-bold mb-4 flex items-center gap-3 text-gray-800">
                          <FiBookOpen className="text-indigo-600" /> Learning Materials
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Videos */}
                          <div className="space-y-8">
                            {mod.materials
                              .filter((m) => m.materialType === "video")
                              .map((mat, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -30 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="bg-white rounded-3xl shadow-xl overflow-hidden"
                                >
                                  <div className="p-6 bg-linear-to-r from-indigo-50 to-purple-50">
                                    <h5 className="text-xl font-bold text-indigo-700">
                                      Video {i + 1} — {mat.title}
                                    </h5>
                                  </div>
                                  <div className="p-6">
                                    <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                                      <VideoEmbed url={mat.url} title={mat.title} />
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                          </div>

                          {/* Resources */}
                          <div className="space-y-6">
                            {mod.materials
                              .filter((m) => m.materialType !== "video")
                              .map((mat, i) => (
                                <motion.a
                                  key={i}
                                  href={mat.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ x: 10 }}
                                  className="block bg-linear-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <FiFileText className="text-3xl" />
                                      <div>
                                        <p className="font-bold text-lg">
                                          {mat.title || "Resource"}
                                        </p>
                                        <p className="text-sm opacity-90">
                                          Click to {mat.materialType === "pdf" ? "download" : "open"}
                                        </p>
                                      </div>
                                    </div>
                                    <span className="text-3xl">→</span>
                                  </div>
                                </motion.a>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {isLocked && (
                      <div className="text-center py-16">
                        <FiLock className="mx-auto text-8xl text-gray-400 mb-6" />
                        <p className="text-2xl font-bold text-gray-600">Module Locked</p>
                        <p className="text-lg text-gray-500">Complete previous modules to unlock</p>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="flex justify-end mt-10">
                      {isCompleted && mod.hasQuiz ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/quiz/review/${mod._id}`)}
                          className="cursor-pointer px-10 py-5 bg-linear-to-r from-blue-500 to-cyan-600 text-white font-bold rounded-3xl shadow-xl flex items-center gap-4"
                        >
                          <FiBookOpen size={28} /> Review Quiz
                        </motion.button>
                      ) : isLocked ? (
                        <button disabled className="px-10 py-5 bg-gray-300 text-gray-600 rounded-3xl font-bold flex items-center gap-4">
                          <FiLock size={28} /> Locked
                        </button>
                      ) : mod.hasQuiz ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/quiz/module/${mod._id}`)}
                          className="cursor-pointer px-10 py-5 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-3xl shadow-xl flex items-center gap-4"
                        >
                          <FiAward size={28} /> Start Quiz
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate("/student", { state: { highlightModuleId: mod._id } })}
                          className="px-10 py-5 bg-linear-to-r from-indigo-600 to-purple-700 text-white font-bold rounded-3xl shadow-xl"
                        >
                          View Content
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


//====================with assignment===========

// CourseModules.jsx - FIXED & CLEAN

// import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import api from "../api/axios";
// import { FiArrowLeft, FiAward, FiBookOpen, FiLock } from "react-icons/fi";
// import { motion } from "framer-motion";
// import VideoEmbed from "../components/VideoEmbed";
// import AssignmentSubmitCard from "../components/AssignmentSubmitCard";

// export default function CourseModules() {
//   const { courseType } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ALL HOOKS AT THE TOP — NO EARLY RETURNS BEFORE THIS!
//   const moduleRefs = useRef({});
//   const [modules, setModules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hasSubmitted, setHasSubmitted] = useState(false); // For final assignment

//   const highlightModuleId = location.state?.highlightModuleId;

//   const courseNames = {
//     basic: "Basic Web Development",
//     intermediate: "Intermediate JavaScript",
//     advanced: "Full Stack Mastery",
//   };

//   // Fetch modules for this course
//   useEffect(() => {
//     const fetchModules = async () => {
//       try {
//         const res = await api.get("/student/dashboard");
//         const filtered = (res.data.modules || []).filter(
//           (m) => (m.courseType || "basic") === courseType
//         );
//         setModules(filtered);
//       } catch (err) {
//         alert("Failed to load modules");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchModules();
//   }, [courseType]);

//   // Fetch assignment submission status (only once)
//   useEffect(() => {
//     const fetchAssignmentStatus = async () => {
//       try {
//         const assignRes = await api.get("/assignments/assignment-status");
//         setHasSubmitted(!!assignRes.data.submitted);
//       } catch (err) {
//         console.error("Failed to check assignment status", err);
//         // Don't break the whole page if this fails
//       }
//     };
//     fetchAssignmentStatus();
//   }, []);

//   // Auto-scroll to highlighted module
//   useEffect(() => {
//     if (!loading && highlightModuleId && moduleRefs.current[highlightModuleId]) {
//       const el = moduleRefs.current[highlightModuleId];
//       el.scrollIntoView({ behavior: "smooth", block: "center" });
//       el.classList.add("ring-8", "ring-amber-400", "ring-opacity-70");
//       setTimeout(() => {
//         el.classList.remove("ring-8", "ring-amber-400", "ring-opacity-70");
//       }, 3000);
//     }
//   }, [loading, highlightModuleId]);

//   // EARLY RETURN — NOW SAFE (after all hooks!)
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-100">
//         <div className="w-20 h-20 border-8 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (modules.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-2xl text-gray-600">No modules found for this course.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100">
//       <div className="max-w-7xl mx-auto p-8 py-12">

//         {/* Back Button */}
//         <button
//           onClick={() => navigate("/student")}
//           className="mb-12 flex items-center gap-4 text-indigo-700 font-bold text-xl hover:text-indigo-900 transition"
//         >
//           <FiArrowLeft size={32} /> Back to Dashboard
//         </button>

//         {/* Course Title */}
//         <motion.h1
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-7xl font-black text-center mb-16 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
//         >
//           {courseNames[courseType] || courseType}
//         </motion.h1>

//         {/* Modules List */}
//         <div className="space-y-12">
//           {modules.map((mod, index) => {
//             const isNext = mod.unlocked && !mod.completed;
//             const isLocked = !mod.unlocked;
//             const isCompleted = mod.completed;

//             return (
//               <motion.div
//                 key={mod._id}
//                 ref={(el) => (moduleRefs.current[mod._id] = el)}
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ scale: isLocked ? 1 : 1.02 }}
//                 className={`relative overflow-hidden rounded-3xl shadow-2xl border-4 transition-all duration-500
//                   ${isCompleted
//                     ? "bg-linear-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500"
//                     : isNext
//                     ? "bg-linear-to-br from-amber-500/20 to-orange-500/20 border-amber-500 shadow-2xl ring-4 ring-amber-300/50"
//                     : "bg-white/90 backdrop-blur border-gray-300 opacity-90"
//                   }`}
//               >
//                 {/* Status Badges */}
//                 <div className="absolute top-6 right-6 z-10 flex flex-col gap-3 items-end">
//                   {isCompleted && (
//                     <span className="px-6 py-3 rounded-full bg-emerald-500 text-white font-bold shadow-lg text-sm uppercase tracking-wider">
//                       Completed
//                     </span>
//                   )}
//                   {mod.score !== null && mod.total !== null && (
//                     <span className={`px-5 py-3 rounded-full text-white font-bold shadow-lg text-sm ${mod.score === mod.total ? "bg-emerald-600" : "bg-orange-600"}`}>
//                       {mod.score}/{mod.total}
//                     </span>
//                   )}
//                   {isNext && !isCompleted && (
//                     <span className="px-6 py-3 rounded-full bg-linear-to-r from-amber-500 to-orange-500 text-white font-bold shadow-lg animate-pulse text-sm uppercase tracking-wider">
//                       Next Up
//                     </span>
//                   )}
//                   {isLocked && (
//                     <span className="px-6 py-3 rounded-full bg-gray-500 text-white font-bold shadow-lg text-sm uppercase tracking-wider">
//                       Locked
//                     </span>
//                   )}
//                 </div>

//                 <div className="p-10">
//                   <div className="flex items-start gap-6 mb-8">
//                     <div className="text-6xl font-black text-indigo-700">#{index + 1}</div>
//                     <div>
//                       <h2 className={`text-4xl font-bold mb-3 ${isLocked ? "text-gray-500" : "text-gray-800"}`}>
//                         {mod.title}
//                       </h2>
//                       <p className={`text-xl leading-relaxed ${isLocked ? "text-gray-500 italic" : "text-gray-600"}`}>
//                         {mod.description}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Materials */}
//                   {mod.materials && mod.materials.length > 0 && (
//                     <div className="space-y-8 mb-10">
//                       {mod.materials.map((mat, i) => {
//                         const type = mat.materialType || mat.type || "link";
//                         const url = mat.url;
//                         const title = mat.title || `Resource ${i + 1}`;
//                         const isVideo = type === "video" && (url.includes("youtube") || url.includes("vimeo"));

//                         if (isLocked) {
//                           return (
//                             <div key={i} className="flex items-center gap-4 px-8 py-5 bg-gray-100 text-gray-500 rounded-2xl opacity-70">
//                               <span className="font-medium capitalize">{type}</span>
//                               <span className="text-sm">— {title}</span>
//                             </div>
//                           );
//                         }

//                         if (isVideo) {
//                           return (
//                             <motion.div
//                               key={i}
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200"
//                             >
//                               <div className="p-6 bg-linear-to-r from-indigo-50 to-purple-50">
//                                 <h4 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-3">
//                                   Video {i + 1} — {title}
//                                 </h4>
//                                 <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
//                                   <VideoEmbed url={url} title={title} />
//                                 </div>
//                               </div>
//                             </motion.div>
//                           );
//                         }

//                         return (
//                           <motion.a
//                             key={i}
//                             href={url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             initial={{ opacity: 0, x: -30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="inline-flex items-center gap-4 px-10 py-6 bg-linear-to-r from-indigo-600 to-purple-700 text-white rounded-3xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
//                           >
//                             {type === "pdf" && "PDF Document"}
//                             {type === "link" && "External Link"}
//                             {type === "video" && "Watch Video"}
//                             <span className="ml-4">→</span>
//                           </motion.a>
//                         );
//                       })}
//                     </div>
//                   )}

//                   {/* Action Buttons */}
//                   <div className="flex justify-end gap-6 mt-10">
//                     {isCompleted && mod.hasQuiz ? (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => navigate(`/quiz/review/${mod._id}`)}
//                         className="px-10 py-5 rounded-3xl font-bold text-xl flex items-center gap-4 bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-xl hover:shadow-2xl"
//                       >
//                         <FiBookOpen size={28} /> Review Quiz
//                       </motion.button>
//                     ) : isLocked ? (
//                       <button disabled className="px-10 py-5 rounded-3xl font-bold text-xl bg-gray-300 text-gray-600 cursor-not-allowed flex items-center gap-4">
//                         <FiLock size={28} /> Locked
//                       </button>
//                     ) : mod.hasQuiz ? (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => navigate(`/quiz/module/${mod._id}`)}
//                         className="px-10 py-5 rounded-3xl font-bold text-xl flex items-center gap-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-xl hover:shadow-2xl"
//                       >
//                         <FiAward size={28} /> Start Quiz
//                       </motion.button>
//                     ) : (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => navigate("/student", { state: { highlightModuleId: mod._id } })}
//                         className="px-10 py-5 rounded-3xl font-bold text-xl bg-linear-to-r from-indigo-600 to-purple-700 text-white shadow-xl hover:shadow-2xl"
//                       >
//                         View Content
//                       </motion.button>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Final Assignment Card - Placed at the bottom */}
//         <div className="mt-20">
//           <AssignmentSubmitCard hasSubmitted={hasSubmitted} />
//         </div>

//       </div>
//     </div>
//   );
// }