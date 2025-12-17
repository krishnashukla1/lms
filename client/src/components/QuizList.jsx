
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiSearch,
  FiArrowLeft,
  FiBook,
  FiHelpCircle,
} from "react-icons/fi";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);

  const navigate = useNavigate();

  const emptyForm = {
    moduleId: "",
    moduleName: "",
    questions: [{ question: "", options: ["", "", "", ""], correct: 0 }],
  };
  const [form, setForm] = useState(emptyForm);

  // Load all quizzes + modules
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [quizRes, moduleRes] = await Promise.all([
          api.get("/quiz/all"),
          api.get("/modules"),
        ]);

        // Group quizzes by module
        const quizMap = new Map();
        quizRes.data.forEach((q) => {
          const mid = q.moduleId?._id || q.moduleId;
          if (!mid) return;

          // Find module from modules list
          const module = moduleRes.data.find((m) => m._id === mid);

          if (!quizMap.has(mid)) {
            quizMap.set(mid, {
              moduleId: mid,
              moduleName: module ? module.title : "Unknown Module", // Use real title
              questionCount: q.questions?.length || 0,
            });
          } else {
            quizMap.get(mid).questionCount += q.questions?.length || 0;
          }
        });


        setQuizzes(Array.from(quizMap.values()));
        setModules(moduleRes.data || []);
      } catch (err) {
        alert("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filtered = quizzes.filter((q) =>
    q.moduleName.toLowerCase().includes(search.toLowerCase())
  );

  // const handleSave = async () => {
  //   if (!form.moduleId) return alert("Please select a module");

  //   try {
  //     await api.post("/quiz", {
  //       moduleId: form.moduleId,
  //       questions: form.questions,
  //     });

  //     alert(editingQuiz ? "Quiz updated!" : "Quiz created!");
  //     closeModal();
  //     window.location.reload(); // Refresh list
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Save failed");
  //   }
  // };
  const handleSave = async () => {
  // 1. Module check
  if (!form.moduleId) {
    return alert("Please select a module");
  }

  // 2. Questions validation
  if (!form.questions.length) {
    return alert("At least one question is required");
  }

  for (let i = 0; i < form.questions.length; i++) {
    const q = form.questions[i];

    // Question text
    if (!q.question.trim()) {
      return alert(`Question ${i + 1} cannot be empty`);
    }

    // Options validation
    const emptyOption = q.options.find(opt => !opt.trim());
    if (emptyOption !== undefined) {
      return alert(`All options must be filled for Question ${i + 1}`);
    }

    // Correct answer index
    if (
      q.correct === undefined ||
      q.correct === null ||
      q.correct < 0 ||
      q.correct > 3
    ) {
      return alert(`Please select a correct option for Question ${i + 1}`);
    }
  }

  // 3. Save only if valid
  try {
    await api.post("/quiz", {
      moduleId: form.moduleId,
      questions: form.questions,
    });

    alert(editingQuiz ? "Quiz updated!" : "Quiz created!");
    closeModal();
    window.location.reload();
  } catch (err) {
    alert(err.response?.data?.message || "Save failed");
  }
};


  const handleDelete = async (moduleId) => {
    if (!confirm("Delete all questions for this module?")) return;
    try {
      const quiz = quizzes.find((q) => q.moduleId === moduleId);
      if (quiz) {
        await api.delete(`/quiz/${moduleId}`);
        setQuizzes((prev) => prev.filter((q) => q.moduleId !== moduleId));
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
        questions: res.data.questions || [],
      });
      setEditingQuiz(quiz);
      setShowModal(true);
    } catch (err) {
      alert("Failed to load quiz");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingQuiz(null);
    setForm(emptyForm);
  };

  const addQuestion = () => {
    setForm({
      ...form,
      questions: [...form.questions, { question: "", options: ["", "", "", ""], correct: 0 }],
    });
  };

  const updateQuestion = (i, field, value) => {
    const updated = [...form.questions];
    updated[i][field] = value;
    setForm({ ...form, questions: updated });
  };

  const updateOption = (qIdx, optIdx, value) => {
    const updated = [...form.questions];
    updated[qIdx].options[optIdx] = value;
    setForm({ ...form, questions: updated });
  };

  const removeQuestion = (i) => {
    if (form.questions.length === 1) return alert("At least one question required");
    setForm({
      ...form,
      questions: form.questions.filter((_, idx) => idx !== i),
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => navigate("/admin")}
            className="cursor-pointer flex items-center gap-3 text-gray-700 hover:text-orange-700 font-bold"
          >
            <FiArrowLeft size={24} /> Back to Dashboard
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer bg-linear-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:shadow-2xl transition"
          >
            <FiPlus size={24} /> Create New Quiz
          </button>
        </div>

        <h1 className="text-5xl font-black text-center mb-12 bg-linear-to-r from-orange-600 to-red-700 bg-clip-text text-transparent">
          Quiz Management
        </h1>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <FiSearch className="absolute left-4 top-4 text-gray-400" size={22} />
            <input
              type="text"
              placeholder="Search by module name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-gray-200 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Quiz Grid */}
        {loading ? (
          <div className="text-center py-20 text-2xl ">Loading quizzes...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <FiHelpCircle className="mx-auto text-8xl text-gray-300 mb-6" />
            <p className="text-2xl text-gray-600">No quizzes found</p>
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer mt-6 bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold"
            >
              Create Your First Quiz
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((quiz) => (
              <div
                key={quiz.moduleId}
                className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-linear-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white">
                    <FiBook size={28} />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/view-questions/${quiz.moduleId}`)}
                      className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white cursor-pointer "
                      title="View Questions"
                    >
                      <FiEye size={18} />
                    </button>
                    <button
                      onClick={() => openEdit(quiz)}
                      className="p-3 bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white cursor-pointer "
                      title="Edit Quiz"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(quiz.moduleId)}
                      className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-600 hover:text-white cursor-pointer "
                      title="Delete Quiz"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4">{quiz.moduleName}</h3>
                <div className="text-center">
                  <p className="text-5xl font-black text-orange-600">{quiz.questionCount}</p>
                  <p className="text-xl text-gray-600">Questions</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create/Edit Modal */}

     {showModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto">
      
      {/* Header */}
      <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-t-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          {editingQuiz ? "Edit Quiz" : "Create New Quiz"}
        </h2>
      </div>

      <div className="p-4 md:p-6">
        {/* Module Selector */}
        {!editingQuiz && (
          <div className="mb-4">
            <label className="block text-base md:text-lg font-semibold mb-2 text-gray-700">
              Select Module
            </label>
            <select
              value={form.moduleId}
              onChange={(e) => {
                const mod = modules.find((m) => m._id === e.target.value);
                if (mod) setForm({ ...form, moduleId: mod._id, moduleName: mod.title });
              }}
              className="cursor-pointer w-full p-3 border border-gray-300 rounded-xl text-base focus:border-purple-500 focus:outline-none transition"
            >
              <option value="">-- Choose Module --</option>
              {modules.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {editingQuiz && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl mb-4">
            <p className="text-base font-bold text-orange-800">Editing Quiz in: {form.moduleName}</p>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-4">
          {form.questions.map((q, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg md:text-xl font-bold text-gray-800">Question {i + 1}</h3>
                {form.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(i)}
                    className="cursor-pointer text-red-600 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-medium transition"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Question Input */}
              <input
                type="text"
                placeholder="Enter your question..."
                value={q.question}
                onChange={(e) => updateQuestion(i, "question", e.target.value)}
                className="w-full p-2 md:p-3 text-base md:text-lg border border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none mb-3"
                required
              />

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt, j) => (
                  <div
                    key={j}
                    className={`flex items-center gap-2 p-2 md:p-3 rounded-xl border transition
                      ${q.correct === j ? "border-green-500 bg-green-50" : "border-gray-300 bg-white hover:border-purple-300"}
                    `}
                  >
                    {/* Option Letter */}
                    <div
                      className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-white text-sm md:text-base
                        ${q.correct === j ? "bg-green-600" : "bg-linear-to-br from-purple-500 to-pink-500"}
                      `}
                    >
                      {String.fromCharCode(65 + j)}
                    </div>

                    {/* Option Input */}
                    <input
                      type="text"
                      placeholder={`Option ${j + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(i, j, e.target.value)}
                      className="flex-1 px-2 py-1 md:px-3 md:py-2 text-sm md:text-base bg-transparent focus:outline-none"
                      required
                    />

                    {/* Mark Correct */}
                    <button
                      type="button"
                      onClick={() => updateQuestion(i, "correct", j)}
                      className={`cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-medium transition
                        ${q.correct === j ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-purple-100 hover:text-purple-800"}
                      `}
                    >
                      {q.correct === j ? "Correct" : "Mark"}
                    </button>
                  </div>
                ))}
              </div>

              {/* Correct Answer Hint */}
              <p className="text-sm text-gray-500 mt-2 text-center">
                Correct: <span className="font-bold text-green-600">Option {q.correct + 1} ({String.fromCharCode(65 + q.correct)})</span>
              </p>
            </div>
          ))}
        </div>

        {/* Add Question */}
        <button
          type="button"
          onClick={addQuestion}
          className="cursor-pointer w-full mt-4 bg-linear-to-r from-purple-600 to-pink-600 text-white py-2 md:py-3 rounded-xl font-bold text-base md:text-lg hover:opacity-90 transition"
        >
          + Add Question
        </button>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-4 md:mt-6">
          <button
            onClick={closeModal}
            className="cursor-pointer px-6 py-2 md:px-8 md:py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="cursor-pointer px-6 py-2 md:px-8 md:py-3 bg-linear-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold hover:opacity-90 transition"
          >
            {editingQuiz ? "Update Quiz" : "Create Quiz"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}