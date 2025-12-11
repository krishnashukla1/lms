
import { useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FiAward, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

export default function FinalExamPage() {
  const { courseType } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

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

  const handleOptionChange = (index, option) => {
    setAnswers({ ...answers, [index]: option });
  };

  const handleSubmit = async () => {
    const answersArr = Object.keys(answers).map((index) => ({
      questionIndex: Number(index),
      selectedOption: answers[index],
    }));

    if (answersArr.length !== exam.questions.length) {
      toast.error("Please answer all questions");
      return;
    }

    try {
      const res = await api.post(`/final-exams/submit/${courseType}`, { answers: answersArr });
      setSubmitted(true);
      setResult(res.data);
      toast.success(`Score: ${res.data.score}% — ${res.data.passed ? "PASSED 🎉" : "FAILED ❌"}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Submit failed");
    }
  };

  if (loading) return <div className="text-center p-20 text-3xl">Loading Final Exam...</div>;

  if (submitted && result) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-8"
      >
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-lg">
          <FiCheckCircle className="mx-auto text-emerald-600 mb-8" size={120} />
          <h1 className="text-5xl font-black text-emerald-700 mb-6">
            {result.passed ? "You Passed! 🎉" : "You Failed ❌"}
          </h1>
          <p className="text-3xl font-bold mb-4">Score: {result.score}%</p>
          <p className="text-xl text-gray-600 mb-8">Correct: {result.correct}/{result.total}</p>
          <button
            onClick={() => navigate(`/modules/${courseType}`)}
            className="cursor-pointer bg-emerald-600 text-white px-12 py-4 rounded-3xl text-xl font-bold shadow-xl"
          >
            Back to Course
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 p-8">
      <button
        onClick={() => navigate(`/modules/${courseType}`)}
        className="mb-8 flex items-center gap-4 text-indigo-700 font-bold text-xl hover:text-indigo-900 transition"
      >
        <FiArrowLeft size={32} /> Back to Course
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-12">
        <div className="text-center mb-12">
          <FiAward className="mx-auto text-purple-600 mb-6" size={80} />
          <h1 className="text-6xl font-black bg-linear-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
            {courseType.toUpperCase()} Final Exam
          </h1>
          <p className="text-2xl text-gray-600 mt-6">
            Answer all {exam.totalQuestions} questions to complete your certification
          </p>
        </div>

        {exam.questions.map((q, i) => (
          <div
            key={i}
            className="mb-12 p-8 bg-linear-to-r from-purple-50 to-indigo-50 rounded-3xl border border-purple-200"
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
            className="cursor-pointer bg-linear-to-r from-purple-600 to-indigo-700 text-white px-20 py-5 rounded-3xl text-3xl font-black shadow-2xl hover:shadow-3xl"
          >
            Submit Final Exam
          </button>
        </div>
      </div>
    </div>
  );
}