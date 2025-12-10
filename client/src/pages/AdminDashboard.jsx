
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import api from "../api/axios";
// import { toast } from "react-toastify";


// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const logout = useAuth((s) => s.logout);

//   const [stats, setStats] = useState({
//     students: 0,
//     modules: 0,
//     lessons: 0
//   });
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const [studentsRes, modulesRes] = await Promise.all([
//           api.get("/admin/students"),
//           api.get("/modules")
//         ]);

//         const studentsCount = studentsRes.data.students?.length || studentsRes.data.length || 0;
//         const modulesData = modulesRes.data.modules || modulesRes.data || [];
//         const modulesCount = modulesData.length;
//         const lessonsCount = modulesData.reduce(
//           (acc, mod) => acc + (mod.materials?.length || 0),
//           0
//         );

//         setStats({
//           students: studentsCount,
//           modules: modulesCount,
//           lessons: lessonsCount
//         });
//       } catch (err) {
//         console.error("Error fetching dashboard stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchStats();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     toast.success("You have successfully logged out!");
//     setTimeout(() => navigate("/", { replace: true }), 1200);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex">

//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-xl p-6 space-y-6">
//         <h2 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/admin")}>LearnStep LMS</h2>

//         <nav className="space-y-3">
//           {[
//             { label: "Dashboard", path: "/admin" },
//             { label: "➕ Add Student", path: "/admin/add-student" },
//             { label: "👨‍🎓 Student List", path: "/admin/students" },
//             { label: "📘 Add Module", path: "/admin/add-module" },
//             { label: "📚 Module List", path: "/admin/modules" },
//             { label: "📚 Add Quiz", path: "/admin/quiz" }

//           ].map((btn) => (
//             <button
//               key={btn.path}
//               onClick={() => navigate(btn.path)}
//               className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition cursor-pointer font-medium"
//             >
//               {btn.label}
//             </button>
//           ))}
//         </nav>

//         {/* <button
//           onClick={() => { logout(); navigate("/"); }}
//           className="mt-10 w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 shadow-md transition cursor-pointer font-semibold"
//         >
//           Logout
//         </button> */}


//         <button
//           onClick={handleLogout}
//           className="mt-10 w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 shadow-md transition cursor-pointer font-semibold"
//         >
//           Logout
//         </button>



//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-10">
//         <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           {[
//             { label: "Total Students", value: stats.students, color: "text-blue-600" },
//             { label: "Total Modules", value: stats.modules, color: "text-green-600" },
//             { label: "Total Lessons", value: stats.lessons, color: "text-purple-600" }
//           ].map((stat, i) => (
//             <div
//               key={i}
//               className="p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition "
//             >
//               <h3 className="text-xl font-semibold text-gray-700">{stat.label}</h3>
//               <p className={`text-3xl font-bold mt-2 ${stat.color}`}>
//                 {loading ? "..." : stat.value}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Quick Actions */}
//         <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {[
//             { label: "➕ Add New Student", color: "bg-linear-to-r from-blue-500 to-blue-700", path: "/admin/add-student" },
//             { label: "📘 Add Module", color: "bg-linear-to-r from-green-500 to-green-700", path: "/admin/add-module" },
//             { label: "👥 View Students", color: "bg-linear-to-r from-purple-500 to-purple-700", path: "/admin/students" },
//             { label: "📚 View Modules", color: "bg-linear-to-r from-indigo-500 to-indigo-700", path: "/admin/modules" },
//             { label: "📚 View Quiz", color: "bg-linear-to-r from-indigo-500 to-indigo-700", path: "/admin/quiz" }

//           ].map((btn, i) => (
//             <button
//               key={i}
//               onClick={() => navigate(btn.path)}
//               className={`${btn.color} text-white p-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition cursor-pointer font-semibold`}
//             >
//               {btn.label}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

//==============================new 27 nov stylish============


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import api from "../api/axios";
// import { toast } from "react-toastify";


// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const logout = useAuth((s) => s.logout);

//   const [stats, setStats] = useState({
//     students: 0,
//     modules: 0,
//     lessons: 0
//   });
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const [studentsRes, modulesRes] = await Promise.all([
//           api.get("/admin/students"),
//           api.get("/modules")
//         ]);

//         const studentsCount = studentsRes.data.students?.length || studentsRes.data.length || 0;
//         const modulesData = modulesRes.data.modules || modulesRes.data || [];
//         const modulesCount = modulesData.length;
//         const lessonsCount = modulesData.reduce(
//           (acc, mod) => acc + (mod.materials?.length || 0),
//           0
//         );

//         setStats({
//           students: studentsCount,
//           modules: modulesCount,
//           lessons: lessonsCount
//         });
//       } catch (err) {
//         console.error("Error fetching dashboard stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchStats();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     toast.success("You have successfully logged out!");
//     setTimeout(() => navigate("/", { replace: true }), 1200);
//   };

//   return (
//   <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex">

//     {/* Sidebar */}
//     <div className="w-72 bg-white/70 backdrop-blur-xl shadow-2xl p-7 space-y-8 border-r border-gray-200">
//       <h2
//         className="text-3xl font-extrabold text-blue-700 tracking-wide cursor-pointer"
//         onClick={() => navigate("/admin")}
//       >
//         LearnStep LMS
//       </h2>

//       <nav className="space-y-4">
//         {[
//           { label: "🏠 Dashboard", path: "/admin" },
//           { label: "➕ Add Student", path: "/admin/add-student" },
//           { label: "👨‍🎓 Student List", path: "/admin/students" },
//           { label: "📘 Add Module", path: "/admin/add-module" },
//           { label: "📚 Module List", path: "/admin/modules" },
//           { label: "📝 Add Quiz", path: "/admin/quiz" }
//         ].map((btn) => (
//           <button
//             key={btn.path}
//             onClick={() => navigate(btn.path)}
//             className="w-full text-left p-3 rounded-xl bg-white/60 hover:bg-blue-100 hover:text-blue-700 shadow-md hover:shadow-xl transition font-semibold cursor-pointer"
//           >
//             {btn.label}
//           </button>
//         ))}
//       </nav>

//       <button
//         onClick={handleLogout}
//         className="mt-10 w-full bg-red-500 text-white py-3.5 rounded-xl hover:bg-red-600 shadow-lg hover:shadow-2xl transition font-semibold tracking-wide"
//       >
//         Logout
//       </button>
//     </div>

//     {/* Main Content */}
//     <div className="flex-1 p-12">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-10">
//         <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
//           Admin Dashboard
//         </h1>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
//         {[
//           { label: "Total Students", value: stats.students, color: "from-blue-500 to-blue-700" },
//           { label: "Total Modules", value: stats.modules, color: "from-green-500 to-green-700" },
//           { label: "Total Lessons", value: stats.lessons, color: "from-purple-500 to-purple-700" }
//         ].map((stat, i) => (
//           <div
//             key={i}
//             className="p-8 bg-white rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transform hover:-translate-y-2 transition"
//           >
//             <h3 className="text-xl font-semibold text-gray-600">{stat.label}</h3>

//             <p className={`text-5xl font-extrabold mt-4 bg-linear-to-r ${stat.color} bg-clip-text text-transparent`}>
//               {loading ? "..." : stat.value}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Quick Actions */}
//       <h2 className="text-3xl font-bold text-gray-800 mb-5">Quick Actions</h2>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//         {[
//           { label: "➕ Add New Student", color: "from-blue-500 to-blue-700", path: "/admin/add-student" },
//           { label: "📘 Add Module", color: "from-green-500 to-green-700", path: "/admin/add-module" },
//           { label: "👥 View Students", color: "from-purple-500 to-purple-700", path: "/admin/students" },
//           { label: "📚 View Modules", color: "from-indigo-500 to-indigo-700", path: "/admin/modules" },
//           { label: "📝 View Quiz", color: "from-rose-500 to-rose-700", path: "/admin/quiz" }
//         ].map((btn, i) => (
//           <button
//             key={i}
//             onClick={() => navigate(btn.path)}
//             className={`bg-linear-to-r ${btn.color} text-white p-10 rounded-3xl shadow-xl hover:shadow-3xl transform hover:-translate-y-2 transition cursor-pointer text-xl font-semibold tracking-wide`}
//           >
//             {btn.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// }

//=================more stylsih deepshake================

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import api from "../api/axios";
// import { toast } from "react-toastify";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const logout = useAuth((s) => s.logout);

//   const [stats, setStats] = useState({
//     students: 0,
//     modules: 0,
//     lessons: 0
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const [studentsRes, modulesRes] = await Promise.all([
//           api.get("/admin/students"),
//           api.get("/modules")
//         ]);

//         const studentsCount = studentsRes.data.students?.length || studentsRes.data.length || 0;
//         const modulesData = modulesRes.data.modules || modulesRes.data || [];
//         const modulesCount = modulesData.length;
//         const lessonsCount = modulesData.reduce(
//           (acc, mod) => acc + (mod.materials?.length || 0),
//           0
//         );

//         setStats({
//           students: studentsCount,
//           modules: modulesCount,
//           lessons: lessonsCount
//         });
//       } catch (err) {
//         console.error("Error fetching dashboard stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchStats();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     toast.success("You have successfully logged out!");
//     setTimeout(() => navigate("/", { replace: true }), 1200);
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50/30 flex">
//       {/* Enhanced Sidebar */}
//       <div className="w-80 bg-white/90 backdrop-blur-2xl shadow-2xl p-8 space-y-10 border-r border-gray-100/50">
//         {/* Logo Section */}
//         <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/admin")}>
//           <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
//             <span className="text-white font-bold text-lg">LS</span>
//           </div>
//           <div>
//             <h2 className="text-2xl font-black text-gray-900 tracking-tight">LearnStep</h2>
//             <p className="text-xs text-gray-500 font-medium">Learning Management</p>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="space-y-3">
//           {[
//             { label: "Dashboard", icon: "🏠", path: "/admin" },
//             { label: "Add Student", icon: "👤", path: "/admin/add-student" },
//             { label: "Student List", icon: "🎓", path: "/admin/students" },
//             { label: "Add Module", icon: "📘", path: "/admin/add-module" },
//             { label: "Module List", icon: "📚", path: "/admin/modules" },
//             { label: "Add Quiz", icon: "📝", path: "/admin/quiz" },
//             { label: "Assignment & Progress", icon: "📊", path: "/admin/assignment-progress" }

//           ].map((btn) => (
//             <button
//               key={btn.path}
//               onClick={() => navigate(btn.path)}
//               className="cursor-pointer w-full flex items-center space-x-4 text-left p-4 rounded-2xl bg-white/50 hover:bg-blue-50/80 border border-transparent hover:border-blue-200/50 shadow-sm hover:shadow-lg transition-all duration-300 font-semibold text-gray-700 hover:text-blue-700 group"
//             >
//               <span className="text-xl">{btn.icon}</span>
//               <span>{btn.label}</span>
//             </button>
//           ))}
//         </nav>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="cursor-pointer w-full flex items-center justify-center space-x-2 bg-linear-to-r from-red-500 to-red-600 text-white py-4 rounded-2xl hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold tracking-wide mt-8"
//         >
//           <span>🚪</span>
//           <span>Logout</span>
//         </button>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 p-10">
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-12">
//           <div>
//             <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-2">
//               Admin Dashboard
//             </h1>
//             <p className="text-gray-600 text-lg font-medium">
//               Welcome back! Manage your learning platform efficiently.
//             </p>
//           </div>
//           <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
//             <span className="text-white text-2xl">👨‍💼</span>
//           </div>
//         </div>

//         {/* Enhanced Stats Cards */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
//           {[
//             {
//               label: "Total Students",
//               value: stats.students,
//               color: "from-blue-500 to-blue-700",
//               icon: "👨‍🎓",
//               bg: "bg-blue-50/50"
//             },
//             {
//               label: "Total Modules",
//               value: stats.modules,
//               color: "from-emerald-500 to-emerald-700",
//               icon: "📚",
//               bg: "bg-emerald-50/50"
//             },
//             {
//               label: "Total Lessons",
//               value: stats.lessons,
//               color: "from-violet-500 to-violet-700",
//               icon: "📖",
//               bg: "bg-violet-50/50"
//             }
//           ].map((stat, i) => (
//             <div
//               key={i}
//               className={`relative p-8 rounded-3xl ${stat.bg} backdrop-blur-sm border border-white/50 shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500 group overflow-hidden`}
//             >
//               {/* Background Pattern */}
//               <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

//               <div className="relative z-10">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                     <span className="text-2xl">{stat.icon}</span>
//                   </div>
//                   <div className="text-right">
//                     <h3 className="text-lg font-semibold text-gray-600 mb-1">{stat.label}</h3>
//                     <p className={`text-5xl font-black bg-linear-to-r ${stat.color} bg-clip-text text-transparent`}>
//                       {loading ? (
//                         <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
//                       ) : (
//                         stat.value
//                       )}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
//                   <div
//                     className={`h-full bg-linear-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out`}
//                     style={{ width: loading ? '0%' : '100%' }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Enhanced Quick Actions */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-black text-gray-900 mb-2">Quick Actions</h2>
//           <p className="text-gray-600 font-medium mb-8">Manage your platform with one click</p>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 label: "Add New Student",
//                 subtitle: "Enroll new learners",
//                 color: "from-blue-500 to-blue-700",
//                 icon: "👤",
//                 path: "/admin/add-student"
//               },
//               {
//                 label: "Create Module",
//                 subtitle: "Add learning content",
//                 color: "from-emerald-500 to-emerald-700",
//                 icon: "📘",
//                 path: "/admin/add-module"
//               },
//               {
//                 label: "View Students",
//                 subtitle: "Manage enrolled users",
//                 color: "from-purple-500 to-purple-700",
//                 icon: "👥",
//                 path: "/admin/students"
//               },
//               {
//                 label: "View Modules",
//                 subtitle: "Browse all courses",
//                 color: "from-indigo-500 to-indigo-700",
//                 icon: "📚",
//                 path: "/admin/modules"
//               },
//               {
//                 label: "Create Quiz",
//                 subtitle: "Add assessments",
//                 color: "from-rose-500 to-rose-700",
//                 icon: "📝",
//                 path: "/admin/quiz"
//               },
//               {
//                 label: "Assignment & Progress",
//                 subtitle: "Add assessments",
//                 // color: "from-rose-500 to-pink-600",
//                 color: "from-purple-500 to-blue-500",
//                 // color: "from-emerald-200 to-green-600",
//                  icon: "📊",
//                 path: "/admin/assignment-progress"
//               },

//               {
//                 label: "Analytics",
//                 subtitle: "View reports",
//                 color: "from-amber-500 to-amber-700",
//                 icon: "📊",
//                 path: "/admin/analytics"
//               },
//               {
//                 label: "Settings",
//                 subtitle: "Platform configuration",
//                 color: "from-gray-500 to-gray-700",
//                 icon: "⚙️",
//                 path: "/admin/settings"
//               },
//               {
//                 label: "Support",
//                 subtitle: "Get help & resources",
//                 color: "from-cyan-500 to-cyan-700",
//                 icon: "💬",
//                 path: "/admin/support"
//               }
//             ].map((btn, i) => (
//               <button
//                 key={i}
//                 onClick={() => navigate(btn.path)}
//                 className={`relative bg-linear-to-br ${btn.color} text-white p-8 rounded-3xl shadow-2xl hover:shadow-4xl transform hover:-translate-y-3 transition-all duration-500 cursor-pointer group overflow-hidden`}
//               >
//                 {/* Hover Effect Background */}
//                 <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                 {/* Content */}
//                 <div className="relative z-10 text-center">
//                   <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
//                     <span className="text-3xl">{btn.icon}</span>
//                   </div>
//                   <h3 className="text-xl font-bold mb-2 tracking-wide">{btn.label}</h3>
//                   <p className="text-white/80 text-sm font-medium">{btn.subtitle}</p>
//                 </div>

//                 {/* Shine Effect */}
//                 <div className="absolute top-0 left-0 w-full h-1 bg-white/30 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Recent Activity Section */}
//         {/* <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
//           <h3 className="text-2xl font-black text-gray-900 mb-6">Recent Activity</h3>
//           <div className="space-y-4">
//             {[
//               { action: "New student enrolled", time: "2 minutes ago", type: "success" },
//               { action: "Module 'React Basics' updated", time: "1 hour ago", type: "info" },
//               { action: "Quiz results submitted", time: "3 hours ago", type: "warning" }
//             ].map((activity, i) => (
//               <div key={i} className="flex items-center space-x-4 p-4 bg-white/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
//                 <div className={`w-3 h-3 rounded-full ${activity.type === 'success' ? 'bg-emerald-500' :
//                   activity.type === 'info' ? 'bg-blue-500' : 'bg-amber-500'
//                   }`}></div>
//                 <div className="flex-1">
//                   <p className="font-semibold text-gray-800">{activity.action}</p>
//                   <p className="text-sm text-gray-600">{activity.time}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div> */}



//         {/* Recent Activity Section - Compact & Attractive */}
//         <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/60">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//               <div className="w-2 h-2 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"></div>
//               Recent Activity
//             </h3>
//             <span className="text-xs font-medium px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
//               Live
//             </span>
//           </div>

//           <div className="space-y-3">
//             {[
//               { action: "New student enrolled", time: "2m ago", type: "success", icon: "👤" },
//               { action: "Module 'React Basics' updated", time: "1h ago", type: "info", icon: "📚" },
//               { action: "Quiz results submitted", time: "3h ago", type: "warning", icon: "📝" }
//             ].map((activity, i) => (
//               <div
//                 key={i}
//                 className="flex items-center gap-3 p-3 bg-linear-to-r from-white to-gray-50/80 rounded-xl border border-gray-100/80 hover:border-indigo-200/60 hover:shadow-sm transition-all duration-200 group"
//               >
//                 <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${activity.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
//                     activity.type === 'info' ? 'bg-blue-100 text-blue-600' :
//                       'bg-amber-100 text-amber-600'
//                   }`}>
//                   <span className="text-sm">{activity.icon}</span>
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-gray-800 text-sm truncate group-hover:text-gray-900">
//                     {activity.action}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
//                 </div>

//                 <div className={`w-2 h-2 rounded-full ${activity.type === 'success' ? 'bg-emerald-400' :
//                     activity.type === 'info' ? 'bg-blue-400' :
//                       'bg-amber-400'
//                   }`}></div>
//               </div>
//             ))}
//           </div>

//           {/* <div className="mt-4 pt-3 border-t border-gray-200/60">
//     <button className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
//       View All Activity →
//     </button>
//   </div> */}
//         </div>



//       </div>
//     </div>
//   );
// }

//===================stylish deepseek 2 with mobile and desktop both======

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import api from "../api/axios";
// import { toast } from "react-toastify";
// import { FiMenu, FiX, FiLogOut, FiHome, FiUser, FiUsers, FiBook, FiFileText, FiBarChart2, FiSettings, FiHelpCircle } from "react-icons/fi";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const logout = useAuth((s) => s.logout);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [stats, setStats] = useState({
//     students: 0,
//     modules: 0,
//     lessons: 0
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const [studentsRes, modulesRes] = await Promise.all([
//           api.get("/admin/students"),
//           api.get("/modules")
//         ]);

//         const studentsCount = studentsRes.data.students?.length || studentsRes.data.length || 0;
//         const modulesData = modulesRes.data.modules || modulesRes.data || [];
//         const modulesCount = modulesData.length;
//         const lessonsCount = modulesData.reduce(
//           (acc, mod) => acc + (mod.materials?.length || 0),
//           0
//         );

//         setStats({
//           students: studentsCount,
//           modules: modulesCount,
//           lessons: lessonsCount
//         });
//       } catch (err) {
//         console.error("Error fetching dashboard stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchStats();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     toast.success("You have successfully logged out!");
//     setTimeout(() => navigate("/", { replace: true }), 1200);
//   };

//   const navigationItems = [
//     { label: "Dashboard", icon: <FiHome size={20} />, path: "/admin" },
//     { label: "Add Student", icon: <FiUser size={20} />, path: "/admin/add-student" },
//     { label: "Student List", icon: <FiUsers size={20} />, path: "/admin/students" },
//     { label: "Add Module", icon: <FiBook size={20} />, path: "/admin/add-module" },
//     { label: "Module List", icon: <FiBook size={20} />, path: "/admin/modules" },
//     { label: "Add Quiz", icon: <FiFileText size={20} />, path: "/admin/quiz" },
//     { label: "Assignment & Progress", icon: <FiBarChart2 size={20} />, path: "/admin/assignment-progress" }
//   ];

//   const quickActions = [
//     {
//       label: "Add New Student",
//       subtitle: "Enroll new learners",
//       color: "from-blue-500 to-blue-700",
//       icon: "👤",
//       path: "/admin/add-student"
//     },
//     {
//       label: "Create Module",
//       subtitle: "Add learning content",
//       color: "from-emerald-500 to-emerald-700",
//       icon: "📘",
//       path: "/admin/add-module"
//     },
//     {
//       label: "View Students",
//       subtitle: "Manage enrolled users",
//       color: "from-purple-500 to-purple-700",
//       icon: "👥",
//       path: "/admin/students"
//     },
//     {
//       label: "View Modules",
//       subtitle: "Browse all courses",
//       color: "from-indigo-500 to-indigo-700",
//       icon: "📚",
//       path: "/admin/modules"
//     },
//     {
//       label: "Create Quiz",
//       subtitle: "Add assessments",
//       color: "from-rose-500 to-rose-700",
//       icon: "📝",
//       path: "/admin/quiz"
//     },
//     {
//       label: "Assignment & Progress",
//       subtitle: "Track submissions",
//       color: "from-purple-500 to-blue-500",
//       icon: "📊",
//       path: "/admin/assignment-progress"
//     },
//     {
//       label: "Analytics",
//       subtitle: "View reports",
//       color: "from-amber-500 to-amber-700",
//       icon: "📈",
//       path: "/admin/analytics"
//     },
//     {
//       label: "Settings",
//       subtitle: "Platform configuration",
//       color: "from-gray-500 to-gray-700",
//       icon: "⚙️",
//       path: "/admin/settings"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50/30 flex">
//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Enhanced Sidebar */}
//       <div className={`
//         fixed lg:static inset-y-0 left-0 z-50
//         w-80 bg-white/95 backdrop-blur-2xl shadow-2xl p-6 space-y-8 border-r border-gray-100/50
//         transform transition-transform duration-300 ease-in-out
//         ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//       `}>
//         {/* Header with Close Button */}
//         <div className="flex items-center justify-between">
//           <div 
//             className="flex items-center space-x-3 cursor-pointer flex-1" 
//             onClick={() => {
//               navigate("/admin");
//               setSidebarOpen(false);
//             }}
//           >
//             <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
//               <span className="text-white font-bold text-lg">LS</span>
//             </div>
//             <div>
//               <h2 className="text-2xl font-black text-gray-900 tracking-tight">LearnStep</h2>
//               <p className="text-xs text-gray-500 font-medium">Learning Management</p>
//             </div>
//           </div>
          
//           {/* Close Button for Mobile */}
//           <button 
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             <FiX size={24} className="text-gray-600" />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="space-y-2">
//           {navigationItems.map((item) => (
//             <button
//               key={item.path}
//               onClick={() => {
//                 navigate(item.path);
//                 setSidebarOpen(false);
//               }}
//               className="cursor-pointer w-full flex items-center space-x-4 text-left p-4 rounded-2xl bg-white/50 hover:bg-blue-50/80 border border-transparent hover:border-blue-200/50 shadow-sm hover:shadow-lg transition-all duration-300 font-semibold text-gray-700 hover:text-blue-700 group"
//             >
//               {item.icon}
//               <span>{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="cursor-pointer w-full flex items-center justify-center space-x-2 bg-linear-to-r from-red-500 to-red-600 text-white py-4 rounded-2xl hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold tracking-wide mt-auto"
//         >
//           <FiLogOut size={20} />
//           <span>Logout</span>
//         </button>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 min-w-0">
//         {/* Mobile Header */}
//         <div className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 p-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="cursor-pointer p-2 rounded-lg bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
//             >
//               <FiMenu size={24} className="text-gray-700" />
//             </button>
            
//             <div className="flex items-center space-x-3">
//               <div className="text-right">
//                 <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
//                 <p className="text-xs text-gray-600">Welcome back</p>
//               </div>
//               <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
//                 <span className="text-white text-lg">👨‍💼</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-4 lg:p-8">
//           {/* Desktop Header */}
//           <div className="hidden lg:flex items-center justify-between mb-8 lg:mb-12">
//             <div>
//               <h1 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight mb-2">
//                 Admin Dashboard
//               </h1>
//               <p className="text-gray-600 text-base lg:text-lg font-medium">
//                 Welcome back! Manage your learning platform efficiently.
//               </p>
//             </div>
//             <div className="w-12 h-12 lg:w-14 lg:h-14 bg-linear-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
//               <span className="text-white text-xl lg:text-2xl">👨‍💼</span>
//             </div>
//           </div>

//           {/* Enhanced Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-16">
//             {[
//               {
//                 label: "Total Students",
//                 value: stats.students,
//                 color: "from-blue-500 to-blue-700",
//                 icon: "👨‍🎓",
//                 bg: "bg-blue-50/50"
//               },
//               {
//                 label: "Total Modules",
//                 value: stats.modules,
//                 color: "from-emerald-500 to-emerald-700",
//                 icon: "📚",
//                 bg: "bg-emerald-50/50"
//               },
//               {
//                 label: "Total Lessons",
//                 value: stats.lessons,
//                 color: "from-violet-500 to-violet-700",
//                 icon: "📖",
//                 bg: "bg-violet-50/50"
//               }
//             ].map((stat, i) => (
//               <div
//                 key={i}
//                 className={`relative p-4 lg:p-6 rounded-2xl lg:rounded-3xl ${stat.bg} backdrop-blur-sm border border-white/50 shadow-lg lg:shadow-2xl hover:shadow-xl lg:hover:shadow-3xl transform hover:-translate-y-1 lg:hover:-translate-y-2 transition-all duration-500 group overflow-hidden`}
//               >
//                 {/* Background Pattern */}
//                 <div className="absolute top-0 right-0 w-20 h-20 lg:w-32 lg:h-32 bg-linear-to-br from-white/20 to-transparent rounded-full -translate-y-8 lg:-translate-y-16 translate-x-8 lg:translate-x-16"></div>

//                 <div className="relative z-10">
//                   <div className="flex items-center justify-between mb-4 lg:mb-6">
//                     <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/80 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 lg:group-hover:scale-110 transition-transform duration-300">
//                       <span className="text-lg lg:text-2xl">{stat.icon}</span>
//                     </div>
//                     <div className="text-right">
//                       <h3 className="text-sm lg:text-lg font-semibold text-gray-600 mb-1">{stat.label}</h3>
//                       <p className={`text-3xl lg:text-5xl font-black bg-linear-to-r ${stat.color} bg-clip-text text-transparent`}>
//                         {loading ? (
//                           <div className="inline-block w-6 h-6 lg:w-8 lg:h-8 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
//                         ) : (
//                           stat.value
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="w-full bg-white/50 rounded-full h-1.5 lg:h-2 overflow-hidden">
//                     <div
//                       className={`h-full bg-linear-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out`}
//                       style={{ width: loading ? '0%' : '100%' }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Enhanced Quick Actions */}
//           <div className="mb-6 lg:mb-8">
//             <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">Quick Actions</h2>
//             <p className="text-gray-600 font-medium mb-4 lg:mb-8">Manage your platform with one click</p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
//               {quickActions.map((btn, i) => (
//                 <button
//                   key={i}
//                   onClick={() => navigate(btn.path)}
//                   className={`relative bg-linear-to-br ${btn.color} text-white p-4 lg:p-6 rounded-2xl lg:rounded-3xl shadow-lg lg:shadow-2xl hover:shadow-xl lg:hover:shadow-3xl transform hover:-translate-y-1 lg:hover:-translate-y-2 transition-all duration-500 cursor-pointer group overflow-hidden min-h-[120px] lg:min-h-[160px]`}
//                 >
//                   {/* Hover Effect Background */}
//                   <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                   {/* Content */}
//                   <div className="relative z-10 text-center h-full flex flex-col justify-center">
//                     <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-105 lg:group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
//                       <span className="text-xl lg:text-2xl">{btn.icon}</span>
//                     </div>
//                     <h3 className="text-sm lg:text-base font-bold mb-1 lg:mb-2 tracking-wide leading-tight">{btn.label}</h3>
//                     <p className="text-white/80 text-xs lg:text-sm font-medium">{btn.subtitle}</p>
//                   </div>

//                   {/* Shine Effect */}
//                   <div className="absolute top-0 left-0 w-full h-1 bg-white/30 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Recent Activity Section - Compact & Attractive */}
//           <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 lg:p-6 shadow-xl border border-white/60">
//             <div className="flex items-center justify-between mb-4 lg:mb-6">
//               <h3 className="text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-2">
//                 <div className="w-2 h-2 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"></div>
//                 Recent Activity
//               </h3>
//               <span className="text-xs font-medium px-2 lg:px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
//                 Live
//               </span>
//             </div>

//             <div className="space-y-2 lg:space-y-3">
//               {[
//                 { action: "New student enrolled", time: "2m ago", type: "success", icon: "👤" },
//                 { action: "Module 'React Basics' updated", time: "1h ago", type: "info", icon: "📚" },
//                 { action: "Quiz results submitted", time: "3h ago", type: "warning", icon: "📝" }
//               ].map((activity, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-3 p-3 bg-linear-to-r from-white to-gray-50/80 rounded-xl border border-gray-100/80 hover:border-indigo-200/60 hover:shadow-sm transition-all duration-200 group"
//                 >
//                   <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
//                     activity.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
//                     activity.type === 'info' ? 'bg-blue-100 text-blue-600' : 
//                     'bg-amber-100 text-amber-600'
//                   }`}>
//                     <span className="text-sm">{activity.icon}</span>
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-gray-800 text-sm truncate group-hover:text-gray-900">
//                       {activity.action}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
//                   </div>

//                   <div className={`w-2 h-2 rounded-full ${
//                     activity.type === 'success' ? 'bg-emerald-400' :
//                     activity.type === 'info' ? 'bg-blue-400' : 
//                     'bg-amber-400'
//                   }`}></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//================kp correct===============
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import api from "../api/axios";
// import { FiMenu, FiX, FiLogOut, FiUsers, FiBook, FiFileText, FiBarChart2 } from "react-icons/fi";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const logout = useAuth(s => s.logout);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [stats, setStats] = useState({ students: 0, modules: 0, lessons: 0 });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [stdRes, modRes] = await Promise.all([
//           api.get("/admin/students"),
//           api.get("/modules")
//         ]);
//         const students = stdRes.data.students?.length || 0;
//         const modules = modRes.data?.length || 0;
//         const lessons = modRes.data?.reduce((a, m) => a + (m.materials?.length || 0), 0) || 0;

//         setStats({ students, modules, lessons });
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchStats();
//   }, []);

//   const menuItems = [
//     { label: "Add Student", icon: <FiUsers />, path: "/admin/add-student" },
//     { label: "Student List", icon: <FiUsers />, path: "/admin/students" },
//     { label: "Add Module", icon: <FiBook />, path: "/admin/add-module" },
//     { label: "Module List", icon: <FiBook />, path: "/admin/modules" },
//     { label: "Quiz Management", icon: <FiFileText />, path: "/admin/quiz" },
//     { label: "Assignments", icon: <FiBarChart2 />, path: "/admin/assignment-progress" },
//   ];

//   const quickCards = [
//     { title: "Students", value: stats.students, color: "blue", icon: "Students" },
//     { title: "Modules", value: stats.modules, color: "emerald", icon: "Modules" },
//     { title: "Lessons", value: stats.lessons, color: "purple", icon: "Lessons" },
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50">
//       {/* Sidebar */}
//       <div className={`fixed inset-y-0 left-0 w-72 bg-white shadow-2xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform z-50`}>
//         <div className="p-6">
//           <h1 className="text-3xl font-bold text-indigo-700">Admin Panel</h1>
//         </div>
//         <nav className="mt-10">
//           {menuItems.map(item => (
//             <button
//               key={item.path}
//               onClick={() => {
//                 navigate(item.path);
//                 setSidebarOpen(false);
//               }}
//               className="w-full text-left px-8 py-4 hover:bg-indigo-50 flex items-center gap-4 text-lg font-medium"
//             >
//               {item.icon}
//               {item.label}
//             </button>
//           ))}
//           <button
//             onClick={logout}
//             className="w-full text-left px-8 py-4 hover:bg-red-50 flex items-center gap-4 text-lg font-medium text-red-600 mt-auto"
//           >
//             <FiLogOut /> Logout
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="lg:ml-72 p-8">
//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="lg:hidden fixed top-4 left-4 z-40 bg-white p-3 rounded-xl shadow-lg"
//         >
//           <FiMenu size={24} />
//         </button>

//         <h1 className="text-5xl font-black text-center mb-12 bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
//           Welcome, Admin!
//         </h1>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//           {quickCards.map((card, i) => (
//             <div key={i} className={`bg-linear-to-br from-${card.color}-500 to-${card.color}-700} text-white p-8 rounded-3xl shadow-2xl`}>
//               <div className="text-6xl mb-4">{card.icon}</div>
//               <p className="text-5xl font-black">{card.value}</p>
//               <p className="text-xl mt-2 opacity-90">{card.title}</p>
//             </div>
//           ))}
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//           {menuItems.slice(0, 8).map((item, i) => (
//             <button
//               key={i}
//               onClick={() => navigate(item.path)}
//               className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all text-left"
//             >
//               <div className="text-4xl mb-4">{item.icon}</div>
//               <p className="font-bold text-lg">{item.label}</p>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

//===============stylkish====

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import api from "../api/axios";
// import { motion } from "framer-motion";
// import { 
//   FiMenu, FiX, FiLogOut, FiUsers, FiBookOpen, FiFileText, 
//   FiBarChart2, FiPlusCircle, FiTrendingUp, FiAward, FiGlobe 
// } from "react-icons/fi";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const logout = useAuth(s => s.logout);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [stats, setStats] = useState({ 
//     students: 0, 
//     modules: 0, 
//     lessons: 0,
//     activeToday: 0
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [stdRes, modRes] = await Promise.all([
//           api.get("/admin/students"),
//           api.get("/modules")
//         ]);

//         const students = stdRes.data.students?.length || 0;
//         const modules = modRes.data?.length || 0;
//         const lessons = modRes.data?.reduce((a, m) => a + (m.materials?.length || 0), 0) || 0;

//         setStats({ 
//           students, 
//           modules, 
//           lessons,
//           activeToday: Math.floor(students * 0.7)
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchStats();
//   }, []);

//   const menuItems = [
//     { label: "Add Student", icon: <FiUsers size={24} />, path: "/admin/add-student", color: "from-blue-500 to-cyan-600" },
//     { label: "Student List", icon: <FiUsers size={24} />, path: "/admin/students", color: "from-purple-500 to-pink-600" },
//     { label: "Add Module", icon: <FiBookOpen size={24} />, path: "/admin/add-module", color: "from-emerald-500 to-teal-600" },
//     { label: "Module List", icon: <FiBookOpen size={24} />, path: "/admin/modules", color: "from-amber-500 to-orange-600" },
//     { label: "Quiz Management", icon: <FiFileText size={24} />, path: "/admin/quiz", color: "from-rose-500 to-pink-600" },
//     { label: "Assignments", icon: <FiBarChart2 size={24} />, path: "/admin/assignment-progress", color: "from-indigo-500 to-purple-700" },
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
//       {/* Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
//         <div className="absolute top-40 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
//         <div className="absolute bottom-0 left-60 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
//       </div>

//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 bg-black/70 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
//       )}

//       {/* Sidebar */}
//       <motion.div
//         initial={false}
//         animate={{ x: sidebarOpen ? 0 : -300 }}
//         className="fixed inset-y-0 left-0 w-80 bg-black/40 backdrop-blur-2xl border-r border-white/10 z-50 lg:translate-x-0"
//       >
//         <div className="p-8">
//           <div className="flex items-center justify-between mb-12">
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
//                 <FiGlobe className="text-white text-3xl" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-black bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   LearnStep
//                 </h1>
//                 <p className="text-sm text-purple-300">Admin Portal</p>
//               </div>
//             </div>
//             <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
//               <FiX size={28} className="text-white/70 hover:text-white" />
//             </button>
//           </div>

//           <nav className="space-y-3">
//             {menuItems.map((item) => (
//               <motion.button
//                 key={item.path}
//                 whileHover={{ x: 10 }}
//                 onClick={() => {
//                   navigate(item.path);
//                   setSidebarOpen(false);
//                 }}
//                 className="w-full flex items-center gap-5 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
//               >
//                 <div className={`p-3 rounded-xl bg-linear-to-br ${item.color} shadow-lg group-hover:scale-110 transition-transform`}>
//                   {item.icon}
//                 </div>
//                 <span className="text-lg font-semibold">{item.label}</span>
//               </motion.button>
//             ))}
//           </nav>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             onClick={logout}
//             className="w-full mt-10 flex items-center justify-center gap-4 p-5 bg-linear-to-r from-rose-600 to-pink-600 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-rose-600/50"
//           >
//             <FiLogOut size={24} />
//             Logout
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Main Content */}
//       <div className="lg:ml-80 min-h-screen">
//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="fixed top-6 left-6 z-40 lg:hidden bg-white/20 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20"
//         >
//           <FiMenu size={28} className="text-white" />
//         </button>

//         <div className="p-8 lg:p-16">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center mb-16"
//           >
//             <h1 className="text-7xl font-black mb-6 bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
//               Welcome Back, Admin
//             </h1>
//             <p className="text-2xl text-purple-200 font-light">Manage your learning empire with power</p>
//           </motion.div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
//             {[
//               { label: "Total Students", value: stats.students, icon: "Students", gradient: "from-blue-500 to-cyan-600" },
//               { label: "Active Today", value: stats.activeToday, icon: "Online", gradient: "from-emerald-500 to-teal-600" },
//               { label: "Total Modules", value: stats.modules, icon: "Modules", gradient: "from-purple-500 to-pink-600" },
//               { label: "Total Lessons", value: stats.lessons, icon: "Lessons", gradient: "from-amber-500 to-orange-600" },
//             ].map((stat, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="relative group"
//               >
//                 <div className="absolute inset-0 bg-linear-to-r from-white/10 to-white/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
//                 <div className={`relative bg-linear-to-br ${stat.gradient} p-8 rounded-3xl shadow-2xl border border-white/20 overflow-hidden`}>
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
//                   <div className="relative z-10">
//                     <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-6 shadow-xl">
//                       <FiAward className="text-white text-4xl" />
//                     </div>
//                     <p className="text-6xl font-black mb-2">{stat.value}</p>
//                     <p className="text-xl text-white/90">{stat.label}</p>
//                   </div>
//                   <div className="absolute bottom-0 left-0 w-full h-2 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Quick Actions Grid */}
//           <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
//             {menuItems.map((item, i) => (
//               <motion.button
//                 key={i}
//                 whileHover={{ scale: 1.05, rotate: 2 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate(item.path)}
//                 className="relative group overflow-hidden rounded-3xl shadow-2xl"
//               >
//                 <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
//                 <div className="relative p-10 text-center">
//                   <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
//                     {item.icon}
//                   </div>
//                   <h3 className="text-2xl font-black mb-2">{item.label}</h3>
//                   <p className="text-white/80">Click to manage</p>
//                 </div>
//                 <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//               </motion.button>
//             ))}
//           </div>

//           {/* Footer */}
//           <div className="text-center mt-20">
//             <p className="text-purple-300 text-lg">
//               © 2025 <span className="font-bold text-white">LearnStep</span> • Next-Gen Learning Platform
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.4; }
//           50% { opacity: 0.6; }
//         }
//         .animate-pulse { animation: pulse 4s infinite; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>
//     </div>
//   );
// }
//=========stylish=====
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import api from "../api/axios";
// import { motion } from "framer-motion";
// import { 
//   FiMenu, FiX, FiLogOut, FiUsers, FiBookOpen, FiFileText, 
//   FiBarChart2, FiPlusCircle, FiTrendingUp, FiAward 
// } from "react-icons/fi";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const logout = useAuth(s => s.logout);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [stats, setStats] = useState({ 
//     students: 0, 
//     modules: 0, 
//     lessons: 0,
//     activeToday: 0
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [stdRes, modRes] = await Promise.all([
//           api.get("/admin/students"),
//           api.get("/modules")
//         ]);

//         const students = stdRes.data.students?.length || 0;
//         const modules = modRes.data?.length || 0;
//         const lessons = modRes.data?.reduce((a, m) => a + (m.materials?.length || 0), 0) || 0;

//         setStats({ 
//           students, 
//           modules, 
//           lessons,
//           activeToday: Math.floor(students * 0.7)
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchStats();
//   }, []);

//   const menuItems = [
//     { label: "Add Student", icon: <FiUsers size={22} />, path: "/admin/add-student", color: "from-blue-500 to-cyan-600" },
//     { label: "Student List", icon: <FiUsers size={22} />, path: "/admin/students", color: "from-purple-500 to-pink-600" },
//     { label: "Add Module", icon: <FiBookOpen size={22} />, path: "/admin/add-module", color: "from-emerald-500 to-teal-600" },
//     { label: "Module List", icon: <FiBookOpen size={22} />, path: "/admin/modules", color: "from-amber-500 to-orange-600" },
//     { label: "Quiz Management", icon: <FiFileText size={22} />, path: "/admin/quiz", color: "from-rose-500 to-pink-600" },
//     { label: "Assignments", icon: <FiBarChart2 size={22} />, path: "/admin/assignment-progress", color: "from-indigo-500 to-purple-700" },
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
//       {/* Animated Background */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-pulse"></div>
//         <div className="absolute top-40 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
//         <div className="absolute bottom-0 left-60 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
//       </div>

//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/70 z-40 lg:hidden" 
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar - Now Fully Fixed */}
//       <motion.div
//         initial={false}
//         animate={{ x: sidebarOpen ? 0 : -320 }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         className="fixed inset-y-0 left-0 w-80 bg-black/50 backdrop-blur-2xl border-r border-white/10 z-50 shadow-2xl"
//       >
//         <div className="p-6 h-full flex flex-col">
//           <div className="flex items-center justify-between mb-10">
//             <div className="flex items-center gap-3">
//               <div className="w-14 h-14 bg-linear-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl">
//                 <FiAward className="text-white text-3xl" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-black bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   LearnStep
//                 </h1>
//                 <p className="text-xs text-purple-300">Admin Portal</p>
//               </div>
//             </div>
//             <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
//               <FiX size={28} className="text-white/70 hover:text-white" />
//             </button>
//           </div>

//           <nav className="flex-1 space-y-2">
//             {menuItems.map((item) => (
//               <motion.button
//                 key={item.path}
//                 whileHover={{ x: 8 }}
//                 onClick={() => {
//                   navigate(item.path);
//                   setSidebarOpen(false);
//                 }}
//                 className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
//               >
//                 <div className={`p-3 rounded-xl bg-linear-to-br ${item.color} shadow-lg group-hover:scale-110 transition-transform`}>
//                   {item.icon}
//                 </div>
//                 <span className="font-semibold text-lg">{item.label}</span>
//               </motion.button>
//             ))}
//           </nav>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             onClick={logout}
//             className="mt-8 flex items-center justify-center gap-3 p-4 bg-linear-to-r from-rose-600 to-pink-600 rounded-2xl font-bold shadow-2xl hover:shadow-rose-600/50"
//           >
//             <FiLogOut size={22} />
//             Logout
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Main Content */}
//       <div className="lg:ml-80 min-h-screen">
//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="fixed top-6 left-6 z-40 lg:hidden bg-white/20 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20"
//         >
//           <FiMenu size={28} className="text-white" />
//         </button>

//         <div className="p-8 lg:p-12">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center mb-12"
//           >
//             <h1 className="text-6xl font-black mb-4 bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
//               Admin Dashboard
//             </h1>
//             <p className="text-xl text-purple-200">Welcome back! Manage your platform with style</p>
//           </motion.div>

//           {/* Compact Stats Cards */}
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//             {[
//               { label: "Students", value: stats.students, icon: FiUsers, gradient: "from-blue-500 to-cyan-600" },
//               { label: "Active", value: stats.activeToday, icon: FiTrendingUp, gradient: "from-emerald-500 to-teal-600" },
//               { label: "Modules", value: stats.modules, icon: FiBookOpen, gradient: "from-purple-500 to-pink-600" },
//               { label: "Lessons", value: stats.lessons, icon: FiFileText, gradient: "from-amber-500 to-orange-600" },
//             ].map((stat, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="relative group"
//               >
//                 <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all">
//                   <div className="flex items-center justify-between mb-4">
//                     <stat.icon className="text-4xl text-white/70" />
//                     <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${stat.gradient} shadow-lg`} />
//                   </div>
//                   <p className="text-4xl font-black">{stat.value}</p>
//                   <p className="text-white/70 mt-1">{stat.label}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Quick Action Cards - Smaller & Cleaner */}
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//             {menuItems.map((item, i) => (
//               <motion.button
//                 key={i}
//                 whileHover={{ scale: 1.08, y: -8 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate(item.path)}
//                 className="relative overflow-hidden rounded-3xl shadow-2xl group"
//               >
//                 <div className={`h-48 bg-linear-to-br ${item.color} p-8 flex flex-col items-center justify-center gap-4`}>
//                   <div className="p-5 bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl group-hover:scale-110 transition-transform">
//                     {item.icon}
//                   </div>
//                   <h3 className="text-xl font-bold">{item.label}</h3>
//                 </div>
//                 <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//               </motion.button>
//             ))}
//           </div>

//           {/* Footer */}
//           <div className="text-center mt-16">
//             <p className="text-purple-300 text-lg">
//               © 2025 <span className="font-bold text-white">LearnStep</span> • Premium LMS
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.4; }
//           50% { opacity: 0.6; }
//         }
//         .animate-pulse { animation: pulse 6s infinite; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>
//     </div>
//   );
// }

//=======
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import api from "../api/axios";
// import { motion } from "framer-motion";
// import { 
//   FiMenu, FiX, FiLogOut, FiUsers, FiBookOpen, 
//   FiFileText, FiBarChart2, FiTrendingUp, FiAward 
// } from "react-icons/fi";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const logout = useAuth(s => s.logout);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [stats, setStats] = useState({ 
//     students: 0, 
//     modules: 0, 
//     lessons: 0,
//     activeToday: 0
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [stdRes, modRes] = await Promise.all([
//           api.get("/admin/students"),
//           api.get("/modules")
//         ]);

//         const students = stdRes.data.students?.length || 0;
//         const modules = modRes.data?.length || 0;
//         const lessons = modRes.data?.reduce((a, m) => a + (m.materials?.length || 0), 0) || 0;

//         setStats({ 
//           students, 
//           modules, 
//           lessons,
//           activeToday: Math.floor(students * 0.7)
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchStats();
//   }, []);

//   const menuItems = [
//     { label: "Add Student", icon: <FiUsers size={22} />, path: "/admin/add-student", gradient: "from-blue-500 to-cyan-600" },
//     { label: "Student List", icon: <FiUsers size={22} />, path: "/admin/students", gradient: "from-purple-500 to-pink-600" },
//     { label: "Add Module", icon: <FiBookOpen size={22} />, path: "/admin/add-module", gradient: "from-emerald-500 to-teal-600" },
//     { label: "Module List", icon: <FiBookOpen size={22} />, path: "/admin/modules", gradient: "from-amber-500 to-orange-600" },
//     { label: "Quiz Management", icon: <FiFileText size={22} />, path: "/admin/quiz", gradient: "from-rose-500 to-pink-600" },
//     { label: "Assignments", icon: <FiBarChart2 size={22} />, path: "/admin/assignment-progress", gradient: "from-indigo-500 to-purple-700" },
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50 to-indigo-100">
//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* SIDEBAR - FULLY WORKING & STUNNING */}
//       <motion.div
//         initial={false}
//         animate={{ x: sidebarOpen ? 0 : -288 }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-50 lg:z-10 lg:translate-x-0"
//       >
//         <div className="h-full flex flex-col bg-linear-to-b from-indigo-700 via-purple-700 to-pink-700">
//           {/* Logo & Close Button */}
//           <div className="p-6 border-b border-white/20">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl">
//                   <FiAward className="text-white text-3xl" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-black text-white">LearnStep</h1>
//                   <p className="text-sm text-white/80">Admin Panel</p>
//                 </div>
//               </div>
//               <button 
//                 onClick={() => setSidebarOpen(false)}
//                 className="lg:hidden text-white/70 hover:text-white"
//               >
//                 <FiX size={28} />
//               </button>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-4 space-y-2">
//             {menuItems.map((item) => (
//               <motion.button
//                 key={item.path}
//                 whileHover={{ x: 8 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => {
//                   navigate(item.path);
//                   setSidebarOpen(false);
//                 }}
//                 className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all group"
//               >
//                 <div className={`p-3 rounded-xl bg-linear-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
//                   {item.icon}
//                 </div>
//                 <span className="text-white font-semibold text-lg">{item.label}</span>
//               </motion.button>
//             ))}
//           </nav>

//           {/* Logout */}
//           <div className="p-4 border-t border-white/20">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={logout}
//               className="w-full flex items-center justify-center gap-3 p-4 bg-linear-to-r from-rose-600 to-pink-600 rounded-2xl text-white font-bold shadow-xl hover:shadow-rose-600/50"
//             >
//               <FiLogOut size={22} />
//               Logout
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>

//       {/* MAIN CONTENT */}
//       <div className="lg:ml-72 min-h-screen">
//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="fixed top-6 left-6 z-40 lg:hidden bg-linear-to-r from-indigo-600 to-purple-600 p-4 rounded-2xl shadow-2xl"
//         >
//           <FiMenu size={28} className="text-white" />
//         </button>

//         <div className="p-8 lg:p-12">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center mb-16"
//           >
//             <h1 className="text-7xl font-black mb-4 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Admin Dashboard
//             </h1>
//             <p className="text-2xl text-gray-700">Welcome back! You're in control</p>
//           </motion.div>

//           {/* Compact Stats Cards */}
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//             {[
//               { label: "Total Students", value: stats.students, icon: FiUsers, color: "blue" },
//               { label: "Active Today", value: stats.activeToday, icon: FiTrendingUp, color: "emerald" },
//               { label: "Modules", value: stats.modules, icon: FiBookOpen, color: "purple" },
//               { label: "Lessons", value: stats.lessons, icon: FiFileText, color: "amber" },
//             ].map((stat, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 hover:shadow-3xl transition-shadow"
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <stat.icon className={`text-4xl text-${stat.color}-600`} />
//                   <div className={`w-12 h-12 rounded-2xl bg-linear-to-br from-${stat.color}-500 to-${stat.color}-700 shadow-lg`} />
//                 </div>
//                 <p className="text-4xl font-black text-gray-800">{stat.value}</p>
//                 <p className="text-lg text-gray-600 mt-2">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>

//           {/* Quick Action Cards */}
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
//             {menuItems.map((item, i) => (
//               <motion.button
//                 key={i}
//                 whileHover={{ scale: 1.05, y: -8 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate(item.path)}
//                 className="relative group overflow-hidden rounded-3xl shadow-2xl"
//               >
//                 <div className={`h-56 bg-linear-to-br ${item.gradient} p-8 flex flex-col items-center justify-center gap-5`}>
//                   <div className="p-6 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl group-hover:scale-110 transition-transform">
//                     {item.icon}
//                   </div>
//                   <h3 className="text-2xl font-bold text-white">{item.label}</h3>
//                 </div>
//                 <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//               </motion.button>
//             ))}
//           </div>

//           {/* Footer */}
//           <div className="text-center mt-20">
//             <p className="text-gray-600 text-lg">
//               © 2025 <span className="font-bold text-indigo-700">LearnStep</span> • Premium Learning Platform
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


//===================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import api from "../api/axios";
import { FiMenu, FiX, FiLogOut, FiUsers, FiBook, FiFileText, FiBarChart2,FiSettings,FiLifeBuoy,FiTrendingUp } from "react-icons/fi";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const logout = useAuth(s => s.logout);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ students: 0, modules: 0, lessons: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [stdRes, modRes] = await Promise.all([
          api.get("/admin/students"),
          api.get("/modules")
        ]);
        const students = stdRes.data.students?.length || 0;
        const modules = modRes.data?.length || 0;
        const lessons = modRes.data?.reduce((a, m) => a + (m.materials?.length || 0), 0) || 0;
        setStats({ students, modules, lessons });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const menuItems = [
    { label: "Add Student", icon: FiUsers, path: "/admin/add-student" },
    { label: "Student List", icon: FiUsers, path: "/admin/students" },
    { label: "Student Enrollment", icon: FiBarChart2, path: "/admin/enrollment" },

    { label: "Add Module", icon: FiBook, path: "/admin/add-module" },
    { label: "Module List", icon: FiBook, path: "/admin/modules" },
    { label: "Quiz Management", icon: FiFileText, path: "/admin/quiz" },
    { label: "Assignment & Progress", icon: FiTrendingUp, path: "/admin/assignment-progress" },

    // { label: "Student Enrollment", icon: FiBarChart2, path: "/admin/enrollment" },
    { label: "Final Exam", icon: FiBarChart2, path: "/admin/final-exam" },

    { label: "Settings", icon: FiSettings, path: "/admin/settings" },
    // { label: "Analytics", icon: FiBarChart2, path: "/admin/analytics" },
    // { label: "Support", icon: FiLifeBuoy, path: "/admin/support" },

  ];

  const quickCards = [
    { title: "Students", value: stats.students, color: "blue", icon: FiUsers },
    { title: "Modules", value: stats.modules, color: "emerald", icon: FiBook },
    { title: "Lessons", value: stats.lessons, color: "purple", icon: FiFileText },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-white shadow-2xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-700">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-indigo-700"
          >
            <FiX size={24} />
          </button>
        </div>
        <nav className="mt-10">
          {menuItems.map(item => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className="cursor-pointer w-full text-left px-8 py-4 hover:bg-indigo-50 flex items-center gap-4 text-lg font-medium text-indigo-800 transition-colors duration-200"
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
          <button
            onClick={logout}
            className="cursor-pointer w-full text-left px-8 py-4 hover:bg-red-100 flex items-center gap-4 text-lg font-medium text-red-600 transition-colors duration-200 mt-auto"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-72 p-8 bg-amber-50">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-40 bg-white p-3 rounded-xl shadow-lg"
        >
          <FiMenu size={24} />
        </button>
        <h1 className="text-5xl font-black text-center mb-12 bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
          Welcome, Admin!
        </h1>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {quickCards.map((card, i) => (
            <div
              key={i}
              className={`bg-linear-to-br from-${card.color}-500 to-${card.color}-700 text-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 transform`}
            >
              <card.icon className="text-5xl mb-4 opacity-90" />
              <p className="text-5xl font-black">{card.value}</p>
              <p className="text-xl mt-2 opacity-90">{card.title}</p>
            </div>
          ))}
        </div>
        {/* Quick Actions */}
<h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-5 mb-5">
  Course Management Center
</h1>



        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
  {menuItems.slice(0, 10).map((item, i) => {
 const colors = [
  "from-pink-500 to-red-500",
  "from-indigo-500 to-purple-500",
  "from-green-400 to-emerald-500",
  "from-yellow-400 to-orange-500",
  "from-cyan-400 to-blue-500",
  "from-purple-400 to-pink-500",
  "from-rose-400 to-fuchsia-500",
  "from-lime-400 to-emerald-500",

  // ⭐ New Unique Colors
  "from-sky-400 to-blue-600",
  "from-amber-400 to-red-500"
];


    const gradient = colors[i % colors.length];

    return (
      <button
        key={i}
        onClick={() => navigate(item.path)}
        className={`relative overflow-hidden p-6 rounded-2xl shadow-xl flex flex-col items-start text-left cursor-pointer
                    transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-linear-to-br ${gradient}`}
      >
        {/* Icon */}
        <item.icon className="text-4xl mb-4 text-white" />
        {/* Label */}
        <p className="font-bold text-lg text-white">{item.label}</p>

        {/* Decorative Circle */}
        <div className="absolute -top-5 -right-5 w-16 h-16 bg-white opacity-10 rounded-full"></div>
      </button>
    );
  })}
</div>

      </div>
    </div>
  );
}




//================deepseek stylish========

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import api from "../api/axios";
// import { 
//   FiMenu, 
//   FiX, 
//   FiLogOut, 
//   FiUsers, 
//   FiBook, 
//   FiFileText, 
//   FiBarChart2,
//   FiChevronRight,
//   FiPlusCircle,
//   FiTrendingUp,
//   FiSettings
// } from "react-icons/fi";
// import { 
//   BsPeopleFill, 
//   BsBookFill, 
//   BsFileEarmarkTextFill,
//   BsGraphUp
// } from "react-icons/bs";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const logout = useAuth(s => s.logout);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [stats, setStats] = useState({ 
//     students: 0, 
//     modules: 0, 
//     lessons: 0, 
//     activeUsers: 0 
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const [stdRes, modRes] = await Promise.all([
//           api.get("/admin/students"),
//           api.get("/modules")
//         ]);
        
//         const students = stdRes.data.students?.length || 0;
//         const modules = modRes.data?.length || 0;
//         const lessons = modRes.data?.reduce((a, m) => a + (m.materials?.length || 0), 0) || 0;
//         const activeUsers = Math.floor(Math.random() * (students * 0.7)) + 1; // Mock data

//         setStats({ students, modules, lessons, activeUsers });
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   const menuItems = [
//     { label: "Add Student", icon: <FiUsers />, path: "/admin/add-student", color: "bg-blue-500" },
//     { label: "Student List", icon: <BsPeopleFill />, path: "/admin/students", color: "bg-indigo-500" },
//     { label: "Add Module", icon: <FiBook />, path: "/admin/add-module", color: "bg-emerald-500" },
//     { label: "Module List", icon: <BsBookFill />, path: "/admin/modules", color: "bg-teal-500" },
//     { label: "Quiz Management", icon: <FiFileText />, path: "/admin/quiz", color: "bg-purple-500" },
//     { label: "Assignments", icon: <FiBarChart2 />, path: "/admin/assignment-progress", color: "bg-amber-500" },
//     { label: "Analytics", icon: <BsGraphUp />, path: "/admin/analytics", color: "bg-pink-500" },
//     { label: "Settings", icon: <FiSettings />, path: "/admin/settings", color: "bg-gray-500" },
//   ];

//   const statCards = [
//     { 
//       title: "Total Students", 
//       value: stats.students, 
//       change: "+12.5%", 
//       icon: <BsPeopleFill className="text-white" />, 
//       color: "from-blue-500 to-blue-600",
//       bgColor: "bg-linear-to-br from-blue-500 to-blue-600",
//       iconBg: "bg-blue-400/20"
//     },
//     { 
//       title: "Learning Modules", 
//       value: stats.modules, 
//       change: "+3 new", 
//       icon: <BsBookFill className="text-white" />, 
//       color: "from-emerald-500 to-emerald-600",
//       bgColor: "bg-linear-to-br from-emerald-500 to-emerald-600",
//       iconBg: "bg-emerald-400/20"
//     },
//     { 
//       title: "Total Lessons", 
//       value: stats.lessons, 
//       change: "+24.8%", 
//       icon: <FiBook className="text-white" />, 
//       color: "from-purple-500 to-purple-600",
//       bgColor: "bg-linear-to-br from-purple-500 to-purple-600",
//       iconBg: "bg-purple-400/20"
//     },
//     { 
//       title: "Active Users", 
//       value: stats.activeUsers, 
//       change: "↗︎ 68%", 
//       icon: <FiTrendingUp className="text-white" />, 
//       color: "from-amber-500 to-amber-600",
//       bgColor: "bg-linear-to-br from-amber-500 to-amber-600",
//       iconBg: "bg-amber-400/20"
//     },
//   ];

//   const recentActivities = [
//     { user: "John Doe", action: "completed Module 5", time: "5 min ago" },
//     { user: "Jane Smith", action: "submitted Quiz 3", time: "12 min ago" },
//     { user: "Robert Johnson", action: "started new course", time: "25 min ago" },
//     { user: "Sarah Wilson", action: "achieved 100% score", time: "1 hour ago" },
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30">
//       {/* Modern Sidebar */}
//       <aside className={`fixed inset-y-0 left-0 w-80 bg-white/90 backdrop-blur-xl border-r border-slate-200/70 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-all duration-500 ease-out z-50 shadow-2xl shadow-indigo-100/50`}>
//         <div className="p-8 border-b border-slate-200/70">
//           <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             EduAdmin
//           </h1>
//           <p className="text-slate-500 text-sm mt-2">Dashboard v2.0</p>
//         </div>
        
//         <nav className="p-6 space-y-2">
//           {menuItems.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 navigate(item.path);
//                 setSidebarOpen(false);
//               }}
//               className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50/80 transition-all duration-300 group hover:shadow-lg hover:scale-[1.02]"
//             >
//               <div className="flex items-center gap-4">
//                 <div className={`p-3 rounded-xl ${item.color} text-white shadow-lg`}>
//                   {item.icon}
//                 </div>
//                 <span className="font-medium text-slate-700 group-hover:text-indigo-600">
//                   {item.label}
//                 </span>
//               </div>
//               <FiChevronRight className="text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-transform" />
//             </button>
//           ))}
//         </nav>

//         <div className="absolute bottom-0 w-full p-6 border-t border-slate-200/70">
//           <button
//             onClick={logout}
//             className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-linear-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-xl hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-red-200"
//           >
//             <FiLogOut />
//             Logout Session
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="lg:ml-80 p-6 lg:p-8">
//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="lg:hidden fixed top-6 left-6 z-40 p-3 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-2xl shadow-purple-500/30 backdrop-blur-sm"
//         >
//           <FiMenu size={24} />
//         </button>

//         {/* Overlay for mobile sidebar */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Header */}
//         <header className="mb-10">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//             <div>
//               <h1 className="text-4xl lg:text-5xl font-black bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
//                 Welcome back, Admin!
//               </h1>
//               <p className="text-slate-500 mt-3">Here's what's happening with your platform today.</p>
//             </div>
//             <div className="mt-4 lg:mt-0">
//               <button className="px-6 py-3 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-3">
//                 <FiPlusCircle size={20} />
//                 Quick Actions
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Stats Grid */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-bold text-slate-800 mb-6">Platform Overview</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {statCards.map((card, index) => (
//               <div 
//                 key={index}
//                 className={`relative overflow-hidden rounded-3xl p-6 ${card.bgColor} text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1 group`}
//               >
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
//                 <div className="relative z-10">
//                   <div className="flex justify-between items-start mb-6">
//                     <div className={`p-4 rounded-2xl ${card.iconBg} backdrop-blur-sm`}>
//                       {card.icon}
//                     </div>
//                     <span className="text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
//                       {card.change}
//                     </span>
//                   </div>
//                   <p className="text-4xl font-bold mb-2">{loading ? "..." : card.value}</p>
//                   <p className="text-white/90">{card.title}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Quick Actions Grid */}
//           <section className="lg:col-span-2">
//             <h2 className="text-2xl font-bold text-slate-800 mb-6">Quick Actions</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
//               {menuItems.map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={() => navigate(item.path)}
//                   className="group bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 hover:border-slate-200"
//                 >
//                   <div className={`p-4 rounded-xl ${item.color} text-white mb-4 inline-block shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//                     {item.icon}
//                   </div>
//                   <p className="font-semibold text-slate-800 text-left group-hover:text-indigo-600">
//                     {item.label}
//                   </p>
//                   <p className="text-xs text-slate-500 mt-2 text-left">Click to navigate</p>
//                 </button>
//               ))}
//             </div>
//           </section>

//           {/* Recent Activity */}
//           <section className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
//             <h2 className="text-2xl font-bold text-slate-800 mb-6">Recent Activity</h2>
//             <div className="space-y-5">
//               {recentActivities.map((activity, index) => (
//                 <div key={index} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
//                   <div className="relative">
//                     <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
//                       <BsPeopleFill className="text-indigo-500" />
//                     </div>
//                     {index === 0 && (
//                       <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-medium text-slate-800">
//                       <span className="font-semibold">{activity.user}</span> {activity.action}
//                     </p>
//                     <p className="text-sm text-slate-500">{activity.time}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button className="w-full mt-6 py-3 rounded-xl border-2 border-dashed border-slate-300 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors">
//               View All Activity
//             </button>
//           </section>
//         </div>

//         {/* Bottom Stats */}
//         <div className="mt-12 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//             <div>
//               <h3 className="text-2xl font-bold text-slate-800">Need help?</h3>
//               <p className="text-slate-600 mt-2">Check our documentation or contact support</p>
//             </div>
//             <div className="flex gap-4">
//               <button className="px-6 py-3 rounded-2xl bg-white text-slate-800 font-medium hover:shadow-xl transition-shadow border border-slate-200">
//                 Documentation
//               </button>
//               <button className="px-6 py-3 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-xl hover:shadow-purple-500/30 transition-all">
//                 Contact Support
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
