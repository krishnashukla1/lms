
// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";
// import { FiAward, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
// import { motion } from "framer-motion";

// export default function FinalExamPage() {
//   const { courseType } = useParams();
//   const navigate = useNavigate();

//   const [exam, setExam] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [submitted, setSubmitted] = useState(false);
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     const loadExam = async () => {
//       try {
//         const res = await api.get(`/final-exams/start/${courseType}`);
//         setExam(res.data);
//       } catch (err) {
//         toast.error(err.response?.data?.message || "Unable to load exam");
//         navigate("/student");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadExam();
//   }, [courseType, navigate]);

//   const handleOptionChange = (index, option) => {
//     setAnswers({ ...answers, [index]: option });
//   };

//   const handleSubmit = async () => {
//     const answersArr = Object.keys(answers).map((index) => ({
//       questionIndex: Number(index),
//       selectedOption: answers[index],
//     }));

//     if (answersArr.length !== exam.questions.length) {
//       toast.error("Please answer all questions");
//       return;
//     }

//     try {
//       const res = await api.post(`/final-exams/submit/${courseType}`, { answers: answersArr });
//       setSubmitted(true);
//       setResult(res.data);
//       toast.success(`Score: ${res.data.score}% — ${res.data.passed ? "PASSED 🎉" : "FAILED ❌"}`);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Submit failed");
//     }
//   };

//   if (loading) return <div className="text-center p-20 text-3xl">Loading Final Exam...</div>;

//   if (submitted && result) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-8"
//       >
//         <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-lg">
//           <FiCheckCircle className="mx-auto text-emerald-600 mb-8" size={120} />
//           <h1 className="text-5xl font-black text-emerald-700 mb-6">
//             {result.passed ? "You Passed! 🎉" : "You Failed ❌"}
//           </h1>
//           <p className="text-3xl font-bold mb-4">Score: {result.score}%</p>
//           <p className="text-xl text-gray-600 mb-8">Correct: {result.correct}/{result.total}</p>
//           <button
//             onClick={() => navigate(`/modules/${courseType}`)}
//             className="cursor-pointer bg-emerald-600 text-white px-12 py-4 rounded-3xl text-xl font-bold shadow-xl"
//           >
//             Back to Course
//           </button>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 p-8">
//       <button
//         onClick={() => navigate(`/modules/${courseType}`)}
//         className="mb-8 flex items-center gap-4 text-indigo-700 font-bold text-xl hover:text-indigo-900 transition"
//       >
//         <FiArrowLeft size={32} /> Back to Course
//       </button>

//       <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-12">
//         <div className="text-center mb-12">
//           <FiAward className="mx-auto text-purple-600 mb-6" size={80} />
//           <h1 className="text-6xl font-black bg-linear-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
//             {courseType.toUpperCase()} Final Exam
//           </h1>
//           <p className="text-2xl text-gray-600 mt-6">
//             Answer all {exam.totalQuestions} questions to complete your certification
//           </p>
//         </div>

//         {exam.questions.map((q, i) => (
//           <div
//             key={i}
//             className="mb-12 p-8 bg-linear-to-r from-purple-50 to-indigo-50 rounded-3xl border border-purple-200"
//           >
//             <h3 className="text-2xl font-bold mb-6">Q{i + 1}. {q.question}</h3>
//             <div className="space-y-4">
//               {q.options.map((opt, j) => (
//                 <label
//                   key={j}
//                   className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all text-lg font-medium
//                     ${answers[i] === j ? "border-purple-600 bg-purple-100" : "border-gray-200 hover:bg-gray-100"}`}
//                 >
//                   <input
//                     type="radio"
//                     name={`q${i}`}
//                     checked={answers[i] === j}
//                     onChange={() => handleOptionChange(i, j)}
//                     className="mr-4"
//                   />
//                   {opt}
//                 </label>
//               ))}
//             </div>
//           </div>
//         ))}

//         <div className="text-center">
//           <button
//             onClick={handleSubmit}
//             className="cursor-pointer bg-linear-to-r from-purple-600 to-indigo-700 text-white px-20 py-5 rounded-3xl text-3xl font-black shadow-2xl hover:shadow-3xl"
//           >
//             Submit Final Exam
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

//===================with stick time duration and warning message================

import { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FiAward, FiCheckCircle, FiArrowLeft, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";

export default function FinalExamPage() {
  const { courseType } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [examStarted, setExamStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds

  const timerRef = useRef(null);

  useEffect(() => {
    const loadExam = async () => {
      try {
        const res = await api.get(`/final-exams/start/${courseType}`);
        setExam(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Unable to load exam");
        navigate("/student");
      } finally {
        setLoading(false);
      }
    };

    loadExam();
  }, [courseType, navigate]);

  // Timer logic
  useEffect(() => {
    if (!examStarted || submitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [examStarted, submitted]);

  // Warn / auto-submit on refresh / tab close / minimize
  useEffect(() => {
    if (!examStarted || submitted) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // standard way to trigger warning
      submitExam(true);   // auto-submit
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [examStarted, submitted, answers]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionChange = (index, option) => {
    setAnswers({ ...answers, [index]: option });
  };

  const startExam = () => {
    setExamStarted(true);
    setTimeLeft(60 * 60);
    toast.info("Exam started — good luck!", { autoClose: 4000 });
  };

  const submitExam = async (isAuto = false) => {
    if (submitted) return;

    const answersArr = exam.questions.map((_, index) => ({
      questionIndex: index,
      selectedOption: answers[index] ?? null, // null = unanswered
    }));

    try {
      setSubmitted(true);
      const res = await api.post(`/final-exams/submit/${courseType}`, {
        answers: answersArr,
        timeUp: isAuto,
      });
      setResult(res.data);
      toast.success(`Score: ${res.data.score}% — ${res.data.passed ? "PASSED 🎉" : "FAILED ❌"}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Submit failed");
      if (isAuto) navigate("/student");
    }
  };

  const handleAutoSubmit = () => {
    toast.warning("Time's up! Auto-submitting now...", { autoClose: false });
    submitExam(true);
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === 0) {
      if (!window.confirm("You haven't answered anything. Submit anyway? Score will be 0%.")) {
        return;
      }
    }
    submitExam(false);
  };

  if (loading) {
    return <div className="text-center p-20 text-3xl">Loading Final Exam...</div>;
  }

  // ── Result Screen ───────────────────────────────────────────────
  if (submitted && result) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-8"
      >
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-lg">
          <FiCheckCircle
            className={`mx-auto mb-8 ${result.passed ? "text-emerald-600" : "text-red-600"}`}
            size={120}
          />
          <h1 className="text-5xl font-black mb-6">
            {result.passed ? "You Passed! 🎉" : "You Failed ❌"}
          </h1>
          <p className="text-3xl font-bold mb-4">Score: {result.score}%</p>
          <p className="text-xl text-gray-600 mb-8">
            Correct: {result.correct}/{result.total}
          </p>
          <button
            onClick={() => navigate(`/modules/${courseType}`)}
            className="bg-emerald-600 text-white px-12 py-4 rounded-3xl text-xl font-bold shadow-xl hover:bg-emerald-700"
          >
            Back to Course
          </button>
        </div>
      </motion.div>
    );
  }

  // ── Pre-start Warning / Rules Screen ─────────────────────────────
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-12">
            <FiAward className="mx-auto text-purple-600 mb-6" size={100} />
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
              {courseType.toUpperCase()} FINAL EXAM
            </h1>
            <p className="text-2xl text-gray-600 mt-6">
              {exam.totalQuestions} Questions • 60 Minutes • One Attempt
            </p>
          </div>

          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-red-800 mb-6">⚠️ Important Exam Rules</h3>
            <ul className="space-y-4 text-lg text-gray-800">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>
                  <strong>Do NOT</strong> refresh, close tab, switch apps or minimize — exam will <strong>auto-submit</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Timer starts when you click <strong>Start Exam</strong>. 60 minutes total.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Unanswered questions = incorrect (0 points).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Once submitted → no going back.</span>
              </li>
            </ul>
            <p className="mt-8 text-center text-lg font-semibold text-red-900">
              By starting, you agree to follow these rules.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={startExam}
              className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-20 py-6 rounded-3xl text-3xl font-black shadow-2xl hover:shadow-3xl"
            >
              START EXAM
            </button>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate(`/modules/${courseType}`)}
              className="text-indigo-700 font-bold text-xl hover:text-indigo-900 flex items-center gap-3 mx-auto"
            >
              <FiArrowLeft size={28} /> Back to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Active Exam Screen ───────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8 relative">
      {/* Floating / Sticky Timer */}
      <div
        className="
          fixed top-6 right-6 md:right-10 lg:right-16 z-50
          flex items-center gap-3 bg-red-50/90 backdrop-blur-sm
          px-6 py-4 rounded-2xl shadow-xl border border-red-200
        "
      >
        <FiClock className="text-red-600" size={36} />
        <div className="text-right">
          <p className="text-sm text-gray-600 uppercase tracking-wide">Time Remaining</p>
          <p className="text-3xl md:text-4xl font-black text-red-700 tracking-tight">
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-12">
        <div className="text-center mb-12">
          <FiAward className="mx-auto text-purple-600 mb-6" size={80} />
          <h1 className="text-6xl font-black bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
            {courseType.toUpperCase()} Final Exam
          </h1>
          <p className="text-2xl text-gray-600 mt-6">
            Answered: {Object.keys(answers).length} / {exam.totalQuestions}
          </p>
        </div>

        {exam.questions.map((q, i) => (
          <div
            key={i}
            className="mb-12 p-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl border border-purple-200"
          >
            <h3 className="text-2xl font-bold mb-6">Q{i + 1}. {q.question}</h3>
            <div className="space-y-4">
              {q.options.map((opt, j) => (
                <label
                  key={j}
                  className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all text-lg font-medium
                    ${answers[i] === j ? "border-purple-600 bg-purple-100" : "border-gray-200 hover:bg-gray-100"}`}
                >
                  <input
                    type="radio"
                    name={`q${i}`}
                    checked={answers[i] === j}
                    onChange={() => handleOptionChange(i, j)}
                    className="mr-4"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-20 py-5 rounded-3xl text-3xl font-black shadow-2xl hover:shadow-3xl"
          >
            Submit Final Exam
          </button>
          <p className="mt-4 text-gray-600">
            You can submit anytime — unanswered questions count as wrong.
          </p>
        </div>
      </div>
    </div>
  );
}