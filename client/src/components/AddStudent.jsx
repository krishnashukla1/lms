
// import { useState } from "react";
// import api from "../api/axios";
// import { Eye, EyeOff } from "lucide-react";

// export default function AddStudent() {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);


//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!name || !username || !password) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await api.post(
//         "/admin/add-student",
//         { name, username, password },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       alert(res.data.message || "Student added successfully!");

//       setName("");
//       setUsername("");
//       setPassword("");

//     } catch (err) {
//       console.error("ADD STUDENT ERROR:", err);
//       const msg =
//         err.response?.data?.message || "Failed to add student";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-10">

//         <button
//           onClick={() => (window.location.href = "http://localhost:5173/admin")}
//           className="mb-6 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition cursor-pointer"
//         >
//           ← Back to Admin Dashboard
//         </button>

//         <h1 className="text-3xl font-bold text-blue-600 text-center">
//           Add Student
//         </h1>

//         <p className="text-gray-500 text-center mt-1">
//           Create a student account below
//         </p>

//         <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

//           {/* Name */}
//           <div>
//             <label className="block mb-1 font-medium">Full Name</label>
//             <input
//               className="w-full p-3 rounded-lg border border-gray-300 
//                          focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
//               placeholder="Enter full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           {/* Username */}
//           <div>
//             <label className="block mb-1 font-medium">Username</label>
//             <input
//               className="w-full p-3 rounded-lg border border-gray-300
//                          focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
//               placeholder="Choose a unique username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           {/* Password */}

//           <div className="relative w-full max-w-md">
//             <label className="block mb-1 font-medium">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               className="w-full p-3 pr-12 rounded-lg border border-gray-300 
//                    focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               className="absolute top-3/4 right-3 -translate-y-1/2 text-gray-500 hover:text-blue-700 cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="
//               w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold
//               hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center cursor-pointer
//             "
//           >
//             {loading ? (
//               <span className="animate-pulse">Adding...</span>
//             ) : (
//               "➕ Add Student"
//             )}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

//===================stylish===============

// import { useState } from "react";
// import api from "../api/axios";
// import { Eye, EyeOff, ArrowLeft, UserPlus, User, Lock, Mail } from "lucide-react";

// export default function AddStudent() {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!name || !username || !password) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await api.post(
//         "/admin/add-student",
//         { name, username, password, email },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       alert(res.data.message || "Student added successfully!");

//       setName("");
//       setUsername("");
//       setPassword("");
//       setEmail("");

//     } catch (err) {
//       console.error("ADD STUDENT ERROR:", err);
//       const msg =
//         err.response?.data?.message || "Failed to add student";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6">
//       {/* Background Decorative Elements */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

//       <div className="relative w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">

//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-8">
//           <button
//             onClick={() => window.history.back()}
//             className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//           >
//             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Dashboard
//           </button>

//           <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
//             <UserPlus className="text-white" size={28} />
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="text-center mb-10">
//           <h1 className="text-5xl font-black bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
//             Add New Student
//           </h1>
//           <p className="text-gray-600 text-lg font-medium max-w-md mx-auto">
//             Create a new student account and empower their learning journey
//           </p>
//         </div>

//         <form className="space-y-8" onSubmit={handleSubmit}>

//           {/* Full Name Field */}
//           <div className="group">
//             <label className="block mb-3 font-semibold text-gray-700 text-lg">Full Name</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <User className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
//               </div>
//               <input
//                 className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 
//                          bg-white/60 backdrop-blur-sm
//                          focus:ring-4 focus:ring-blue-200 focus:border-blue-500 
//                          transition-all duration-300 placeholder-gray-400
//                          hover:border-gray-300 hover:bg-white/80
//                          text-lg font-medium cursor-text"
//                 placeholder="Enter student's full name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           {/* Username Field */}
//           <div className="group">
//             <label className="block mb-3 font-semibold text-gray-700 text-lg">Username</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <User className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
//               </div>
//               <input
//                 className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 
//                          bg-white/60 backdrop-blur-sm
//                          focus:ring-4 focus:ring-blue-200 focus:border-blue-500 
//                          transition-all duration-300 placeholder-gray-400
//                          hover:border-gray-300 hover:bg-white/80
//                          text-lg font-medium cursor-text"
//                 placeholder="Choose a unique username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           {/* Email Field */}
//           <div className="group">
//             <label className="block mb-3 font-semibold text-gray-700 text-lg">Email Address</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <Mail className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
//               </div>
//               <input
//                 type="email"
//                 className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 
//                          bg-white/60 backdrop-blur-sm
//                          focus:ring-4 focus:ring-blue-200 focus:border-blue-500 
//                          transition-all duration-300 placeholder-gray-400
//                          hover:border-gray-300 hover:bg-white/80
//                          text-lg font-medium cursor-text"
//                 placeholder="student@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div className="group">
//             <label className="block mb-3 font-semibold text-gray-700 text-lg">Password</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <Lock className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="w-full p-4 pl-12 pr-12 rounded-2xl border-2 border-gray-200 
//                          bg-white/60 backdrop-blur-sm
//                          focus:ring-4 focus:ring-blue-200 focus:border-blue-500 
//                          transition-all duration-300 placeholder-gray-400
//                          hover:border-gray-300 hover:bg-white/80
//                          text-lg font-medium cursor-text"
//                 placeholder="Create a secure password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-4 flex items-center 
//                          text-gray-400 hover:text-blue-600 transition-all duration-300
//                          hover:scale-110 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="
//               w-full bg-linear-to-r from-blue-600 to-indigo-700 
//               text-white py-5 rounded-2xl text-xl font-bold
//               hover:from-blue-700 hover:to-indigo-800 
//               transform hover:-translate-y-1 hover:shadow-2xl
//               transition-all duration-300 disabled:opacity-50 
//               disabled:transform-none disabled:hover:shadow-lg
//               flex items-center justify-center gap-3 cursor-pointer
//               border-2 border-transparent hover:border-blue-300/30
//               relative overflow-hidden group
//             "
//           >
//             {/* Shine effect */}
//             <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

//             {loading ? (
//               <>
//                 <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                 <span className="animate-pulse">Creating Account...</span>
//               </>
//             ) : (
//               <>
//                 <UserPlus className="group-hover:scale-110 transition-transform" size={24} />
//                 <span>Create Student Account</span>
//               </>
//             )}
//           </button>

//         </form>

//         {/* Additional Info */}
//         <div className="mt-10 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
//           <div className="flex items-start gap-4">
//             <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
//               <span className="text-blue-600 text-lg">💡</span>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2">Quick Tips</h3>
//               <ul className="text-sm text-gray-600 space-y-1">
//                 <li>• Use a strong, unique password for security</li>
//                 <li>• Usernames should be easy to remember</li>
//                 <li>• Students will receive login credentials via email</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 text-center">
//           <p className="text-gray-500 text-sm">
//             Need help? <a href="/admin/support" className="text-blue-600 hover:text-blue-700 font-semibold underline cursor-pointer">Contact Support</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

//==================kp=============

// import { useState } from "react";
// import api from "../api/axios";
// import { FiArrowLeft, FiUserPlus } from "react-icons/fi";

// export default function AddStudent() {
//   const [form, setForm] = useState({ name: "", username: "", password: "", email: "" });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.username || !form.password) return alert("Name, username, password required");

//     try {
//       setLoading(true);
//       await api.post("/admin/add-student", form);
//       alert("Student added!");
//       setForm({ name: "", username: "", password: "", email: "" });
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
//       <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
//         <button onClick={() => window.history.back()} className="flex items-center gap-2 text-blue-600 mb-6">
//           <FiArrowLeft /> Back
//         </button>
//         <h1 className="text-3xl font-bold text-center mb-8">Add New Student</h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full p-4 border rounded-lg" />
//           <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required className="w-full p-4 border rounded-lg" />
//           <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required className="w-full p-4 border rounded-lg" />
//           <input type="email" placeholder="Email (optional)" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full p-4 border rounded-lg" />

//           <button type="submit" disabled={loading} className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg hover:from-blue-700">
//             {loading ? "Adding..." : "Add Student"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
//====stylish===



// import { useState } from "react";
// import api from "../api/axios";
// import { FiArrowLeft, FiUserPlus, FiUser, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";


// export default function AddStudent() {
//   const [form, setForm] = useState({ name: "", username: "", password: "", email: "" });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//     const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.username || !form.password) {
//       alert("Name, username, and password are required!");
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post("/admin/add-student", form);
//       setSuccess(true);
//       setTimeout(() => {
//         setSuccess(false);
//         setForm({ name: "", username: "", password: "", email: "" });
//       }, 3000);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to add student");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center p-6 relative overflow-hidden">
//       {/* Background Decorative Blobs */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="relative z-10 w-full max-w-2xl"
//       >
//         {/* Main Card */}
//         <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
//           {/* Header */}
//           <div className="bg-linear-to-r from-blue-600 to-purple-700 p-10 text-center relative">
//             <div className="absolute inset-0 bg-black/20"></div>
//             <div className="relative z-10">
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 className="inline-block p-6 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 mb-6"
//               >
//                 <FiUserPlus className="text-white text-6xl" />
//               </motion.div>
//               <h1 className="text-5xl font-black text-white mb-3 tracking-tight">
//                 Add New Student
//               </h1>
//               <p className="text-xl text-blue-100 font-medium">
//                 Create account and start their learning journey
//               </p>
//             </div>
//           </div>

//           {/* Back Button */}
        
//           {/* <button
//   onClick={() => navigate(-1)}
//   className="absolute top-8 left-8 flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-x-1 hover:scale-105 font-semibold cursor-pointer"
// >
//   <FiArrowLeft className="w-5 h-5" />
//   <span>Back</span>
// </button> */}

//     <button
//             onClick={() => window.history.back()}
//             className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//           >
//             <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             Back to Dashboard
//           </button>



//           {/* <button
//       onClick={() => navigate("/admin")}
//       className="cursor-pointer absolute top-8 left-8 flex items-center gap-3 text-white hover:text-blue-200 font-semibold transition-all duration-300 group"
//     >
//       <FiArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
//       Back to Dashboard
//     </button> */}

//           {/* Form */}
//           <div className="p-10 pt-8">
//             {success && (
//               <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mb-8 p-6 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl flex items-center gap-4"
//               >
//                 <FiCheckCircle size={32} />
//                 <div>
//                   <p className="text-xl font-bold">Student Added Successfully!</p>
//                   <p className="opacity-90">They can now log in with their credentials</p>
//                 </div>
//               </motion.div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Full Name */}
//               <div className="group">
//                 <label className="flex items-center gap-3 text-gray-700 font-bold text-lg mb-3">
//                   <FiUser className="text-blue-600" />
//                   Full Name
//                 </label>
//                 <motion.input
//                   whileFocus={{ scale: 1.02 }}
//                   type="text"
//                   placeholder="John Doe"
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   className="w-full px-6 py-5 bg-linear-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-inner"
//                   required
//                 />
//               </div>

//               {/* Username */}
//               <div className="group">
//                 <label className="flex items-center gap-3 text-gray-700 font-bold text-lg mb-3">
//                   <FiUser className="text-purple-600" />
//                   Username
//                 </label>
//                 <motion.input
//                   whileFocus={{ scale: 1.02 }}
//                   type="text"
//                   placeholder="john_doe_2025"
//                   value={form.username}
//                   onChange={(e) => setForm({ ...form, username: e.target.value })}
//                   className="w-full px-6 py-5 bg-linear-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 shadow-inner"
//                   required
//                 />
//               </div>

//               {/* Email */}
//               <div className="group">
//                 <label className="flex items-center gap-3 text-gray-700 font-bold text-lg mb-3">
//                   <FiMail className="text-indigo-600" />
//                   Email Address (Optional)
//                 </label>
//                 <motion.input
//                   whileFocus={{ scale: 1.02 }}
//                   type="email"
//                   placeholder="john@example.com"
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   className="w-full px-6 py-5 bg-linear-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 shadow-inner"
//                 />
//               </div>

//               {/* Password */}
//               <div className="group">
//                 <label className="flex items-center gap-3 text-gray-700 font-bold text-lg mb-3">
//                   <FiLock className="text-rose-600" />
//                   Password
//                 </label>
//                 <motion.input
//                   whileFocus={{ scale: 1.02 }}
//                   type="password"
//                   placeholder="••••••••••••"
//                   value={form.password}
//                   onChange={(e) => setForm({ ...form, password: e.target.value })}
//                   className="w-full px-6 py-5 bg-linear-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 shadow-inner"
//                   required
//                 />
//               </div>

//               {/* Submit Button */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-linear-to-r from-blue-600 via-purple-600 to-indigo-700 text-white font-black text-2xl py-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
//               >
//                 <span className="relative z-10 flex items-center justify-center gap-4">
//                   {loading ? (
//                     <>
//                       <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Adding Student...
//                     </>
//                   ) : (
//                     <>
//                       <FiUserPlus size={32} />
//                       Add Student to Platform
//                     </>
//                   )}
//                 </span>
//                 <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//               </motion.button>
//             </form>

//             {/* Tips */}
//             <div className="mt-10 p-6 bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50">
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
//                   <span className="text-2xl">Tip</span>
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-800 mb-2">Quick Tips</h3>
//                   <ul className="text-sm text-gray-600 space-y-1">
//                     <li>• Username must be unique across the platform</li>
//                     <li>• Use strong passwords (8+ characters)</li>
//                     <li>• Students will use username to log in</li>
//                     <li>• Email is optional but recommended</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0%, 100% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 40px) scale(0.9); }
//         }
//         .animate-blob { animation: blob 20s infinite; }
//         .animation-delay-2000 { animation-delay: 2s; }
//       `}</style>
//     </div>
//   );
// }

//========================

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
                className="w-full bg-linear-to-r from-blue-600 via-purple-600 to-indigo-700 text-white font-bold text-xl py-5 rounded-2xl shadow-xl hover:shadow-2xl transition disabled:opacity-70"
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
