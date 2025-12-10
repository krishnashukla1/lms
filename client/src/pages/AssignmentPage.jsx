

//=========================without module id wise==correct===========

// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import api from "../api/axios";
// import { FiArrowLeft, FiUploadCloud, FiCheckCircle, FiXCircle, FiFile, FiClock } from "react-icons/fi";
// import { motion } from "framer-motion";

// export default function AssignmentPage() {
//   const [file, setFile] = useState(null);
//   const [feedback, setFeedback] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const goBack = () => navigate("/student");

//   const uploadAssignment = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       return setFeedback({ type: "error", message: "Please select a file to upload" });
//     }

//     const formData = new FormData();
//     formData.append("assignment", file); // Field name must match multer: "assignment"

//     try {
//       setLoading(true);
//       setFeedback(null);

//       const token = localStorage.getItem("token");
//       if (!token) {
//         setFeedback({ type: "error", message: "You are not authenticated. Please log in again." });
//         setLoading(false);
//         return;
//       }

//       const response = await api.post("/assignments", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setFeedback({ type: "success", message: "Assignment submitted successfully!" });

//       // Redirect after success
//       setTimeout(() => {
//         navigate("/student", { replace: true });
//       }, 2000);

//     } catch (err) {
//       const message =
//         err.response?.data?.message ||
//         err.message ||
//         "Upload failed. Please try again.";

//       if (err.response?.status === 400 && message.includes("already")) {
//         setFeedback({ type: "error", message: "You have already submitted an assignment." });
//       } else {
//         setFeedback({ type: "error", message });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 md:p-6 relative overflow-hidden">

//       {/* Decorative Background Blobs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
//         <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
//         <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
//       </div>

//       <div className="relative z-10 w-full max-w-2xl">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6 p-4 md:p-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50"
//         >
//           <div className="flex items-center gap-4">
//             <motion.button
//               whileHover={{ scale: 1.05, x: -5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={goBack}
//               className="group flex items-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-indigo-50"
//             >
//               <FiArrowLeft className="text-indigo-600 group-hover:text-indigo-700 transition-transform duration-300 group-hover:-translate-x-1" size={22} />
//               <span className="font-semibold text-gray-700 group-hover:text-indigo-700">Back to Dashboard</span>
//             </motion.button>
//           </div>

//           <div className="text-center lg:text-right">
//             <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Assignment Submission
//             </h1>
//             <p className="text-gray-600 mt-2">Submit your final assignment securely</p>
//           </div>
//         </motion.div>

//         {/* Main Card */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
//         >
//           <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 p-1">
//             <div className="bg-linear-to-br from-white to-gray-50 rounded-3xl p-6 md:p-10">

//               <div className="text-center mb-8">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.4, type: "spring" }}
//                   className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full mb-6 shadow-2xl border-4 border-white"
//                 >
//                   <FiUploadCloud className="text-white" size={42} />
//                 </motion.div>
//                 <h2 className="text-3xl font-bold text-gray-800 mb-3">Upload Your Assignment</h2>
//                 <p className="text-gray-600 text-lg">Only one submission allowed per student</p>
//               </div>

//               {/* Feedback Alert */}
//               {feedback && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`flex items-center gap-4 p-5 rounded-2xl mb-8 font-semibold text-lg shadow-lg border-2
//                     ${feedback.type === "success"
//                       ? "bg-linear-to-r from-emerald-50 to-green-50 text-emerald-800 border-emerald-200"
//                       : "bg-linear-to-r from-rose-50 to-red-50 text-rose-800 border-rose-200"
//                     }`}
//                 >
//                   <div className={`p-3 rounded-full ${feedback.type === "success" ? "bg-emerald-100" : "bg-rose-100"}`}>
//                     {feedback.type === "success" ? <FiCheckCircle size={28} className="text-emerald-600" /> : <FiXCircle size={28} className="text-rose-600" />}
//                   </div>
//                   <div>
//                     <span className="block">{feedback.message}</span>
//                     {feedback.type === "success" && (
//                       <span className="text-emerald-600 text-sm font-normal mt-1 block">
//                         Redirecting to dashboard...
//                       </span>
//                     )}
//                   </div>
//                 </motion.div>
//               )}

//               {/* Upload Form */}
//               <form onSubmit={uploadAssignment}>
//                 <motion.div whileHover={{ scale: 1.02 }} className="relative mb-8">
//                   <input
//                     type="file"
//                     id="assignment"
//                     className="absolute inset-0 opacity-0 cursor-pointer z-10"
//                     onChange={(e) => setFile(e.target.files[0])}
//                     accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.jpeg,.png"
//                     disabled={loading}
//                   />
//                   <label
//                     htmlFor="assignment"
//                     className={`block w-full p-10 border-4 border-dashed rounded-2xl text-center transition-all duration-300 cursor-pointer group relative overflow-hidden
//                       ${file
//                         ? "border-indigo-500 bg-linear-to-br from-indigo-50 to-purple-50 shadow-xl"
//                         : "border-gray-300 bg-white hover:border-indigo-400 hover:bg-gray-50 hover:shadow-md"
//                       } ${loading ? "cursor-not-allowed opacity-75" : ""}`}
//                   >
//                     <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

//                     <div className="relative z-10">
//                       <FiUploadCloud
//                         className={`mx-auto mb-4 transition-all duration-300 ${file ? "text-indigo-600 scale-110" : "text-gray-400 group-hover:text-indigo-500"}`}
//                         size={48}
//                       />
//                       <p className="text-xl font-semibold text-gray-800 mb-2">
//                         {file ? (
//                           <span className="flex items-center justify-center gap-2">
//                             <FiFile className="text-indigo-600" />
//                             {file.name}
//                           </span>
//                         ) : (
//                           "Click to upload your assignment"
//                         )}
//                       </p>
//                       <p className={`text-sm ${file ? "text-indigo-600 font-medium" : "text-gray-500"}`}>
//                         {file
//                           ? `File ready • ${(file.size / 1024 / 1024).toFixed(2)} MB`
//                           : "PDF, DOCX, ZIP, Images • Max 5MB"}
//                       </p>
//                       {file && (
//                         <motion.div
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
//                         >
//                           <FiCheckCircle className="text-indigo-600" />
//                           Ready to Submit
//                         </motion.div>
//                       )}
//                     </div>
//                   </label>
//                 </motion.div>

//                 {/* Submit Button */}
//                 <motion.button
//                   whileHover={{ scale: loading || !file ? 1 : 1.05 }}
//                   whileTap={{ scale: loading || !file ? 1 : 0.95 }}
//                   type="submit"
//                   disabled={loading || !file}
//                   className={`w-full py-5 rounded-2xl font-bold text-xl transition-all shadow-lg relative overflow-hidden group
//                     ${loading || !file
//                       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       : "bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-2xl"
//                     }`}
//                 >
//                   <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                   <span className="relative z-10 flex items-center justify-center gap-3">
//                     {loading ? (
//                       <>
//                         <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
//                         Submitting...
//                       </>
//                     ) : (
//                       <>
//                         <FiUploadCloud size={24} />
//                         Submit Assignment
//                       </>
//                     )}
//                   </span>
//                 </motion.button>
//               </form>
//             </div>
//           </div>
//         </motion.div>

//         {/* Footer Note */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="text-center mt-8 p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50"
//         >
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600">
//             <div className="flex items-center gap-2">
//               <FiClock className="text-indigo-500" />
//               <span className="font-medium">Reviewed within 48 hours</span>
//             </div>
//             <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
//             <div className="flex items-center gap-2">
//               <FiCheckCircle className="text-emerald-500" />
//               <span className="font-medium">Secure & encrypted</span>
//             </div>
//             <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
//             <div className="flex items-center gap-2">
//               <FiFile className="text-purple-500" />
//               <span className="font-medium">One submission only</span>
//             </div>
//           </div>
//           <p className="text-gray-500 mt-4 text-sm font-medium">
//             Thank you for your hard work • We appreciate your submission!
//           </p>
//         </motion.div>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob { animation: blob 25s infinite; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-3000 { animation-delay: 3s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>
//     </div>
//   );
// }


//======================kp===============
// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function AssignmentPage() {
//   const [file, setFile] = useState(null);
//   const [courseType, setCourseType] = useState("basic");
//   const [loading, setLoading] = useState(false);
//   const [alreadySubmitted, setAlreadySubmitted] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     api.get("/finalAssignments/assignment-status")
//       .then(res => setAlreadySubmitted(res.data.submitted))
//       .catch(() => {});
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return toast.error("Please select a file");

//     const formData = new FormData();
//     formData.append("assignment", file);
//     formData.append("courseType", courseType);

//     try {
//       setLoading(true);
//       await api.post("/finalAssignments", formData);
//       toast.success("Assignment submitted successfully!");
//       setAlreadySubmitted(true);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Submission failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (alreadySubmitted) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-green-50 to-teal-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-9xl mb-8">Checkmark</div>
//           <h1 className="text-4xl font-bold text-green-700 mb-4">Assignment Already Submitted</h1>
//           <button onClick={() => navigate("/student")} className="mt-8 bg-green-600 text-white px-8 py-4 rounded-xl">
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6">
//       <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12">
//         <h1 className="text-4xl font-bold text-center mb-10 bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
//           Submit Final Assignment
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           <div>
//             <label className="block text-xl font-bold mb-3">Select Your Course</label>
//             <select
//               value={courseType}
//               onChange={e => setCourseType(e.target.value)}
//               className="w-full p-4 border-2 rounded-xl text-lg"
//             >
//               <option value="basic">Basic Course (6 months)</option>
//               <option value="intermediate">Intermediate Course (6 months)</option>
//               <option value="advanced">Advanced Course (12 months)</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-xl font-bold mb-3">Upload Assignment File</label>
//             <input
//               type="file"
//               accept=".pdf,.docx,.zip,.jpg,.jpeg,.png"
//               onChange={e => setFile(e.target.files[0])}
//               className="w-full p-4 border-2 rounded-xl text-lg"
//               required
//             />
//             {file && <p className="mt-2 text-green-600">Selected: {file.name}</p>}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-linear-to-r from-indigo-600 to-purple-700 text-white py-6 rounded-2xl text-2xl font-bold hover:shadow-2xl transition disabled:opacity-50"
//           >
//             {loading ? "Uploading..." : "Submit Assignment"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// ===============11 pm 26 dec==========

// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { FiUpload, FiCheckCircle, FiFileText } from "react-icons/fi";
// import { motion } from "framer-motion";

// export default function AssignmentPage() {
//   const [file, setFile] = useState(null);
//   const [courseType, setCourseType] = useState("basic");
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     api.get("/final-assignments/assignment-status")
//       .then(res => setSubmitted(res.data.submitted))
//       .catch(() => {});
//   }, []);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!file) return alert("Please select a file");

//   //   const formData = new FormData();
//   //   formData.append("assignment", file);
//   //   formData.append("courseType", courseType);

//   //   try {
//   //     setLoading(true);
//   //     await api.post("/final-assignments", formData);
//   //     alert("Assignment submitted successfully!");
//   //     setSubmitted(true);
//   //   } catch (err) {
//   //     alert("Submission failed");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };



//   const handleSubmit = async (formData) => {
//   try {
//     await api.post("/final-assignments/upload", formData);
//     const res = await api.get(`/final-assignments/assignment-status?t=${Date.now()}`);
//     setHasSubmittedAssignment(!!res.data[courseType]?.submittedAt);
//   } catch (err) {
//     console.error(err);
//   }
// };




//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-8">
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className="text-center"
//         >
//           <FiCheckCircle className="mx-auto text-emerald-600 mb-8" size={120} />
//           <h1 className="text-6xl font-black text-emerald-700 mb-6">Submitted Successfully!</h1>
//           <p className="text-2xl text-gray-700 mb-12">Your final assignment has been received</p>
//           <button
//             onClick={() => navigate("/student")}
//             className="bg-emerald-600 text-white px-12 py-6 rounded-3xl text-2xl font-bold shadow-2xl hover:bg-emerald-700"
//           >
//             Back to Dashboard
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-3xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100"
//         >
//           <div className="text-center mb-12">
//             <FiFileText className="mx-auto text-indigo-600 mb-6" size={80} />
//             <h1 className="text-5xl font-black bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
//               Submit Final Assignment
//             </h1>
//             <p className="text-xl text-gray-600 mt-6">One-time submission to complete your course</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-10">
//             <div>
//               <label className="block text-2xl font-bold text-gray-800 mb-4">Select Course</label>
//               <select
//                 value={courseType}
//                 onChange={(e) => setCourseType(e.target.value)}
//                 className="w-full p-6 border-2 border-indigo-200 rounded-2xl text-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//               >
//                 <option value="basic">Basic Course (6 months)</option>
//                 <option value="intermediate">Intermediate Course (6 months)</option>
//                 <option value="advanced">Advanced Course (12 months)</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-2xl font-bold text-gray-800 mb-4">Upload Your Assignment</label>
//               <div className="border-4 border-dashed border-indigo-300 rounded-3xl p-16 text-center hover:border-indigo-500 transition">
//                 <FiUpload className="mx-auto text-indigo-600 mb-6" size={64} />
//                 <input
//                   type="file"
//                   accept=".pdf,.docx,.zip,.jpg,.jpeg,.png"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   className="hidden"
//                   id="file-upload"
//                 />
//                 <label
//                   htmlFor="file-upload"
//                   className="cursor-pointer text-xl font-bold text-indigo-700 hover:text-indigo-900"
//                 >
//                   Click to select file
//                 </label>
//                 {file && <p className="mt-6 text-green-600 font-bold text-2xl">{file.name}</p>}
//               </div>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               disabled={loading}
//               className="w-full bg-linear-to-r from-indigo-600 to-purple-700 text-white py-8 rounded-3xl text-3xl font-black shadow-2xl hover:shadow-3xl disabled:opacity-60"
//             >
//               {loading ? "Uploading..." : "Submit Final Assignment"}
//             </motion.button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

//=============


// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { FiUpload, FiCheckCircle, FiFileText } from "react-icons/fi";
// import { motion } from "framer-motion";

// export default function AssignmentPage() {
//   const [file, setFile] = useState(null);
//   const [courseType, setCourseType] = useState("basic");
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const navigate = useNavigate();

//   // Check if assignment is already submitted for this course
//   useEffect(() => {
//     api.get("/final-assignments/assignment-status")
//       .then(res => {
//         setSubmitted(!!res.data[courseType]?.submittedAt);
//       })
//       .catch(() => {});
//   }, [courseType]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please select a file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("assignment", file); // ✅ must match backend
//     formData.append("courseType", courseType);

//     try {
//       setLoading(true);

//       const response = await api.post("/final-assignments", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert(response.data.message || "Assignment submitted successfully!");

//       // Update submitted state
//       const res = await api.get(`/final-assignments/assignment-status?t=${Date.now()}`);
//       setSubmitted(!!res.data[courseType]?.submittedAt);

//     } catch (err) {
//       console.error("Submission failed:", err);
//       alert(err.response?.data?.message || "Submission failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-8">
//         <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
//           <FiCheckCircle className="mx-auto text-emerald-600 mb-8" size={120} />
//           <h1 className="text-6xl font-black text-emerald-700 mb-6">Submitted Successfully!</h1>
//           <p className="text-2xl text-gray-700 mb-12">Your final assignment has been received</p>
//           <button
//             onClick={() => navigate("/student")}
//             className="bg-emerald-600 text-white px-12 py-6 rounded-3xl text-2xl font-bold shadow-2xl hover:bg-emerald-700"
//           >
//             Back to Dashboard
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-3xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
//           <div className="text-center mb-12">
//             <FiFileText className="mx-auto text-indigo-600 mb-6" size={80} />
//             <h1 className="text-5xl font-black bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
//               Submit Final Assignment
//             </h1>
//             <p className="text-xl text-gray-600 mt-6">One-time submission to complete your course</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-10">
//             <div>
//               <label className="block text-2xl font-bold text-gray-800 mb-4">Select Course</label>
//               <select
//                 value={courseType}
//                 onChange={(e) => setCourseType(e.target.value)}
//                 className="w-full p-6 border-2 border-indigo-200 rounded-2xl text-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//               >
//                 <option value="basic">Basic Course (6 months)</option>
//                 <option value="intermediate">Intermediate Course (6 months)</option>
//                 <option value="advanced">Advanced Course (12 months)</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-2xl font-bold text-gray-800 mb-4">Upload Your Assignment</label>
//               <div className="border-4 border-dashed border-indigo-300 rounded-3xl p-16 text-center hover:border-indigo-500 transition">
//                 <FiUpload className="mx-auto text-indigo-600 mb-6" size={64} />
//                 <input
//                   type="file"
//                   accept=".pdf,.docx,.zip,.jpg,.jpeg,.png"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   className="hidden"
//                   id="file-upload"
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer text-xl font-bold text-indigo-700 hover:text-indigo-900">
//                   Click to select file
//                 </label>
//                 {file && <p className="mt-6 text-green-600 font-bold text-2xl">{file.name}</p>}
//               </div>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               disabled={loading}
//               className="w-full bg-linear-to-r from-indigo-600 to-purple-700 text-white py-8 rounded-3xl text-3xl font-black shadow-2xl hover:shadow-3xl disabled:opacity-60"
//             >
//               {loading ? "Uploading..." : "Submit Final Assignment"}
//             </motion.button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { FiUpload, FiCheckCircle, FiFileText } from "react-icons/fi";
// import { motion } from "framer-motion";

// export default function AssignmentPage() {
//   const [file, setFile] = useState(null);
//   const [courseType, setCourseType] = useState("basic"); // Keep default as "basic"
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const navigate = useNavigate();

//   // Check if assignment is already submitted for this course
//   useEffect(() => {
//     api.get("/final-assignments/assignment-status")
//       .then(res => {
//         setSubmitted(!!res.data[courseType]?.submittedAt);
//       })
//       .catch(() => {});
//   }, [courseType]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please select a file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("assignment", file);
//     formData.append("courseType", courseType);

//     try {
//       setLoading(true);

//       const response = await api.post("/final-assignments", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert(response.data.message || "Assignment submitted successfully!");

//       // Update submitted state
//       const res = await api.get(`/final-assignments/assignment-status?t=${Date.now()}`);
//       setSubmitted(!!res.data[courseType]?.submittedAt);

//     } catch (err) {
//       console.error("Submission failed:", err);
//       alert(err.response?.data?.message || "Submission failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-8">
//         <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
//           <FiCheckCircle className="mx-auto text-emerald-600 mb-8" size={120} />
//           <h1 className="text-6xl font-black text-emerald-700 mb-6">Submitted Successfully!</h1>
//           <p className="text-2xl text-gray-700 mb-12">Your final assignment has been received</p>
//           <button
//             onClick={() => navigate("/modules/basic")} // ✅ Navigate back to course page
//             className="bg-emerald-600 text-white px-12 py-6 rounded-3xl text-2xl font-bold shadow-2xl hover:bg-emerald-700"
//           >
//             Back to Course
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-3xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
//           <div className="text-center mb-12">
//             <FiFileText className="mx-auto text-indigo-600 mb-6" size={80} />
//             <h1 className="text-5xl font-black bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
//               Submit Final Assignment
//             </h1>
//             <p className="text-xl text-gray-600 mt-6">One-time submission to complete your course</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-10">
//             {/* Removed "Select Course" dropdown */}

//             <div>
//               <label className="block text-2xl font-bold text-gray-800 mb-4">Upload Your Assignment</label>
//               <div className="border-4 border-dashed border-indigo-300 rounded-3xl p-16 text-center hover:border-indigo-500 transition">
//                 <FiUpload className="mx-auto text-indigo-600 mb-6" size={64} />
//                 <input
//                   type="file"
//                   accept=".pdf,.docx,.zip,.jpg,.jpeg,.png"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   className="hidden"
//                   id="file-upload"
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer text-xl font-bold text-indigo-700 hover:text-indigo-900">
//                   Click to select file
//                 </label>
//                 {file && <p className="mt-6 text-green-600 font-bold text-2xl">{file.name}</p>}
//               </div>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               disabled={loading}
//               className="w-full bg-linear-to-r from-indigo-600 to-purple-700 text-white py-8 rounded-3xl text-3xl font-black shadow-2xl hover:shadow-3xl disabled:opacity-60"
//             >
//               {loading ? "Uploading..." : "Submit Final Assignment"}
//             </motion.button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

//===============correcxt====================================


// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { FiUpload, FiCheckCircle, FiFileText, FiArrowLeft } from "react-icons/fi";
// import { motion } from "framer-motion";

// export default function AssignmentPage() {
//   const [file, setFile] = useState(null);
//   const [courseType, setCourseType] = useState("basic"); // Fixed course
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const navigate = useNavigate();

//   // Check if assignment is already submitted for this course
//   useEffect(() => {
//     api.get("/final-assignments/assignment-status")
//       .then(res => {
//         setSubmitted(!!res.data[courseType]?.submittedAt);
//       })
//       .catch(() => { });
//   }, [courseType]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please select a file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("assignment", file);
//     formData.append("courseType", courseType);

//     try {
//       setLoading(true);

//       const response = await api.post("/final-assignments", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert(response.data.message || "Assignment submitted successfully!");

//       // Update submitted state
//       const res = await api.get(`/final-assignments/assignment-status?t=${Date.now()}`);
//       setSubmitted(!!res.data[courseType]?.submittedAt);

//     } catch (err) {
//       console.error("Submission failed:", err);
//       alert(err.response?.data?.message || "Submission failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // If assignment already submitted
//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-8">
//         <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
//           <FiCheckCircle className="mx-auto text-emerald-600 mb-8" size={120} />
//           <h1 className="text-6xl font-black text-emerald-700 mb-6">Submitted Successfully!</h1>
//           <p className="text-2xl text-gray-700 mb-12">Your final assignment has been received</p>
//           <div className="flex justify-center mt-10">
//             <button
//               onClick={() => navigate("/modules/basic")}
//               className="cursor-pointer flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 
//                rounded-xl text-lg font-semibold shadow-md hover:bg-emerald-700 
//                transition-all"
//             >
//               <FiArrowLeft size={20} />
//               Back to Course
//             </button>
//           </div>

//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-3xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">

//           {/* Back Button Above Form */}


//           <button
//             onClick={() => navigate(-1)}
//             className="cursor-pointer flex items-center gap-2 mb-8 text-indigo-600 font-bold hover:text-indigo-800"
//           >
//             <FiArrowLeft size={20} /> Back
//           </button>


//           <div className="text-center mb-12">
//             <FiFileText className="mx-auto text-indigo-600 mb-6" size={80} />
//             <h1 className="text-5xl font-black bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
//               Submit Final Assignment
//             </h1>
//             <p className="text-xl text-gray-600 mt-6">One-time submission to complete your course</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-10">

//             <div>
//               <label className="block text-2xl font-bold text-gray-800 mb-4">Upload Your Assignment</label>
//               {/* <div className="cursor-pointer border-4 border-dashed border-indigo-300 rounded-3xl p-16 text-center hover:border-indigo-500 transition">
//                 <FiUpload className="mx-auto text-indigo-600 mb-6" size={64} />
//                 <input
//                   type="file"
//                   accept=".pdf,.docx,.zip,.jpg,.jpeg,.png"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   className="hidden"
//                   id="file-upload"
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer text-xl font-bold text-indigo-700 hover:text-indigo-900">
//                   Click to select file
//                 </label>
//                 {file && <p className="mt-6 text-green-600 font-bold text-2xl">{file.name}</p>}
//               </div> */}


//               <label
//                 htmlFor="file-upload"
//                 className="cursor-pointer block border-4 border-dashed border-indigo-300 rounded-3xl p-16 text-center hover:border-indigo-500 transition"
//               >
//                 <FiUpload className="mx-auto text-indigo-600 mb-6" size={64} />

//                 <input
//                   type="file"
//                   accept=".pdf,.docx,.zip,.jpg,.jpeg,.png"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   className="hidden"
//                   id="file-upload"
//                 />

//                 <p className="text-xl font-bold text-indigo-700 hover:text-indigo-900">
//                   Click to select file
//                 </p>

//                 {file && (
//                   <p className="mt-6 text-green-600 font-bold text-2xl">{file.name}</p>
//                 )}
//               </label>


//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               disabled={loading}
//               className="cursor-pointer w-full bg-linear-to-r from-indigo-600 to-purple-700 text-white py-8 rounded-3xl text-3xl font-black shadow-2xl hover:shadow-3xl disabled:opacity-60"
//             >
//               {loading ? "Uploading..." : "Submit Final Assignment"}
//             </motion.button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

//====================

import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FiUpload, FiCheckCircle, FiFileText, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AssignmentPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const courseType =
    location.state?.courseType || params.courseType || "basic";

  const courseNames = {
    basic: "Basic Web Development",
    intermediate: "Intermediate JavaScript",
    advanced: "Full Stack Mastery",
  };

  useEffect(() => {
    const checkSubmissionStatus = async () => {
      try {
        const res = await api.get("/final-assignments/assignment-status");
        const isSubmitted = !!res.data[courseType]?.submittedAt;
        setSubmitted(isSubmitted);
      } catch (err) {
        console.error("Failed to check assignment status:", err);
      }
    };
    checkSubmissionStatus();
  }, [courseType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file to upload");

    const formData = new FormData();
    formData.append("assignment", file);
    formData.append("courseType", courseType);

    try {
      setLoading(true);
      const response = await api.post("/final-assignments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message || "Assignment submitted successfully!");
      setSubmitted(true);
      setFile(null);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Submission failed. Please try again.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center"
        >
          <FiCheckCircle className="mx-auto text-emerald-600 mb-8" size={120} />
          <h1 className="text-6xl font-black text-emerald-700 mb-6">
            Submitted Successfully!
          </h1>
          <p className="text-2xl text-gray-700 mb-12">
            Your final assignment for <strong>{courseNames[courseType]}</strong> has been received.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center gap-3 mx-auto bg-emerald-600 text-white px-8 py-4 
            rounded-2xl text-xl font-bold shadow-lg hover:bg-emerald-700 transition-all duration-300"
          >
            <FiArrowLeft size={24} />
            Back to Course
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100"
        >
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center gap-2 mb-8 text-indigo-600 font-semibold text-lg hover:text-indigo-800 transition"
          >
            <FiArrowLeft size={22} /> Back
          </button>

          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Course: <span className="text-indigo-600">{courseNames[courseType]}</span>
          </h2>

          <div className="text-center mb-5">
            <FiFileText className="mx-auto text-indigo-600 mb-6" size={80} />
            <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
              Submit Final Assignment
            </h1>
            <p className="text-xl text-gray-600 mt-6">
              One-time submission • Cannot be changed after upload
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-6">
                Upload Your Project Files
              </label>

              <label
                htmlFor="file-upload"
                className="block border-4 border-dashed border-indigo-300 
             rounded-3xl p-10 text-center
             hover:border-indigo-500 hover:bg-indigo-50 
             transition-all duration-300 cursor-pointer"
              >
                <FiUpload className="mx-auto text-indigo-600 mb-4" size={50} />
                <p className="text-xl font-bold text-indigo-700">
                  Click to select your assignment
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                  Supported: PDF, DOCX, ZIP, Images
                </p>

                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf,.docx,.zip,.jpg,.jpeg,.png,.gif"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />

                {file && (
                  <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-2xl">
                    <p className="text-green-700 font-bold text-lg">
                      Selected: {file.name}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </label>

            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !file}
              className="cursor-pointer w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white 
              py-5 rounded-3xl text-3xl font-black shadow-2xl 
              disabled:opacity-50 disabled:cursor-not-allowed 
              transition-all duration-300"
            >
              {loading ? "Uploading Assignment..." : "Submit Final Assignment"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
