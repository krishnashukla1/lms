
//===========correct===============================

// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import {
//     FiArrowLeft,
//     FiSearch,
//     FiDownload,
//     FiTrash2,
//     FiFileText,
//     FiUser,
//     FiBookOpen,
//     FiCalendar,
// } from "react-icons/fi";

// export default function AssignmentsAdmin() {
//     const [assignments, setAssignments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState("");
//     const navigate = useNavigate();

//     const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

//     // Fetch all assignments
//     const loadAssignments = async () => {
//         try {
//             setLoading(true);
//             const res = await api.get("/assignments"); // This calls GET /api/assignments
//             setAssignments(res.data);
//         } catch (err) {
//             console.error("Failed to fetch assignments:", err);
//             alert("Failed to load assignments. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadAssignments();
//     }, []);

//     // Download assignment
//     const handleDownload = async (id, fileName) => {
//         try {
//             const res = await api.get(`/assignments/${id}/file`, {
//                 responseType: "blob",
//             });

//             const url = window.URL.createObjectURL(new Blob([res.data]));
//             const link = document.createElement("a");
//             link.href = url;
//             link.setAttribute("download", fileName);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             window.URL.revokeObjectURL(url);
//         } catch (err) {
//             alert("Download failed: " + (err.response?.data?.message || "Server error"));
//         }
//     };

//     // Delete assignment
//     const handleDelete = async (id) => {
//         if (!window.confirm("Delete this assignment permanently?")) return;

//         try {
//             await api.delete(`/assignments/${id}`);
//             setAssignments(prev => prev.filter(a => a._id !== id));
//             alert("Assignment deleted successfully!");
//         } catch (err) {
//             alert("Delete failed: " + (err.response?.data?.message || "Server error"));
//         }
//     };

//     // Search filter
//     const filteredAssignments = assignments.filter((a) => {
//         const query = search.toLowerCase();
//         return (
//             a.student?.name?.toLowerCase().includes(query) ||
//             a.student?.email?.toLowerCase().includes(query) ||
//             a.module?.title?.toLowerCase().includes(query) ||
//             a.fileName?.toLowerCase().includes(query)
//         );
//     });

//     return (
//         <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 p-8">
//             {/* Background Blobs */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
//                 <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//             </div>

//             <div className="relative z-10 max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-10">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl text-white"
//                     >
//                         <FiArrowLeft size={32} />
//                     </button>

//                     <div className="flex-1 text-center">
//                         <h1 className="text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                             Assignments Management
//                         </h1>
//                     </div>

//                     <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
//                         <FiFileText className="text-white" size={32} />
//                     </div>
//                 </div>

//                 {/* Search */}
//                 <div className="max-w-2xl mx-auto mb-8">
//                     <div className="relative">
//                         <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
//                         <input
//                             type="text"
//                             placeholder="Search by student, email, module or filename..."
//                             className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition-all text-lg"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 {/* Main Card */}
//                 <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
//                     <div className="p-8">
//                         <div className="flex items-center justify-between mb-6">
//                             <h2 className="text-3xl font-bold text-gray-800">All Student Submissions</h2>
//                             <span className="text-lg font-semibold text-indigo-600">
//                                 {assignments.length} Assignment{assignments.length !== 1 ? "s" : ""}
//                             </span>
//                         </div>

//                         {loading ? (
//                             <div className="text-center py-20">
//                                 <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
//                                 <p className="text-gray-600">Loading assignments...</p>
//                             </div>
//                         ) : filteredAssignments.length === 0 ? (
//                             <div className="text-center py-20 text-gray-500">
//                                 <FiFileText size={80} className="mx-auto mb-6 opacity-20" />
//                                 <h3 className="text-2xl font-bold mb-2">
//                                     {search ? "No assignments match your search" : "No assignments yet"}
//                                 </h3>
//                                 <p>Students haven't submitted any assignments yet.</p>
//                             </div>
//                         ) : (
//                             <div className="overflow-x-auto">
//                                 <table className="w-full">
//                                     <thead>
//                                         <tr className="text-left text-gray-600 font-semibold border-b-2 border-gray-200">
//                                             <th className="pb-4">Student</th>
//                                             <th className="pb-4">Module</th>
//                                             <th className="pb-4">Submitted File</th>
//                                             <th className="pb-4">Date & Time</th>
//                                             <th className="pb-4 text-center">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredAssignments.map((a) => (
//                                             <tr
//                                                 key={a._id}
//                                                 className="border-b border-gray-100 hover:bg-indigo-50/50 transition-colors"
//                                             >
//                                                 {/* Student */}
//                                                 <td className="py-6">
//                                                     <div className="flex items-center gap-3">
//                                                         <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
//                                                             <FiUser className="text-indigo-700" size={18} />
//                                                         </div>
//                                                         <div>
//                                                             <p className="font-semibold text-gray-800">
//                                                                 {a.student?.name || "Unknown Student"}
//                                                             </p>
//                                                             <p className="text-sm text-gray-500">{a.student?.email || "n/a"}</p>
//                                                         </div>
//                                                     </div>
//                                                 </td>

//                                                 {/* Module */}
//                                                 <td className="py-6">
//                                                     <div className="flex items-center gap-2">
//                                                         <FiBookOpen className="text-indigo-600" size={18} />
//                                                         <span className="font-medium">
//                                                             {a.module?.title || "(Module deleted)"}
//                                                         </span>
//                                                     </div>
//                                                 </td>

//                                                 {/* File Download */}
//                                                 <td className="py-6">
//                                                     <button
//                                                         onClick={() => handleDownload(a._id, a.fileName)}
//                                                         className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition"
//                                                     >
//                                                         <FiDownload size={18} />
//                                                         <span className="truncate max-w-xs">{a.fileName}</span>
//                                                     </button>
//                                                 </td>

//                                                 {/* Date */}
//                                                 <td className="py-6 text-gray-600">
//                                                     <div className="flex items-center gap-2">
//                                                         <FiCalendar size={16} />
//                                                         {new Date(a.createdAt).toLocaleString("en-US", {
//                                                             month: "short",
//                                                             day: "numeric",
//                                                             year: "numeric",
//                                                             hour: "2-digit",
//                                                             minute: "2-digit",
//                                                             hour12: true,
//                                                         })}
//                                                     </div>
//                                                 </td>

//                                                 {/* Delete Button */}
//                                                 <td className="py-6 text-center">
//                                                     <button
//                                                         onClick={() => handleDelete(a._id)}
//                                                         className="text-red-600 hover:text-red-700 p-3 rounded-xl hover:bg-red-50 transition-all"
//                                                         title="Delete Assignment"
//                                                     >
//                                                         <FiTrash2 size={20} />
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Footer Note */}
//                 <p className="text-center mt-10 text-gray-500 text-sm">
//                     All files are stored securely in MongoDB • Admin access only
//                 </p>
//             </div>
//         </div>
//     );
// }

//==============correct=============================

// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import {
//     FiArrowLeft,
//     FiSearch,
//     FiDownload,
//     FiTrash2,
//     FiFileText,
//     FiUser,
//     FiBookOpen,
//     FiCalendar,
//     FiLoader,
// } from "react-icons/fi";

// export default function AssignmentsAdmin() {
//     const [assignments, setAssignments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState("");
//     const [downloadingId, setDownloadingId] = useState(null); // Track downloading file
//     const navigate = useNavigate();

//     // Fetch all assignments
//     const loadAssignments = async () => {
//         try {
//             setLoading(true);
//             const res = await api.get("/assignments");
//             setAssignments(res.data);
//         } catch (err) {
//             console.error("Failed to fetch assignments:", err);
//             alert("Failed to load assignments. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadAssignments();
//     }, []);

//     // Download assignment - FIXED & ROBUST
//     const handleDownload = async (id, fileName) => {
//         if (downloadingId === id) return; // Prevent double click

//         try {
//             setDownloadingId(id);

//             const res = await api.get(`/assignments/${id}/file`, {
//                 responseType: "arraybuffer", // Most reliable for binary data
//             });

//             const contentType = res.headers["content-type"] || "application/octet-stream";
//             const blob = new Blob([res.data], { type: contentType });

//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement("a");
//             link.href = url;
//             link.setAttribute("download", fileName || "assignment_file");
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//             window.URL.revokeObjectURL(url);
//         } catch (err) {
//             console.error("Download failed:", err);

//             let errorMessage = "Download failed. Please try again.";

//             if (err.response?.data) {
//                 try {
//                     errorMessage = new TextDecoder().decode(err.response.data);
//                 } catch {
//                     // Fallback
//                 }
//            255
//             } else if (err.message) {
//                 errorMessage = err.message;
//             }

//             alert(errorMessage);
//         } finally {
//             setDownloadingId(null);
//         }
//     };

//     // Delete assignment
//     const handleDelete = async (id) => {
//         if (!window.confirm("Delete this assignment permanently? This cannot be undone.")) return;

//         try {
//             await api.delete(`/assignments/${id}`);
//             setAssignments((prev) => prev.filter((a) => a._id !== id));
//             alert("Assignment deleted successfully!");
//         } catch (err) {
//             const msg = err.response?.data?.message || "Delete failed. Server error.";
//             alert(msg);
//         }
//     };

//     // Search filter
//     const filteredAssignments = assignments.filter((a) => {
//         const query = search.toLowerCase();
//         return (
//             a.student?.name?.toLowerCase().includes(query) ||
//             a.student?.email?.toLowerCase().includes(query) ||
//             a.module?.title?.toLowerCase().includes(query) ||
//             a.fileName?.toLowerCase().includes(query)
//         );
//     });

//     return (
//         <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 p-8">
//             {/* Background Blobs */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
//                 <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//             </div>

//             <div className="relative z-10 max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-10">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl text-white hover:scale-110 transition-transform"
//                     >
//                         <FiArrowLeft size={32} />
//                     </button>

//                     <div className="flex-1 text-center">
//                         <h1 className="text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                             Assignments Management
//                         </h1>
//                     </div>

//                     <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
//                         <FiFileText className="text-white" size={32} />
//                     </div>
//                 </div>

//                 {/* Search */}
//                 <div className="max-w-2xl mx-auto mb-8">
//                     <div className="relative">
//                         <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
//                         <input
//                             type="text"
//                             placeholder="Search by student, email, module or filename..."
//                             className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition-all text-lg outline-none"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 {/* Main Card */}
//                 <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
//                     <div className="p-8">
//                         <div className="flex items-center justify-between mb-6">
//                             <h2 className="text-3xl font-bold text-gray-800">All Student Submissions</h2>
//                             <span className="text-lg font-semibold text-indigo-600">
//                                 {assignments.length} Assignment{assignments.length !== 1 ? "s" : ""}
//                             </span>
//                         </div>

//                         {loading ? (
//                             <div className="text-center py-20">
//                                 <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
//                                 <p className="text-gray-600">Loading assignments...</p>
//                             </div>
//                         ) : filteredAssignments.length === 0 ? (
//                             <div className="text-center py-20 text-gray-500">
//                                 <FiFileText size={80} className="mx-auto mb-6 opacity-20" />
//                                 <h3 className="text-2xl font-bold mb-2">
//                                     {search ? "No assignments match your search" : "No assignments yet"}
//                                 </h3>
//                                 <p>
//                                     {search
//                                         ? "Try adjusting your search terms."
//                                         : "Students haven't submitted any assignments yet."}
//                                 </p>
//                             </div>
//                         ) : (
//                             <div className="overflow-x-auto">
//                                 <table className="w-full">
//                                     <thead>
//                                         <tr className="text-left text-gray-600 font-semibold border-b-2 border-gray-200">
//                                             <th className="pb-4">Student</th>
//                                             <th className="pb-4">Module</th>
//                                             <th className="pb-4">Submitted File</th>
//                                             <th className="pb-4">Date & Time</th>
//                                             <th className="pb-4 text-center">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredAssignments.map((a) => (
//                                             <tr
//                                                 key={a._id}
//                                                 className="border-b border-gray-100 hover:bg-indigo-50/50 transition-colors"
//                                             >
//                                                 {/* Student */}
//                                                 <td className="py-6">
//                                                     <div className="flex items-center gap-3">
//                                                         <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
//                                                             <FiUser className="text-indigo-700" size={18} />
//                                                         </div>
//                                                         <div>
//                                                             <p className="font-semibold text-gray-800">
//                                                                 {a.student?.name || "Unknown Student"}
//                                                             </p>
//                                                             <p className="text-sm text-gray-500">
//                                                                 {a.student?.email || "n/a"}
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </td>

//                                                 {/* Module */}
//                                                 <td className="py-6">
//                                                     <div className="flex items-center gap-2">
//                                                         <FiBookOpen className="text-indigo-600" size={18} />
//                                                         <span className="font-medium">
//                                                             {a.module?.title || "(Module deleted)"}
//                                                         </span>
//                                                     </div>
//                                                 </td>

//                                                 {/* File Download */}
//                                                 <td className="py-6">
//                                                     <button
//                                                         onClick={() => handleDownload(a._id, a.fileName)}
//                                                         disabled={downloadingId === a._id}
//                                                         className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition disabled:opacity-60 disabled:cursor-not-allowed"
//                                                     >
//                                                         {downloadingId === a._id ? (
//                                                             <>
//                                                                 <FiLoader className="animate-spin" size={18} />
//                                                                 <span>Downloading...</span>
//                                                             </>
//                                                         ) : (
//                                                             <>
//                                                                 <FiDownload size={18} />
//                                                                 <span className="truncate max-w-xs">
//                                                                     {a.fileName}
//                                                                 </span>
//                                                             </>
//                                                         )}
//                                                     </button>
//                                                 </td>

//                                                 {/* Date */}
//                                                 <td className="py-6 text-gray-600">
//                                                     <div className="flex items-center gap-2">
//                                                         <FiCalendar size={16} />
//                                                         {new Date(a.createdAt).toLocaleString("en-US", {
//                                                             month: "short",
//                                                             day: "numeric",
//                                                             year: "numeric",
//                                                             hour: "2-digit",
//                                                             minute: "2-digit",
//                                                             hour12: true,
//                                                         })}
//                                                     </div>
//                                                 </td>

//                                                 {/* Delete Button */}
//                                                 <td className="py-6 text-center">
//                                                     <button
//                                                         onClick={() => handleDelete(a._id)}
//                                                         className="text-red-600 hover:text-red-700 p-3 rounded-xl hover:bg-red-50 transition-all"
//                                                         title="Delete Assignment"
//                                                     >
//                                                         <FiTrash2 size={20} />
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Footer Note */}
//                 <p className="text-center mt-10 text-gray-500 text-sm">
//                     All files are stored securely in MongoDB • Admin access only
//                 </p>
//             </div>
//         </div>
//     );
// }




//=============fully correct=============================


// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import Progress from '../pages/Progress'
// import {
//   FiArrowLeft,
//   FiSearch,
//   FiDownload,
//   FiTrash2,
//   FiFileText,
//   FiUser,
//   FiBookOpen,
//   FiCalendar,
//   FiLoader,
// } from "react-icons/fi";

// export default function AssignmentsAdmin() {
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [downloadingId, setDownloadingId] = useState(null);

//   // Pagination states
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   const navigate = useNavigate();

//   // Fetch assignments
//   const loadAssignments = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/assignments");
//       setAssignments(res.data);
//     } catch (err) {
//       console.error("Failed to fetch assignments:", err);
//       alert("Failed to load assignments. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAssignments();
//   }, []);

//   // Download single assignment file
//   const handleDownload = async (id, fileName) => {
//     if (downloadingId === id) return;

//     try {
//       setDownloadingId(id);

//       const res = await api.get(`/assignments/${id}/file`, {
//         responseType: "arraybuffer",
//       });

//       const blob = new Blob([res.data], {
//         type: res.headers["content-type"] || "application/octet-stream",
//       });

//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", fileName || "assignment_file");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       alert("Download failed.");
//       console.error(err);
//     } finally {
//       setDownloadingId(null);
//     }
//   };

//   // Delete assignment
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this assignment permanently?")) return;

//     try {
//       await api.delete(`/assignments/${id}`);
//       setAssignments((prev) => prev.filter((a) => a._id !== id));
//       alert("Assignment deleted successfully!");
//     } catch (err) {
//       alert("Delete failed. Try again.");
//     }
//   };

//   // Search filter
//   const filtered = assignments.filter((a) => {
//     const q = search.toLowerCase();
//     return (
//       a.student?.name?.toLowerCase().includes(q) ||
//       a.student?.email?.toLowerCase().includes(q) ||
//       a.module?.title?.toLowerCase().includes(q) ||
//       a.fileName?.toLowerCase().includes(q)
//     );
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(filtered.length / pageSize);
//   const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

//   // Download all assignments button

// const downloadAllAssignments = async () => {
//   if (assignments.length === 0) {
//     alert("No assignments to download.");
//     return;
//   }

//   try {
//     // 1. Fetch all files
//     const downloadPromises = assignments.map(async (assignment) => {
//       const res = await api.get(`/assignments/${assignment._id}/file`, {
//         responseType: "arraybuffer",
//       });

//       const blob = new Blob([res.data], { type: res.headers["content-type"] });

//       return {
//         name: `${assignment.student?.name || "Student"}_${assignment.module?.title || "Module"}_${assignment.fileName}`,
//         blob,
//       };
//     });

//     const files = await Promise.all(downloadPromises);

//     // 2. Load JSZip (dynamic import)
//     const JSZip =
//       window.JSZip ||
//       (await import("jszip")).default;

//     const zip = new JSZip();

//     // 3. Add files inside ZIP
//     files.forEach((file) => {
//       zip.file(file.name, file.blob);
//     });

//     // 4. Generate ZIP
//     const zipBlob = await zip.generateAsync({ type: "blob" });
//     const url = URL.createObjectURL(zipBlob);

//     // 5. Download ZIP
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `All_Assignments_${new Date().toISOString().slice(0, 10)}.zip`;
//     a.click();

//     URL.revokeObjectURL(url);
//   } catch (err) {
//     console.error("Download all failed:", err);
//     alert("Failed to download all files. Try again.");
//   }
// };





//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 p-8">
//       <div className="relative z-10 max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-10">

//           {/* Back Button */}
//           <button
//             onClick={() => navigate("/admin")}
//             className="flex items-center gap-3  text-gray-700 hover:text-blue-700 font-semibold transition-all duration-300  hover:gap-4 group cursor-pointer bg-white/70 hover:bg-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200"
//           >
//             <FiArrowLeft
//               size={20}
//               className="group-hover:-translate-x-1 transition-transform"
//             />
//             Back to Dashboard
//           </button>

//           {/* Icon Box */}
//           <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl"
//           >
//             <FiFileText className="text-white" size={32} />
//           </div>

//         </div>

//         {/* Title */}
//         <h1 className="text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600  bg-clip-text text-transparent mb-10 text-center"
//         >
//           Assignments Management
//         </h1>



//         {/* Search + Download All */}
//         <div className="flex items-center justify-between max-w-4xl mx-auto mb-8">
//           <div className="relative w-full mr-6">
//             <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
//             <input
//               type="text"
//               placeholder="Search assignments..."
//               className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-gray-200 bg-white/70 focus:border-indigo-500 text-lg"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>

//           <button
//             onClick={downloadAllAssignments}
//             className="cursor-pointer px-16 py-6  rounded-2xl  bg-indigo-600  text-white font-semibold  flex items-center whitespace-nowrap gap-2  hover:bg-indigo-700 shadow-lg transition-all"
//           >
//             <FiDownload size={20} />
//            Download All (ZIP)
//           </button>

//         </div>

//         {/* Table Card */}
//         <div className="bg-white/90 rounded-3xl shadow-2xl p-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-3xl font-bold text-gray-800">All Student Submissions</h2>

//             {/* Page size */}
//             <select
//               className="cursor-pointer border rounded-xl px-4 py-2 text-gray-600"
//               value={pageSize}
//               onChange={(e) => {
//                 setPageSize(Number(e.target.value));
//                 setPage(1);
//               }}
//             >
//               <option value={10}>10 / page</option>
//               <option value={20}>20 / page</option>
//               <option value={50}>50 / page</option>
//             </select>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left text-gray-600 font-semibold border-b-2 border-gray-200">
//                   <th className="pb-4">Student</th>
//                   <th className="pb-4">Module</th>
//                   <th className="pb-4">File</th>
//                   <th className="pb-4">Date</th>
//                   <th className="pb-4 text-center">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {paginatedData.map((a) => (
//                   <tr
//                     key={a._id}
//                     className="border-b hover:bg-indigo-50/50 transition"
//                   >
//                     {/* Student */}
//                     <td className="py-5">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
//                           <FiUser className="text-indigo-700" />
//                         </div>
//                         <div>
//                           <p className="font-semibold">{a.student?.name}</p>
//                           <p className="text-sm text-gray-500">{a.student?.email}</p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Module */}
//                     <td className="py-5 flex items-center gap-2">
//                       <FiBookOpen className="text-indigo-600" />
//                       {a.module?.title}
//                     </td>

//                     {/* File download */}

//                     <td className="py-5">
//                       <button
//                         onClick={() => handleDownload(a._id, a.fileName)}
//                         disabled={downloadingId === a._id}
//                         className="
//       cursor-pointer 
//       flex items-center 
//       gap-3 
//       text-indigo-600 
//       hover:text-indigo-800 
//       disabled:opacity-60 
//       font-medium
// transition-all
//     "
//                       >
//                         {downloadingId === a._id ? (
//                           <>
//                             <FiLoader size={18} className="animate-spin" />
//                             <span>Downloading…</span>
//                           </>
//                         ) : (
//                           <>
//                             {/* Icon Box */}
//                             <span className="
//           p-2 
//           rounded-xl 
//           bg-indigo-50 
//           text-indigo-700 
//           shadow-sm 
//           border border-indigo-100
//         ">
//                               <FiDownload size={18} />
//                             </span>

//                             {/* Vertical Divider */}
//                             <div className="w-px h-6 bg-indigo-200"></div>

//                             {/* File Name */}
//                             <span className="truncate max-w-xs">{a.fileName}</span>
//                           </>
//                         )}
//                       </button>
//                     </td>


//                     {/* Date */}
//                     <td className="py-5 text-gray-600 flex items-center gap-2">
//                       <FiCalendar />
//                       {new Date(a.createdAt).toLocaleString()}
//                     </td>

//                     {/* Delete */}
//                     <td className="py-5 text-center">
//                       <button
//                         onClick={() => handleDelete(a._id)}
//                         className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl cursor-pointer"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           <div className="flex justify-center gap-3 mt-8">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="cursor-pointer px-4 py-2 rounded-xl border disabled:opacity-50"
//             >
//               Prev
//             </button>

//             <span className="px-4 py-2 font-semibold">
//               Page {page} of {totalPages}
//             </span>

//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="cursor-pointer px-4 py-2 rounded-xl border disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//         <Progress/>

//         <p className="text-center mt-10 text-gray-500 text-sm">
//           All files stored securely • Admin access only
//         </p>
//       </div>
//     </div>
//   );
// }

//===================kp==========================

// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import {
//   FiArrowLeft,
//   FiSearch,
//   FiDownload,
//   FiTrash2,
//   FiFileText,
//   FiUser,
//   FiCalendar,
//   FiLoader,
// } from "react-icons/fi";

// export default function AdminAssignment() {
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [downloadingId, setDownloadingId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadAssignments();
//   }, []);

//   const loadAssignments = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/finalAssignments");
//       setAssignments(res.data || []);
//     } catch (err) {
//       alert("Failed to load assignments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async (id, fileName) => {
//     try {
//       setDownloadingId(id);
//       const res = await api.get(`/finalAssignments/${id}/file`, {
//         responseType: "blob",
//       });

//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", fileName || "assignment.pdf");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       alert("Download failed");
//     } finally {
//       setDownloadingId(null);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this assignment permanently?")) return;
//     try {
//       await api.delete(`/finalAssignments/${id}`);
//       setAssignments((prev) => prev.filter((a) => a._id !== id));
//       alert("Deleted successfully");
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   const filtered = assignments.filter(
//     (a) =>
//       a.studentName?.toLowerCase().includes(search.toLowerCase()) ||
//       a.courseType?.toLowerCase().includes(search.toLowerCase()) ||
//       a.fileName?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-8">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-10">
//           <button
//             onClick={() => navigate("/admin")}
//             className="flex items-center gap-3 text-gray-700 hover:text-indigo-700 font-bold"
//           >
//             <FiArrowLeft size={24} /> Back to Dashboard
//           </button>

//           <h1 className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-700">
//             Final Assignments
//           </h1>
//         </div>

//         {/* Search */}
//         <div className="max-w-xl mx-auto mb-8">
//           <div className="relative">
//             <FiSearch className="absolute left-4 top-4 text-gray-400" size={22} />
//             <input
//               type="text"
//               placeholder="Search by student, course, or file..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-gray-200 focus:border-indigo-500"
//             />
//           </div>
//         </div>

//         {/* Table Section */}
//         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
//           {loading ? (
//             <div className="p-20 text-center">
//               <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="text-center py-20">
//               <p className="text-2xl text-gray-500">No assignments submitted yet</p>
//             </div>
//           ) : (
//             <table className="w-full">
//               <thead className="bg-linear-to-r from-indigo-600 to-purple-700 text-white">
//                 <tr>
//                   <th className="p-6 text-left">Student</th>
//                   <th className="p-6 text-left">Course</th>
//                   <th className="p-6 text-left">File</th>
//                   <th className="p-6 text-left">Submitted</th>
//                   <th className="p-6 text-center">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filtered.map((a) => (
//                   <tr key={a._id} className="border-b hover:bg-gray-50">
//                     <td className="p-6">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
//                           <FiUser className="text-indigo-700" />
//                         </div>
//                         <div>
//                           <p className="font-bold">{a.studentName}</p>
//                           <p className="text-sm text-gray-500">{a.courseType} Course</p>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="p-6">
//                       <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-bold">
//                         {a.courseType.toUpperCase()}
//                       </span>
//                     </td>

//                     <td className="p-6">
//                       <span className="text-gray-700 font-medium">{a.fileName}</span>
//                     </td>

//                     <td className="p-6 text-gray-600">
//                       <FiCalendar className="inline mr-2" />
//                       {new Date(a.createdAt).toLocaleDateString()}
//                     </td>

//                     <td className="p-6 text-center">
//                       <button
//                         onClick={() => handleDownload(a._id, a.fileName)}
//                         disabled={downloadingId === a._id}
//                         className="mx-2 text-blue-600 hover:text-blue-800 disabled:opacity-50"
//                       >
//                         {downloadingId === a._id ? (
//                           <FiLoader className="animate-spin" />
//                         ) : (
//                           <FiDownload />
//                         )}
//                       </button>

//                       <button
//                         onClick={() => handleDelete(a._id)}
//                         className="mx-2 text-red-600 hover:text-red-800"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }
//====styyle===
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
