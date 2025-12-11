
import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Save, BookOpen, Sparkles,ArrowLeft  } from "lucide-react";

export default function AdminFinalExam() {
  const navigate = useNavigate();
  const [courseType, setCourseType] = useState("basic");
  const [exam, setExam] = useState({ questions: [] });
  const [loading, setLoading] = useState(false);

  const courseLabels = {
    basic: "Basic Course",
    intermediate: "Intermediate Course",
    advanced: "Advanced Course",
  };

  useEffect(() => {
    fetchExam();
  }, [courseType]);

  const fetchExam = async () => {
    try {
      setLoading(true);
      const res = await api.get("/final-exams/admin/all");
      const courseExam = res.data.find((e) => e.courseType === courseType);
      setExam(courseExam || { courseType, questions: [] });
    } catch (err) {
      setExam({ courseType, questions: [] });
      toast.error("Failed to load exam data");
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () => {
    setExam((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { question: "", options: ["", "", "", ""], correct: 0 },
      ],
    }));
  };

  const updateQuestionText = (index, value) => {
    const updated = [...exam.questions];
    updated[index].question = value;
    setExam({ ...exam, questions: updated });
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updated = [...exam.questions];
    updated[qIndex].options[optIndex] = value;
    setExam({ ...exam, questions: updated });
  };

  const setCorrectOption = (qIndex, value) => {
    const updated = [...exam.questions];
    updated[qIndex].correct = parseInt(value);
    setExam({ ...exam, questions: updated });
  };

  const deleteQuestion = (index) => {
    const updated = exam.questions.filter((_, i) => i !== index);
    setExam({ ...exam, questions: updated });
  };

  const saveExam = async () => {
    if (exam.questions.length < 5) {
      toast.error("At least 5 questions are required");
      return;
    }
    if (exam.questions.some(q => !q.question.trim() || q.options.some(o => !o.trim()))) {
      toast.error("Please fill in all questions and options");
      return;
    }

    try {
      await api.post(`/final-exams/${courseType}`, { questions: exam.questions });
      toast.success("Final Exam Saved Successfully!");
      fetchExam();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save exam");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      {/* <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-100"> */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Final Exam Builder
              </h1>
              <p className="text-gray-600 mt-1">Admin Panel • Create & Manage Exams</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <span className="text-sm font-medium text-purple-600">
              {exam.questions.length} Question{exam.questions.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl shadow-sm text-gray-700 font-medium transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>


      </div>
      {/* </div> */}

      <div className="max-w-7xl mx-auto px-6 py-5">
        {/* Course Selector Card */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-8 mb-10">
          <label className="text-lg font-bold text-gray-800 mb-4 block">Select Course Type</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["basic", "intermediate", "advanced"].map((type) => (
              <button
                key={type}
                onClick={() => setCourseType(type)}
                className={`cursor-pointer  p-6 rounded-2xl border-2 font-semibold transition-all duration-300 transform hover:scale-105 ${courseType === type
                    ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-2xl"
                    : "bg-white/80 border-gray-200 text-gray-700 hover:border-indigo-300"
                  }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${courseType === type ? "bg-white/30" : "bg-indigo-100"
                      }`}
                  >
                    {type === "basic" && "B"}
                    {type === "intermediate" && "I"}
                    {type === "advanced" && "A"}
                  </div>
                  <span className="text-lg">{courseLabels[type]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent"></div>
            <p className="mt-6 text-xl text-gray-600">Loading exam questions...</p>
          </div>
        ) : (
          <>
            {/* Questions List */}
            <div className="space-y-8">
              {exam.questions.length === 0 ? (
                <div className="text-center py-20 bg-white/60 backdrop-blur rounded-3xl border-2 border-dashed border-gray-300">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-gray-500 text-lg">Click the button below to add your first question</p>
                </div>
              ) : (
                exam.questions.map((q, i) => (
                  <div
                    key={i}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden transition-all hover:shadow-3xl"
                  >
                    <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-5 flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="bg-white/20 px-4 py-2 rounded-full text-lg">{i + 1}</span>
                        Question {i + 1}
                      </h3>
                      <button
                        onClick={() => deleteQuestion(i)}
                        className="cursor-pointer p-3 bg-white/20 hover:bg-red-500 hover:text-white rounded-xl transition-all group"
                      >
                        <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>

                    <div className="p-8">
                      <input
                        type="text"
                        placeholder="Enter your question here..."
                        value={q.question}
                        onChange={(e) => updateQuestionText(i, e.target.value)}
                        className="w-full text-xl font-medium text-gray-800 bg-transparent border-b-2 border-gray-300 focus:border-indigo-500 outline-none pb-3 transition-colors"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {q.options.map((opt, j) => (
                          <div key={j} className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-2">
                              Option {j + 1}
                            </label>
                            <input
                              type="text"
                              value={opt}
                              placeholder={`Option ${j + 1}`}
                              onChange={(e) => updateOption(i, j, e.target.value)}
                              className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 outline-none transition-all bg-white/70 backdrop-blur"
                            />
                            {q.correct === j && (
                              <div className="absolute right-3 top-10 text-green-500 font-bold text-sm">
                                Correct Answer
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex items-center gap-4">
                        <span className="font-bold text-gray-700">Correct Answer:</span>
                        <select
                          value={q.correct}
                          onChange={(e) => setCorrectOption(i, e.target.value)}
                          className="cursor-pointer px-6 py-3 bg-linear-to-r from-green-500 to-emerald-500 text-black font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                          {[0, 1, 2, 3].map((n) => (
                            <option key={n} value={n}>
                              Option {n + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <button
                onClick={addQuestion}
                className="cursor-pointer group flex items-center gap-3 px-10 py-5 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
              >
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                Add New Question
              </button>

              <button
                onClick={saveExam}
                disabled={exam.questions.length < 5}
                className={`cursor-pointer flex items-center gap-3 px-12 py-5 text-white text-lg font-bold rounded-2xl shadow-2xl transition-all ${exam.questions.length >= 5
                    ? "bg-linear-to-r from-emerald-500 to-teal-600 hover:shadow-3xl transform hover:scale-105"
                    : "bg-gray-400 cursor-not-allowed opacity-60"
                  }`}
              >
                <Save className="w-6 h-6" />
                Save Final Exam {exam.questions.length < 5 && `(Need ${5 - exam.questions.length} more)`}
              </button>
            </div>

            {exam.questions.length < 5 && (
              <p className="text-center mt-6 text-orange-600 font-semibold">
                Warning: Minimum 5 questions required to save
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
