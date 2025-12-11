

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