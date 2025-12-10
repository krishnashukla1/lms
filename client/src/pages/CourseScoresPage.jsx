//correct

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiArrowLeft, FiBarChart2, FiAward, FiBook, FiTrendingUp } from "react-icons/fi";
// import { motion } from "framer-motion";
// import ScoreTable from "./ScoreTable";

// export default function CourseScoresPage() {
//   const { courseType } = useParams();
//   const navigate = useNavigate();

//   const [modules, setModules] = useState([]);
//   const [examResult, setExamResult] = useState(null);
//   const [examReview, setExamReview] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hasSubmittedAssignment, setHasSubmittedAssignment] = useState(false);

//   const courseNames = {
//     basic: "Basic Web Development",
//     intermediate: "Intermediate JavaScript",
//     advanced: "Full Stack Mastery",
//   };

//   useEffect(() => {
//     const fetchAllScores = async () => {
//       try {
//         setLoading(true);
//         const timestamp = Date.now();

//         // Fetch all data
//         const [examRes, examReviewRes, dashRes, assignRes] = await Promise.all([
//           api.get(`/final-exams/results/my?t=${timestamp}`),
//           api.get(`/final-exams/review/my?t=${timestamp}`), // ADD THIS
//           api.get(`/student/dashboard?t=${timestamp}`),
//           api.get(`/final-assignments/assignment-status?t=${timestamp}`),
//         ]);

//         // Exam result
//         const examResult = examRes.data.results?.find(
//           (r) => r.courseType === courseType
//         );

//         const examReview = examReviewRes.data.results?.find(r => r.courseType === courseType);

//         // Assignment status
//         const assignmentData = assignRes.data || {};
//         setHasSubmittedAssignment(!!assignmentData[courseType]?.submittedAt);

//         // Get module scores
//         const allModules = dashRes.data.modules || [];
//         const filteredModules = allModules.filter(
//           (m) => (m.courseType || "basic") === courseType
//         );

//         // const modulesWithScores = await Promise.all(
//         //   filteredModules.map(async (module) => {
//         //     try {
//         //       if (module.hasQuiz && module._id) {
//         //         const reviewRes = await api.get(`/quiz/review/${module._id}`);
//         //         if (reviewRes.data) {
//         //           return {
//         //             ...module,
//         //             quizScore: reviewRes.data.score || 0,
//         //             quizTotal: reviewRes.data.total || 0,
//         //             // quizPassed: reviewRes.data.passed || false,

//         //             quizPassed: reviewRes.data.passed === true ||
//         //               (reviewRes.data.total > 0 &&
//         //                 (reviewRes.data.score / reviewRes.data.total) >= 0.7),


//         //             quizPercentage: reviewRes.data.total > 0
//         //               ? Math.round((reviewRes.data.score / reviewRes.data.total) * 100)
//         //               : 0,
//         //             hasTakenQuiz: true,
//         //             quizData: reviewRes.data
//         //           };
//         //         }
//         //       }

//         const modulesWithScores = await Promise.all(
//           filteredModules.map(async (module) => {
//             try {
//               if (module.hasQuiz && module._id) {
//                 const reviewRes = await api.get(`/quiz/review/${module._id}`);
//                 if (reviewRes.data) {
//                   const score = reviewRes.data.score || 0;
//                   const total = reviewRes.data.total || 0;
//                   const percentage = total > 0 ? (score / total) : 0;
//                   const passed = reviewRes.data.passed === true || percentage >= 0.7;

//                   return {
//                     ...module,
//                     quizScore: score,
//                     quizTotal: total,
//                     quizPassed: passed,
//                     quizPercentage: Math.round(percentage * 100),
//                     hasTakenQuiz: true,
//                     quizData: reviewRes.data
//                   };
//                 }
//               }
//               return {
//                 ...module,
//                 quizScore: 0,
//                 quizTotal: 0,
//                 quizPassed: false,
//                 quizPercentage: 0,
//                 hasTakenQuiz: false
//               };
//             } catch (err) {
//               return {
//                 ...module,
//                 quizScore: 0,
//                 quizTotal: 0,
//                 quizPassed: false,
//                 quizPercentage: 0,
//                 hasTakenQuiz: false
//               };
//             }
//           })
//         );

//         setModules(modulesWithScores);
//         setExamResult(examResult || null);
//         setExamReview(examReview || null); // Add state

//       } catch (err) {
//         console.error("Failed to load scores:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllScores();
//   }, [courseType]);

//   // Calculate statistics
//   const completedModules = modules.filter(m => m.completed).length;
//   const totalModules = modules.length;
//   const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
//   const modulesWithQuiz = modules.filter(m => m.hasTakenQuiz);
//   const passedModules = modules.filter(m => m.quizPassed).length;
//   const totalQuizScore = modulesWithQuiz.reduce((sum, m) => sum + m.quizScore, 0);
//   const totalQuizPossible = modulesWithQuiz.reduce((sum, m) => sum + m.quizTotal, 0);
//   const averageQuizPercentage = totalQuizPossible > 0
//     ? Math.round((totalQuizScore / totalQuizPossible) * 100)
//     : 0;

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-100">
//         <div className="w-20 h-20 border-8 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100">
//       <div className="max-w-7xl mx-auto p-8 py-12">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-12">
//           <button
//             onClick={() => navigate(`/modules/${courseType}`)}
//             className="cursor-pointer flex items-center gap-4 text-indigo-700 font-bold text-xl hover:text-indigo-900 transition"
//           >
//             <FiArrowLeft size={32} /> Back to Course
//           </button>

//           <div className="text-right">
//             <h1 className="text-5xl font-black bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Performance Report
//             </h1>
//             <p className="text-xl text-gray-600">{courseNames[courseType]}</p>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
//           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-indigo-100 rounded-xl">
//                 <FiTrendingUp className="text-2xl text-indigo-600" />
//               </div>
//               <div>
//                 <div className="text-3xl font-black text-gray-900">{progressPercentage}%</div>
//                 <div className="text-gray-600">Course Progress</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-emerald-100 rounded-xl">
//                 <FiBook className="text-2xl text-emerald-600" />
//               </div>
//               <div>
//                 <div className="text-3xl font-black text-gray-900">{passedModules}/{modulesWithQuiz.length}</div>
//                 <div className="text-gray-600">Quizzes Passed</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-amber-100 rounded-xl">
//                 <FiBarChart2 className="text-2xl text-amber-600" />
//               </div>
//               <div>
//                 <div className="text-3xl font-black text-gray-900">{averageQuizPercentage}%</div>
//                 <div className="text-gray-600">Quiz Average</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-purple-100 rounded-xl">
//                 <FiAward className="text-2xl text-purple-600" />
//               </div>
//               <div>
//                 <div className="text-3xl font-black text-gray-900">
//                   {examResult ? `${examResult.score}%` : "N/A"}
//                 </div>
//                 <div className="text-gray-600">Final Exam</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Assignment Status */}
//         {hasSubmittedAssignment && (
//           <div className="mb-12 p-6 bg-linear-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-emerald-100 rounded-xl">
//                   <FiAward className="text-2xl text-emerald-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-800">Assignment Submitted</h3>
//                   {/* <p className="text-gray-600">Your final assignment has been submitted and is under review</p> */}
//                   <p className="text-gray-600">Your final assignment has been submitted</p>

//                 </div>
//               </div>
//               {/* <span className="px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-bold">
//                 PENDING REVIEW
//               </span> */}
//               <span className="px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-bold">
//                 SUBMITTED
//               </span>
//             </div>
//           </div>
//         )}

//         {/* Main Score Table */}
//         <div className="mb-12">
//           <ScoreTable
//             examResult={examResult}
//             examReview={examReview}
//             modules={modules}
//             courseType={courseType}
//             courseName={courseNames[courseType] || courseType.toUpperCase()}
//           />
//         </div>


//         {/* Action Buttons */}
//         <div className="flex justify-center gap-6">
//           <button
//             onClick={() => navigate(`/modules/${courseType}`)}
//             className="cursor-pointer px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
//           >
//             Back to Learning
//           </button>
//           <button
//             onClick={() => window.print()}
//             className="cursor-pointer px-8 py-4 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition"
//           >
//             Print Report
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

//================certificate====================


//===============chat gpt=========================================


// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiArrowLeft, FiBarChart2, FiAward, FiBook, FiTrendingUp } from "react-icons/fi";
// import ScoreTable from "./ScoreTable";

// // Certificate Component
// function Certificate({ studentName, courseName, finalScore, date, onClose }) {
//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
//       <div className="certificate bg-white p-12 rounded-xl shadow-2xl w-full max-w-4xl text-center relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Close
//         </button>
//         <h1 className="text-5xl font-bold text-indigo-700 mb-6">Certificate of Completion</h1>
//         <p className="text-xl text-gray-700 mb-6">This certifies that</p>
//         <h2 className="text-3xl font-extrabold text-gray-900 mb-6">{studentName}</h2>
//         <p className="text-xl text-gray-700 mb-6">has successfully completed the course</p>
//         <h3 className="text-2xl font-bold text-indigo-600 mb-6">{courseName}</h3>
//         <p className="text-lg text-gray-700 mb-4">
//           Final Score: <span className="font-semibold">{finalScore}%</span>
//         </p>
//         <p className="text-gray-500 mt-8">Date: {date}</p>
//         <div className="mt-12 flex justify-between items-center px-12">
//           <span className="border-t border-gray-700">Instructor</span>
//           <span className="border-t border-gray-700">Student</span>
//         </div>
//         <button
//           onClick={() => window.print()}
//           className="mt-8 px-6 py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-800"
//         >
//           Print Certificate
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function CourseScoresPage() {
//   const { courseType } = useParams();
//   const navigate = useNavigate();

//   const [modules, setModules] = useState([]);
//   const [examResult, setExamResult] = useState(null);
//   const [examReview, setExamReview] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hasSubmittedAssignment, setHasSubmittedAssignment] = useState(false);
//   const [showCertificate, setShowCertificate] = useState(false);
//   const [studentName, setStudentName] = useState("");

//   const courseNames = {
//     basic: "Basic Web Development",
//     intermediate: "Intermediate JavaScript",
//     advanced: "Full Stack Mastery",
//   };

//   useEffect(() => {
//     const fetchAllScores = async () => {
//       try {
//         setLoading(true);
//         const timestamp = Date.now();

//         const [examRes, examReviewRes, dashRes, assignRes] = await Promise.all([
//           api.get(`/final-exams/results/my?t=${timestamp}`),
//           api.get(`/final-exams/review/my?t=${timestamp}`),
//           api.get(`/student/dashboard?t=${timestamp}`),
//           api.get(`/final-assignments/assignment-status?t=${timestamp}`),
//         ]);

//         // Exam result
//         const examResult = examRes.data.results?.find(
//           (r) => r.courseType === courseType
//         );
//         const examReview = examReviewRes.data.results?.find(r => r.courseType === courseType);

//         // Assignment status
//         const assignmentData = assignRes.data || {};
//         setHasSubmittedAssignment(!!assignmentData[courseType]?.submittedAt);

//         // Student Name
//         if (dashRes.data.student) setStudentName(dashRes.data.student.name || "");

//         // Module scores
//         const allModules = dashRes.data.modules || [];
//         const filteredModules = allModules.filter(
//           (m) => (m.courseType || "basic") === courseType
//         );

//         const modulesWithScores = await Promise.all(
//           filteredModules.map(async (module) => {
//             try {
//               if (module.hasQuiz && module._id) {
//                 const reviewRes = await api.get(`/quiz/review/${module._id}`);
//                 if (reviewRes.data) {
//                   const score = reviewRes.data.score || 0;
//                   const total = reviewRes.data.total || 0;
//                   const percentage = total > 0 ? score / total : 0;
//                   const passed = reviewRes.data.passed === true || percentage >= 0.7;

//                   return {
//                     ...module,
//                     quizScore: score,
//                     quizTotal: total,
//                     quizPassed: passed,
//                     quizPercentage: Math.round(percentage * 100),
//                     hasTakenQuiz: true,
//                     quizData: reviewRes.data
//                   };
//                 }
//               }
//               return {
//                 ...module,
//                 quizScore: 0,
//                 quizTotal: 0,
//                 quizPassed: false,
//                 quizPercentage: 0,
//                 hasTakenQuiz: false
//               };
//             } catch (err) {
//               return {
//                 ...module,
//                 quizScore: 0,
//                 quizTotal: 0,
//                 quizPassed: false,
//                 quizPercentage: 0,
//                 hasTakenQuiz: false
//               };
//             }
//           })
//         );

//         setModules(modulesWithScores);
//         setExamResult(examResult || null);
//         setExamReview(examReview || null);
//       } catch (err) {
//         console.error("Failed to load scores:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllScores();
//   }, [courseType]);

//   // Statistics
//   const completedModules = modules.filter(m => m.completed).length;
//   const totalModules = modules.length;
//   const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
//   const modulesWithQuiz = modules.filter(m => m.hasTakenQuiz);
//   const passedModules = modules.filter(m => m.quizPassed).length;
//   const totalQuizScore = modulesWithQuiz.reduce((sum, m) => sum + m.quizScore, 0);
//   const totalQuizPossible = modulesWithQuiz.reduce((sum, m) => sum + m.quizTotal, 0);
//   const averageQuizPercentage = totalQuizPossible > 0
//     ? Math.round((totalQuizScore / totalQuizPossible) * 100)
//     : 0;

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-100">
//       <div className="w-20 h-20 border-8 border-t-indigo-600 rounded-full animate-spin"></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-indigo-100">
//       <div className="max-w-7xl mx-auto p-8 py-12">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-12">
//           <button
//             onClick={() => navigate(`/modules/${courseType}`)}
//             className="cursor-pointer flex items-center gap-4 text-indigo-700 font-bold text-xl hover:text-indigo-900 transition"
//           >
//             <FiArrowLeft size={32} /> Back to Course
//           </button>

//           <div className="text-right">
//             <h1 className="text-5xl font-black bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Performance Report
//             </h1>
//             <p className="text-xl text-gray-600">{courseNames[courseType]}</p>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
//           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-indigo-100 rounded-xl">
//                 <FiTrendingUp className="text-2xl text-indigo-600" />
//               </div>
//               <div>
//                 <div className="text-3xl font-black text-gray-900">{progressPercentage}%</div>
//                 <div className="text-gray-600">Course Progress</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-emerald-100 rounded-xl">
//                 <FiBook className="text-2xl text-emerald-600" />
//               </div>
//               <div>
//                 <div className="text-3xl font-black text-gray-900">{passedModules}/{modulesWithQuiz.length}</div>
//                 <div className="text-gray-600">Quizzes Passed</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-amber-100 rounded-xl">
//                 <FiBarChart2 className="text-2xl text-amber-600" />
//               </div>
//               <div>
//                 <div className="text-3xl font-black text-gray-900">{averageQuizPercentage}%</div>
//                 <div className="text-gray-600">Quiz Average</div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-purple-100 rounded-xl">
//                 <FiAward className="text-2xl text-purple-600" />
//               </div>
//               <div>
//                 <div className="text-3xl font-black text-gray-900">
//                   {examResult ? `${examResult.score}%` : "N/A"}
//                 </div>
//                 <div className="text-gray-600">Final Exam</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Assignment Status */}
//         {hasSubmittedAssignment && (
//           <div className="mb-12 p-6 bg-linear-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-emerald-100 rounded-xl">
//                   <FiAward className="text-2xl text-emerald-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-800">Assignment Submitted</h3>
//                   <p className="text-gray-600">Your final assignment has been submitted</p>
//                 </div>
//               </div>
//               <span className="px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-bold">
//                 SUBMITTED
//               </span>
//             </div>
//           </div>
//         )}

//         {/* Score Table */}
//         <div className="mb-12">
//           <ScoreTable
//             examResult={examResult}
//             examReview={examReview}
//             modules={modules}
//             courseType={courseType}
//             courseName={courseNames[courseType] || courseType.toUpperCase()}
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-center gap-6">
//           <button
//             onClick={() => navigate(`/modules/${courseType}`)}
//             className="cursor-pointer px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
//           >
//             Back to Learning
//           </button>

//           <button
//             onClick={() => setShowCertificate(true)}
//             className="cursor-pointer px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition"
//           >
//             Certificate Ready
//           </button>

//           <button
//             onClick={() => window.print()}
//             className="cursor-pointer px-8 py-4 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition"
//           >
//             Print Report
//           </button>
//         </div>

//         {/* Certificate Preview */}
//         {showCertificate && (
//           <Certificate
//             studentName={studentName || "Student Name"}
//             courseName={courseNames[courseType]}
//             finalScore={examResult?.score || 0}
//             date={new Date().toLocaleDateString()}
//             onClose={() => setShowCertificate(false)}
//           />
//         )}

//       </div>
//     </div>
//   );
// }

//========grok============

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiArrowLeft, FiTrendingUp, FiBook, FiBarChart2, FiAward, FiDownload } from "react-icons/fi";
// import ScoreTable from "./ScoreTable";

// function Certificate({ studentName, courseName, finalScore, date, onClose }) {
//   return (
//     <>
//       <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-auto">
//         <div class="certificate-container bg-white rounded-2xl shadow-2xl max-w-5xl w-full relative mt-20">
//           <button
//             onClick={onClose}
//             className="cursor-pointer absolute top-4 right-4 z-10 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
//           >
//             Close ×
//           </button>

//           {/* Printable Certificate */}
//           <div
//             className="
//     certificate 
//     max-w-3xl mx-auto 
//     print:max-w-2xl print:mx-auto 
//     print:border-0 print:shadow-none print:rounded-none print:bg-white
//   "
//           >
//             <div className="border-16 border-double border-indigo-800 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-12 md:p-16 relative">

//               {/* Decorative Border */}
//               <div className="absolute inset-8 border-4 border-indigo-300 rounded-3xl opacity-30"></div>
//               <div className="absolute inset-12 border-2 border-purple-400 rounded-3xl opacity-20"></div>

//               <div className="relative z-10 text-center">
//                 {/* Header */}
//                 <div className="mb-8">
//                   <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                     Certificate of Completion
//                   </h1>
//                   <p className="text-xl text-gray-700 mt-4 font-light">Proudly Presented To</p>
//                 </div>

//                 {/* Student Name */}
//                 <div className="my-10 py-6 border-y-4 border-dashed border-indigo-300">
//                   <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-wider">
//                     {studentName || "Valued Student"}
//                   </h2>
//                 </div>

//                 {/* Course */}
//                 <p className="text-xl text-gray-700 mb-6">For successfully completing the course</p>
//                 <h3 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-8 px-8">
//                   {courseName}
//                 </h3>

//                 {/* Score & Date */}
//                 <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto my-10 text-lg">
//                   <div className="bg-white/80 backdrop-blur px-6 py-3 rounded-xl shadow-md border border-indigo-200">
//                     <p className="text-gray-600">Final Score</p>
//                     <p className="text-3xl font-bold text-indigo-600">{finalScore}%</p>
//                   </div>
//                   <div className="bg-white/80 backdrop-blur px-6 py-3 rounded-xl shadow-md border border-purple-200">
//                     <p className="text-gray-600">Issued On</p>
//                     <p className="text-xl font-bold text-purple-600">{date}</p>
//                   </div>
//                 </div>

//                 {/* Signatures */}
//                 <div className="flex justify-around items-end mt-12 max-w-3xl mx-auto">
//                   <div className="text-center">
//                     <div className="w-40 border-t-2 border-gray-700 mb-2"></div>
//                     <p className="text-gray-700 font-medium">Course Instructor</p>
//                   </div>
//                   <div className="text-center">
//                     <div className="w-40 border-t-2 border-gray-700 mb-2"></div>
//                     <p className="text-gray-700 font-medium">Director of Education</p>
//                   </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="mt-10 text-indigo-600 font-semibold text-lg tracking-widest">
//                   EXCELLENCE IN LEARNING • 2025
//                 </div>
//               </div>
//             </div>
//             {/* <div className="text-center p-6 print:hidden">
//               <button
//                 onClick={() => window.print}
//                 className="cursor-pointer inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
//               >
//                 <FiDownload size={24} />
//                 Download / Print Certificate
//               </button>
//             </div> */}
//           </div>


//           {/* Print Button */}
//           <div className="text-center p-6 print:hidden">
//             <button
//               onClick={() => window.print}
//               className="cursor-pointer inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
//             >
//               <FiDownload size={24} />
//               Download / Print Certificate
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Print-only Styles */}
//       <style jsx>{`
//         @media print {
//           body * {
//             visibility: hidden;
//           }
//           .certificate-container,
//           .certificate-container * {
//             visibility: visible;
//           }
//           .certificate-container {
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 100%;
//             height: 100%;
//           }
//           .certificate {
//             margin: 0 !important;
//             padding: 40px !important;
//             border: none !important;
//             box-shadow: none !important;
//             border-radius: 0 !important;
//           }
//           @page {
//             size: A4 landscape;
//             margin: 0;
//           }
//           body {
//             margin: 0;
//             padding: 0;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

// export default function CourseScoresPage() {
//   const { courseType } = useParams();
//   const navigate = useNavigate();

//   const [modules, setModules] = useState([]);
//   const [examResult, setExamResult] = useState(null);
//   const [examReview, setExamReview] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hasSubmittedAssignment, setHasSubmittedAssignment] = useState(false);
//   const [showCertificate, setShowCertificate] = useState(false);
//   const [studentName, setStudentName] = useState("");

//   const courseNames = {
//     basic: "Basic Web Development",
//     intermediate: "Intermediate JavaScript Mastery",
//     advanced: "Full Stack Developer Professional",
//   };

//   useEffect(() => {
//     const fetchAllScores = async () => {
//       try {
//         setLoading(true);
//         const timestamp = Date.now();

//         const [examRes, examReviewRes, dashRes, assignRes] = await Promise.all([
//           api.get(`/final-exams/results/my?t=${timestamp}`),
//           api.get(`/final-exams/review/my?t=${timestamp}`),
//           api.get(`/student/dashboard?t=${timestamp}`),
//           api.get(`/final-assignments/assignment-status?t=${timestamp}`),
//         ]);

//         const examResult = examRes.data.results?.find(r => r.courseType === courseType);
//         const examReview = examReviewRes.data.results?.find(r => r.courseType === courseType);

//         const assignmentData = assignRes.data || {};
//         setHasSubmittedAssignment(!!assignmentData[courseType]?.submittedAt);

//         if (dashRes.data.student) setStudentName(dashRes.data.student.name || "");

//         const allModules = dashRes.data.modules || [];
//         const filteredModules = allModules.filter(m => (m.courseType || "basic") === courseType);

//         const modulesWithScores = await Promise.all(
//           filteredModules.map(async (module) => {
//             if (module.hasQuiz && module._id) {
//               try {
//                 const reviewRes = await api.get(`/quiz/review/${module._id}`);
//                 const { score = 0, total = 0, passed } = reviewRes.data || {};
//                 const percentage = total > 0 ? score / total : 0;

//                 return {
//                   ...module,
//                   quizScore: score,
//                   quizTotal: total,
//                   quizPassed: passed || percentage >= 0.7,
//                   quizPercentage: Math.round(percentage * 100),
//                   hasTakenQuiz: true,
//                 };
//               } catch (err) {
//                 return { ...module, quizScore: 0, quizTotal: 0, quizPassed: false, quizPercentage: 0, hasTakenQuiz: false };
//               }
//             }
//             return { ...module, quizScore: 0, quizTotal: 0, quizPassed: false, quizPercentage: 0, hasTakenQuiz: false };
//           })
//         );

//         setModules(modulesWithScores);
//         setExamResult(examResult || null);
//         setExamReview(examReview || null);
//       } catch (err) {
//         console.error("Failed to load scores:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllScores();
//   }, [courseType]);

//   // Stats Calculation
//   const completedModules = modules.filter(m => m.completed).length;
//   const totalModules = modules.length;
//   const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

//   const modulesWithQuiz = modules.filter(m => m.hasTakenQuiz);
//   const passedModules = modules.filter(m => m.quizPassed).length;
//   const totalQuizScore = modulesWithQuiz.reduce((sum, m) => sum + m.quizScore, 0);
//   const totalQuizPossible = modulesWithQuiz.reduce((sum, m) => sum + m.quizTotal, 0);
//   const averageQuizPercentage = totalQuizPossible > 0 ? Math.round((totalQuizScore / totalQuizPossible) * 100) : 0;

//   const isCourseCompleted = progressPercentage === 100 && examResult && examResult.score >= 70;

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
//         <div className="w-20 h-20 border-8 border-t-indigo-600 border-r-purple-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 py-12 px-4">
//         <div className="max-w-7xl mx-auto">

//           {/* Header */}
//           <div className="text-center mb-12">
//             <button
//               onClick={() => navigate(`/modules/${courseType}`)}
//               className="cursor-pointer mb-6 inline-flex items-center gap-2 text-indigo-700 hover:text-indigo-900 font-medium"
//             >
//               <FiArrowLeft /> Back to Course
//             </button>
//             <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Performance Report
//             </h1>
//             <p className="text-2xl text-gray-700 mt-3 font-light">{courseNames[courseType] || courseType}</p>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//             {[
//               { icon: FiTrendingUp, label: "Progress", value: `${progressPercentage}%`, color: "indigo" },
//               { icon: FiBook, label: "Quizzes Passed", value: `${passedModules}/${modulesWithQuiz.length}`, color: "emerald" },
//               { icon: FiBarChart2, label: "Quiz Average", value: `${averageQuizPercentage}%`, color: "amber" },
//               { icon: FiAward, label: "Final Exam", value: examResult ? `${examResult.score}%` : "Not Taken", color: "purple" },
//             ].map((stat, i) => (
//               <div key={i} className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition">
//                 <div className="flex items-center gap-4">
//                   <div className={`p-4 rounded-xl bg-${stat.color}-100`}>
//                     <stat.icon className={`text-3xl text-${stat.color}-600`} />
//                   </div>
//                   <div>
//                     <div className="text-4xl font-black text-gray-900">{stat.value}</div>
//                     <div className="text-gray-600 font-medium">{stat.label}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Assignment Status */}
//           {hasSubmittedAssignment && (
//             <div className="mb-10 p-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white shadow-xl">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <FiAward size={40} />
//                   <div>
//                     <h3 className="text-2xl font-bold">Final Assignment Submitted Successfully!</h3>
//                     <p>Your project has been received and is under review.</p>
//                   </div>
//                 </div>
//                 <span className="text-3xl font-bold">Submitted</span>
//               </div>
//             </div>
//           )}

//           {/* Score Table */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
//             <ScoreTable
//               examResult={examResult}
//               examReview={examReview}
//               modules={modules}
//               courseType={courseType}
//               courseName={courseNames[courseType]}
//             />
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-wrap justify-center gap-6">
//             <button
//               onClick={() => navigate(`/modules/${courseType}`)}
//               className="cursor-pointer px-10 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg"
//             >
//               Continue Learning
//             </button>

//             <button
//               onClick={() => window.print()}
//               className="cursor-pointer px-10 py-4 bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-3"
//             >
//               <FiDownload /> Print Full Report
//             </button>

//             {isCourseCompleted && (
//               <button
//                 onClick={() => setShowCertificate(true)}
//                 className="cursor-pointer px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition shadow-lg flex items-center gap-3 animate-pulse"
//               >
//                 <FiAward /> View & Download Certificate
//               </button>
//             )}
//           </div>

//           {/* Certificate Modal */}
//           {showCertificate && (
//             <Certificate
//               studentName={studentName || "Outstanding Student"}
//               courseName={courseNames[courseType]}
//               finalScore={examResult?.score || 0}
//               date={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//               onClose={() => setShowCertificate(false)}
//             />
//           )}
//         </div>
//       </div>

//       {/* Global Print Styling */}
//       <style jsx global>{`
//         @media print {
//           body {
//             background: white !important;
//             padding: 20px;
//           }
//           button, .print\\:hidden {
//             display: none !important;
//           }
//           .shadow-xl, .rounded-2xl {
//             box-shadow: none !important;
//             border: 1px solid #eee !important;
//           }
//           h1, h2, h3 {
//             color: #000 !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

//==========deepseek====


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FiArrowLeft, FiBarChart2, FiAward, FiBook, FiTrendingUp, FiDownload, FiPrinter } from "react-icons/fi";
import ScoreTable from "./ScoreTable";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Certificate Component
function Certificate({ studentName, courseName, finalScore, date, onClose, onDownload }) {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="certificate bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-5xl text-center relative">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Close
        </button>

        {/* Decorative Border */}
        <div className="absolute inset-4 border-8 border-gold-500 rounded-lg pointer-events-none"></div>

        {/* Certificate Header */}
        <div className="mb-8">
          <div className="text-6xl font-bold text-indigo-700 mb-2">CERTIFICATE</div>
          <div className="text-2xl text-gray-600">OF ACHIEVEMENT</div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <p className="text-xl text-gray-700 mb-6">This is to certify that</p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {studentName}
          </h2>
          <p className="text-xl text-gray-700 mb-6">has successfully completed the course</p>
          <h3 className="text-3xl font-bold text-indigo-600 mb-8 border-b-4 border-indigo-300 pb-4">
            {courseName}
          </h3>

          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md">
              <div className="text-4xl font-black text-indigo-600">{finalScore}%</div>
              <div className="text-gray-600">Final Score</div>
            </div>
          </div>

          <p className="text-gray-500 text-lg">Awarded on {formatDate(date)}</p>
        </div>

        {/* Signatures */}
        <div className="mt-12 flex justify-between items-center px-8">
          <div className="text-center">
            <div className="border-t-2 border-gray-700 w-40 mx-auto mb-2"></div>
            <p className="font-semibold text-gray-700">Course Director</p>
          </div>
          <div className="text-center">
            <div className="border-t-2 border-gray-700 w-40 mx-auto mb-2"></div>
            <p className="font-semibold text-gray-700">Student</p>
          </div>
        </div>

        {/* Certificate ID */}
        <div className="mt-8 text-gray-500 text-sm">
          Certificate ID: {Date.now().toString(36).toUpperCase()}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => onDownload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2"
          >
            <FiDownload /> Download PDF
          </button>
          <button
            onClick={() => window.print()}
            className="cursor-pointer px-6 py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <FiPrinter /> Print Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

// Print Stylesheet
const printStyles = `
  @media print {
    @page {
      margin: 0;
      size: landscape;
    }
    
    body * {
      visibility: hidden;
    }
    
    .certificate-container,
    .certificate-container * {
      visibility: visible;
    }
    
    .certificate-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    
    .no-print {
      display: none !important;
    }
  }
`;

export default function CourseScoresPage() {
  const { courseType } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState([]);
  const [examResult, setExamResult] = useState(null);
  const [examReview, setExamReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSubmittedAssignment, setHasSubmittedAssignment] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const courseNames = {
    basic: "Basic Web Development",
    intermediate: "Intermediate JavaScript",
    advanced: "Full Stack Mastery",
  };

  useEffect(() => {
    const fetchAllScores = async () => {
      try {
        setLoading(true);
        const timestamp = Date.now();

        const [examRes, examReviewRes, dashRes, assignRes] = await Promise.all([
          api.get(`/final-exams/results/my?t=${timestamp}`),
          api.get(`/final-exams/review/my?t=${timestamp}`),
          api.get(`/student/dashboard?t=${timestamp}`),
          api.get(`/final-assignments/assignment-status?t=${timestamp}`),
        ]);

        // Exam result
        const examResult = examRes.data.results?.find(
          (r) => r.courseType === courseType
        );
        const examReview = examReviewRes.data.results?.find(r => r.courseType === courseType);

        // Assignment status
        const assignmentData = assignRes.data || {};
        setHasSubmittedAssignment(!!assignmentData[courseType]?.submittedAt);

        // Student Name
        if (dashRes.data.student) setStudentName(dashRes.data.student.name || "");

        // Module scores
        const allModules = dashRes.data.modules || [];
        const filteredModules = allModules.filter(
          (m) => (m.courseType || "basic") === courseType
        );

        const modulesWithScores = await Promise.all(
          filteredModules.map(async (module) => {
            try {
              if (module.hasQuiz && module._id) {
                const reviewRes = await api.get(`/quiz/review/${module._id}`);
                if (reviewRes.data) {
                  const score = reviewRes.data.score || 0;
                  const total = reviewRes.data.total || 0;
                  const percentage = total > 0 ? score / total : 0;
                  const passed = reviewRes.data.passed === true || percentage >= 0.7;

                  return {
                    ...module,
                    quizScore: score,
                    quizTotal: total,
                    quizPassed: passed,
                    quizPercentage: Math.round(percentage * 100),
                    hasTakenQuiz: true,
                    quizData: reviewRes.data
                  };
                }
              }
              return {
                ...module,
                quizScore: 0,
                quizTotal: 0,
                quizPassed: false,
                quizPercentage: 0,
                hasTakenQuiz: false
              };
            } catch (err) {
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
        setExamReview(examReview || null);
      } catch (err) {
        console.error("Failed to load scores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllScores();
  }, [courseType]);

  // Statistics
  const completedModules = modules.filter(m => m.completed).length;
  const totalModules = modules.length;
  const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const modulesWithQuiz = modules.filter(m => m.hasTakenQuiz);
  const passedModules = modules.filter(m => m.quizPassed).length;
  const totalQuizScore = modulesWithQuiz.reduce((sum, m) => sum + m.quizScore, 0);
  const totalQuizPossible = modulesWithQuiz.reduce((sum, m) => sum + m.quizTotal, 0);
  const averageQuizPercentage = totalQuizPossible > 0
    ? Math.round((totalQuizScore / totalQuizPossible) * 100)
    : 0;

  const handleDownloadPDF = async () => {
    setGeneratingPDF(true);
    try {
      const input = document.getElementById('certificate-content');
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`Certificate_${studentName}_${courseType}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setGeneratingPDF(false);
    }
  };

  const handlePrintReport = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Performance Report - ${courseNames[courseType]}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .report-header { text-align: center; margin-bottom: 30px; }
            .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 30px 0; }
            .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
            table { width: 100%; border-collapse: collapse; margin: 30px 0; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f5f5f5; }
            .print-button { display: none; }
          </style>
        </head>
        <body>
          <div class="report-header">
            <h1>Performance Report</h1>
            <h2>${courseNames[courseType]}</h2>
            <p>Student: ${studentName}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="stats-grid">
            <div class="stat-card">
              <h3>Course Progress</h3>
              <p>${progressPercentage}%</p>
            </div>
            <div class="stat-card">
              <h3>Quizzes Passed</h3>
              <p>${passedModules}/${modulesWithQuiz.length}</p>
            </div>
            <div class="stat-card">
              <h3>Quiz Average</h3>
              <p>${averageQuizPercentage}%</p>
            </div>
            <div class="stat-card">
              <h3>Final Exam</h3>
              <p>${examResult ? `${examResult.score}%` : "N/A"}</p>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Module</th>
                <th>Completed</th>
                <th>Quiz Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${modules.map(module => `
                <tr>
                  <td>${module.title}</td>
                  <td>${module.completed ? 'Yes' : 'No'}</td>
                  <td>${module.quizScore}/${module.quizTotal} (${module.quizPercentage}%)</td>
                  <td>${module.quizPassed ? 'Passed' : 'Not Passed'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <script>
            window.onload = () => {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="w-20 h-20 border-8 border-t-indigo-600 border-indigo-200 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <>
      <style>{printStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto p-4 md:p-8 py-8 md:py-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12 gap-6">
            <button
              onClick={() => navigate(`/modules/${courseType}`)}
              className="no-print cursor-pointer flex items-center gap-3 text-indigo-700 font-bold text-lg hover:text-indigo-900 transition-colors"
            >
              <FiArrowLeft size={24} /> Back to Course
            </button>

            <div className="text-center md:text-right">
              <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Performance Report
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mt-2">{courseNames[courseType]}</p>
              <p className="text-gray-500 mt-1">Student: {studentName}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 bg-indigo-100 rounded-xl">
                  <FiTrendingUp className="text-xl md:text-2xl text-indigo-600" />
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-black text-gray-900">{progressPercentage}%</div>
                  <div className="text-sm md:text-base text-gray-600">Course Progress</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 bg-emerald-100 rounded-xl">
                  <FiBook className="text-xl md:text-2xl text-emerald-600" />
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-black text-gray-900">{passedModules}/{modulesWithQuiz.length}</div>
                  <div className="text-sm md:text-base text-gray-600">Quizzes Passed</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 bg-amber-100 rounded-xl">
                  <FiBarChart2 className="text-xl md:text-2xl text-amber-600" />
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-black text-gray-900">{averageQuizPercentage}%</div>
                  <div className="text-sm md:text-base text-gray-600">Quiz Average</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 bg-purple-100 rounded-xl">
                  <FiAward className="text-xl md:text-2xl text-purple-600" />
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-black text-gray-900">
                    {examResult ? `${examResult.score}%` : "N/A"}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">Final Exam</div>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Status */}
          {hasSubmittedAssignment && (
            <div className="mb-8 md:mb-12 p-4 md:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-emerald-100 rounded-xl">
                    <FiAward className="text-xl md:text-2xl text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">Assignment Submitted</h3>
                    <p className="text-sm md:text-base text-gray-600">Your final assignment has been submitted</p>
                  </div>
                </div>
                <span className="px-3 md:px-4 py-1 md:py-2 bg-emerald-500 text-white rounded-full text-xs md:text-sm font-bold">
                  SUBMITTED
                </span>
              </div>
            </div>
          )}

          {/* Score Table */}
          <div className="mb-8 md:mb-12">
            <ScoreTable
              examResult={examResult}
              examReview={examReview}
              modules={modules}
              courseType={courseType}
              courseName={courseNames[courseType] || courseType.toUpperCase()}
            />
          </div>

          {/* Action Buttons */}
          <div className="no-print flex flex-wrap justify-center gap-3 md:gap-6">
            <button
              onClick={() => navigate(`/modules/${courseType}`)}
              className="cursor-pointer px-4 md:px-8 py-2 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2"
            >
              <FiArrowLeft /> Back to Learning
            </button>

            <button
              onClick={() => setShowCertificate(true)}
              className="cursor-pointer px-4 md:px-8 py-2 md:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-2"
            >
              <FiAward /> View Certificate
            </button>

            <button
              onClick={handlePrintReport}
              className="cursor-pointer px-4 md:px-8 py-2 md:py-4 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-xl font-bold hover:from-gray-700 hover:to-slate-700 transition-all flex items-center gap-2"
            >
              <FiPrinter /> Print Report
            </button>
          </div>

          {/* Certificate Preview */}
          {showCertificate && (
            <div className="certificate-container" id="certificate-content">
              <Certificate
                studentName={studentName || "Student Name"}
                courseName={courseNames[courseType]}
                finalScore={examResult?.score || averageQuizPercentage}
                date={new Date()}
                onClose={() => setShowCertificate(false)}
                onDownload={handleDownloadPDF}
              />
            </div>
          )}

          {/* PDF Loading Overlay */}
          {generatingPDF && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-2xl text-center">
                <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-700 font-semibold">Generating PDF Certificate...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}