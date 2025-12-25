// C:\Users\hp\Desktop\LMS NEW PROJECT\client\src\pages\AdminNotifications.jsx

import { useEffect, useState } from "react";
import api from "../api/axios";
import { FiEdit2, FiTrash2, FiPlus, FiChevronLeft, FiChevronRight,FiArrowLeft  } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate} from "react-router-dom";


const ITEMS_PER_PAGE = 10;

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  /* ======================================================
     FETCH NOTIFICATIONS
  ====================================================== */
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications/admin");
      setNotifications(res.data.data || []);
      setCurrentPage(1); // reset page after fetch
    } catch (error) {
      console.error(error);
      toast.error("Failed to load notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  /* ======================================================
     ADD / UPDATE NOTIFICATION
  ====================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.warning("Notification message is required");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await api.put(`/notifications/admin/${editingId}`, { message });
        toast.success("Notification updated successfully");
      } else {
        await api.post("/notifications/admin", { message });
        toast.success("Notification added successfully");
      }

      setMessage("");
      setEditingId(null);
      fetchNotifications();
    } catch (error) {
      console.error(error);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ======================================================
     DELETE NOTIFICATION
  ====================================================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;

    try {
      await api.delete(`/notifications/admin/${id}`);
      toast.success("Notification deleted");
      fetchNotifications();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete notification");
    }
  };

  /* ======================================================
     EDIT NOTIFICATION
  ====================================================== */
  const handleEdit = (notif) => {
    setEditingId(notif._id);
    setMessage(notif.message);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ======================================================
     PAGINATION LOGIC
  ====================================================== */
  const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotifications = notifications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-5xl mx-auto">
 <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-gray-700 font-medium mb-2"
          >
            <FiArrowLeft className="w-5 h-5" /> Back
          </button>

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">
          <h1 className="text-3xl font-extrabold text-indigo-700">
            Admin Notifications
          </h1>
          <p className="text-gray-600 mt-2">
            Add, update, or remove notifications shown to students
          </p>
        </div>

        {/* ADD / EDIT FORM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-2xl p-4 text-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter notification message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg transition
                ${editingId
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-indigo-600 hover:bg-indigo-700"}
                ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <FiPlus />
              {editingId ? "Update Notification" : "Add Notification"}
            </button>
          </form>
        </motion.div>

        {/* NOTIFICATION LIST */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Existing Notifications
          </h2>

          {paginatedNotifications.length === 0 ? (
            <p className="text-gray-500">No notifications available.</p>
          ) : (
            <div className="space-y-4">
              {paginatedNotifications.map((notif) => (
                <motion.div
                  key={notif._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-between items-start gap-6 p-5 rounded-2xl bg-indigo-50 border border-indigo-100"
                >
                  <p className="text-gray-800 text-lg flex-1">
                    {notif.message}
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(notif)}
                      className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                      title="Edit"
                    >
                      <FiEdit2 size={20} />
                    </button>

                    <button
                      onClick={() => handleDelete(notif._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      title="Delete"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold
                  ${currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"}
                `}
              >
                <FiChevronLeft />
                Prev
              </button>

              <p className="text-lg font-semibold text-gray-700">
                Page {currentPage} of {totalPages}
              </p>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold
                  ${currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"}
                `}
              >
                Next
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

