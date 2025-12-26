
// src/pages/QuizPage.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { FiArrowLeft } from "react-icons/fi";

// export default function QuizPage() {
//   const { id, moduleId } = useParams();
//   const navigate = useNavigate();
//   const finalModuleId = moduleId || id;

//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [feedback, setFeedback] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showResults, setShowResults] = useState(false);
//   const [correctAnswers, setCorrectAnswers] = useState([]);
//   const [submitDisabled, setSubmitDisabled] = useState(false);

//   useEffect(() => {
//     if (!finalModuleId) {
//       setFeedback({ type: "error", message: "Invalid module ID" });
//       setLoading(false);
//       return;
//     }
//     const fetchQuiz = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         const res = await api.get(`/quiz/by-module/${finalModuleId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const quizData = res.data?.quiz || res.data[0] || res.data;
//         if (!quizData || !quizData.questions?.length) {
//           setFeedback({ type: "error", message: "No quiz found for this module" });
//           return;
//         }

//         setQuiz(quizData);
//         setAnswers(new Array(quizData.questions.length).fill(null));
//       } catch (err) {
//         const message = err.response?.data?.message || "Failed to load quiz";
//         setFeedback({ type: "error", message });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuiz();
//   }, [finalModuleId]);

//   // SUBMIT QUIZ
//   const submitQuiz = async () => {
//     if (answers.includes(null)) {
//       setFeedback({ type: "error", message: "Please answer all questions!" });
//       return;
//     }

//     setSubmitDisabled(true);

//     try {
//       const res = await api.post("/quiz/evaluate", {
//         moduleId: finalModuleId,
//         answers,
//       });

//       const { score, total } = res.data;

//       // Map correct answers
//       const correct = quiz.questions.map((q) => {
//         if (typeof q.correct === "number") return q.correct;
//         return q.options.indexOf(q.correct);
//       });

//       setCorrectAnswers(correct);

//       setFeedback({
//         type: "info",
//         message: `You scored ${score}/${total}. Preparing results...`,
//       });

//       // SAVE using quiz._id to match review page
//       // CORRECT
//       localStorage.setItem(`quiz-answers-${finalModuleId}`, JSON.stringify(answers));
//       setTimeout(() => {
//         setShowResults(true);
//         setFeedback({
//           type: score === total ? "success" : "error",
//           message: `Final Score: ${score}/${total}`,
//         });
//       }, 1500);
//     } catch (err) {
//       setFeedback({
//         type: "error",
//         message: err.response?.data?.message || "Submission failed",
//       });
//       setSubmitDisabled(false);
//     }
//   };

//   // LOADING SCREEN
//   if (loading)
//     return (
//       <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-14 h-14 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
//           <p className="text-indigo-700 font-semibold">Loading quiz...</p>
//         </div>
//       </div>
//     );

//   // NO QUIZ
//   if (!quiz)
//     return (
//       <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-6">
//         <div className="bg-white/90 backdrop-blur rounded-3xl p-10 shadow-2xl text-center max-w-md">
//           <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//             <span className="text-4xl">⚠️</span>
//           </div>
//           <p className="text-xl font-bold text-gray-800 mb-4">{feedback?.message}</p>

//           <button
//             onClick={() => navigate("/student")}
//             className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg transition"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
//       <div className="relative max-w-3xl mx-auto">

//         {/* HEADER */}
//         <div className="text-center mb-8">
//           <h1 className="text-5xl font-black bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
//             Module Quiz
//           </h1>
//           <p className="text-gray-600 mt-2 font-medium">Answer all questions to continue</p>
//         </div>

//         {/* FEEDBACK */}
//         {feedback && (
//           <div
//             className={`mb-6 p-5 rounded-2xl text-center font-bold text-lg shadow-xl transition-all ${feedback.type === "success"
//               ? "bg-linear-to-r from-green-500 to-emerald-600 text-white"
//               : feedback.type === "error"
//                 ? "bg-linear-to-r from-red-500 to-pink-600 text-white"
//                 : "bg-linear-to-r from-blue-500 to-indigo-600 text-white"
//               }`}
//           >
//             {feedback.message}
//           </div>
//         )}

//         {/* QUESTIONS */}
//         <div className="space-y-8">
//           {quiz.questions.map((q, i) => {
//             const isCorrect = showResults && answers[i] === correctAnswers[i];
//             const isWrong = showResults && answers[i] !== correctAnswers[i];

//             return (
//               <div
//                 key={i}
//                 className={`rounded-3xl shadow-xl p-6 backdrop-blur bg-white/90 border transition-all duration-300 ${isCorrect
//                   ? "border-green-500 bg-green-50"
//                   : isWrong
//                     ? "border-red-500 bg-red-50"
//                     : "border-gray-200"
//                   }`}
//               >
//                 <h3 className="font-bold text-lg text-gray-800 mb-4">
//                   {i + 1}. {q.question}
//                 </h3>

//                 <div className="space-y-4">
//                   {q.options.map((opt, idx) => {
//                     let highlight = "";

//                     if (showResults) {
//                       if (idx === correctAnswers[i])
//                         highlight = "bg-green-200 border-green-600";
//                       else if (idx === answers[i])
//                         highlight = "bg-red-200 border-red-600";
//                     }

//                     return (
//                       <label
//                         key={idx}
//                         className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${answers[i] === idx
//                           ? "bg-indigo-100 border-indigo-500 shadow-md"
//                           : "bg-gray-50 hover:bg-gray-100 border-gray-300"
//                           } ${highlight}`}
//                       >
//                         <input
//                           type="radio"
//                           disabled={showResults}
//                           checked={answers[i] === idx}
//                           onChange={() => {
//                             const newAns = [...answers];
//                             newAns[i] = idx;
//                             setAnswers(newAns);
//                           }}
//                           className="w-5 h-5 text-indigo-600 focus:ring-indigo-400"
//                         />
//                         <span className="text-gray-800 font-medium">{opt}</span>
//                       </label>
//                     );
//                   })}
//                 </div>

//                 {showResults && (
//                   <div className="mt-4 text-sm font-bold">
//                     <p>
//                       Correct Answer:{" "}
//                       <span className="text-green-700">{q.options[correctAnswers[i]]}</span>
//                     </p>
//                     <p>
//                       Your Answer:{" "}
//                       <span className={answers[i] === correctAnswers[i] ? "text-green-700" : "text-red-700"}>
//                         {answers[i] !== null ? q.options[answers[i]] : "Not Answered"}
//                       </span>
//                     </p>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* ACTION BUTTONS */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
//           {/* <button
//             onClick={() => navigate("/student")}
//             className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//           >
//             <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Student Dashboard
//           </button> */}

//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//           >
//             <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             Back
//           </button>


//           <button
//             onClick={submitQuiz}
//             disabled={submitDisabled || answers.includes(null)}
//             className="cursor-pointer px-12 py-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
//           >
//             Submit Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


//================time duration=5 minutes===========

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { FiArrowLeft, FiClock, FiAlertTriangle } from "react-icons/fi";
import { toast } from "react-toastify";

export default function QuizPage() {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const finalModuleId = moduleId || id;

  // ── State ───────────────────────────────────────────────
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [scoreInfo, setScoreInfo] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  // Timer
  const QUIZ_DURATION = 5 * 60; // 5 minutes (you can change this)
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const timerRef = useRef(null);

  // ── Fetch Quiz ──────────────────────────────────────────
  useEffect(() => {
    if (!finalModuleId) {
      setError("Invalid module ID");
      setLoading(false);
      return;
    }

    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/quiz/by-module/${finalModuleId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const quizData = res.data?.quiz || res.data[0] || res.data;

        if (!quizData?.questions?.length) {
          throw new Error("No questions found for this module");
        }

        setQuiz(quizData);
        setAnswers(new Array(quizData.questions.length).fill(null));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load quiz");
        toast.error("Could not load quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [finalModuleId]);

  // ── Timer Logic ─────────────────────────────────────────
  useEffect(() => {
    if (!quiz || showResults || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          toast.error("Time's up! Submitting automatically...", {
            autoClose: false,
          });
          submitQuiz(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [quiz, showResults, timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  // ── Submit Quiz ─────────────────────────────────────────
  const submitQuiz = async (isAuto = false) => {
    if (submitDisabled || showResults) return;

    // Prevent manual submit if not all answered (unless time is up)
    if (!isAuto && answers.includes(null)) {
      toast.warn("Please answer all questions before submitting");
      return;
    }

    setSubmitDisabled(true);

    try {
      const res = await api.post("/quiz/evaluate", {
        moduleId: finalModuleId,
        answers,
      });

      const { score, total } = res.data;

      // Save answers locally (optional – for review)
      localStorage.setItem(`quiz-answers-${finalModuleId}`, JSON.stringify(answers));

      setScoreInfo({ score, total });
      setShowResults(true);

      toast.success(`Quiz completed! Score: ${score}/${total}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
      setSubmitDisabled(false);
    }
  };

  // ── Render ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <FiAlertTriangle className="mx-auto text-6xl text-red-500 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Error</h2>
          <p className="text-gray-600 mb-8">{error || "Quiz not available"}</p>
          <button
            onClick={() => navigate("/student")}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (showResults && scoreInfo) {
    const percentage = Math.round((scoreInfo.score / scoreInfo.total) * 100);
    const passed = percentage >= 60; // adjust threshold as needed

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center">
          <h1 className="text-4xl font-black mb-6">
            {passed ? (
              <span className="text-emerald-600">Congratulations!</span>
            ) : (
              <span className="text-rose-600">Quiz Completed</span>
            )}
          </h1>

          <div className="mb-8">
            <p className="text-6xl font-black mb-2">
              {scoreInfo.score}/{scoreInfo.total}
            </p>
            <p className="text-2xl font-medium text-gray-600">{percentage}%</p>
          </div>

          <p className="text-lg mb-10">
            {passed
              ? "You passed the quiz! Great job."
              : "Better luck next time. Keep practicing!"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/student")}
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-4 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition"
            >
              Back to Module
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Quiz Interface ─────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Sticky Timer */}
      <div
        className={`
          fixed top-4 right-4 sm:right-8 z-50
          flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg border
          transition-all duration-300
          ${
            timeLeft <= 60
              ? "bg-red-50 border-red-300 text-red-700 animate-pulse"
              : "bg-white border-gray-200 text-gray-800"
          }
        `}
      >
        <FiClock className="text-xl" />
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide font-medium text-gray-500">
            Time Remaining
          </p>
          <p className="text-2xl font-black">{formatTime(timeLeft)}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-16 sm:pt-20">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Module Quiz
          </h1>
         <div className="text-gray-600 font-medium">
  <p className="mt-2">
    Answer all questions to continue
  </p>

  <p className="mt-1">
    {quiz.questions.length} questions • {Math.floor(QUIZ_DURATION / 60)} minutes
  </p>
</div>

        </div>

        {/* Questions */}
        <div className="space-y-6 mb-12">
          {quiz.questions.map((question, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100 hover:border-indigo-200 transition"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-5 leading-relaxed">
                {index + 1}. {question.question}
              </h3>

              <div className="space-y-3">
                {question.options.map((option, optIdx) => (
                  <label
                    key={optIdx}
                    className={`
                      flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition
                      ${
                        answers[index] === optIdx
                          ? "bg-indigo-50 border-indigo-400"
                          : "border-gray-200 hover:bg-gray-50"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name={`q-${index}`}
                      checked={answers[index] === optIdx}
                      onChange={() => {
                        const newAnswers = [...answers];
                        newAnswers[index] = optIdx;
                        setAnswers(newAnswers);
                      }}
                      className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                      disabled={showResults}
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            <FiArrowLeft /> Back to Module
          </button>

          <button
            onClick={() => submitQuiz(false)}
            disabled={submitDisabled || answers.includes(null)}
            className={`
              px-10 py-4 rounded-xl font-semibold text-white transition cursor-pointer
              ${
                answers.includes(null)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-md"
              }
            `}
          >
            Submit Quiz
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Unanswered questions will be marked incorrect if you submit
        </p>
      </div>
    </div>
  );
}
