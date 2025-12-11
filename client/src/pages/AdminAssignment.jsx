
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSearch,
  FiDownload,
  FiTrash2,
  FiFileText,
  FiUser,
  FiBookOpen,
  FiCalendar,
  FiLoader,
} from "react-icons/fi";
import Progress from "./Progress"; // Your Progress component

export default function AdminAssignment() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/final-assignments");
      setAssignments(res.data || []);
    } catch (err) {
      alert("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id, fileName) => {
    try {
      setDownloadingId(id);
      const res = await api.get(`/final-assignments/${id}/file`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "assignment.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Download failed");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this assignment permanently?")) return;
    try {
      await api.delete(`/final-assignments/${id}`);
      setAssignments(prev => prev.filter(a => a._id !== id));
      alert("Assignment deleted");
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Download ALL as ZIP
  const downloadAllAssignments = async () => {
    if (assignments.length === 0) return alert("No assignments to download");

    try {
      const files = await Promise.all(
        assignments.map(async (a) => {
          const res = await api.get(`/final-assignments/${a._id}/file`, { responseType: "blob" });
          return {
            name: `${a.studentName}_${a.courseType}_${a.fileName}`,
            blob: res.data,
          };
        })
      );

      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      files.forEach(f => zip.file(f.name, f.blob));

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Final_Assignments_${new Date().toISOString().slice(0, 10)}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download all files");
    }
  };

  const filtered = assignments.filter(a =>
    a.studentName?.toLowerCase().includes(search.toLowerCase()) ||
    a.courseType?.toLowerCase().includes(search.toLowerCase()) ||
    a.fileName?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate("/admin")}
            className="cursor-pointer flex items-center gap-4 text-gray-700 hover:text-indigo-700 font-bold text-lg group"
          >
            <FiArrowLeft size={28} className="group-hover:-translate-x-2 transition-transform" />
            Back to Dashboard
          </button>

          <div className="text-center">
            <h1 className="text-6xl font-black bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Final Assignments
            </h1>
            <p className="text-xl text-gray-600 mt-3">Manage all student submissions</p>
          </div>

          <div className="w-20 h-20 bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl">
            <FiFileText className="text-white text-4xl" />
          </div>
        </div>

        {/* Search + Download All */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="relative w-full max-w-xl">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="Search by student, course, or filename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-8 py-6 rounded-3xl border-2 border-gray-200 bg-white/80 backdrop-blur focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-lg font-medium transition-all"
            />
          </div>

          <button
            onClick={downloadAllAssignments}
            className="cursor-pointer mt-4 md:mt-0 px-10 py-6 bg-linear-to-r from-indigo-600 to-purple-700 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl flex items-center gap-4 hover:scale-105 transition-all"
          >
            <FiDownload size={28} />
            Download All (ZIP)
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="p-8 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-black text-gray-800">Student Submissions</h2>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(+e.target.value); setPage(1); }}
                className="cursor-pointer px-6 py-3 bg-gray-100 rounded-2xl font-medium"
              >
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 text-center">
                <div className="w-20 h-20 border-8 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                <p className="mt-2xl text-gray-600 mt-6">Loading assignments...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-20 text-center">
                <FiFileText className="mx-auto text-8xl text-gray-300 mb-6" />
                <p className="text-3xl text-gray-500">No assignments submitted yet</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-linear-to-r from-indigo-600 to-purple-700 text-white">
                  <tr>
                    <th className="px-8 py-6 text-left font-bold text-lg">Student</th>
                    <th className="px-8 py-6 text-left font-bold text-lg">Course</th>
                    <th className="px-8 py-6 text-left font-bold text-lg">File</th>
                    <th className="px-8 py-6 text-left font-bold text-lg">Submitted</th>
                    <th className="px-8 py-6 text-center font-bold text-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((a) => (
                    <tr key={a._id} className="border-b hover:bg-indigo-50/50 transition">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {a.studentName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-lg">{a.studentName}</p>
                            <p className="text-gray-500">{a.courseType.toUpperCase()} Course</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <span className="px-5 py-2 bg-purple-100 text-purple-700 font-bold rounded-full">
                          {a.courseType.toUpperCase()}
                        </span>
                      </td>

                      <td className="px-8 py-6">
                        <button
                          onClick={() => handleDownload(a._id, a.fileName)}
                          disabled={downloadingId === a._id}
                          className="flex items-center gap-3 text-indigo-600 hover:text-indigo-800 font-medium group"
                        >
                          {downloadingId === a._id ? (
                            <>
                              <FiLoader className="animate-spin" size={20} />
                              <span>Downloading...</span>
                            </>
                          ) : (
                            <>
                              <div className="p-3 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition">
                                <FiDownload size={20} />
                              </div>
                              <span className="truncate max-w-xs">{a.fileName}</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="px-8 py-6 text-gray-600">
                        <FiCalendar className="inline mr-2" />
                        {new Date(a.createdAt).toLocaleString()}
                      </td>

                      <td className="px-8 py-6 text-center">
                        <button
                          onClick={() => {
                            const confirmDelete = window.confirm("Are you sure you want to delete this enrollment?");
                            if (confirmDelete) {
                              handleDelete(a._id);
                            }
                          }}
                          className="cursor-pointer p-3 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-xl transition-all transform hover:scale-110"
                        >
                          <FiTrash2 size={22} />
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 py-8 border-t border-gray-100">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-6 py-3 bg-white border border-gray-300 rounded-2xl font-bold disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-xl font-bold">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-6 py-3 bg-white border border-gray-300 rounded-2xl font-bold disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Progress Section */}
        <div className="mt-16">
          <Progress />
        </div>

        <p className="text-center mt-12 text-gray-500 font-medium">
          Secure • Private • Admin Access Only
        </p>
      </div>
    </div>
  );
}
