
// src/pages/QuizPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { FiArrowLeft } from "react-icons/fi";

export default function QuizPage() {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const finalModuleId = moduleId || id;

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    if (!finalModuleId) {
      setFeedback({ type: "error", message: "Invalid module ID" });
      setLoading(false);
      return;
    }
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await api.get(`/quiz/by-module/${finalModuleId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const quizData = res.data?.quiz || res.data[0] || res.data;
        if (!quizData || !quizData.questions?.length) {
          setFeedback({ type: "error", message: "No quiz found for this module" });
          return;
        }

        setQuiz(quizData);
        setAnswers(new Array(quizData.questions.length).fill(null));
      } catch (err) {
        const message = err.response?.data?.message || "Failed to load quiz";
        setFeedback({ type: "error", message });
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [finalModuleId]);

  // SUBMIT QUIZ
  const submitQuiz = async () => {
    if (answers.includes(null)) {
      setFeedback({ type: "error", message: "Please answer all questions!" });
      return;
    }

    setSubmitDisabled(true);

    try {
      const res = await api.post("/quiz/evaluate", {
        moduleId: finalModuleId,
        answers,
      });

      const { score, total } = res.data;

      // Map correct answers
      const correct = quiz.questions.map((q) => {
        if (typeof q.correct === "number") return q.correct;
        return q.options.indexOf(q.correct);
      });

      setCorrectAnswers(correct);

      setFeedback({
        type: "info",
        message: `You scored ${score}/${total}. Preparing results...`,
      });

      // SAVE using quiz._id to match review page
      // CORRECT
      localStorage.setItem(`quiz-answers-${finalModuleId}`, JSON.stringify(answers));
      setTimeout(() => {
        setShowResults(true);
        setFeedback({
          type: score === total ? "success" : "error",
          message: `Final Score: ${score}/${total}`,
        });
      }, 1500);
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "Submission failed",
      });
      setSubmitDisabled(false);
    }
  };

  // LOADING SCREEN
  if (loading)
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p className="text-indigo-700 font-semibold">Loading quiz...</p>
        </div>
      </div>
    );

  // NO QUIZ
  if (!quiz)
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-6">
        <div className="bg-white/90 backdrop-blur rounded-3xl p-10 shadow-2xl text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <p className="text-xl font-bold text-gray-800 mb-4">{feedback?.message}</p>

          <button
            onClick={() => navigate("/student")}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="relative max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            Module Quiz
          </h1>
          <p className="text-gray-600 mt-2 font-medium">Answer all questions to continue</p>
        </div>

        {/* FEEDBACK */}
        {feedback && (
          <div
            className={`mb-6 p-5 rounded-2xl text-center font-bold text-lg shadow-xl transition-all ${feedback.type === "success"
              ? "bg-linear-to-r from-green-500 to-emerald-600 text-white"
              : feedback.type === "error"
                ? "bg-linear-to-r from-red-500 to-pink-600 text-white"
                : "bg-linear-to-r from-blue-500 to-indigo-600 text-white"
              }`}
          >
            {feedback.message}
          </div>
        )}

        {/* QUESTIONS */}
        <div className="space-y-8">
          {quiz.questions.map((q, i) => {
            const isCorrect = showResults && answers[i] === correctAnswers[i];
            const isWrong = showResults && answers[i] !== correctAnswers[i];

            return (
              <div
                key={i}
                className={`rounded-3xl shadow-xl p-6 backdrop-blur bg-white/90 border transition-all duration-300 ${isCorrect
                  ? "border-green-500 bg-green-50"
                  : isWrong
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                  }`}
              >
                <h3 className="font-bold text-lg text-gray-800 mb-4">
                  {i + 1}. {q.question}
                </h3>

                <div className="space-y-4">
                  {q.options.map((opt, idx) => {
                    let highlight = "";

                    if (showResults) {
                      if (idx === correctAnswers[i])
                        highlight = "bg-green-200 border-green-600";
                      else if (idx === answers[i])
                        highlight = "bg-red-200 border-red-600";
                    }

                    return (
                      <label
                        key={idx}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${answers[i] === idx
                          ? "bg-indigo-100 border-indigo-500 shadow-md"
                          : "bg-gray-50 hover:bg-gray-100 border-gray-300"
                          } ${highlight}`}
                      >
                        <input
                          type="radio"
                          disabled={showResults}
                          checked={answers[i] === idx}
                          onChange={() => {
                            const newAns = [...answers];
                            newAns[i] = idx;
                            setAnswers(newAns);
                          }}
                          className="w-5 h-5 text-indigo-600 focus:ring-indigo-400"
                        />
                        <span className="text-gray-800 font-medium">{opt}</span>
                      </label>
                    );
                  })}
                </div>

                {showResults && (
                  <div className="mt-4 text-sm font-bold">
                    <p>
                      Correct Answer:{" "}
                      <span className="text-green-700">{q.options[correctAnswers[i]]}</span>
                    </p>
                    <p>
                      Your Answer:{" "}
                      <span className={answers[i] === correctAnswers[i] ? "text-green-700" : "text-red-700"}>
                        {answers[i] !== null ? q.options[answers[i]] : "Not Answered"}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          {/* <button
            onClick={() => navigate("/student")}
            className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
          >
            <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Student Dashboard
          </button> */}

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
          >
            <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>


          <button
            onClick={submitQuiz}
            disabled={submitDisabled || answers.includes(null)}
            className="cursor-pointer px-12 py-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
