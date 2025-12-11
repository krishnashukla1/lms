
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
