
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function ViewQuestions() {
//   const { moduleId } = useParams();
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [moduleName, setModuleName] = useState("Loading...");

//   const loadQuestions = async () => {
//     try {
//       const res = await api.get(`/quiz/by-module/${moduleId}`);
//       setQuestions(res.data.questions || []);
//       setModuleName(res.data.moduleName);
//     } catch (err) {
//       alert("Failed to load questions");
//       navigate("/admin");
//     }
//   };

//   useEffect(() => {
//     loadQuestions();
//   }, [moduleId]);

//   // const deleteQuestion = async (index) => {
//   //   if (!confirm("Delete this question?")) return;
//   //   try {
//   //     await api.put(`/quiz/delete-question/${moduleId}`, { index });
//   //     loadQuestions();
//   //   } catch {
//   //     alert("Delete failed");
//   //   }
//   // };

// const deleteQuestion = async (questionIndex) => {
//   if (!window.confirm("Delete this question?")) return;

//   try {
//     await api.put(`/quiz/delete-question/${moduleId}`, {
//       index: questionIndex,   // FIXED
//     });

//     // Update UI
//     setQuestions(prev => prev.filter((_, i) => i !== questionIndex));

//   } catch (err) {
//     alert("Failed to delete");
//     loadQuestions(); // Reload for safety
//   }
// };


//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-6 text-blue-600 font-medium hover:underline"
//         >
//           ← Back
//         </button>

//         <div className="flex justify-between items-center mb-10">
//           <h1 className="text-3xl font-bold text-blue-700">
//             Questions for: <span className="text-blue-600">{moduleName}</span>
//           </h1>
//           <button
//             onClick={() => navigate("/admin/quiz", { state: { openEditForModuleId: moduleId } })}
//             className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
//           >
//             Edit All Questions
//           </button>
//         </div>

//         {questions.length === 0 ? (
//           <p className="text-center text-xl text-gray-500 py-20">No questions yet.</p>
//         ) : (
//           <div className="space-y-8">
//             {questions.map((q, i) => (
//               <div key={i} className="border-2 border-gray-200 rounded-2xl p-8 bg-linear-to-br from-gray-50 to-white shadow-md">
//                 <p className="text-2xl font-bold mb-6">Q{i + 1}. {q.question}</p>
//                 <ul className="space-y-3 ml-8">
//                   {q.options.map((opt, j) => (
//                     <li
//                       key={j}
//                       className={`p-3 rounded-lg text-lg ${
//                         q.correct === j
//                           ? "bg-green-100 border-2 border-green-500 font-bold text-green-800"
//                           : "bg-gray-100"
//                       }`}
//                     >
//                       {j + 1}. {opt} {q.correct === j && "Correct"}
//                     </li>
//                   ))}
//                 </ul>
//                 <button
//                   onClick={() => deleteQuestion(i)}
//                   className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-medium"
//                 >
//                   Delete Question
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//=============27 nov====correct=========

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function ViewQuestions() {
//   const { moduleId } = useParams();
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [moduleName, setModuleName] = useState("Loading...");

//   const loadQuestions = async () => {
//     try {
//       const res = await api.get(`/quiz/by-module/${moduleId}`);
//       setQuestions(res.data.questions || []);
//       setModuleName(res.data.moduleName);
//     } catch (err) {
//       alert("Failed to load questions");
//       navigate("/admin");
//     }
//   };

//   useEffect(() => {
//     loadQuestions();
//   }, [moduleId]);

//   const deleteQuestion = async (questionIndex) => {
//     if (!window.confirm("Are you sure you want to delete this question?")) return;

//     try {
//       await api.put(`/quiz/delete-question/${moduleId}`, { index: questionIndex });

//       // Optimistically update UI
//       setQuestions(prev => prev.filter((_, i) => i !== questionIndex));
//     } catch (err) {
//       alert("Failed to delete question");
//       loadQuestions(); // Reload on error
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-6 text-blue-600 font-medium hover:underline"
//         >
//           ← Back
//         </button>

//         <div className="flex justify-between items-center mb-10">
//           <h1 className="text-3xl font-bold text-blue-700">
//             Questions for: <span className="text-blue-600">{moduleName}</span>
//           </h1>
//           <button
//             onClick={() => navigate("/admin/quiz", { state: { openEditForModuleId: moduleId } })}
//             className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
//           >
//             Edit All Questions
//           </button>
//         </div>

//         {questions.length === 0 ? (
//           <p className="text-center text-xl text-gray-500 py-20">No questions yet.</p>
//         ) : (
//           <div className="space-y-8">
//             {questions.map((q, i) => (
//               <div key={i} className="border-2 border-gray-200 rounded-2xl p-8 bg-linear-to-br from-gray-50 to-white shadow-md">
//                 <p className="text-2xl font-bold mb-6">Q{i + 1}. {q.question}</p>
//                 <ul className="space-y-3 ml-8">
//                   {q.options.map((opt, j) => (
//                     <li
//                       key={j}
//                       className={`p-3 rounded-lg text-lg ${
//                         q.correct === j
//                           ? "bg-green-100 border-2 border-green-500 font-bold text-green-800"
//                           : "bg-gray-100"
//                       }`}
//                     >
//                       {j + 1}. {opt} {q.correct === j && "Correct"}
//                     </li>
//                   ))}
//                 </ul>
//                 <button
//                   onClick={() => deleteQuestion(i)}
//                   className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-medium"
//                 >
//                   Delete Question
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//===============stylish==========

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import {
//   FiArrowLeft,
//   FiEdit,
//   FiTrash2,
//   FiHelpCircle,
//   FiCheckCircle,
//   FiList,
//   FiBook,
//   FiAlertCircle
// } from "react-icons/fi";

// export default function ViewQuestions() {
//   const { moduleId } = useParams();
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [moduleName, setModuleName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [deletingIndex, setDeletingIndex] = useState(null);

//   const loadQuestions = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/quiz/by-module/${moduleId}`);
//       setQuestions(res.data.questions || []);
//       setModuleName(res.data.moduleName || "Unknown Module");
//     } catch (err) {
//       console.error("Failed to load questions:", err);
//       alert("Failed to load questions");
//       navigate("/admin/quiz");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadQuestions();
//   }, [moduleId]);

//   const deleteQuestion = async (questionIndex) => {
//     if (!window.confirm("Are you sure you want to delete this question?")) return;

//     try {
//       setDeletingIndex(questionIndex);
//       await api.put(`/quiz/delete-question/${moduleId}`, { index: questionIndex });

//       // Optimistically update UI
//       setQuestions(prev => prev.filter((_, i) => i !== questionIndex));
//     } catch (err) {
//       alert("Failed to delete question");
//     } finally {
//       setDeletingIndex(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg font-medium">Loading questions...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 p-8">
//       {/* Background Elements */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

//       <div className="relative max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <button
//             onClick={() => navigate("/admin/quiz")}
//             className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//           >
//             <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Quizzes
//           </button>

//           <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
//             <FiList className="text-white" size={20} />
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
//           {/* Page Header */}
//           <div className="text-center mb-10">
//             <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
//               <FiBook size={16} />
//               Module Questions
//             </div>
//             <h1 className="text-4xl font-black bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-3">
//               {moduleName}
//             </h1>
//             <p className="text-gray-600 text-lg">
//               Review and manage assessment questions
//             </p>
//           </div>

//           {/* Stats Bar */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             <div className="bg-linear-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 text-center border border-blue-200/50">
//               <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
//                 <FiHelpCircle className="text-white" size={18} />
//               </div>
//               <p className="text-2xl font-black text-blue-600">{questions.length}</p>
//               <p className="text-sm text-gray-600 font-medium">Total Questions</p>
//             </div>

//             <div className="bg-linear-to-br from-green-50 to-green-100/50 rounded-2xl p-4 text-center border border-green-200/50">
//               <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
//                 <FiCheckCircle className="text-white" size={18} />
//               </div>
//               <p className="text-2xl font-black text-green-600">{questions.length}</p>
//               <p className="text-sm text-gray-600 font-medium">Active Questions</p>
//             </div>

//             <div className="bg-linear-to-br from-purple-50 to-purple-100/50 rounded-2xl p-4 text-center border border-purple-200/50">
//               <div className="w-10 h-10 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
//                 <FiList className="text-white" size={18} />
//               </div>
//               <p className="text-2xl font-black text-purple-600">{questions.length * 4}</p>
//               <p className="text-sm text-gray-600 font-medium">Total Options</p>
//             </div>
//           </div>

//           {/* Action Bar */}
//           <div className="flex justify-between items-center mb-8 p-6 bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50">
//             <div>
//               <h3 className="font-semibold text-gray-800 text-lg">Question Management</h3>
//               <p className="text-gray-600 text-sm">View, edit, or delete assessment questions</p>
//             </div>
//             <button
//               onClick={() => navigate("/admin/quiz", { state: { openEditForModuleId: moduleId } })}
//               className="flex items-center gap-3 bg-linear-to-r from-blue-600 to-indigo-600 
//                        text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 
//                        transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer
//                        shadow-lg hover:shadow-xl group/edit"
//             >
//               <FiEdit className="group-hover/edit:scale-110 transition-transform" size={18} />
//               <span>Edit All Questions</span>
//             </button>
//           </div>

//           {/* Questions List */}
//           {questions.length === 0 ? (
//             <div className="text-center py-16">
//               <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
//                 <FiHelpCircle className="text-gray-400" size={40} />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-700 mb-3">No Questions Yet</h3>
//               <p className="text-gray-500 max-w-md mx-auto mb-6">
//                 This module doesn't have any assessment questions yet. Start by adding some questions to create a quiz.
//               </p>
//               <button
//                 onClick={() => navigate("/admin/quiz", { state: { openEditForModuleId: moduleId } })}
//                 className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold 
//                          hover:bg-blue-700 transition-all duration-300 cursor-pointer
//                          transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
//               >
//                 Add First Question
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {questions.map((q, i) => (
//                 <div
//                   key={i}
//                   className="bg-linear-to-br from-white to-gray-50/80 rounded-2xl p-6 
//                            border-2 border-gray-200/50 hover:border-blue-300/50 
//                            shadow-lg hover:shadow-xl transition-all duration-500 
//                            group cursor-pointer"
//                 >
//                   {/* Question Header */}
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
//                         <span className="text-white font-bold text-sm">Q{i + 1}</span>
//                       </div>
//                       <div>
//                         <h3 className="font-bold text-gray-800 text-lg leading-tight">
//                           {q.question}
//                         </h3>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => deleteQuestion(i)}
//                       disabled={deletingIndex === i}
//                       className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center 
//                                text-red-600 hover:bg-red-600 hover:text-white 
//                                transition-all duration-300 cursor-pointer hover:scale-110
//                                disabled:opacity-50 disabled:cursor-not-allowed"
//                       title="Delete Question"
//                     >
//                       {deletingIndex === i ? (
//                         <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
//                       ) : (
//                         <FiTrash2 size={16} />
//                       )}
//                     </button>
//                   </div>

//                   {/* Options List */}
//                   <div className="space-y-3 ml-2">
//                     {q.options.map((opt, j) => (
//                       <div
//                         key={j}
//                         className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
//                           q.correct === j
//                             ? "bg-green-50 border-green-300 shadow-sm"
//                             : "bg-gray-50/80 border-gray-200"
//                         }`}
//                       >
//                         <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
//                           q.correct === j
//                             ? "bg-green-500 text-white"
//                             : "bg-gray-200 text-gray-600"
//                         }`}>
//                           <span className="font-bold text-sm">{j + 1}</span>
//                         </div>
//                         <div className="flex-1">
//                           <p className={`font-medium ${
//                             q.correct === j ? "text-green-800" : "text-gray-700"
//                           }`}>
//                             {opt}
//                           </p>
//                         </div>
//                         {q.correct === j && (
//                           <div className="flex items-center gap-2 text-green-600">
//                             <FiCheckCircle size={16} />
//                             <span className="text-sm font-semibold">Correct</span>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Footer Info */}
//           {questions.length > 0 && (
//             <div className="mt-8 pt-6 border-t border-gray-200/50">
//               <div className="text-center">
//                 <p className="text-gray-600 font-medium">
//                   Showing all <span className="font-bold text-blue-600">{questions.length}</span> questions
//                 </p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Questions are displayed in the order they appear in the quiz
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//=================11 pm 6 dec=========

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import {
//   FiArrowLeft,
//   FiEdit,
//   FiTrash2,
//   FiHelpCircle,
//   FiCheckCircle,
//   FiList,
//   FiBook,
// } from "react-icons/fi";
// import { motion } from "framer-motion";

// export default function ViewQuestions() {
//   const { moduleId } = useParams();
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [moduleName, setModuleName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [deletingIndex, setDeletingIndex] = useState(null);

//   useEffect(() => {
//     const loadQuestions = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/quiz/by-module/${moduleId}`);
//         setQuestions(res.data.questions || []);
//         setModuleName(res.data.moduleName || "Unknown Module");
//       } catch (err) {
//         alert("Failed to load questions");
//         navigate("/admin/quiz");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadQuestions();
//   }, [moduleId, navigate]);

//   const deleteQuestion = async (index) => {
//     if (!window.confirm("Delete this question permanently?")) return;
//     try {
//       setDeletingIndex(index);
//       await api.put(`/quiz/delete-question/${moduleId}`, { index });
//       setQuestions(prev => prev.filter((_, i) => i !== index));
//       alert("Question deleted");
//     } catch (err) {
//       alert("Delete failed");
//     } finally {
//       setDeletingIndex(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
//         <div className="w-20 h-20 border-8 border-t-indigo-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-12">
//           <button
//             onClick={() => navigate("/admin/quiz")}
//             className="flex items-center gap-4 text-indigo-700 font-bold text-xl hover:text-indigo-900"
//           >
//             <FiArrowLeft size={32} /> Back to Quizzes
//           </button>
//           <div className="p-4 bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl shadow-2xl">
//             <FiList className="text-white text-4xl" />
//           </div>
//         </div>

//         <div className="text-center mb-16">
//           <h1 className="text-6xl font-black bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
//             {moduleName}
//           </h1>
//           <p className="text-2xl text-gray-600 mt-4">Quiz Questions Management</p>
//         </div>

//         {questions.length === 0 ? (
//           <div className="text-center py-32">
//             <FiHelpCircle className="mx-auto text-8xl text-gray-300 mb-8" />
//             <p className="text-3xl text-gray-500">No questions yet</p>
//             <button
//               onClick={() => navigate("/admin/quiz", { state: { openEditForModuleId: moduleId } })}
//               className="mt-8 bg-linear-to-r from-indigo-600 to-purple-700 text-white px-12 py-6 rounded-3xl text-2xl font-bold"
//             >
//               Add First Question
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-10">
//             {questions.map((q, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 relative group"
//               >
//                 {/* Delete Button */}
//                 <button
//                   onClick={() => deleteQuestion(i)}
//                   disabled={deletingIndex === i}
//                   className="absolute top-6 right-6 p-3 bg-red-100 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition"
//                 >
//                   {deletingIndex === i ? (
//                     <div className="w-5 h-5 border-2 border-red-600 rounded-full animate-spin"></div>
//                   ) : (
//                     <FiTrash2 size={24} />
//                   )}
//                 </button>

//                 <div className="flex items-center gap-6 mb-8">
//                   <div className="w-16 h-16 bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl">
//                     Q{i + 1}
//                   </div>
//                   <h3 className="text-3xl font-bold text-gray-800 flex-1">{q.question}</h3>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {q.options.map((opt, j) => (
//                     <div
//                       key={j}
//                       className={`p-6 rounded-2xl border-4 transition-all ${
//                         q.correct === j
//                           ? "bg-emerald-50 border-emerald-500 shadow-lg"
//                           : "bg-gray-50 border-gray-200"
//                       }`}
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl
//                           ${q.correct === j ? "bg-emerald-500 text-white" : "bg-gray-300 text-gray-600"}`}>
//                           {j + 1}
//                         </div>
//                         <p className="text-xl font-medium">{opt}</p>
//                       </div>
//                       {q.correct === j && (
//                         <div className="mt-4 flex items-center gap-3 text-emerald-700 font-bold">
//                           <FiCheckCircle size={28} />
//                           Correct Answer
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

//========================correct==========


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiHelpCircle,
  FiCheckCircle,
  FiList,
  FiBook,
} from "react-icons/fi";
import { motion } from "framer-motion";

export default function ViewQuestions() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [moduleName, setModuleName] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingIndex, setDeletingIndex] = useState(null);

  // useEffect(() => {
  //   const loadQuestions = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await api.get(`/quiz/by-module/${moduleId}`);
  //       setQuestions(res.data.questions || []);
  //       setModuleName(res.data.moduleName || "Unknown Module");
  //     } catch (err) {
  //       alert("Failed to load questions");
  //       navigate("/admin/quiz");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadQuestions();
  // }, [moduleId, navigate]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);

        // Fetch questions for module
        const res = await api.get(`/quiz/by-module/${moduleId}`);
        const questionsData = res.data.questions || [];

        // Fetch all modules to get module title
        const modulesRes = await api.get("/modules");
        const module = modulesRes.data.find((m) => m._id === moduleId);

        setQuestions(questionsData);
        setModuleName(module ? module.title : "Unknown Module"); // use real module title
      } catch (err) {
        alert("Failed to load questions");
        navigate("/admin/quiz");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [moduleId, navigate]);


  const deleteQuestion = async (index) => {
    if (!window.confirm("Delete this question permanently?")) return;
    try {
      setDeletingIndex(index);
      await api.put(`/quiz/delete-question/${moduleId}`, { index });
      setQuestions((prev) => prev.filter((_, i) => i !== index));
      alert("Question deleted");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setDeletingIndex(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
        <div className="w-16 h-16 border-6 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/admin/quiz")}
            className="flex items-center gap-3 text-indigo-700 font-bold text-lg hover:text-indigo-900 cursor-pointer"
          >
            <FiArrowLeft size={28} /> Back to Quizzes
          </button>
          <div className="p-3 bg-linear-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg cursor-pointer">
            <FiList className="text-white text-3xl" />
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
            {moduleName}
          </h1>
          <p className="text-lg text-gray-600 mt-2">Quiz Questions Management</p>
        </div>

        {questions.length === 0 ? (
          <div className="text-center py-24">
            <FiHelpCircle className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-2xl text-gray-500">No questions yet</p>
            <button
              onClick={() =>
                navigate("/admin/quiz", { state: { openEditForModuleId: moduleId } })
              }
              className="mt-4 bg-linear-to-r from-indigo-600 to-purple-700 text-white px-8 py-3 rounded-2xl text-lg font-bold cursor-pointer"
            >
              Add First Question
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative group"
              >
                {/* Delete Button */}
                <button
                  onClick={() => deleteQuestion(i)}
                  disabled={deletingIndex === i}
                  className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition cursor-pointer"
                >
                  {deletingIndex === i ? (
                    <div className="w-4 h-4 border-2 border-red-600 rounded-full animate-spin"></div>
                  ) : (
                    <FiTrash2 size={20} />
                  )}
                </button>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow">
                    Q{i + 1}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 flex-1">{q.question}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((opt, j) => (
                    <div
                      key={j}
                      className={`p-3 rounded-xl border-2 transition-all ${q.correct === j
                          ? "bg-emerald-50 border-emerald-500 shadow"
                          : "bg-gray-50 border-gray-200"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg
                          ${q.correct === j ? "bg-emerald-500 text-white" : "bg-gray-300 text-gray-600"}`}
                        >
                          {j + 1}
                        </div>
                        <p className="text-base font-medium">{opt}</p>
                      </div>
                      {q.correct === j && (
                        <div className="mt-2 flex items-center gap-2 text-emerald-700 font-bold">
                          <FiCheckCircle size={20} />
                          Correct Answer
                        </div>
                      )}
                    </div>
                  ))}
                </div>


                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {q.options.map((opt, j) => {
    const isCorrect = q.correct === j;

    return (
      <div
        key={j}
        className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer
          ${isCorrect ? "bg-emerald-50 border-emerald-400 shadow-md" : "bg-gray-50 border-gray-200 hover:shadow-sm hover:border-gray-300"}
        `}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
              ${isCorrect ? "bg-emerald-500 text-white" : "bg-gray-300 text-gray-600"}
            `}
          >
            {j + 1}
          </div>
          <p className="text-base font-medium">{opt}</p>
        </div>

        {isCorrect && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500 text-white px-2 py-1 rounded-full shadow">
            <FiCheckCircle size={18} />
            Correct
          </div>
        )}
      </div>
    );
  })}
</div> */}


              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
