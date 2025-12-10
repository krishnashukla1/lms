
//===============

// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function QuizList() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [modules, setModules] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [search, setSearch] = useState("");
//   const [editing, setEditing] = useState(false);
//   const [adding, setAdding] = useState(false);

//   const emptyQuiz = {
//     moduleId: "",
//     moduleName: "",
//     questions: [{ question: "", options: ["", "", "", ""], correct: 0 }],
//   };

//   const [form, setForm] = useState(emptyQuiz);

//   // Load initial data
//   const loadInitialData = async () => {
//     try {
//       const [qRes, mRes] = await Promise.all([
//         api.get("/quiz/all"),
//         api.get("/modules"),
//       ]);

//       const groupedMap = new Map();

//       qRes.data.forEach((quiz) => {
//         const mid = quiz.moduleId?._id || quiz.moduleId;
//         if (!mid) return;

//         if (!groupedMap.has(mid)) {
//           groupedMap.set(mid, {
//             moduleId: mid,
//             moduleName: quiz.moduleName,
//             questionsCount: 0,
//           });
//         }
//         groupedMap.get(mid).questionsCount += quiz.questions?.length || 0;
//       });

//       setQuizzes(Array.from(groupedMap.values()));
//       setModules(mRes.data.modules || mRes.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load data");
//     }
//   };

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   // Auto open edit modal when navigated from ViewQuestions
//   useEffect(() => {
//     if (location.state?.openEditForModuleId && quizzes.length > 0) {
//       const id = location.state.openEditForModuleId;
//       const quiz = quizzes.find((q) => q.moduleId === id);
//       if (quiz) openEditModal(quiz);
//     }
//   }, [location.state, quizzes]);

//   const filtered = quizzes.filter((q) =>
//     q.moduleName?.toLowerCase().includes(search.toLowerCase())
//   );

//   const addQuestion = () => {
//     setForm({
//       ...form,
//       questions: [...form.questions, { question: "", options: ["", "", "", ""], correct: 0 }],
//     });
//   };

//   const removeQuestion = (i) => {
//     if (form.questions.length === 1) return alert("At least 1 question required");
//     setForm({
//       ...form,
//       questions: form.questions.filter((_, idx) => idx !== i),
//     });
//   };

//   const updateField = (i, field, value) => {
//     const updated = [...form.questions];
//     updated[i][field] = value;
//     setForm({ ...form, questions: updated });
//   };

//   const updateOption = (qIdx, optIdx, value) => {
//     const updated = [...form.questions];
//     updated[qIdx].options[optIdx] = value;
//     setForm({ ...form, questions: updated });
//   };

//   // Save (Create or Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.moduleId) return alert("Module is required");

//     try {
//       await api.post("/quiz", {
//         moduleId: form.moduleId,
//         moduleName: form.moduleName,
//         questions: form.questions,
//       });

//       alert(editing ? "Questions updated successfully!" : "Quiz created successfully!");

//       closeModal();
//       loadInitialData();

//       // REDIRECT TO /admin/quiz AFTER UPDATE
//       navigate("/admin/quiz", { replace: true });
//     } catch (err) {
//       alert(err.response?.data?.message || "Save failed");
//     }
//   };

//   // Open Edit Modal – Load questions for the selected module
//   const openEditModal = async (quiz) => {
//     try {
//       const res = await api.get(`/quiz/by-module/${quiz.moduleId}`);
//       setForm({
//         moduleId: quiz.moduleId,
//         moduleName: res.data.moduleName,
//         questions: res.data.questions || [],
//       });
//       setEditing(true);
//       setAdding(false);
//     } catch (err) {
//       alert("Failed to load questions for editing");
//     }
//   };

//   const closeModal = () => {
//     setAdding(false);
//     setEditing(false);
//     setForm(emptyQuiz);
//     // Clear location state to prevent re-opening
//     navigate(location.pathname, { replace: true });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
//       <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-8">
//         <button
//           onClick={() => navigate("/admin")}
//           className="mb-6 text-blue-600 font-semibold hover:underline"
//         >
//           ← Back to Admin Dashboard
//         </button>

//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-blue-600">Quiz Management</h1>
//           <button
//             onClick={() => {
//               setAdding(true);
//               setForm({ ...emptyQuiz });
//             }}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
//           >
//             Add New Quiz
//           </button>
//         </div>

//         <input
//           type="text"
//           placeholder="Search by module name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full p-4 border rounded-xl mb-6 text-lg"
//         />

//         <div className="overflow-x-auto border rounded-xl shadow">
//           <table className="w-full">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="p-4 text-left">Module Name</th>
//                 <th className="p-4 text-center">Questions</th>
//                 <th className="p-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan="3" className="p-10 text-center text-gray-500">
//                     No quizzes found
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((quiz) => (
//                   <tr key={quiz.moduleId} className="border-b hover:bg-blue-50">
//                     <td className="p-4 font-medium">{quiz.moduleName}</td>
//                     <td className="p-4 text-center">
//                       <button
//                         onClick={() => navigate(`/view-questions/${quiz.moduleId}`)}
//                         className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600"
//                       >
//                         View ({quiz.questionsCount})
//                       </button>
//                     </td>
//                     <td className="p-4 flex gap-3 justify-center">
//                       <button
//                         onClick={() => openEditModal(quiz)}
//                         className="bg-yellow-400 px-5 py-2 rounded-lg hover:bg-yellow-500 text-black font-medium"
//                       >
//                         Edit
//                       </button>
//                       {/* Optional: Add delete all if needed */}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* MODAL */}
//         {(adding || editing) && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
//               <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
//                 {editing ? `Edit Questions - ${form.moduleName}` : "Add New Quiz"}
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Show Module Name (Read-only) when editing */}
//                 {editing && (
//                   <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg text-lg font-medium text-blue-800">
//                     Module: <span className="font-bold">{form.moduleName}</span>
//                   </div>
//                 )}

//                 {/* Only show dropdown when ADDING (not editing) */}
//                 {adding && (
//                   <select
//                     value={form.moduleId}
//                     onChange={(e) => {
//                       const m = modules.find((m) => m._id === e.target.value);
//                       if (m) {
//                         setForm({ ...form, moduleId: m._id, moduleName: m.title });
//                       }
//                     }}
//                     required
//                     className="w-full p-4 border-2 rounded-lg text-lg"
//                   >
//                     <option value="">Select Module</option>
//                     {modules.map((m) => (
//                       <option key={m._id} value={m._id}>
//                         {m.title}
//                       </option>
//                     ))}
//                   </select>
//                 )}

//                 {/* Questions */}
//                 {form.questions.map((q, i) => (
//                   <div
//                     key={i}
//                     className="border-2 border-gray-300 rounded-xl p-6 bg-gray-50 relative"
//                   >
//                     {form.questions.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeQuestion(i)}
//                         className="absolute -top-3 -right-3 bg-red-500 text-white w-10 h-10 rounded-full hover:bg-red-600 text-xl font-bold"
//                       >
//                         ×
//                       </button>
//                     )}

//                     <input
//                       type="text"
//                       placeholder="Enter question"
//                       value={q.question}
//                       onChange={(e) => updateField(i, "question", e.target.value)}
//                       className="w-full p-3 border rounded-lg mb-4 text-lg"
//                       required
//                     />

//                     {q.options.map((opt, j) => (
//                       <input
//                         key={j}
//                         type="text"
//                         placeholder={`Option ${j + 1}`}
//                         value={opt}
//                         onChange={(e) => updateOption(i, j, e.target.value)}
//                         className="w-full p-3 border rounded-lg mb-3"
//                         required
//                       />
//                     ))}

//                     <select
//                       value={q.correct}
//                       onChange={(e) => updateField(i, "correct", Number(e.target.value))}
//                       className="w-full p-3 border rounded-lg"
//                     >
//                       {[0, 1, 2, 3].map((n) => (
//                         <option key={n} value={n}>
//                           Correct Answer: Option {n + 1}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 ))}

//                 <button
//                   type="button"
//                   onClick={addQuestion}
//                   className="w-full bg-green-600 text-white py-4 rounded-lg text-xl font-medium hover:bg-green-700"
//                 >
//                   + Add Another Question
//                 </button>

//                 <div className="flex justify-end gap-4 mt-8">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="px-8 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-10 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-lg"
//                   >
//                     {editing ? "Update Questions" : "Save Quiz"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//===============correct===================

// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function QuizList() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [modules, setModules] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [search, setSearch] = useState("");
//   const [editing, setEditing] = useState(false);
//   const [adding, setAdding] = useState(false);

//   const emptyQuiz = {
//     moduleId: "",
//     moduleName: "",
//     questions: [{ question: "", options: ["", "", "", ""], correct: 0 }],
//   };

//   const [form, setForm] = useState(emptyQuiz);

//   // Load data
//   const loadInitialData = async () => {
//     try {
//       const [qRes, mRes] = await Promise.all([
//         api.get("/quiz/all"),
//         api.get("/modules"),
//       ]);

//       const groupedMap = new Map();

//       qRes.data.forEach((quiz) => {
//         const mid = quiz.moduleId?._id || quiz.moduleId;
//         if (!mid) return;

//         if (!groupedMap.has(mid)) {
//           groupedMap.set(mid, {
//             _id: quiz._id,
//             moduleId: mid,
//             moduleName: quiz.moduleName,
//             questionsCount: 0,
//           });
//         }
//         groupedMap.get(mid).questionsCount += quiz.questions?.length || 0;
//       });

//       setQuizzes(Array.from(groupedMap.values()));
//       setModules(mRes.data.modules || mRes.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load data");
//     }
//   };

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   // Auto-open edit modal from ViewQuestions
//   useEffect(() => {
//     if (location.state?.openEditForModuleId && quizzes.length > 0) {
//       const id = location.state.openEditForModuleId;
//       const quiz = quizzes.find((q) => q.moduleId === id);
//       if (quiz) openEditModal(quiz);
//     }
//   }, [location.state, quizzes]);

//   const filtered = quizzes.filter((q) =>
//     q.moduleName?.toLowerCase().includes(search.toLowerCase())
//   );

//   const addQuestion = () => {
//     setForm({
//       ...form,
//       questions: [...form.questions, { question: "", options: ["", "", "", ""], correct: 0 }],
//     });
//   };

//   const removeQuestion = (i) => {
//     if (form.questions.length === 1) return alert("At least 1 question required");
//     setForm({
//       ...form,
//       questions: form.questions.filter((_, idx) => idx !== i),
//     });
//   };

//   const updateField = (i, field, value) => {
//     const updated = [...form.questions];
//     updated[i][field] = value;
//     setForm({ ...form, questions: updated });
//   };

//   const updateOption = (qIdx, optIdx, value) => {
//     const updated = [...form.questions];
//     updated[qIdx].options[optIdx] = value;
//     setForm({ ...form, questions: updated });
//   };

//   // Save (Create or Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.moduleId) return alert("Module is required");

//     try {
//       await api.post("/quiz", {
//         moduleId: form.moduleId,
//         moduleName: form.moduleName,
//         questions: form.questions,
//       });

//       alert(editing ? "Questions updated successfully!" : "Quiz created successfully!");
//       closeModal();
//       loadInitialData();
//       navigate("/admin/quiz", { replace: true }); // Redirect after update
//     } catch (err) {
//       alert(err.response?.data?.message || "Save failed");
//     }
//   };

//   // Delete entire quiz for module
//   const handleDelete = async (quizId, moduleName) => {
//     if (!window.confirm(`Delete all questions for "${moduleName}"?\nThis cannot be undone.`)) return;

//     try {
//       await api.delete(`/quiz/${quizId}`);
//       alert("Quiz deleted successfully!");
//       loadInitialData();
//     } catch (err) {
//       alert("Delete failed: " + (err.response?.data?.message || "Server error"));
//     }
//   };

//   // Open Edit Modal
//   const openEditModal = async (quiz) => {
//     try {
//       const res = await api.get(`/quiz/by-module/${quiz.moduleId}`);
//       setForm({
//         moduleId: quiz.moduleId,
//         moduleName: res.data.moduleName,
//         questions: res.data.questions || [],
//       });
//       setEditing(true);
//       setAdding(false);
//     } catch (err) {
//       alert("Failed to load questions");
//     }
//   };

//   const closeModal = () => {
//     setAdding(false);
//     setEditing(false);
//     setForm(emptyQuiz);
//     navigate(location.pathname, { replace: true });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
//       <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-8">
//         <button
//           onClick={() => navigate("/admin")}
//           className="cursor-pointer mb-6 text-blue-600 font-semibold hover:underline"
//         >
//           ← Back to Admin Dashboard
//         </button>

//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-blue-600">Quiz Management</h1>
//           <button
//             onClick={() => {
//               setAdding(true);
//               setForm({ ...emptyQuiz });
//             }}
//             className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium shadow-lg"
//           >
//             Add Questions
//           </button>
//         </div>

//         <input
//           type="text"
//           placeholder="Search by module name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full p-4 border-2 border-gray-300 rounded-xl mb-6 text-lg focus:outline-none focus:border-blue-500"
//         />

//         <div className="overflow-x-auto border-2 border-gray-200 rounded-xl shadow-lg">
//           <table className="w-full">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="p-5 text-left text-lg font-semibold">Module Name</th>
//                 <th className="p-5 text-center text-lg font-semibold">Questions</th>
//                 <th className="p-5 text-center text-lg font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan="3" className="p-16 text-center text-gray-500 text-xl">
//                     No quizzes found
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((quiz) => (
//                   <tr key={quiz.moduleId} className="border-b hover:bg-blue-50 transition">
//                     <td className="p-5 font-medium text-gray-800">{quiz.moduleName}</td>
//                     <td className="p-5 text-center">
//                       <button
//                         onClick={() => navigate(`/view-questions/${quiz.moduleId}`)}
//                         className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 font-bold shadow"
//                       >
//                         View ({quiz.questionsCount})
//                       </button>
//                     </td>
//                     <td className="p-5">
//                       <div className="flex gap-3 justify-center">
//                         <button
//                           onClick={() => openEditModal(quiz)}
//                           className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-lg shadow transition transform hover:scale-105"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(quiz._id, quiz.moduleName)}
//                           className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg shadow transition transform hover:scale-105"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* MODAL */}
//         {(adding || editing) && (
//           <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-10">
//               <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">
//                 {editing ? `Edit: ${form.moduleName}` : "Add New Quiz"}
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-8">
//                 {/* Show module name when editing */}
//                 {editing && (
//                   <div className="p-5 bg-linear-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl text-xl font-semibold text-blue-900">
//                     Module: <span className="font-bold">{form.moduleName}</span>
//                   </div>
//                 )}

//                 {/* Dropdown only when adding */}
//                 {adding && (
//                   <select
//                     value={form.moduleId}
//                     onChange={(e) => {
//                       const m = modules.find((m) => m._id === e.target.value);
//                       if (m) setForm({ ...form, moduleId: m._id, moduleName: m.title });
//                     }}
//                     required
//                     className="w-full p-5 border-2 border-blue-300 rounded-xl text-lg focus:outline-none focus:border-blue-600"
//                   >
//                     <option value="">Select Module</option>
//                     {modules.map((m) => (
//                       <option key={m._id} value={m._id}>
//                         {m.title}
//                       </option>
//                     ))}
//                   </select>
//                 )}

//                 {/* Questions */}
//                 {form.questions.map((q, i) => (
//                   <div key={i} className="border-2 border-gray-300 rounded-2xl p-8 bg-gray-50 relative shadow">
//                     {form.questions.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeQuestion(i)}
//                         className="absolute -top-4 -right-4 bg-red-600 text-white w-12 h-12 rounded-full hover:bg-red-700 text-2xl font-bold shadow-lg"
//                       >
//                         ×
//                       </button>
//                     )}

//                     <input
//                       type="text"
//                       placeholder="Enter your question"
//                       value={q.question}
//                       onChange={(e) => updateField(i, "question", e.target.value)}
//                       className="w-full p-4 border-2 rounded-lg mb-5 text-lg font-medium"
//                       required
//                     />

//                     {q.options.map((opt, j) => (
//                       <input
//                         key={j}
//                         type="text"
//                         placeholder={`Option ${j + 1}`}
//                         value={opt}
//                         onChange={(e) => updateOption(i, j, e.target.value)}
//                         className="w-full p-4 border rounded-lg mb-3 text-lg"
//                         required
//                       />
//                     ))}

//                     <select
//                       value={q.correct}
//                       onChange={(e) => updateField(i, "correct", Number(e.target.value))}
//                       className="w-full p-4 border-2 border-green-400 rounded-lg font-medium"
//                     >
//                       {[0, 1, 2, 3].map((n) => (
//                         <option key={n} value={n}>
//                           Correct Answer: Option {n + 1}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 ))}

//                 <button
//                   type="button"
//                   onClick={addQuestion}
//                   className="w-full bg-linear-to-r from-green-500 to-emerald-600 text-white py-5 rounded-xl text-2xl font-bold hover:from-green-600 hover:to-emerald-700 shadow-lg"
//                 >
//                   + Add Another Question
//                 </button>

//                 <div className="flex justify-end gap-6 mt-10">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="px-10 py-4 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-600 shadow"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-12 py-4 bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-bold text-xl hover:from-blue-700 hover:to-indigo-800 shadow-lg"
//                   >
//                     {editing ? "Update Questions" : "Save Quiz"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//================stylsih===============

// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   FiArrowLeft, FiSearch, FiPlus, FiEdit, FiTrash2, FiEye,
//   FiBook, FiFileText, FiCheckCircle, FiX, FiBarChart2,
//   FiHelpCircle, FiList, FiChevronRight
// } from "react-icons/fi";
// import AssignmentsAdmin from "../pages/AdminAssignment";

// export default function QuizList() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [modules, setModules] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [search, setSearch] = useState("");
//   const [editing, setEditing] = useState(false);
//   const [adding, setAdding] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const emptyQuiz = {
//     moduleId: "",
//     moduleName: "",
//     questions: [{ question: "", options: ["", "", "", ""], correct: 0 }],
//   };

//   const [form, setForm] = useState(emptyQuiz);

//   // Load data
//   const loadInitialData = async () => {
//     try {
//       setLoading(true);
//       const [qRes, mRes] = await Promise.all([
//         api.get("/quiz/all"),
//         api.get("/modules"),
//       ]);

//       const groupedMap = new Map();

//       qRes.data.forEach((quiz) => {
//         const mid = quiz.moduleId?._id || quiz.moduleId;
//         if (!mid) return;

//         if (!groupedMap.has(mid)) {
//           groupedMap.set(mid, {
//             _id: quiz._id,
//             moduleId: mid,
//             moduleName: quiz.moduleName,
//             questionsCount: 0,
//           });
//         }
//         groupedMap.get(mid).questionsCount += quiz.questions?.length || 0;
//       });

//       setQuizzes(Array.from(groupedMap.values()));
//       setModules(mRes.data.modules || mRes.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   // Auto-open edit modal from ViewQuestions
//   useEffect(() => {
//     if (location.state?.openEditForModuleId && quizzes.length > 0) {
//       const id = location.state.openEditForModuleId;
//       const quiz = quizzes.find((q) => q.moduleId === id);
//       if (quiz) openEditModal(quiz);
//     }
//   }, [location.state, quizzes]);

//   const filtered = quizzes.filter((q) =>
//     q.moduleName?.toLowerCase().includes(search.toLowerCase())
//   );

//   const addQuestion = () => {
//     setForm({
//       ...form,
//       questions: [...form.questions, { question: "", options: ["", "", "", ""], correct: 0 }],
//     });
//   };

//   const removeQuestion = (i) => {
//     if (form.questions.length === 1) return alert("At least 1 question required");
//     setForm({
//       ...form,
//       questions: form.questions.filter((_, idx) => idx !== i),
//     });
//   };

//   const updateField = (i, field, value) => {
//     const updated = [...form.questions];
//     updated[i][field] = value;
//     setForm({ ...form, questions: updated });
//   };

//   const updateOption = (qIdx, optIdx, value) => {
//     const updated = [...form.questions];
//     updated[qIdx].options[optIdx] = value;
//     setForm({ ...form, questions: updated });
//   };

//   // Save (Create or Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.moduleId) return alert("Module is required");

//     try {
//       await api.post("/quiz", {
//         moduleId: form.moduleId,
//         moduleName: form.moduleName,
//         questions: form.questions,
//       });

//       alert(editing ? "Questions updated successfully!" : "Quiz created successfully!");
//       closeModal();
//       loadInitialData();
//       navigate("/admin/quiz", { replace: true });
//     } catch (err) {
//       alert(err.response?.data?.message || "Save failed");
//     }
//   };

//   // Delete entire quiz for module
//   const handleDelete = async (quizId, moduleName) => {
//     if (!window.confirm(`Delete all questions for "${moduleName}"?\nThis cannot be undone.`)) return;

//     try {
//       await api.delete(`/quiz/${quizId}`);
//       alert("Quiz deleted successfully!");
//       loadInitialData();
//     } catch (err) {
//       alert("Delete failed: " + (err.response?.data?.message || "Server error"));
//     }
//   };

//   // Open Edit Modal
//   const openEditModal = async (quiz) => {
//     try {
//       const res = await api.get(`/quiz/by-module/${quiz.moduleId}`);
//       setForm({
//         moduleId: quiz.moduleId,
//         moduleName: res.data.moduleName,
//         questions: res.data.questions || [],
//       });
//       setEditing(true);
//       setAdding(false);
//     } catch (err) {
//       alert("Failed to load questions");
//     }
//   };

//   const closeModal = () => {
//     setAdding(false);
//     setEditing(false);
//     setForm(emptyQuiz);
//     navigate(location.pathname, { replace: true });
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
//     <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 p-8">
//       {/* Background Decorative Elements */}
//       <div className="absolute top-0 left-0 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

//       <div className="relative w-full max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-8">
//           <button
//             onClick={() => navigate("/admin")}
//             className="flex items-center gap-3 text-gray-600 hover:text-orange-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//           >
//             <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Dashboard
//           </button>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => {
//                 setAdding(true);
//                 setForm({ ...emptyQuiz });
//               }}
//               className="flex items-center gap-3 bg-linear-to-r from-orange-600 to-red-600 
//                        text-white px-6 py-3 rounded-2xl font-semibold hover:from-orange-700 hover:to-red-700 
//                        transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer
//                        shadow-lg hover:shadow-xl group/add"
//             >
//               <FiPlus className="group-hover/add:scale-110 transition-transform" size={20} />
//               <span>Add Questions</span>
//             </button>
//             <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
//               <FiHelpCircle className="text-white" size={28} />
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="text-center mb-10">
//           <h1 className="text-5xl font-black bg-linear-to-r from-orange-600 to-red-700 bg-clip-text text-transparent mb-4">
//             Quiz Management
//           </h1>
//           <p className="text-gray-600 text-lg font-medium">
//             Create and manage assessments for your learning modules
//           </p>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Quizzes"
//             value={quizzes.length}
//             color="from-orange-500 to-orange-700"
//             icon="📝"
//           />
//           <StatCard
//             title="Total Questions"
//             value={quizzes.reduce((acc, q) => acc + q.questionsCount, 0)}
//             color="from-red-500 to-red-700"
//             icon="❓"
//           />
//           <StatCard
//             title="Active Modules"
//             value={modules.length}
//             color="from-purple-500 to-purple-700"
//             icon="📚"
//           />
//           <StatCard
//             title="Avg Questions"
//             value={quizzes.length ? Math.round(quizzes.reduce((acc, q) => acc + q.questionsCount, 0) / quizzes.length) : 0}
//             color="from-blue-500 to-blue-700"
//             icon="📊"
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
//               placeholder="Search quizzes by module name..."
//               className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 
//                        bg-white/60 backdrop-blur-sm
//                        focus:ring-4 focus:ring-orange-200 focus:border-orange-500 
//                        transition-all duration-300 placeholder-gray-400
//                        hover:border-gray-300 hover:bg-white/80
//                        text-lg font-medium cursor-text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>

//           {/* Quizzes Table */}
//           {loading ? (
//             <div className="flex justify-center items-center p-12">
//               <div className="flex flex-col items-center space-y-4">
//                 <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
//                 <span className="text-gray-600 text-lg font-medium">Loading quizzes...</span>
//               </div>
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="text-center p-12">
//               <div className="flex flex-col items-center space-y-6">
//                 <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center">
//                   <FiHelpCircle className="text-gray-400" size={40} />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-700 mb-2">No quizzes found</h3>
//                   <p className="text-gray-500 max-w-md">
//                     {search ? "Try adjusting your search terms" : "Get started by creating your first quiz"}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => {
//                     setAdding(true);
//                     setForm({ ...emptyQuiz });
//                   }}
//                   className="flex items-center gap-3 bg-linear-to-r from-orange-600 to-red-600 
//                            text-white px-8 py-4 rounded-2xl font-bold hover:from-orange-700 hover:to-red-700 
//                            transform hover:-translate-y-1 transition-all duration-300 cursor-pointer
//                            shadow-lg hover:shadow-xl mt-4"
//                 >
//                   <FiPlus size={20} />
//                   <span>Create First Quiz</span>
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {filtered.map((quiz) => (
//                   <div
//                     key={quiz.moduleId}
//                     className="bg-linear-to-br from-white to-gray-50/80 rounded-2xl p-6 
//                              border-2 border-gray-200/50 hover:border-orange-300/50 
//                              shadow-lg hover:shadow-2xl transition-all duration-500 
//                              transform hover:-translate-y-2 group cursor-pointer"
//                   >
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
//                         <FiBook className="text-white" size={20} />
//                       </div>
//                       <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         <button
//                           onClick={() => navigate(`/view-questions/${quiz.moduleId}`)}
//                           className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center 
//                                    text-blue-600 hover:bg-blue-600 hover:text-white 
//                                    transition-all duration-300 cursor-pointer hover:scale-110"
//                           title="View Questions"
//                         >
//                           <FiEye size={16} />
//                         </button>
//                         <button
//                           onClick={() => openEditModal(quiz)}
//                           className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center 
//                                    text-emerald-600 hover:bg-emerald-600 hover:text-white 
//                                    transition-all duration-300 cursor-pointer hover:scale-110"
//                           title="Edit Quiz"
//                         >
//                           <FiEdit size={16} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(quiz._id, quiz.moduleName)}
//                           className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center 
//                                    text-red-600 hover:bg-red-600 hover:text-white 
//                                    transition-all duration-300 cursor-pointer hover:scale-110"
//                           title="Delete Quiz"
//                         >
//                           <FiTrash2 size={16} />
//                         </button>
//                       </div>
//                     </div>

//                     <h3 className="font-bold text-gray-800 text-lg mb-3 line-clamp-2 group-hover:text-orange-700 transition-colors">
//                       {quiz.moduleName}
//                     </h3>

//                     <div className="bg-linear-to-r from-orange-50 to-red-50/50 rounded-xl p-4 border border-orange-200/50">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <FiList className="text-orange-600" size={18} />
//                           <span className="text-sm font-semibold text-gray-700">Questions</span>
//                         </div>
//                         <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
//                           {quiz.questionsCount}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200/50">
//                       <span className="text-sm text-gray-500 font-medium">
//                         Module Quiz
//                       </span>
//                       <FiChevronRight className="text-gray-400 group-hover:text-orange-600 transition-colors" />
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Results Count */}
//               <div className="text-center mt-8 pt-6 border-t border-gray-200/50">
//                 <p className="text-gray-600 font-medium">
//                   Showing <span className="font-bold text-orange-600">{filtered.length}</span> of{" "}
//                   <span className="font-bold text-gray-700">{quizzes.length}</span> quizzes
//                   {search && " matching your search"}
//                 </p>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* MODAL */}
//       {(adding || editing) && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/50 transform animate-scale-in">
//             <div className="p-8">
//               {/* Header */}
//               <div className="flex items-center justify-between mb-8">
//                 <div>
//                   <h2 className="text-3xl font-black bg-linear-to-r from-orange-600 to-red-700 bg-clip-text text-transparent">
//                     {editing ? `Edit: ${form.moduleName}` : "Create New Quiz"}
//                   </h2>
//                   <p className="text-gray-600 mt-2">
//                     {editing ? "Update questions and answers" : "Add assessment questions to your module"}
//                   </p>
//                 </div>
//                 <button
//                   onClick={closeModal}
//                   className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center 
//                            hover:bg-gray-200 transition-colors cursor-pointer hover:scale-110"
//                 >
//                   <FiX size={24} className="text-gray-600" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-8">
//                 {/* Module Selection/Info */}
//                 {editing ? (
//                   <div className="p-6 bg-linear-to-r from-orange-50 to-red-50/50 rounded-2xl border-2 border-orange-200/50">
//                     <div className="flex items-center space-x-3">
//                       <FiBook className="text-orange-600" size={24} />
//                       <div>
//                         <p className="text-sm font-medium text-gray-600">Editing Quiz For</p>
//                         <p className="text-xl font-bold text-gray-800">{form.moduleName}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="group">
//                     <label className="block mb-3 font-semibold text-gray-700 text-lg">Select Module</label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                         <FiBook className="text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
//                       </div>
//                       <select
//                         value={form.moduleId}
//                         onChange={(e) => {
//                           const m = modules.find((m) => m._id === e.target.value);
//                           if (m) setForm({ ...form, moduleId: m._id, moduleName: m.title });
//                         }}
//                         required
//                         className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 
//                                  focus:ring-4 focus:ring-orange-200 focus:border-orange-500 
//                                  transition-all duration-300 appearance-none cursor-pointer
//                                  hover:border-gray-300 text-lg font-medium"
//                       >
//                         <option value="">Choose a module...</option>
//                         {modules.map((m) => (
//                           <option key={m._id} value={m._id}>
//                             {m.title}
//                           </option>
//                         ))}
//                       </select>
//                       <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
//                         <span className="text-gray-400">▼</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Questions */}
//                 <div className="space-y-6">
//                   {form.questions.map((q, i) => (
//                     <div key={i} className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200/50 relative group/question">
//                       {/* Remove Question Button */}
//                       {form.questions.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => removeQuestion(i)}
//                           className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full shadow-xl 
//                                    border-2 border-gray-300 flex items-center justify-center text-gray-500 
//                                    hover:text-white hover:bg-red-500 hover:border-red-500 
//                                    transition-all duration-300 cursor-pointer hover:scale-110"
//                           title="Remove Question"
//                         >
//                           <FiX size={18} />
//                         </button>
//                       )}

//                       <div className="flex items-center space-x-3 mb-4">
//                         <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
//                           <span className="text-orange-600 font-bold text-sm">{i + 1}</span>
//                         </div>
//                         <h3 className="font-semibold text-gray-700">Question {i + 1}</h3>
//                       </div>

//                       <input
//                         type="text"
//                         placeholder="Enter your question here..."
//                         value={q.question}
//                         onChange={(e) => updateField(i, "question", e.target.value)}
//                         className="w-full p-4 rounded-2xl border-2 border-gray-200 
//                                  focus:ring-4 focus:ring-orange-200 focus:border-orange-500 
//                                  transition-all duration-300 mb-4 text-lg font-medium
//                                  placeholder-gray-400"
//                         required
//                       />

//                       <div className="space-y-3 mb-4">
//                         {q.options.map((opt, j) => (
//                           <div key={j} className="flex items-center space-x-3">
//                             <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center
//                                           ${q.correct === j ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>
//                               {q.correct === j && <FiCheckCircle className="text-white" size={14} />}
//                             </div>
//                             <input
//                               type="text"
//                               placeholder={`Option ${j + 1}`}
//                               value={opt}
//                               onChange={(e) => updateOption(i, j, e.target.value)}
//                               className="flex-1 p-3 rounded-xl border-2 border-gray-200 
//                                        focus:ring-2 focus:ring-orange-200 focus:border-orange-500 
//                                        transition-all duration-300 text-lg
//                                        placeholder-gray-400"
//                               required
//                             />
//                           </div>
//                         ))}
//                       </div>

//                       <select
//                         value={q.correct}
//                         onChange={(e) => updateField(i, "correct", Number(e.target.value))}
//                         className="w-full p-4 rounded-2xl border-2 border-green-400 
//                                  bg-green-50/50 focus:ring-4 focus:ring-green-200 
//                                  transition-all duration-300 font-semibold text-green-800
//                                  cursor-pointer"
//                       >
//                         {[0, 1, 2, 3].map((n) => (
//                           <option key={n} value={n}>
//                             ✅ Correct Answer: Option {n + 1}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Add Question Button */}
//                 <button
//                   type="button"
//                   onClick={addQuestion}
//                   className="w-full bg-linear-to-r from-green-500 to-emerald-600 text-white 
//                            py-4 rounded-2xl text-xl font-bold hover:from-green-600 hover:to-emerald-700 
//                            transform hover:-translate-y-1 transition-all duration-300 cursor-pointer
//                            shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
//                 >
//                   <FiPlus size={24} />
//                   <span>Add Another Question</span>
//                 </button>

//                 {/* Action Buttons */}
//                 <div className="flex justify-end gap-4 pt-6 border-t border-gray-200/50">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="px-8 py-4 rounded-2xl bg-gray-100 text-gray-700 font-semibold 
//                              hover:bg-gray-200 transition-all duration-300 cursor-pointer
//                              hover:shadow-lg"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-10 py-4 rounded-2xl bg-linear-to-r from-orange-600 to-red-600 
//                              text-white font-bold text-lg hover:from-orange-700 hover:to-red-700 
//                              transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer
//                              shadow-lg hover:shadow-xl flex items-center gap-3"
//                   >
//                     <FiCheckCircle size={20} />
//                     <span>{editing ? "Update Questions" : "Save Quiz"}</span>
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//===============kp=============

import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiPlus, FiEdit, FiTrash2, FiEye, FiSearch, FiArrowLeft,
  FiBook, FiHelpCircle, FiCheckCircle, FiX
} from "react-icons/fi";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [modules, setModules] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const emptyForm = {
    moduleId: "",
    moduleName: "",
    questions: [{ question: "", options: ["", "", "", ""], correct: 0 }]
  };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [quizRes, modRes] = await Promise.all([
        api.get("/quiz/all"),
        api.get("/modules")
      ]);

      const quizMap = new Map();
      quizRes.data.forEach(q => {
        const mid = q.moduleId?._id || q.moduleId;
        if (mid) {
          if (!quizMap.has(mid)) {
            quizMap.set(mid, {
              moduleId: mid,
              moduleName: q.moduleName || "Unknown",
              questionCount: q.questions?.length || 0
            });
          } else {
            quizMap.get(mid).questionCount += q.questions?.length || 0;
          }
        }
      });

      setQuizzes(Array.from(quizMap.values()));
      setModules(modRes.data || []);
    } catch (err) {
      alert("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  const filtered = quizzes.filter(q =>
    q.moduleName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    if (!form.moduleId) return alert("Please select a module");

    try {
      await api.post("/quiz", {
        moduleId: form.moduleId,
        questions: form.questions
      });

      alert(editingQuiz ? "Quiz updated!" : "Quiz created!");
      setShowModal(false);
      setEditingQuiz(null);
      setForm(emptyForm);
      loadData();
    } catch (err) {
      alert("Save failed");
    }
  };

  const handleDelete = async (moduleId) => {
    if (!confirm("Delete quiz for this module?")) return;
    try {
      const quiz = quizzes.find(q => q.moduleId === moduleId);
      if (quiz) {
        await api.delete(`/quiz/${quiz._id || moduleId}`);
        loadData();
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  const openEdit = async (quiz) => {
    try {
      const res = await api.get(`/quiz/by-module/${quiz.moduleId}`);
      setForm({
        moduleId: quiz.moduleId,
        moduleName: quiz.moduleName,
        questions: res.data.questions || []
      });
      setEditingQuiz(quiz);
      setShowModal(true);
    } catch (err) {
      alert("Failed to load quiz");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <button onClick={() => navigate("/admin")} className="flex items-center gap-3 text-gray-700">
            <FiArrowLeft /> Back
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-linear-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-3"
          >
            <FiPlus /> Add Quiz
          </button>
        </div>

        <h1 className="text-5xl font-black text-center text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-red-700 mb-10">
          Quiz Management
        </h1>

        <input
          type="text"
          placeholder="Search by module name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md mx-auto block p-4 rounded-xl border mb-8"
        />

        {loading ? (
          <p className="text-center text-2xl">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(quiz => (
              <div key={quiz.moduleId} className="bg-white p-6 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold">{quiz.moduleName}</h3>
                <p className="text-3xl font-black text-orange-600 my-4">{quiz.questionCount}</p>
                <p className="text-gray-600 mb-6">questions</p>

                <div className="flex gap-3">
                  <button onClick={() => navigate(`/view-questions/${quiz.moduleId}`)} className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                    <FiEye />
                  </button>
                  <button onClick={() => openEdit(quiz)} className="bg-green-100 text-green-600 p-3 rounded-lg">
                    <FiEdit />
                  </button>
                  <button onClick={() => handleDelete(quiz.moduleId)} className="bg-red-100 text-red-600 p-3 rounded-lg">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Simple Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl font-bold mb-6">
                {editingQuiz ? "Edit Quiz" : "Create Quiz"}
              </h2>

              {!editingQuiz && (
                <select
                  value={form.moduleId}
                  onChange={e => {
                    const mod = modules.find(m => m._id === e.target.value);
                    if (mod) setForm({ ...form, moduleId: mod._id, moduleName: mod.title });
                  }}
                  className="w-full p-4 border rounded-lg mb-6"
                >
                  <option value="">Select Module</option>
                  {modules.map(m => (
                    <option key={m._id} value={m._id}>{m.title}</option>
                  ))}
                </select>
              )}

              {/* Questions form here (same as before) */}
              {/* ... (add your question form logic) */}

              <div className="flex justify-end gap-4 mt-8">
                <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-gray-200 rounded-lg">
                  Cancel
                </button>
                <button onClick={handleSave} className="px-8 py-3 bg-orange-600 text-white rounded-lg">
                  Save Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}