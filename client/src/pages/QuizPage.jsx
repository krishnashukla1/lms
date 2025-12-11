import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

export default function QuizPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const res = await api.get(`/quiz/module/${moduleId}`);
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(null));
      } catch (err) {
        toast.error("Failed to load quiz");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [moduleId, navigate]);

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      toast.error("Please answer all questions");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/quiz/evaluate", { moduleId, answers });
      toast.success(`Score: ${res.data.score}/${res.data.total} - ${res.data.passed ? "PASSED!" : "Try again"}`);
      setTimeout(() => navigate("/student"), 2000);
    } catch (err) {
      toast.error("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-3xl">Loading Quiz...</div>;
  if (!quiz) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-10 flex items-center gap-3 text-indigo-700 font-bold text-xl">
          <FiArrowLeft size={32} /> Back
        </button>

        <h1 className="text-6xl font-black text-center mb-16 bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
          Module Quiz
        </h1>

        <div className="bg-white rounded-3xl shadow-2xl p-12">
          {quiz.questions.map((q, i) => (
            <div key={i} className="mb-16 p-10 bg-linear-to-r from-indigo-50 to-purple-50 rounded-3xl border border-indigo-200">
              <h3 className="text-3xl font-bold mb-8">Q{i + 1}. {q.question}</h3>
              <div className="space-y-6">
                {q.options.map((opt, j) => (
                  <label
                    key={j}
                    className={`block p-8 rounded-2xl border-4 cursor-pointer text-xl font-medium transition-all
                      ${answers[i] === j ? "border-indigo-600 bg-indigo-100" : "border-gray-200 hover:bg-gray-100"}`}
                  >
                    <input
                      type="radio"
                      name={`q${i}`}
                      checked={answers[i] === j}
                      onChange={() => {
                        const newAns = [...answers];
                        newAns[i] = j;
                        setAnswers(newAns);
                      }}
                      className="mr-6"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center mt-20">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="cursor-pointer bg-linear-to-r from-indigo-600 to-purple-700 text-white px-24 py-10 rounded-3xl text-3xl font-black shadow-2xl hover:shadow-3xl disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}