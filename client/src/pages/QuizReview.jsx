

//=======11 pm 6 dec====correct======

// src/pages/QuizReview.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiArrowLeft, FiCheckCircle, FiXCircle, FiRotateCcw } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";

// export default function QuizReview() {
//   const { moduleId } = useParams();
//   const navigate = useNavigate();
//   const [reviewData, setReviewData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReview = async () => {
//       try {
//         const res = await api.get(`/quiz/review/${moduleId}`);
//         console.log("Review data:", res.data); // Debug

//         if (!res.data || !res.data.review || !Array.isArray(res.data.review)) {
//           throw new Error("Invalid review data");
//         }

//         setReviewData(res.data);
//       } catch (err) {
//         console.error("Review load error:", err);
//         toast.error("Failed to load quiz review");
//         setReviewData(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReview();
//   }, [moduleId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-100">
//         <div className="text-center">
//           <div className="w-20 h-20 border-8 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
//           <p className="text-2xl font-bold text-indigo-700">Loading Your Results...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!reviewData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-100">
//         <div className="text-center max-w-lg">
//           <div className="text-9xl mb-8">Question</div>
//           <h1 className="text-5xl font-black text-gray-800 mb-6">No Review Available</h1>
//           <p className="text-xl text-gray-600 mb-10">You may not have taken this quiz yet.</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-12 py-6 bg-indigo-600 text-white rounded-3xl font-bold text-2xl hover:bg-indigo-700 transition"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const { score, total, passed, review } = reviewData;

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-5xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-16">
//           <button
//             onClick={() => navigate(-1)}
//             className="mb-8 flex items-center gap-3 text-indigo-700 font-bold text-xl hover:text-indigo-900 mx-auto"
//           >
//             <FiArrowLeft size={32} /> Back to Module
//           </button>

//           <h1 className="text-7xl font-black bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent mb-8">
//             Quiz Review
//           </h1>

//           <div className="inline-flex items-center gap-12 px-20 py-12 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-indigo-100">
//             <div>
//               <div className="text-8xl font-black text-indigo-600">
//                 {score}<span className="text-5xl text-gray-600">/{total}</span>
//               </div>
//               <p className="text-2xl font-bold text-gray-700 mt-3">Your Score</p>
//             </div>
//             <div className={`text-7xl font-black ${passed ? "text-emerald-500" : "text-red-500"}`}>
//               {passed ? "PASSED!" : "FAILED"}
//             </div>
//           </div>
//         </div>

//         {/* Questions */}
//         <div className="space-y-12">
//           {review.map((item, i) => {
//             const isCorrect = item.isCorrect;

//             return (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-indigo-100 hover:border-indigo-300 transition-all"
//               >
//                 <div className="flex items-start justify-between mb-8">
//                   <h3 className="text-3xl font-bold text-gray-800 flex-1">
//                     Q{i + 1}. {item.question}
//                   </h3>
//                   {isCorrect ? (
//                     <FiCheckCircle className="text-emerald-500" size={56} />
//                   ) : (
//                     <FiXCircle className="text-red-500" size={56} />
//                   )}
//                 </div>

//                 <div className="space-y-6">
//                   {item.options.map((opt, j) => {
//                     const isYourAnswer = opt === item.yourAnswer;
//                     const isCorrectAnswer = opt === item.correctAnswer;

//                     return (
//                       <div
//                         key={j}
//                         className={`p-6 rounded-2xl border-4 text-xl font-medium transition-all
//                           ${isCorrectAnswer
//                             ? "border-emerald-500 bg-emerald-50 shadow-md"
//                             : isYourAnswer && !isCorrect
//                               ? "border-red-500 bg-red-50 shadow-md"
//                               : "border-gray-200 bg-gray-50"
//                           }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span>{opt}</span>
//                           {/* <div className="flex gap-4 text-sm font-bold">
//                             {isYourAnswer && <span className="text-red-600">Your Answer</span>}
//                             {isCorrectAnswer && <span className="text-emerald-600">Correct</span>}
//                           </div> */}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Retake Button */}
//         <div className="text-center mt-20">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate(`/quiz/module/${moduleId}`)}
//             className="inline-flex items-center gap-5 px-24 py-10 bg-linear-to-r from-orange-500 to-pink-600 text-white rounded-3xl text-4xl font-black shadow-2xl hover:shadow-3xl transition-all"
//           >
//             <FiRotateCcw size={48} />
//             Retake Quiz
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// }

//====================correct=================
// src/pages/QuizReview.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { FiArrowLeft, FiCheckCircle, FiXCircle, FiRotateCw } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";

// export default function QuizReview() {
//   const { moduleId } = useParams();
//   const navigate = useNavigate();
//   const [reviewData, setReviewData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReview = async () => {
//       try {
//         const res = await api.get(`/quiz/review/${moduleId}`);
//         console.log("Review API Response:", res.data);

//         if (!res.data || !res.data.review || !Array.isArray(res.data.review)) {
//           throw new Error("Invalid review data");
//         }

//         setReviewData(res.data);
//       } catch (err) {
//         console.error("Failed to load quiz review:", err);
//         toast.error("No quiz review available");
//         navigate("/student");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReview();
//   }, [moduleId, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
//         <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
//       </div>
//     );
//   }

//   if (!reviewData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
//         <div className="text-center">
//           <div className="text-8xl mb-6">Question</div>
//           <h1 className="text-4xl font-black text-gray-800 mb-4">No Review Found</h1>
//           <p className="text-xl text-gray-600">You haven't taken this quiz yet.</p>
//           <button
//             onClick={() => navigate("/student")}
//             className="mt-8 px-10 py-5 bg-indigo-600 text-white rounded-3xl font-bold text-xl hover:bg-indigo-700 transition"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const { score, total, passed, review } = reviewData;

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-12">
//       <div className="max-w-5xl mx-auto px-6">

//         {/* Header */}
//         <motion.div
//           initial={{ y: -30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-6xl font-extrabold text-gray-800 mb-6 bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
//             Quiz Review
//           </h1>

//           <div className="flex justify-center gap-10 text-2xl">
//             <div className="bg-emerald-100 text-emerald-700 px-12 py-6 rounded-full font-black shadow-lg">
//               Score: {score} / {total}
//             </div>
//             <div className={`px-12 py-6 rounded-full font-black text-white shadow-lg ${passed ? "bg-emerald-500" : "bg-red-500"}`}>
//               {passed ? "PASSED!" : "FAILED"}
//             </div>
//           </div>
//         </motion.div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-3xl shadow-2xl p-10 text-center border-4 border-emerald-100"
//           >
//             <FiCheckCircle className="text-7xl text-emerald-500 mx-auto mb-6" />
//             <p className="text-6xl font-black text-emerald-600">
//               {review.filter(q => q.isCorrect).length}
//             </p>
//             <p className="text-2xl font-bold text-gray-700 mt-3">Correct Answers</p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.1 }}
//             className="bg-white rounded-3xl shadow-2xl p-10 text-center border-4 border-red-100"
//           >
//             <FiXCircle className="text-7xl text-red-500 mx-auto mb-6" />
//             <p className="text-6xl font-black text-red-600">
//               {review.filter(q => !q.isCorrect).length}
//             </p>
//             <p className="text-2xl font-bold text-gray-700 mt-3">Incorrect Answers</p>
//           </motion.div>
//         </div>

//         {/* Questions */}
//         <div className="space-y-12">
//           {review.map((item, i) => {
//             const isCorrect = item.isCorrect;

//             return (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: -60 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className={`p-10 rounded-3xl border-4 shadow-2xl transition-all
//                   ${isCorrect
//                     ? "bg-emerald-50 border-emerald-400 ring-4 ring-emerald-300/30"
//                     : "bg-red-50 border-red-400 ring-4 ring-red-300/30"
//                   }`}
//               >
//                 <div className="flex justify-between items-start mb-8">
//                   <h3 className="text-2xl font-bold text-gray-800 pr-4">
//                     Q{i + 1}. {item.question}
//                   </h3>
//                   {isCorrect ? (
//                     <FiCheckCircle className="text-5xl text-emerald-600 shrink-0" />
//                   ) : (
//                     <FiXCircle className="text-5xl text-red-600 shrink-0" />
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {item.options.map((opt, j) => {
//                     const isYourAnswer = opt === item.yourAnswer;
//                     const isCorrectAnswer = opt === item.correctAnswer;

//                     return (
//                       <div
//                         key={j}
//                         className={`p-6 rounded-2xl border-4 font-bold text-lg transition-all
//                           ${isCorrectAnswer
//                             ? "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-md"
//                             : isYourAnswer && !isCorrectAnswer
//                               ? "bg-red-100 border-red-500 text-red-800 shadow-md"
//                               : "bg-gray-50 border-gray-300 text-gray-700"
//                           }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span>{String.fromCharCode(65 + j)}. {opt}</span>
//                           <div className="flex gap-3 text-sm">
//                             {isCorrectAnswer && <span className="text-emerald-600 font-black">Correct</span>}
//                             {isYourAnswer && !isCorrectAnswer && <span className="text-red-600 font-black">Your Answer</span>}
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Action Buttons */}
//         <div className="text-center mt-20 space-x-8">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate("/student")}
//             className="px-12 py-6 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-2xl font-bold rounded-3xl shadow-2xl flex items-center gap-4 mx-auto hover:shadow-3xl transition-all"
//           >
//             <FiArrowLeft className="text-3xl" />
//             Back to Dashboard
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate(`/quiz/module/${moduleId}`)}
//             className="px-12 py-6 bg-linear-to-r from-orange-500 to-pink-600 text-white text-2xl font-bold rounded-3xl shadow-2xl flex items-center gap-4 mx-auto hover:shadow-3xl transition-all"
//           >
//             <FiRotateCw className="text-3xl" />
//             Retake Quiz
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// }
//=================
// src/pages/QuizReview.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FiArrowLeft, FiCheckCircle, FiXCircle, FiRotateCw } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function QuizReview() {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [reviewData, setReviewData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const res = await api.get(`/quiz/review/${moduleId}`);
                console.log("Review data:", res.data);

                if (!res.data || !res.data.review || !Array.isArray(res.data.review)) {
                    throw new Error("Invalid review data");
                }

                setReviewData(res.data);
            } catch (err) {
                console.error("Failed to load quiz review:", err);
                toast.error("No quiz review available");
                navigate("/student");
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [moduleId, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
            </div>
        );
    }

    if (!reviewData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
                <div className="text-center">
                    <div className="text-8xl mb-6">Question</div>
                    <h1 className="text-4xl font-black text-gray-800 mb-4">No Review Found</h1>
                    <p className="text-xl text-gray-600">You haven't taken this quiz yet.</p>
                    <button
                        onClick={() => navigate("/student")}
                        className="mt-8 px-10 py-5 bg-indigo-600 text-white rounded-3xl font-bold text-xl hover:bg-indigo-700 transition"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const { score, total, passed, review } = reviewData;

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-12">
            <div className="max-w-5xl mx-auto px-6">

                {/* Header */}
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
                    <h1 className="text-6xl font-extrabold text-gray-800 mb-6 bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                        Quiz Review
                    </h1>

                    <div className="flex justify-center gap-10 text-2xl">
                        <div className="bg-emerald-100 text-emerald-700 px-12 py-6 rounded-full font-black shadow-lg">
                            Score: {score} / {total}
                        </div>
                        {/* <div className={`px-12 py-6 rounded-full font-black text-white shadow-lg ${passed ? "bg-emerald-500" : "bg-red-500"}`}>
                            {passed ? "PASSED!" : "FAILED"}
                        </div> */}
                    </div>
                </motion.div>

                {/* Stats Cards */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl p-10 text-center border-4 border-emerald-100">
                        <FiCheckCircle className="text-7xl text-emerald-500 mx-auto mb-6" />
                        <p className="text-6xl font-black text-emerald-600">
                            {review.filter(q => q.isCorrect).length}
                        </p>
                        <p className="text-2xl font-bold text-gray-700 mt-3">Correct Answers</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl shadow-2xl p-10 text-center border-4 border-red-100">
                        <FiXCircle className="text-7xl text-red-500 mx-auto mb-6" />
                        <p className="text-6xl font-black text-red-600">
                            {review.filter(q => !q.isCorrect).length}
                        </p>
                        <p className="text-2xl font-bold text-gray-700 mt-3">Incorrect Answers</p>
                    </motion.div>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl p-6 text-center border-2 border-emerald-100"
                    >
                        <FiCheckCircle className="text-5xl text-emerald-500 mx-auto mb-3" />
                        <p className="text-4xl font-black text-emerald-600">
                            {review.filter(q => q.isCorrect).length}
                        </p>
                        <p className="text-lg font-semibold text-gray-700 mt-1">Correct Answers</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-xl p-6 text-center border-2 border-red-100"
                    >
                        <FiXCircle className="text-5xl text-red-500 mx-auto mb-3" />
                        <p className="text-4xl font-black text-red-600">
                            {review.filter(q => !q.isCorrect).length}
                        </p>
                        <p className="text-lg font-semibold text-gray-700 mt-1">Incorrect Answers</p>
                    </motion.div>
                </div>

                {/* Questions */}
                <div className="space-y-12">
                    {review.map((item, i) => {
                        const isCorrect = item.isCorrect;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-10 rounded-3xl border-4 shadow-2xl transition-all
                  ${isCorrect
                                        ? "bg-emerald-50 border-emerald-400 ring-4 ring-emerald-300/30"
                                        : "bg-red-50 border-red-400 ring-4 ring-red-300/30"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <h3 className="text-2xl font-bold text-gray-800 pr-4">
                                        Q{i + 1}. {item.question}
                                    </h3>
                                    {isCorrect ? (
                                        <FiCheckCircle className="text-5xl text-emerald-600 shrink-0" />
                                    ) : (
                                        <FiXCircle className="text-5xl text-red-600 shrink-0" />
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">




                                    {item.options.map((opt, j) => {
                                        const optionLetter = String.fromCharCode(65 + j); // A, B, C, D

                                        const correct = String(item.correctAnswer).toLowerCase();
                                        const yours = String(item.yourAnswer).toLowerCase();
                                        const optionText = String(opt).toLowerCase();

                                        // Auto-match letter or text
                                        const isCorrectAnswer =
                                            optionLetter.toLowerCase() === correct ||
                                            optionText === correct;

                                        const isYourAnswer =
                                            optionLetter.toLowerCase() === yours ||
                                            optionText === yours;

                                        return (
                                            <div
                                                key={j}
                                                className={`p-6 rounded-2xl border-4 font-bold text-lg transition-all
                ${isCorrectAnswer
                                                        ? "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-md"
                                                        : isYourAnswer
                                                            ? "bg-red-100 border-red-500 text-red-800 shadow-md"
                                                            : "bg-gray-50 border-gray-300 text-gray-700"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">{optionLetter}. {opt}</span>

                                                    <div className="flex gap-2">
                                                        {isCorrectAnswer && (
                                                            <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-md">
                                                                Correct
                                                            </span>
                                                        )}

                                                        {isYourAnswer && (
                                                            <span className={`px-3 py-1 text-white text-xs font-bold rounded-full shadow-md
                            ${isCorrectAnswer ? "bg-emerald-600" : "bg-red-500"}`}>
                                                                Your Answer
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}



                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Action Buttons */}
                <div className="text-center mt-20 space-x-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        // onClick={() => navigate("/student")}
                        onClick={() => navigate(-1)}
                        className="cursor-pointer px-12 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-2xl font-bold rounded-3xl shadow-2xl flex items-center gap-4 hover:shadow-3xl transition-all"
                    >
                        <FiArrowLeft className="text-3xl" />
                        Back to Dashboard
                    </motion.button>

                    {/* <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/quiz/module/${moduleId}`)}
                        className="px-12 py-6 bg-linear-to-r from-orange-500 to-pink-600 text-white text-2xl font-bold rounded-3xl shadow-2xl flex items-center gap-4 hover:shadow-3xl transition-all"
                    >
                        <FiRotateCw className="text-3xl" />
                        Retake Quiz
                    </motion.button> */}
                </div>
            </div>
        </div>
    );
}