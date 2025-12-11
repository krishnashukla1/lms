
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
