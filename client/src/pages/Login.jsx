
//====================correct fully for admin

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import { FiEye, FiEyeOff } from "react-icons/fi"; // Eye icons

// export default function Login() {
//   const navigate = useNavigate();
//   const login = useAuth((s) => s.login);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   async function handleLogin(e) {
//     e.preventDefault();
//     try {
//       const role = await login(email, password);
//       if (role === "admin") navigate("/admin");
//       else navigate("/student");
//     } catch (error) {
//       alert("Invalid login");
//     }
//   }

//   return (
//     <div className="h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-indigo-600">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-2xl shadow-2xl w-96 space-y-6"
//       >
//         <h1 className="text-3xl font-bold text-center text-blue-600">
//           LearnStep LMS
//         </h1>

//         {/* Email */}
//         <div>
//           <label className="block mb-1 font-semibold text-gray-700">Email</label>
//           <input
//             type="email"
//             className="w-full p-3 rounded-lg border border-gray-300
//                        focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         {/* Password with Eye Icon */}
//         <div className="relative">
//           <label className="block mb-1 font-semibold text-gray-700">Password</label>
//           <input
//             type={showPassword ? "text" : "password"}
//             className="w-full p-3 pr-12 rounded-lg border border-gray-300
//                        focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute top-3/4 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
//           >
//             {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//           </button>
//         </div>

//         {/* Login Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition cursor-pointer"
//         >
//           Login
//         </button>

//         {/* Optional: Forgot Password */}
//         {/* <p
//           className="text-right text-sm text-blue-600 hover:underline cursor-pointer"
//           onClick={() => alert("Forgot password clicked")}
//         >
//           Forgot Password?
//         </p> */}
//       </form>
//     </div>
//   );
// }

//====================student also correct

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

// export default function Login() {
//   const navigate = useNavigate();
//   const login = useAuth((s) => s.login);

//   const [usernameOrEmail, setUsernameOrEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const role = await login(usernameOrEmail, password);

//       if (role === "admin") navigate("/admin");
//       else if (role === "student") navigate("/student");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-indigo-600">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-2xl shadow-2xl w-96 space-y-6"
//       >
//         <h1 className="text-3xl font-bold text-center text-blue-600">LearnStep LMS</h1>

//         {/* Username / Email */}
//         <input
//           className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm hover:shadow-md transition cursor-pointer"
//           placeholder="Username or Email"
//           value={usernameOrEmail}
//           onChange={(e) => setUsernameOrEmail(e.target.value)}
//           required
//         />

//         {/* Password with Eye icon */}
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm hover:shadow-md transition cursor-pointer"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <span
//             className="absolute right-3 top-3 cursor-pointer text-gray-600"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? (
//               <EyeSlashIcon className="h-5 w-5" />
//             ) : (
//               <EyeIcon className="h-5 w-5" />
//             )}
//           </span>
//         </div>

//         <button className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition cursor-pointer shadow-lg hover:shadow-xl">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// =============stylish===

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import { EyeIcon, EyeSlashIcon, AcademicCapIcon } from "@heroicons/react/24/solid";

// export default function Login() {
//   const navigate = useNavigate();
//   const login = useAuth((s) => s.login);

//   const [usernameOrEmail, setUsernameOrEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const role = await login(usernameOrEmail, password);

//       if (role === "admin") navigate("/admin");
//       else if (role === "student") navigate("/student");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
//       </div>

//       {/* Main login card */}
//       <div className="relative z-10 w-full max-w-md mx-4">
//         <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//           {/* Header section */}
//           <div className="bg-linear-to-r from-blue-600 to-purple-600 p-8 text-center relative overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-cyan-400 to-blue-400"></div>
//             <div className="flex items-center justify-center space-x-3 mb-2">
//               <AcademicCapIcon className="h-8 w-8 text-white" />
//               <h1 className="text-3xl font-bold text-white tracking-tight">LearnStep LMS</h1>
//             </div>
//             <p className="text-blue-100 text-sm font-light">Welcome back! Please sign in to continue</p>
//           </div>

//           {/* Form section */}
//           <form onSubmit={handleLogin} className="p-8 space-y-6">
//             {/* Username/Email Field */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">
//                 Username or Email
//               </label>
//               <div className="relative group">
//                 <input
//                   className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 
//                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
//                     transition-all duration-300 group-hover:bg-white/10 backdrop-blur-sm
//                     shadow-lg cursor-text"
//                   placeholder="Enter your username or email"
//                   value={usernameOrEmail}
//                   onChange={(e) => setUsernameOrEmail(e.target.value)}
//                   required
//                 />
//                 <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">
//                 Password
//               </label>
//               <div className="relative group">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="w-full p-4 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 
//                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
//                     transition-all duration-300 group-hover:bg-white/10 backdrop-blur-sm
//                     shadow-lg cursor-text"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white 
//                     transition-colors duration-200 hover:bg-white/10 rounded-lg cursor-pointer"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeSlashIcon className="h-5 w-5" />
//                   ) : (
//                     <EyeIcon className="h-5 w-5" />
//                   )}
//                 </button>
//                 <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
//               </div>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl 
//                 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] 
//                 transition-all duration-300 shadow-lg hover:shadow-xl
//                 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
//                 font-semibold tracking-wide relative overflow-hidden group cursor-pointer"
//             >
//               <span className="relative z-10 flex items-center justify-center">
//                 {isLoading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                     Signing In...
//                   </>
//                 ) : (
//                   "Sign In"
//                 )}
//               </span>
//               <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//             </button>

//             {/* Additional Links */}
//             <div className="text-center pt-4">
//               <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
//                 Forgot your password?
//               </a>
//             </div>
//           </form>

//           {/* Footer */}
//           <div className="px-8 py-4 bg-black/20 border-t border-white/10">
//             <p className="text-center text-xs text-gray-400">
//               © 2024 LearnStep LMS. Secure access for authorized users only.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Custom styles for animations */}
//       <style jsx>{`
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// }


//==============MORE STYLISH==============

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import { EyeIcon, EyeSlashIcon, AcademicCapIcon } from "@heroicons/react/24/solid";

// export default function Login() {
//   const navigate = useNavigate();
//   const login = useAuth((s) => s.login);

//   const [usernameOrEmail, setUsernameOrEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
//   //   setIsLoading(true);

//   //   try {
//   //     const role = await login(usernameOrEmail, password);
//   //     if (role === "admin") navigate("/admin");
//   //     else if (role === "student") navigate("/student");
//   //   } catch (err) {
//   //     alert(err.message || "Invalid credentials");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const handleLogin = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);

//   try {
//     const role = await login(usernameOrEmail, password);

//     // Optional: double-check token was saved
//     // console.log("Token saved:", localStorage.getItem("adminToken"));
//     console.log("FINAL STORED TOKEN:", localStorage.getItem("token"));


//     if (role === "admin") navigate("/admin");
//     else if (role === "student") navigate("/student");
//   } catch (err) {
//     alert(err.message || "Invalid credentials");
//   } finally {
//     setIsLoading(false);
//   }
// };

//   return (
//     <div className=" min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-950">
//       {/* Dynamic Animated Background */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-linear-to-br from-violet-900/30 via-purple-900/20 to-blue-900/30" />

//         {/* Floating Orbs */}
//         <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-float" />
//         <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl animate-float animation-delay-2000" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float animation-delay-4000" />

//         {/* Particle dots */}
//         {[...Array(12)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-white/60 rounded-full animate-twinkle"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDelay: `${i * 0.5}s`,
//               animationDuration: `${3 + Math.random() * 4}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Main Login Card - Premium Glass + Depth */}
//       <div className="relative z-10 w-full max-w-md px-6">
//         <div className="relative bg-white/8 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden
//                         before:absolute before:inset-0 before:bg-linear-to-br before:from-white/10 before:to-transparent before:rounded-3xl before:pointer-events-none
//                         after:absolute after:-inset-1 after:bg-linear-to-r after:from-purple-600/30 after:via-pink-500/10 after:to-blue-600/30 after:blur-xl after:-z-10">

//           {/* Header */}
//           <div className="relative bg-linear-to-r from-purple-600/80 via-violet-600/90 to-indigo-600/80 p-10 text-center">
//             <div className="absolute inset-0 bg-black/20" />
//             <div className="relative z-10">
//               <div className="flex justify-center mb-4">
//                 <div className="mx-auto p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl border border-white/30">
//                   <AcademicCapIcon className="h-12 w-12 text-white" />
//                 </div>
//               </div>
//               <h1 className="text-4xl font-bold text-white tracking-tight">LearnStep</h1>
//               <p className="mt-2 text-purple-100 text-lg font-light">Learning Management System</p>
//               <p className="mt-3 text-purple-200/80 text-sm">Sign in to your account</p>
//             </div>

//             {/* Glow line */}
//             <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white/40 to-transparent" />
//           </div>

//           {/* Form */}
//           <form onSubmit={handleLogin} className="p-8 pt-10 space-y-7 ">
//             {/* Username/Email */}
//             <div className="relative group">
//               <label className="block text-sm font-semibold text-gray-300 mb-2 tracking-wider">
//                 USERNAME OR EMAIL
//               </label>
//               <input
//                 type="text"
//                 value={usernameOrEmail}
//                 onChange={(e) => setUsernameOrEmail(e.target.value)}
//                 className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400
//                            focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-400
//                            transition-all duration-300 backdrop-blur-xl shadow-inner
//                            group-hover:bg-white/15"
//                 placeholder="john.doe or john@example.com"
//                 required
//               />
//               <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity pointer-events-none -z-10" />
//             </div>

//             {/* Password */}
//             <div className="relative group">
//               <label className="block text-sm font-semibold text-gray-300 mb-2 tracking-wider">
//                 PASSWORD
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-5 py-4 pr-14 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400
//                              focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-400
//                              transition-all duration-300 backdrop-blur-xl shadow-inner
//                              group-hover:bg-white/15"
//                   placeholder="••••••••••••"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl text-gray-400 hover:text-white 
//                              hover:bg-white/10 transition-all duration-200"
//                 >
//                   {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button - Premium Style */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="cursor-pointer w-full relative group overflow-hidden bg-linear-to-r from-purple-600 to-indigo-600 text-white font-bold py-5 rounded-2xl
//                          shadow-2xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]
//                          disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
//                          before:absolute before:inset-0 before:bg-linear-to-r before:from-white/0 before:via-white/20 before:to-white/0 
//                          before:translate-x-[-200%] before:transition-transform before:duration-700 
//                          hover:before:translate-x-[200%]"
//             >
//               <span className="relative z-10 flex items-center justify-center text-lg tracking-wider">
//                 {isLoading ? (
//                   <>
//                     <svg className="w-6 h-6 mr-3 animate-spin" viewBox="0 0 24 24">
//                       <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3" />
//                       <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                     </svg>
//                     Signing In...
//                   </>
//                 ) : (
//                   "SIGN IN"
//                 )}
//               </span>
//             </button>

//             {/* Forgot Password */}
//             <div className="text-center pt-4">
//               <a href="#" className="text-sm text-gray-400 hover:text-purple-300 transition-colors duration-300 font-medium">
//                 Forgot your password?
//               </a>
//             </div>
//           </form>

//           {/* Footer */}
//           <div className="px-8 py-6 bg-black/30 border-t border-white/10">
//             <p className="text-center text-xs text-gray-500 font-light tracking-wider">
//               © 2025 LearnStep LMS • Secure • Modern • Future-Ready
//             </p>
//           </div>
//         </div>

//         {/* Subtle credit */}
//         <p className="text-center text-gray-600 text-xs mt-8 tracking-widest">
//           Designed with Passion
//         </p>
//       </div>

//       {/* Tailwind + Custom Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-30px) rotate(5deg); }
//         }
//         @keyframes twinkle {
//           0%, 100% { opacity: 0.3; transform: scale(0.5); }
//           50% { opacity: 1; transform: scale(1); }
//         }
//         .animate-float {
//           animation: float 12s ease-in-out infinite;
//         }
//         .animate-twinkle {
//           animation: twinkle 4s ease-in-out infinite;
//         }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>
//     </div>
//   );
// }

//===================stylsih 2=====correct=====

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import { EyeIcon, EyeSlashIcon, AcademicCapIcon } from "@heroicons/react/24/solid";

// export default function Login() {
//   const navigate = useNavigate();
//   const login = useAuth((s) => s.login);

//   const [usernameOrEmail, setUsernameOrEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const role = await login(usernameOrEmail, password);
//       if (role === "admin") navigate("/admin");
//       else if (role === "student") navigate("/student");
//     } catch (err) {
//       alert(err.message || "Invalid credentials");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-gray-950 via-purple-950 to-slate-950">
//       {/* Animated Background Orbs */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
//         <div className="absolute -top-20 right-0 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
//         <div className="absolute -bottom-32 left-60 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000" />
//       </div>

//       {/* Floating Particles */}
//       {[...Array(20)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute w-1 h-1 bg-white/70 rounded-full animate-twinkle"
//           style={{
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//             animationDelay: `${i * 0.3}s`,
//             animationDuration: `${4 + Math.random() * 6}s`,
//           }}
//         />
//       ))}

//       {/* Main Login Card - WIDER & MORE PREMIUM */}
//       <div className="relative z-10 w-full max-w-2xl px-8 py-12">
//         <div className="relative bg-white/5 backdrop-blur-3xl rounded-3xl shadow-4xl border border-white/10 overflow-hidden
//                         before:absolute before:inset-0 before:bg-linear-to-br before:from-white/10 before:via-transparent before:to-transparent before:rounded-3xl
//                         after:absolute after:inset-0 after:rounded-3xl after:bg-linear-to-r after:from-purple-600/20 after:via-pink-500/10 after:to-cyan-600/20 after:blur-3xl after:-z-10
//                         animate-border-glow">

//           {/* Header - Bigger & Bolder */}
//           <div className="relative bg-linear-to-r from-purple-700 via-violet-600 to-indigo-700 p-12 text-center">
//             <div className="absolute inset-0 bg-black/40" />
//             <div className="relative z-10">
//               <div className="flex justify-center mb-6">
//                 <div className="p-6 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 transform hover:scale-110 transition-transform duration-500">
//                   <AcademicCapIcon className="h-20 w-20 text-white drop-shadow-2xl" />
//                 </div>
//               </div>
//               <h1 className="text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl">
//                 Learn<span className="text-cyan-300">Step</span>
//               </h1>
//               <p className="mt-3 text-xl text-purple-100 font-light tracking-wider">
//                 Next-Gen Learning Management System
//               </p>
//               <p className="mt-4 text-purple-200/90 text-lg">Welcome back • Sign in to continue</p>
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r from-transparent via-white/50 to-transparent" />
//           </div>

//           {/* Form */}
//           <form onSubmit={handleLogin} className="p-12 pt-10 space-y-8">
//             {/* Username/Email */}
//             <div className="group">
//               <label className="block text-sm font-bold text-gray-200 mb-3 tracking-widest uppercase">
//                 Username or Email
//               </label>
//               <input
//                 type="text"
//                 value={usernameOrEmail}
//                 onChange={(e) => setUsernameOrEmail(e.target.value)}
//                 className="w-full px-6 py-5 bg-white/10 border border-white/20 rounded-2xl text-white text-lg placeholder-gray-500
//                            focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 focus:bg-white/15
//                            transition-all duration-500 backdrop-blur-xl shadow-2xl
//                            group-hover:bg-white/15"
//                 placeholder="john.doe • john@example.com"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="group">
//               <label className="block text-sm font-bold text-gray-200 mb-3 tracking-widest uppercase">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-6 py-5 pr-16 bg-white/10 border border-white/20 rounded-2xl text-white text-lg placeholder-gray-500
//                              focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 focus:bg-white/15
//                              transition-all duration-500 backdrop-blur-xl shadow-2xl
//                              group-hover:bg-white/15"
//                   placeholder="••••••••••••••••"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="cursor-pointer  absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl text-gray-400 hover:text-white 
//                              hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
//                 >
//                   {showPassword ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
//                 </button>
//               </div>
//             </div>

//             {/* Premium Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className=" cursor-pointer w-full relative group overflow-hidden bg-linear-to-r from-purple-600 via-violet-600 to-indigo-600 
//                          text-white font-bold text-xl py-6 rounded-2xl shadow-2xl
//                          transform transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]
//                          disabled:opacity-60 disabled:cursor-not-allowed
//                          before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-150%] 
//                          before:transition-transform before:duration-1000 
//                          hover:before:translate-x-[150%]"
//             >
//               <span className="relative z-10 flex items-center justify-center gap-4 tracking-widest">
//                 {isLoading ? (
//                   <>
//                     <svg className="w-7 h-7 animate-spin" viewBox="0 0 24 24">
//                       <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3" />
//                       <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                     </svg>
//                     Signing In...
//                   </>
//                 ) : (
//                   "SIGN IN TO DASHBOARD"
//                 )}
//               </span>
//             </button>

//             <div className="text-center pt-6">
//               <a href="#" className="text-gray-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-300">
//                 Forgot your password?
//               </a>
//             </div>
//           </form>

//           {/* Footer */}
//           <div className="px-12 py-8 bg-black/40 border-t border-white/10 text-center">
//             <p className="text-gray-400 text-sm tracking-widest">
//               © 2025 <span className="text-cyan-300 font-bold">LearnStep</span> • Secure • Modern • Built for the Future
//             </p>
//           </div>
//         </div>

//         {/* Tagline */}
//         <p className="text-center text-gray-500 text-sm mt-10 tracking-widest font-light">
//           Designed with Passion • Powered by Innovation
//         </p>
//       </div>

//       {/* Tailwind + Custom Animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0%, 100% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 40px) scale(0.9); }
//         }
//         @keyframes twinkle {
//           0%, 100% { opacity: 0.2; transform: scale(0.4); }
//           50% { opacity: 1; transform: scale(1.2); }
//         }
//         @keyframes border-glow {
//           0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
//           50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(139, 92, 246, 0.4); }
//         }
//         .animate-blob { animation: blob 20s infinite; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//         .animate-twinkle { animation: twinkle 5s infinite; }
//         .animate-border-glow { animation: border-glow 8s infinite ease-in-out; }
//       `}</style>
//     </div>
//   );
// }

//=========stylish 3======CORRECT=========

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom"; // <-- only one import of Link
// import { useAuth } from "../store/authStore";
// import { EyeIcon, EyeSlashIcon, AcademicCapIcon } from "@heroicons/react/24/solid";


// export default function Login() {
//   const navigate = useNavigate();
//   const login = useAuth((s) => s.login);
//   const [usernameOrEmail, setUsernameOrEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const role = await login(usernameOrEmail, password);
//       if (role === "admin") navigate("/admin");
//       else if (role === "student") navigate("/student");
//     } catch (err) {
//       alert(err.message || "Invalid credentials");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-gray-950 via-purple-950 to-slate-950">
//       {/* Animated Background Orbs */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
//         <div className="absolute -top-20 right-0 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
//         <div className="absolute -bottom-32 left-60 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000" />
//       </div>

//       {/* Floating Particles */}
//       {[...Array(20)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute w-1 h-1 bg-white/70 rounded-full animate-twinkle"
//           style={{
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//             animationDelay: `${i * 0.3}s`,
//             animationDuration: `${4 + Math.random() * 6}s`,
//           }}
//         />
//       ))}

//       {/* Main Login Card */}
//       <div className="relative z-10 w-full max-w-2xl px-8 py-12">
//         <div className="relative bg-white/5 backdrop-blur-3xl rounded-3xl shadow-4xl border border-white/10 overflow-hidden
//                         before:absolute before:inset-0 before:bg-linear-to-br before:from-white/10 before:via-transparent before:to-transparent before:rounded-3xl
//                         after:absolute after:inset-0 after:rounded-3xl after:bg-linear-to-r after:from-purple-600/20 after:via-pink-500/10 after:to-cyan-600/20 after:blur-3xl after:-z-10
//                         animate-border-glow">

//           {/* Header */}
//           <div className="relative bg-linear-to-r from-purple-700 via-violet-600 to-indigo-700 p-12 text-center">
//             <div className="absolute inset-0 bg-black/40" />
//             <div className="relative z-10">
//               <div className="flex justify-center mb-3">
//                 <div className="p-5 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 transform hover:scale-110 transition-transform duration-500">
//                   <AcademicCapIcon className="h-15 w-20 text-white drop-shadow-2xl" />
//                 </div>
//               </div>
//               <h1 className="text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl">
//                 Learn<span className="text-cyan-300">Step</span>
//               </h1>
//               <p className="mt-3 text-xl text-purple-100 font-light tracking-wider">
//                 Next-Gen Learning Management System
//               </p>
//               <p className="mt-2 text-purple-200/90 text-lg">Welcome back • Sign in to continue</p>
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r from-transparent via-white/50 to-transparent" />
//           </div>

//           {/* Form */}
//           <form onSubmit={handleLogin} className="p-5 pt-8 space-y-8">
//             {/* Username/Email */}
//             <div className="group">
//               <label className="block text-sm font-bold text-gray-200 mb-3 tracking-widest uppercase">
//                 Username or Email
//               </label>
//               <input
//                 type="text"
//                 value={usernameOrEmail}
//                 onChange={(e) => setUsernameOrEmail(e.target.value)}
//                 className="w-full px-6 py-5 bg-white/10 border border-white/20 rounded-2xl text-white text-lg placeholder-gray-500
//                            focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 focus:bg-white/15
//                            transition-all duration-500 backdrop-blur-xl shadow-2xl
//                            group-hover:bg-white/15"
//                 placeholder="john.doe • john@example.com"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="group">
//               <label className="block text-sm font-bold text-gray-200 mb-3 tracking-widest uppercase">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-6 py-5 pr-16 bg-white/10 border border-white/20 rounded-2xl text-white text-lg placeholder-gray-500
//                              focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 focus:bg-white/15
//                              transition-all duration-500 backdrop-blur-xl shadow-2xl
//                              group-hover:bg-white/15"
//                   placeholder="••••••••••••••••"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl text-gray-400 hover:text-white 
//                              hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
//                 >
//                   {showPassword ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="cursor-pointer w-full relative group overflow-hidden bg-linear-to-r from-purple-600 via-violet-600 to-indigo-600 
//                          text-white font-bold text-xl py-6 rounded-2xl shadow-2xl
//                          transform transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]
//                          disabled:opacity-60 disabled:cursor-not-allowed
//                          before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-150%] 
//                          before:transition-transform before:duration-1000 
//                          hover:before:translate-x-[150%]"
//             >
//               <span className="relative z-10 flex items-center justify-center gap-4 tracking-widest">
//                 {isLoading ? (
//                   <>
//                     <svg className="w-7 h-7 animate-spin" viewBox="0 0 24 24">
//                       <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3" />
//                       <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                     </svg>
//                     Signing In...
//                   </>
//                 ) : (
//                   "SIGN IN TO DASHBOARD"
//                 )}
//               </span>
//             </button>

//           </form>


      
//             <button
//               type="button" // prevents form submit
//               onClick={() => navigate("/query")}
//               className="relative z-20 cursor-pointer w-full inline-block px-2 py-3 
//                 hover:bg-cyan-500/30 text-cyan-300 font-semibold 
//                rounded-xl transition-all duration-300 
//                hover:scale-105"
//             >
//               Having Any Query? Click Here
//             </button>
    





//           {/* Footer */}
//           <div className="px-12 py-4 bg-black/40 border-t border-white/10 text-center">
//             <p className="text-gray-400 text-sm tracking-widest">
//               © 2025 <span className="text-cyan-300 font-bold">LearnStep</span> • Secure • Modern • Built for the Future
//             </p>
//           </div>
//         </div>

//         <p className="text-center text-gray-500 text-sm mt-5 tracking-widest font-light">
//           Designed with Passion • Powered by Innovation
//         </p>
//       </div>

//       {/* Tailwind + Custom Animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0%, 100% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 40px) scale(0.9); }
//         }
//         @keyframes twinkle {
//           0%, 100% { opacity: 0.2; transform: scale(0.4); }
//           50% { opacity: 1; transform: scale(1.2); }
//         }
//         @keyframes border-glow {
//           0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
//           50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(139, 92, 246, 0.4); }
//         }
//         .animate-blob { animation: blob 20s infinite; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//         .animate-twinkle { animation: twinkle 5s infinite; }
//         .animate-border-glow { animation: border-glow 8s infinite ease-in-out; }
//       `}</style>
//     </div>
//   );
// }

//==========kp============
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { EyeIcon, EyeSlashIcon, AcademicCapIcon } from "@heroicons/react/24/solid";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Calling login...");
      const role = await login(usernameOrEmail, password);
      console.log("Role returned:", role);

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "student") {
        navigate("/student");
      } else {
        console.log("Invalid role received:", role);
      }
    } catch (err) {
      console.log("Login error:", err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-gray-950 via-purple-950 to-slate-950">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute -top-20 right-0 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-60 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000" />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/70 rounded-full animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }}
        />
      ))}

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-2xl px-8 py-12">
        <div className="relative bg-white/5 backdrop-blur-3xl rounded-3xl shadow-4xl border border-white/10 overflow-hidden
                        before:absolute before:inset-0 before:bg-linear-to-br before:from-white/10 before:via-transparent before:to-transparent before:rounded-3xl
                        after:absolute after:inset-0 after:rounded-3xl after:bg-linear-to-r after:from-purple-600/20 after:via-pink-500/10 after:to-cyan-600/20 after:blur-3xl after:-z-10
                        animate-border-glow">

          {/* Header */}
          <div className="relative bg-linear-to-r from-purple-700 via-violet-600 to-indigo-700 p-12 text-center">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10">
              <div className="flex justify-center mb-3">
                <div className="p-5 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 transform hover:scale-110 transition-transform duration-500">
                  <AcademicCapIcon className="h-15 w-20 text-white drop-shadow-2xl" />
                </div>
              </div>
              <h1 className="text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl">
                Learn<span className="text-cyan-300">Step</span>
              </h1>
              <p className="mt-3 text-xl text-purple-100 font-light tracking-wider">
                Next-Gen Learning Management System
              </p>
              <p className="mt-2 text-purple-200/90 text-lg">Welcome back • Sign in to continue</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r from-transparent via-white/50 to-transparent" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-5 pt-8 space-y-8">
            {/* Username/Email */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-200 mb-3 tracking-widest uppercase">
                Username or Email
              </label>
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className="w-full px-6 py-5 bg-white/10 border border-white/20 rounded-2xl text-white text-lg placeholder-gray-500
                           focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 focus:bg-white/15
                           transition-all duration-500 backdrop-blur-xl shadow-2xl
                           group-hover:bg-white/15"
                placeholder="john.doe • john@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-200 mb-3 tracking-widest uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-5 pr-16 bg-white/10 border border-white/20 rounded-2xl text-white text-lg placeholder-gray-500
                             focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 focus:bg-white/15
                             transition-all duration-500 backdrop-blur-xl shadow-2xl
                             group-hover:bg-white/15"
                  placeholder="••••••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl text-gray-400 hover:text-white 
                             hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
                >
                  {showPassword ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full relative group overflow-hidden bg-linear-to-r from-purple-600 via-violet-600 to-indigo-600 
                         text-white font-bold text-xl py-6 rounded-2xl shadow-2xl
                         transform transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]
                         disabled:opacity-60 disabled:cursor-not-allowed
                         before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-150%] 
                         before:transition-transform before:duration-1000 
                         hover:before:translate-x-[150%]"
            >
              <span className="relative z-10 flex items-center justify-center gap-4 tracking-widest">
                {isLoading ? (
                  <>
                    <svg className="w-7 h-7 animate-spin" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing In...
                  </>
                ) : (
                  "SIGN IN TO DASHBOARD"
                )}
              </span>
            </button>

          </form>


      
            <button
              type="button" // prevents form submit
              onClick={() => navigate("/query")}
              className="relative z-20 cursor-pointer w-full inline-block px-2 py-3 
                hover:bg-cyan-500/30 text-cyan-300 font-semibold 
               rounded-xl transition-all duration-300 
               hover:scale-105"
            >
              Having Any Query? Click Here
            </button>
    





          {/* Footer */}
          <div className="px-12 py-4 bg-black/40 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm tracking-widest">
              © 2025 <span className="text-cyan-300 font-bold">LearnStep</span> • Secure • Modern • Built for the Future
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-5 tracking-widest font-light">
          Designed with Passion • Powered by Innovation
        </p>
      </div>

      {/* Tailwind + Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 40px) scale(0.9); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.4); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes border-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(139, 92, 246, 0.4); }
        }
        .animate-blob { animation: blob 20s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-twinkle { animation: twinkle 5s infinite; }
        .animate-border-glow { animation: border-glow 8s infinite ease-in-out; }
      `}</style>
    </div>
  );
}