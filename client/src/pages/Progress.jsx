//===========correct================

// import { useEffect, useState } from "react";
// import axios from "../api/axios";

// export default function AdminProgress() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("/admin/all-progress", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.success) {
//         setData(res.data.data);
//       } else {
//         console.log("Failed to fetch:", res.data.message);
//       }
//     } catch (err) {
//       console.error("Error fetching progress:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading)
//     return <p className="text-center mt-10 text-gray-600">Loading...</p>;

//   if (data.length === 0)
//     return <p className="text-center mt-10 text-gray-600">No students found.</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-5">All Students Progress</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         {data.map((s) => (
//           <div
//             key={s.studentId}
//             className="bg-white shadow p-4 rounded-md border"
//           >
//             <h2 className="font-bold text-lg">{s.name}</h2>
//             <p className="text-gray-600">{s.email}</p>

//             {/* Progress Bar */}
//             <div className="mt-3">
//               <div className="h-3 bg-gray-200 rounded-full">
//                 <div
//                   className="h-3 bg-green-500 rounded-full transition-all duration-500"
//                   style={{ width: `${s.progressPercentage}%` }}
//                 ></div>
//               </div>
//               <p className="text-sm mt-1">
//                 {s.progressPercentage}% completed
//               </p>
//             </div>

//             <p className="mt-2 text-sm">
//               Completed Modules: {s.completedModules.length}
//             </p>
//             <p className="text-sm">
//               Unlocked Module: {s.unlockedModule?.title || "None"}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


//===========stylish==grok=========

// src/pages/admin/AdminProgress.jsx


// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import api from "../api/axios";
// import { CheckCircle2, Lock, Unlock, User, Trophy } from "lucide-react";

// export default function AdminProgress() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAllProgress = async () => {
//       try {
//         const res = await api.get("/admin/all-progress");
//         if (res.data.success) {
//           setStudents(res.data.data);
//         } else {
//           setError("Failed to load student progress");
//         }
//       } catch (err) {
//         console.error("Error:", err);
//         setError("Failed to connect to server");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllProgress();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
//         <div className="text-2xl font-semibold text-indigo-600 animate-pulse">
//           Loading Student Progress...
//         </div>
//       </div>
//     );
//   }

//   if (error || students.length === 0) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-xl text-gray-700 mb-4">
//             {error || "No student progress found yet."}
//           </p>
//           <p className="text-sm text-gray-500">Students will appear here once they start learning.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Student Progress Overview
//           </h1>
//           <p className="text-xl text-gray-600 mt-4">
//             Monitor all students' learning journey in real-time
//           </p>
//         </motion.div>

//         {/* Stats Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
//           <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/50">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600">Total Students</p>
//                 <p className="text-4xl font-bold text-indigo-600">{students.length}</p>
//               </div>
//               <User className="w-12 h-12 text-indigo-500" />
//             </div>
//           </div>
//           <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/50">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600">Avg Progress</p>
//                 <p className="text-4xl font-bold text-emerald-600">
//                   {Math.round(students.reduce((a, s) => a + s.progressPercentage, 0) / students.length)}%
//                 </p>
//               </div>
//               <Trophy className="w-12 h-12 text-emerald-500" />
//             </div>
//           </div>
//         </div>

//         {/* Student Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {students.map((student, index) => (
//             <motion.div
//               key={student.studentId}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-300"
//             >
//               <div className="p-8">
//                 {/* Student Info */}
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
//                     {student.name.charAt(0).toUpperCase()}
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-800">{student.name}</h3>
//                     <p className="text-gray-600">{student.email || "No email"}</p>
//                   </div>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="mb-6">
//                   <div className="flex justify-between text-sm text-gray-600 mb-2">
//                     <span>Overall Progress</span>
//                     <span className="font-bold text-indigo-600">{student.progressPercentage}%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-12 overflow-hidden shadow-inner">
//                     <motion.div
//                       initial={{ width: 0 }}
//                       animate={{ width: `${student.progressPercentage}%` }}
//                       transition={{ duration: 1.5, ease: "easeOut" }}
//                       className="h-full bg-linear-to-r from-emerald-500 to-indigo-600 flex items-center justify-end pr-4 text-white font-bold text-lg"
//                     >
//                       {student.progressPercentage > 15 && `${student.progressPercentage}%`}
//                     </motion.div>
//                   </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div className="bg-emerald-50 rounded-xl p-4 text-center">
//                     <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
//                     <p className="font-semibold text-emerald-700">
//                       {student.completedModules.length} Completed
//                     </p>
//                   </div>
//                   <div className="bg-indigo-50 rounded-xl p-4 text-center">
//                     {student.unlockedModule ? (
//                       <>
//                         <Unlock className="w-8 h-8 text-indigo-600 mx-auto mb-1" />
//                         <p className="font-semibold text-indigo-700">
//                           {student.unlockedModule.title}
//                         </p>
//                       </>
//                     ) : (
//                       <>
//                         <Lock className="w-8 h-8 text-gray-500 mx-auto mb-1" />
//                         <p className="font-semibold text-gray-600">No unlock</p>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {/* Completion Badge */}
//                 {student.progressPercentage === 100 && (
//                   <div className="mt-6 text-center">
//                     <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold text-sm">
//                       Course Completed
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


//=================stylish===chat gpt====

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import api from "../api/axios";
// import { CheckCircle2, Lock, Unlock, User, Trophy } from "lucide-react";

// export default function AdminProgress() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAllProgress = async () => {
//       try {
//         const res = await api.get("/admin/all-progress");
//         if (res.data.success) {
//           setStudents(res.data.data);
//         } else {
//           setError("Failed to load student progress");
//         }
//       } catch (err) {
//         console.error("Error:", err);
//         setError("Failed to connect to server");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllProgress();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
//         <div className="text-2xl font-semibold text-indigo-600 animate-pulse">
//           Loading Student Progress...
//         </div>
//       </div>
//     );
//   }

//   if (error || students.length === 0) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-xl text-gray-700 mb-4">
//             {error || "No student progress found yet."}
//           </p>
//           <p className="text-sm text-gray-500">
//             Students will appear here once they start learning.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Calculate average progress
//   const avgProgress =
//     Math.round(students.reduce((acc, s) => acc + s.progressPercentage, 0) / students.length);

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Student Progress Overview
//           </h1>
//           <p className="text-xl text-gray-600 mt-4">
//             Monitor all students' learning journey in real-time
//           </p>
//         </motion.div>

//         {/* Summary Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
//           <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/50 hover:scale-105 transition-transform duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 font-medium">Total Students</p>
//                 <p className="text-4xl font-bold text-indigo-600">{students.length}</p>
//               </div>
//               <User className="w-12 h-12 text-indigo-500" />
//             </div>
//           </div>
//           <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/50 hover:scale-105 transition-transform duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 font-medium">Avg Progress</p>
//                 <p className="text-4xl font-bold text-emerald-600">{avgProgress}%</p>
//               </div>
//               <Trophy className="w-12 h-12 text-emerald-500" />
//             </div>
//           </div>
//         </div>

//         {/* Student Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {students.map((student, index) => (
//             <motion.div
//               key={student.studentId || student._id}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl hover:scale-105 transition-all duration-300"
//             >
//               <div className="p-8">

//                 {/* Student Info */}
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
//                     {student.name?.charAt(0).toUpperCase() || "S"}
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-800">{student.name}</h3>
//                     <p className="text-gray-500 text-sm">{student.email || "No email"}</p>
//                   </div>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="mb-6">
//                   <div className="flex justify-between text-sm text-gray-600 mb-2">
//                     <span>Overall Progress</span>
//                     <span className="font-bold text-indigo-600">{student.progressPercentage}%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-12 overflow-hidden shadow-inner">
//                     <motion.div
//                       initial={{ width: 0 }}
//                       animate={{ width: `${student.progressPercentage}%` }}
//                       transition={{ duration: 1.5, ease: "easeOut" }}
//                       className="h-full bg-linear-to-r from-emerald-500 to-indigo-600 flex items-center justify-end pr-4 text-white font-bold text-lg"
//                     >
//                       {student.progressPercentage > 15 && `${student.progressPercentage}%`}
//                     </motion.div>
//                   </div>
//                 </div>

//                 {/* Module Stats */}
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div className="bg-emerald-50 rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300">
//                     <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
//                     <p className="font-semibold text-emerald-700">
//                       {student.completedModules?.length || 0} Completed
//                     </p>
//                   </div>
//                   <div className="bg-indigo-50 rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300">
//                     {student.unlockedModule ? (
//                       <>
//                         <Unlock className="w-8 h-8 text-indigo-600 mx-auto mb-1" />
//                         <p className="font-semibold text-indigo-700">{student.unlockedModule.title}</p>
//                       </>
//                     ) : (
//                       <>
//                         <Lock className="w-8 h-8 text-gray-500 mx-auto mb-1" />
//                         <p className="font-semibold text-gray-600">No unlock</p>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {/* Completion Badge */}
//                 {student.progressPercentage === 100 && (
//                   <div className="mt-6 text-center">
//                     <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold text-sm shadow-md">
//                       Course Completed
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


//=============stylsih===deepseek==============

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import api from "../api/axios";
// import { CheckCircle2, Lock, Unlock, User, Trophy, BookOpen } from "lucide-react";

// export default function AdminProgress() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchAllProgress();
//   }, []);

//   const fetchAllProgress = async () => {
//     try {
//       const res = await api.get("/admin/all-progress");
//       if (res.data.success) {
//         setStudents(res.data.data);
//       } else {
//         setError("Failed to load student progress");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setError("Failed to connect to server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate statistics
//   const stats = {
//     totalStudents: students.length,
//     avgProgress: Math.round(
//       students.reduce((acc, s) => acc + s.progressPercentage, 0) / students.length
//     ),
//     completedCourses: students.filter(s => s.progressPercentage === 100).length,
//   };

//   if (loading) {
//     return <LoadingState />;
//   }

//   if (error || students.length === 0) {
//     return <ErrorState error={error} />;
//   }

//   return (
//     <div className="rounded-4xl min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header */}
//         <Header />
        
//         {/* Summary Stats */}
//         <StatsSection stats={stats} />
        
//         {/* Student Grid */}
//         <StudentGrid students={students} />
//       </div>
//     </div>
//   );
// }

// // Component Parts
// const LoadingState = () => (
//   <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center">
//     <div className="text-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//       <p className="text-lg font-medium text-gray-600">Loading Student Progress...</p>
//     </div>
//   </div>
// );

// const ErrorState = ({ error }) => (
//   <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center">
//     <div className="text-center max-w-md">
//       <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//       <h3 className="text-xl font-semibold text-gray-700 mb-2">
//         {error ? "Unable to Load Data" : "No Progress Data"}
//       </h3>
//       <p className="text-gray-500">
//         {error || "Students will appear here once they start their learning journey."}
//       </p>
//     </div>
//   </div>
// );

// const Header = () => (
//   <motion.div
//     initial={{ opacity: 0, y: -20 }}
//     animate={{ opacity: 1, y: 0 }}
//     className="text-center mb-12"
//   >
//     {/* <h1 className="text-4xl font-bold text-gray-900 mb-3">
//       Student Progress Dashboard
//     </h1> */}

//       <h1 className="text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600  bg-clip-text text-transparent mb-10 text-center"
//         >
//            Student Progress Management
//         </h1>
//     <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//       Monitor learning progress and course completion across all students
//     </p>
//   </motion.div>
// );

// const StatsSection = ({ stats }) => (
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//     <StatCard
//       icon={<User className="w-6 h-6" />}
//       label="Total Students"
//       value={stats.totalStudents}
//       color="blue"
//     />
//     <StatCard
//       icon={<Trophy className="w-6 h-6" />}
//       label="Average Progress"
//       value={`${stats.avgProgress}%`}
//       color="emerald"
//     />
//     <StatCard
//       icon={<CheckCircle2 className="w-6 h-6" />}
//       label="Course Completed"
//       value={stats.completedCourses}
//       color="green"
//     />
//   </div>
// );

// const StatCard = ({ icon, label, value, color }) => {
//   const colorClasses = {
//     blue: "bg-blue-50 text-blue-700 border-blue-200",
//     emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
//     green: "bg-green-50 text-green-700 border-green-200",
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className={`rounded-xl p-6 border-2 ${colorClasses[color]} backdrop-blur-sm`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium opacity-80">{label}</p>
//           <p className="text-3xl font-bold mt-1">{value}</p>
//         </div>
//         <div className={`p-3 rounded-lg ${colorClasses[color]} bg-opacity-50`}>
//           {icon}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const StudentGrid = ({ students }) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//     {students.map((student, index) => (
//       <StudentCard key={student.studentId || student._id} student={student} index={index} />
//     ))}
//   </div>
// );

// const StudentCard = ({ student, index }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay: index * 0.1 }}
//     className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
//   >
//     <div className="p-6">
      
//       {/* Student Header */}
//       <div className="flex items-center gap-4 mb-6">
//         <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
//           {student.name?.charAt(0).toUpperCase() || "S"}
//         </div>
//         <div className="flex-1 min-w-0">
//           <h3 className="text-lg font-semibold text-gray-900 truncate">
//             {student.name}
//           </h3>
//           {/* <p className="text-sm text-gray-500 truncate">
//             {student.email || "No email provided"}
//           </p> */}
//           <p className="text-sm text-gray-500 truncate">
//            Username: {student.username || "No username provided"}
            
//           </p>
//         </div>
//       </div>

//       {/* Progress Section */}
//       <div className="mb-6">
//         <div className="flex justify-between text-sm text-gray-600 mb-2">
//           <span>Course Progress</span>
//           <span className="font-semibold">{student.progressPercentage}%</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: `${student.progressPercentage}%` }}
//             transition={{ duration: 1, ease: "easeOut" }}
//             className="h-full bg-linear-to-r from-blue-500 to-purple-600"
//           />
//         </div>
//       </div>

//       {/* Module Stats */}
//       <div className="grid grid-cols-2 gap-3 text-sm">
//         <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
//           <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto mb-1" />
//           <p className="font-medium text-green-700 text-xs">
//             {student.completedModules?.length || 0} Completed
//           </p>
//         </div>
//         <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
//           {student.unlockedModule ? (
//             <>
//               <Unlock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
//               <p className="font-medium text-blue-700 text-xs truncate">
//                 {student.unlockedModule.title}
//               </p>
//             </>
//           ) : (
//             <>
//               <Lock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
//               <p className="font-medium text-gray-500 text-xs">Locked</p>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Completion Badge */}
//       {student.progressPercentage === 100 && (
//         <div className="mt-4 text-center">
//           <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
//             <Trophy className="w-3 h-3" />
//             Course Completed
//           </span>
//         </div>
//       )}
//     </div>
//   </motion.div>
// );

//==============kp===============
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