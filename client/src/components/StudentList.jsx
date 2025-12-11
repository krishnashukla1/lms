

import { useEffect, useState } from "react";
import api from "../api/axios";
import { FiArrowLeft, FiSearch, FiEdit2, FiTrash2, FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Load students
  const loadStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/students");
      setStudents(res.data.students || res.data);
    } catch (error) {
      console.error("Error loading students:", error);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Search filter
  const filtered = students.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.username?.toLowerCase().includes(search.toLowerCase())
  );

  // Edit student
  const startEdit = (s) => {
    setEditing(s);
    setForm({ name: s.name, username: s.username, password: "" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/students/${editing._id}`, form);
      alert("Student updated successfully");
      setEditing(null);
      loadStudents();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) return;
    try {
      await api.delete(`/admin/students/${id}`);
      alert("Student deleted successfully");
      loadStudents();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const StatCard = ({ title, value, color, icon }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 font-medium text-sm">{title}</p>
          <p className={`text-3xl font-black mt-2 bg-linear-to-r ${color} bg-clip-text text-transparent`}>
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${color.split(' ')[1]} flex items-center justify-center`}>
          <span className="text-white text-xl">{icon}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 p-8">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
          >
            <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
            <FiUser className="text-white" size={28} />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
            Student Management
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Manage and monitor all student accounts in one place
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={students.length}
            color="from-blue-500 to-blue-700"
            icon="👨‍🎓"
          />
          {/* <StatCard 
            title="Active Today" 
            value={Math.floor(students.length * 0.3)} 
            color="from-emerald-500 to-emerald-700"
            icon="🔥"
          />
          <StatCard 
            title="New This Week" 
            value={Math.floor(students.length * 0.1)} 
            color="from-purple-500 to-purple-700"
            icon="🆕"
          /> */}

          <StatCard
            title="Active Today"
            value={students.length ? Math.max(1, Math.floor(students.length * 0.3)) : 0}
            color="from-emerald-500 to-emerald-700"
            icon="🔥"
          />

          <StatCard
            title="New This Week"
            value={students.length ? Math.max(1, Math.floor(students.length * 0.1)) : 0}
            color="from-purple-500 to-purple-700"
            icon="🆕"
          />

        </div>

        {/* Search and Content Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search students by name or username..."
              className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 
                       bg-white/60 backdrop-blur-sm
                       focus:ring-4 focus:ring-blue-200 focus:border-blue-500 
                       transition-all duration-300 placeholder-gray-400
                       hover:border-gray-300 hover:bg-white/80
                       text-lg font-medium cursor-text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Students Table */}
          <div className="rounded-2xl border border-gray-200/50 overflow-hidden shadow-lg">
            <table className="w-full">
              <thead className="bg-linear-to-r from-blue-600 to-blue-700 text-white text-left">
                <tr>
                  <th className="p-6 font-bold text-lg">Student Profile</th>
                  <th className="p-6 font-bold text-lg">Username</th>
                  <th className="p-6 font-bold text-lg">Status</th>
                  <th className="p-6 font-bold text-lg text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center p-12">
                      <div className="flex justify-center items-center space-x-3">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <span className="text-gray-600 text-lg font-medium">Loading students...</span>
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-12">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center">
                          <FiUser className="text-gray-400" size={32} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-700 mb-2">No students found</h3>
                          <p className="text-gray-500">
                            {search ? "Try adjusting your search terms" : "No students are currently registered"}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : filtered.map((student) => (
                  <tr
                    key={student._id}
                    className="hover:bg-blue-50/50 transition-all duration-300 border-b border-gray-100 last:border-b-0 group"
                  >
                    <td className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            {student.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{student.name}</h3>
                          <p className="text-gray-500 text-sm">Student ID: {student._id?.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center space-x-3">
                        <FiMail className="text-gray-400" size={18} />
                        <span className="font-medium text-gray-700">{student.username}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                        Active
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={() => startEdit(student)}
                          className="flex items-center space-x-2 bg-linear-to-r from-amber-500 to-amber-600 
                                   text-white px-5 py-2.5 rounded-xl hover:from-amber-600 hover:to-amber-700 
                                   transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer
                                   shadow-lg hover:shadow-xl group/edit"
                        >
                          <FiEdit2 size={16} className="group-hover/edit:scale-110 transition-transform" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="flex items-center space-x-2 bg-linear-to-r from-red-500 to-red-600 
                                   text-white px-5 py-2.5 rounded-xl hover:from-red-600 hover:to-red-700 
                                   transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer
                                   shadow-lg hover:shadow-xl group/delete"
                        >
                          <FiTrash2 size={16} className="group-hover/delete:scale-110 transition-transform" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Results Count */}
          {filtered.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 font-medium">
                Showing <span className="font-bold text-blue-600">{filtered.length}</span> of{" "}
                <span className="font-bold text-gray-700">{students.length}</span> students
              </p>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl w-full max-w-md shadow-2xl border border-white/50 transform animate-scale-in">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    Edit Student
                  </h2>
                  <button
                    onClick={() => setEditing(null)}
                    className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center 
                             hover:bg-gray-200 transition-colors cursor-pointer hover:scale-110"
                  >
                    <span className="text-xl">×</span>
                  </button>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                  <div className="group">
                    <label className="block mb-2 font-semibold text-gray-700">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="Student's full name"
                        className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 
                                 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 
                                 transition-all duration-300"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block mb-2 font-semibold text-gray-700">Username</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 
                                 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 
                                 transition-all duration-300"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block mb-2 font-semibold text-gray-700">
                      Reset Password <span className="text-gray-400 text-sm">(leave blank to keep current)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New password"
                        className="w-full p-4 pl-12 pr-12 rounded-2xl border-2 border-gray-200 
                                 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 
                                 transition-all duration-300"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center 
                                 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setEditing(null)}
                      className="px-6 py-3 rounded-2xl bg-gray-100 text-gray-700 font-semibold 
                               hover:bg-gray-200 transition-all duration-300 cursor-pointer
                               hover:shadow-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-2xl bg-linear-to-r from-blue-600 to-blue-700 
                               text-white font-semibold hover:from-blue-700 hover:to-blue-800 
                               transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5
                               shadow-lg hover:shadow-xl"
                    >
                      Update Student
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}