
import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import { FiUsers, FiCheckCircle, FiBookOpen, FiTrendingUp } from "react-icons/fi";

export default function Progress() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/all-progress")
      .then(res => setStudents(res.data.data || []))
      .catch(() => alert("Failed to load progress"))
      .finally(() => setLoading(false));
  }, []);

  const totalStudents = students.length;
  const avgProgress = students.length ? Math.round(students.reduce((a, s) => a + s.progressPercentage, 0) / students.length) : 0;
  const completed = students.filter(s => s.progressPercentage === 100).length;

  if (loading) return <div className="p-20 text-center text-2xl">Loading Progress...</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-12 bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
          Student Progress Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
            <FiUsers className="text-6xl text-blue-600 mx-auto mb-4" />
            <p className="text-5xl font-black text-blue-700">{totalStudents}</p>
            <p className="text-xl text-gray-600">Total Students</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
            <FiTrendingUp className="text-6xl text-emerald-600 mx-auto mb-4" />
            <p className="text-5xl font-black text-emerald-700">{avgProgress}%</p>
            <p className="text-xl text-gray-600">Average Progress</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
            <FiCheckCircle className="text-6xl text-green-600 mx-auto mb-4" />
            <p className="text-5xl font-black text-green-700">{completed}</p>
            <p className="text-xl text-gray-600">Courses Completed</p>
          </div>
        </div>

        {/* Student List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map((s, i) => (
            <motion.div
              key={s.studentId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  {s.name[0]}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{s.name}</h3>
                  <p className="text-gray-600">{s.courseType} Course</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Progress</span>
                  <span>{s.progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div
                    className="bg-linear-to-r from-indigo-600 to-purple-700 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${s.progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-600 mt-6">
                <span>{s.completedModules?.length || 0} Modules Done</span>
                <span>{s.finalExamPassed ? "Exam Passed" : "Exam Pending"}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}