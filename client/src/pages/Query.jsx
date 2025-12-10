
import { useState } from "react";
import { Mail, User, MessageCircle, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Query() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(""); // <-- FIXED

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSuccess(false);
  setError("");

  try {
    const res = await api.post("/query/send-query", form);

    setSuccess(true);
    setForm({ name: "", email: "", message: "" });

    // 🔥 Auto hide success message after 2 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 2000);

  } catch (err) {
    console.error("Submit error:", err);
    setError(
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      "Failed to send query"
    );

    // 🔥 Auto hide error message after 2 seconds
    setTimeout(() => {
      setError("");
    }, 2000);

  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl p-8 relative">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="cursor-pointer absolute -top-4 -left-4 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h2 className="text-3xl font-bold text-center text-cyan-300 mb-6">
          Contact Support
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Have any query? Send us a message below.
        </p>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-600 text-green-300 rounded-lg text-center">
            Query sent successfully! We'll get back to you soon.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-600 text-red-300 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 disabled:opacity-60"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 disabled:opacity-60"
            />
          </div>

          {/* Message */}
          <div className="relative">
            <MessageCircle className="absolute left-3 top-3 text-gray-400" size={18} />
            <textarea
              name="message"
              placeholder="Write your message..."
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 disabled:opacity-60"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-700 disabled:cursor-not-allowed text-black font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Sending...
              </>
            ) : (
              "Send Query"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
