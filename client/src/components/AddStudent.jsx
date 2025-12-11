

import { useState } from "react";
import api from "../api/axios";
import { FiArrowLeft, FiUserPlus, FiUser, FiMail, FiLock, FiCheckCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function AddStudent() {
  const [form, setForm] = useState({ name: "", username: "", password: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.username || !form.password) {
      alert("Name, username, and password are required!");
      return;
    }

    try {
      setLoading(true);
      await api.post("/admin/add-student", form);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setForm({ name: "", username: "", password: "", email: "" });
      }, 3000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-2xl">

        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden relative">

          {/* Back Button FIXED ✓ */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 bg-white/80 px-4 py-2 rounded-xl border shadow hover:shadow-md hover:bg-white transition font-semibold"
          >
            <FiArrowLeft className="text-gray-700" />
            Back
          </button>

          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-purple-700 p-10 text-center relative pt-10">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <motion.div whileHover={{ scale: 1.1 }} className="inline-block p-5 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 mb-2">
                <FiUserPlus className="text-white text-5xl" />
              </motion.div>
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Add New Student</h1>
              <p className="text-lg text-blue-100">Create account and start their learning journey</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-10 pt-8">

            {/* Success Message */}
            {success && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-5 bg-green-500 text-white rounded-xl shadow-xl flex items-center gap-4">
                <FiCheckCircle size={28} />
                <div>
                  <p className="text-lg font-bold">Student Added Successfully!</p>
                  <p className="opacity-90 text-sm">They can now log in with their credentials</p>
                </div>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-7">

              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <FiUser className="text-blue-600" /> Full Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border rounded-xl text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  required
                />
              </div>

              {/* Username */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <FiUser className="text-purple-600" /> Username
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  placeholder="john_doe"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border rounded-xl text-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <FiMail className="text-indigo-600" /> Email (Optional)
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border rounded-xl text-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                />
              </div>

              {/* Password */}
              {/* <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <FiLock className="text-rose-600" /> Password
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="password"
                  placeholder="•••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border rounded-xl text-lg focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition"
                  required
                />
              </div> */}

              <div className="relative">
  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
    <FiLock className="text-rose-600" /> Password
  </label>

  <motion.input
    whileFocus={{ scale: 1.02 }}
    type={showPassword ? "text" : "password"}
    placeholder="•••••••••"
    value={form.password}
    onChange={(e) => setForm({ ...form, password: e.target.value })}
    className="w-full px-5 py-4 bg-gray-50 border rounded-xl text-lg focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition pr-14"
    required
  />

  {/* Eye Icon */}
  <div
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-5 top-12 cursor-pointer text-gray-500 hover:text-rose-600 transition"
  >
    {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
  </div>
</div>


{/* Back Button – clean, proper absolute position */}
<button
  onClick={() => navigate(-1)}
  className="absolute top-6 left-6 z-20 flex items-center gap-2 
             bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl 
             text-gray-700 font-semibold shadow-lg border border-gray-200
             hover:bg-white hover:text-blue-700 hover:shadow-xl
             transition-all duration-300 group cursor-pointer" 
>
  <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
  Back
</button>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full bg-linear-to-r from-blue-600 via-purple-600 to-indigo-700 text-white font-bold text-xl py-5 rounded-2xl shadow-xl hover:shadow-2xl transition disabled:opacity-70"
              >
                {loading ? "Adding..." : "Add Student"}
              </motion.button>
            </form>

            {/* Tips — SMALL SIZE ✓ */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200/50">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">Quick Tips</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Username must be unique</li>
                <li>• Password should be 8+ characters</li>
                <li>• Email is optional but recommended</li>
              </ul>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
