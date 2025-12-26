
// import { useState } from "react";
// import { FiArrowLeft } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { Settings, Book, Bell, Shield, Palette, Code, Lock, Eye, EyeOff, X } from "lucide-react";

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState("general");
//   const [saving, setSaving] = useState(false);
//   const [showChangeModal, setShowChangeModal] = useState(false);

//   const [changeForm, setChangeForm] = useState({
//     email: "",
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: ""
//   });
//   const [changeLoading, setChangeLoading] = useState(false);
//   const navigate = useNavigate();

//   const [settings, setSettings] = useState({
//     siteName: "LearnStep LMS",
//     siteUrl: "https://learnstep.example.com",
//     adminEmail: "admin@learnstep.com",
//     timezone: "Asia/Kolkata",

//     maxFileSize: 100,
//     autoApproveStudents: false,

//     emailNotifications: true,
//     studentEnrollment: true,
//     courseCompletion: true,
//     quizSubmissions: false,

//     require2FA: false,
//     sessionTimeout: 60,
//     passwordPolicy: "medium",
//   });

//   const handleSave = async () => {
//     setSaving(true);
//     await new Promise((resolve) => setTimeout(resolve, 1800));
//     setSaving(false);
//     alert("All settings saved successfully!");
//   };

//   const handleReset = () => {
//     if (window.confirm("Reset all settings to default values?")) {
//       setSettings({
//         siteName: "LearnStep LMS",
//         siteUrl: "https://learnstep.example.com",
//         adminEmail: "admin@learnstep.com",
//         timezone: "Asia/Kolkata",
//         maxFileSize: 100,
//         autoApproveStudents: false,
//         emailNotifications: true,
//         studentEnrollment: true,
//         courseCompletion: true,
//         quizSubmissions: false,
//         require2FA: false,
//         sessionTimeout: 60,
//         passwordPolicy: "medium",
//       });
//       alert("Settings reset to default!");
//     }
//   };

//   const handleChangeCredentials = async () => {
//     if (changeForm.newPassword && changeForm.newPassword !== changeForm.confirmPassword) {
//       alert("New passwords do not match!");
//       return;
//     }

//     if (changeForm.newPassword && changeForm.newPassword.length < 6) {
//       alert("New password must be at least 6 characters");
//       return;
//     }

//     if (!changeForm.email && !changeForm.newPassword) {
//       alert("Please enter new email or password");
//       return;
//     }

//     if (changeForm.newPassword && !changeForm.currentPassword) {
//       alert("Please enter your current password to change password");
//       return;
//     }

//     setChangeLoading(true);

//     try {
//       const token = localStorage.getItem("adminToken");

//       if (!token) {
//         alert("No token found. Please login again.");
//         return;
//       }

//       console.log("Sending token:", token); // Debug
    

//       // const res = await fetch("http://localhost:5000/api/admin/update-profile", {
//       //   method: "PUT",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${token}`
//       //   },
//       //   body: JSON.stringify({
//       //     email: changeForm.email || undefined,
//       //     password: changeForm.newPassword || undefined
//       //   })
//       // });

//       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/update-profile`, {
//   method: "PUT",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`
//   },
//   body: JSON.stringify({
//     email: changeForm.email || undefined,
//     password: changeForm.newPassword || undefined
//   })
// });


//       const data = await res.json();
//       console.log("Response:", data); // Debug

//       if (res.ok) {
//         alert("Admin account updated successfully!");
//         setShowChangeModal(false);
//         setChangeForm({ email: "", currentPassword: "", newPassword: "", confirmPassword: "" });
//       } else {
//         alert(data.message || "Failed to update");
//       }
//     } catch (err) {
//       alert("Network error. Please try again.");
//     } finally {
//       setChangeLoading(false);
//     }
//   };

//   const tabs = [
//     { id: "general", label: "General", icon: Settings },
//     { id: "courses", label: "Courses", icon: Book },
//     { id: "notifications", label: "Notifications", icon: Bell },
//     { id: "security", label: "Security", icon: Shield },
//     { id: "appearance", label: "Appearance", icon: Palette },
//     { id: "advanced", label: "Advanced", icon: Code },
//     { id: "change-password", label: "Change Password", icon: Lock },
//   ];


//   return (
//     <>
//       <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-cyan-50">
//         <div className="p-8 max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => navigate("/admin")}
//                 className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
//               >
//                 <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//                 Back to Admin
//               </button>
//               <div>
//                 <h1 className="text-4xl font-black bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2">
//                   Platform Settings
//                 </h1>
//                 <p className="text-gray-600 font-medium">
//                   Customize and control every aspect of your learning platform
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             {/* Sidebar */}
//             <div className="lg:col-span-1">
//               <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-6 space-y-3">
//                 {tabs.map((tab) => {
//                   const Icon = tab.icon;
//                   return (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className={`cursor-pointer w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow-md ${activeTab === tab.id
//                         ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-2xl scale-105"
//                         : "bg-white/60 text-gray-700 hover:bg-white"
//                         }`}
//                     >
//                       <Icon size={22} />
//                       <span>{tab.label}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="lg:col-span-3">
//               <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-10">
//                 {/* Header Actions */}
//                 <div className="flex justify-between items-center mb-10">
//                   <h2 className="text-3xl font-bold text-gray-800">
//                     {tabs.find((t) => t.id === activeTab)?.label} Settings
//                   </h2>
//                   <div className="flex gap-4">
//                     <button
//                       onClick={handleReset}
//                       className="cursor-pointer px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
//                     >
//                       Reset Defaults
//                     </button>
//                     <button
//                       onClick={handleSave}
//                       disabled={saving}
//                       className="cursor-pointer px-10 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-3 shadow-lg disabled:opacity-70"
//                     >
//                       {saving && (
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       )}
//                       {saving ? "Saving..." : "Save Changes"}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Tab Content */}
//                 <div className="space-y-8">
//                   {activeTab === "general" && (
//                     <>
//                       <SettingField label="Site Name" desc="Name displayed on your platform">
//                         <input
//                           type="text"
//                           value={settings.siteName}
//                           onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
//                           className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg"
//                           placeholder="My Awesome LMS"
//                         />
//                       </SettingField>

//                       <SettingField label="Site URL" desc="Your platform's public address">
//                         <input
//                           type="url"
//                           value={settings.siteUrl}
//                           onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
//                           className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg"
//                         />
//                       </SettingField>

//                       <SettingField label="Admin Email" desc="For system alerts & recovery">
//                         <input
//                           type="email"
//                           value={settings.adminEmail}
//                           onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
//                           className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg"
//                         />
//                       </SettingField>

//                       <SettingField label="Timezone" desc="All dates & schedules use this timezone">
//                         <select
//                           value={settings.timezone}
//                           onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
//                           className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg"
//                         >
//                           <option value="Asia/Kolkata">UTC+5:30 — India (IST)</option>
//                           <option value="UTC">UTC+0 — Universal Time (GMT)</option>
//                           <option value="Europe/London">UTC+0/+1 — London (BST/GMT)</option>
//                           <option value="Europe/Berlin">UTC+1/+2 — Central Europe (CET/CEST)</option>
//                           <option value="America/New_York">UTC-5/-4 — New York (EST/EDT)</option>
//                           <option value="America/Los_Angeles">UTC-8/-7 — Los Angeles (PST/PDT)</option>
//                           <option value="Asia/Dubai">UTC+4 — Dubai (GST)</option>
//                           <option value="Asia/Singapore">UTC+8 — Singapore (SGT)</option>
//                           <option value="Asia/Tokyo">UTC+9 — Japan (JST)</option>
//                           <option value="Australia/Sydney">UTC+10/+11 — Sydney (AEST/AEDT)</option>
//                           <option value="Asia/Dhaka">UTC+6 — Bangladesh (BST)</option>
//                         </select>
//                       </SettingField>
//                     </>
//                   )}

//                   {activeTab === "courses" && (
//                     <>
//                       <SettingField label="Max Upload Size" desc="Maximum file size for course materials">
//                         <div className="flex items-center gap-6">
//                           <input
//                             type="range"
//                             min="10"
//                             max="500"
//                             step="10"
//                             value={settings.maxFileSize}
//                             onChange={(e) => setSettings({ ...settings, maxFileSize: Number(e.target.value) })}
//                             className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
//                           />
//                           <span className="text-2xl font-bold text-blue-600 w-24 text-right">
//                             {settings.maxFileSize} MB
//                           </span>
//                         </div>
//                       </SettingField>

//                       <SettingField label="Auto-Approve Students" desc="Skip manual approval for new registrations">
//                         <Toggle
//                           checked={settings.autoApproveStudents}
//                           onChange={(v) => setSettings({ ...settings, autoApproveStudents: v })}
//                         />
//                       </SettingField>
//                     </>
//                   )}

//                   {activeTab === "notifications" && (
//                     <>
//                       <SettingField label="Email Notifications" desc="Receive important system alerts via email">
//                         <Toggle checked={settings.emailNotifications} onChange={(v) => setSettings({ ...settings, emailNotifications: v })} />
//                       </SettingField>
//                       <SettingField label="New Student Enrollment" desc="Get notified when someone signs up">
//                         <Toggle checked={settings.studentEnrollment} onChange={(v) => setSettings({ ...settings, studentEnrollment: v })} />
//                       </SettingField>
//                       <SettingField label="Course Completion" desc="Alert when a student finishes a course">
//                         <Toggle checked={settings.courseCompletion} onChange={(v) => setSettings({ ...settings, courseCompletion: v })} />
//                       </SettingField>
//                       <SettingField label="Quiz Submissions" desc="Notify on every quiz attempt">
//                         <Toggle checked={settings.quizSubmissions} onChange={(v) => setSettings({ ...settings, quizSubmissions: v })} />
//                       </SettingField>
//                     </>
//                   )}

//                   {activeTab === "security" && (
//                     <>
//                       <SettingField label="Require Two-Factor Auth (2FA)" desc="Enforce 2FA for all admin accounts">
//                         <Toggle checked={settings.require2FA} onChange={(v) => setSettings({ ...settings, require2FA: v })} />
//                       </SettingField>

//                       <SettingField label="Session Timeout" desc="Auto logout after inactivity">
//                         <select
//                           value={settings.sessionTimeout}
//                           onChange={(e) => setSettings({ ...settings, sessionTimeout: Number(e.target.value) })}
//                           className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg"
//                         >
//                           <option value={30}>30 minutes</option>
//                           <option value={60}>1 hour</option>
//                           <option value={120}>2 hours</option>
//                           <option value={240}>4 hours</option>
//                           <option value={1440}>24 hours</option>
//                         </select>
//                       </SettingField>

//                       <SettingField label="Password Strength" desc="Minimum password requirements">
//                         <select
//                           value={settings.passwordPolicy}
//                           onChange={(e) => setSettings({ ...settings, passwordPolicy: e.target.value })}
//                           className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg"
//                         >
//                           <option value="low">Low (6+ chars)</option>
//                           <option value="medium">Medium (8+ chars, mixed case)</option>
//                           <option value="high">High (12+ chars, special chars)</option>
//                         </select>
//                       </SettingField>
//                     </>
//                   )}

//                   {activeTab === "appearance" && (
//                     <div className="text-center py-16">
//                       <div className="text-8xl mb-8">Palette</div>
//                       <h3 className="text-4xl font-bold text-gray-800 mb-6">Visual Customization</h3>
//                       <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
//                         Personalize the look of your platform with themes, colors, fonts, and layout options.
//                       </p>
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
//                         {["Light Mode", "Dark Mode", "Ocean Blue", "Forest Green", "Sunset Orange", "Purple Haze"].map((theme) => (
//                           <div
//                             key={theme}
//                             className="p-8 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-blue-400"
//                           >
//                             <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-blue-400 to-indigo-600 rounded-xl"></div>
//                             <h4 className="font-bold text-lg">{theme}</h4>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {activeTab === "advanced" && (
//                     <div className="text-center py-16">
//                       <div className="text-8xl mb-8">Code</div>
//                       <h3 className="text-4xl font-bold text-gray-800 mb-6">Advanced Controls</h3>
//                       <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
//                         Fine-tune performance, caching, API access, logging, and system-level configurations.
//                       </p>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         <FeatureCard title="Performance Cache" desc="Enable Redis & CDN caching" icon="Lightning" />
//                         <FeatureCard title="API Rate Limiting" desc="Protect against spam & abuse" icon="Shield" />
//                         <FeatureCard title="Debug Mode" desc="Enable detailed error logs" icon="Bug" />
//                         <FeatureCard title="Backup Schedule" desc="Daily automated backups" icon="Database" />
//                       </div>
//                     </div>
//                   )}


//                   {activeTab === "change-password" && (
//                     <div className="py-16">
//                       <div className="text-center mb-12">
//                         <Lock size={80} className="mx-auto text-indigo-600 mb-6" />
//                         <h3 className="text-3xl font-bold text-gray-800 mb-4">Admin Account Settings</h3>
//                         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                           Update your admin email and password securely.
//                         </p>
//                       </div>

//                       <div className="max-w-2xl mx-auto">
//                         <button
//                           onClick={() => setShowChangeModal(true)}
//                           className="cursor-pointer w-full px-10 py-6 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition shadow-xl hover:shadow-2xl transform hover:scale-105"
//                         >
//                           Change Email & Password
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Change Admin Credentials Modal */}

//       {showChangeModal && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] max-w-md w-full p-8 animate-in fade-in zoom-in duration-300 border border-gray-200">

//             {/* Header */}
//             <div className="flex justify-between items-center mb-8">
//               <h3 className="text-2xl font-bold text-gray-800">Update Admin Account</h3>

//               <button
//                 onClick={() => {
//                   setShowChangeModal(false);
//                   setChangeForm({
//                     email: "",
//                     currentPassword: "",
//                     newPassword: "",
//                     confirmPassword: ""
//                   });
//                 }}
//                 className="text-red-500 hover:text-red-600 text-3xl transition cursor-pointer"
//               >
//                 <X strokeWidth={2.5} className="w-7 h-7" /> 
//               </button>
//             </div>

//             {/* Content */}
//             <div className="space-y-6">

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">New Email</label>
//                 <input
//                   type="email"
//                   value={changeForm.email}
//                   onChange={(e) => setChangeForm({ ...changeForm, email: e.target.value })}
//                   placeholder="new-admin@example.com"
//                   className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
//                 />
//               </div>

//               {/* Password Section */}
//               <div className="border-t pt-6">
//                 <h4 className="font-bold text-gray-800 mb-4">Change Password</h4>

//                 {/* Current Password */}
//                 <PasswordInput
//                   label="Current Password"
//                   value={changeForm.currentPassword}              
//                   onChange={(e) => setChangeForm({ ...changeForm, currentPassword: e.target.value })}
//                 />

//                 {/* New Password */}
//                 <PasswordInput
//                   label="New Password"
//                   value={changeForm.newPassword}                
//                   onChange={(e) => setChangeForm({ ...changeForm, newPassword: e.target.value })}
//                 />

//                 {/* Confirm New Password */}
//                 <PasswordInput
//                   label="Confirm New Password"
//                   value={changeForm.confirmPassword}           
//                   onChange={(e) => setChangeForm({ ...changeForm, confirmPassword: e.target.value })}
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-4 mt-8">
//                 <button
//                   onClick={() => setShowChangeModal(false)}
//                   className="cursor-pointer flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={handleChangeCredentials}
//                   disabled={changeLoading}
//                   className="cursor-pointer flex-1 px-6 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition flex items-center justify-center gap-3 disabled:opacity-70"
//                 >
//                   {changeLoading ? (
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   ) : (
//                     "Update Account"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// const PasswordInput = ({ label, value, onChange }) => {
//   const [show, setShow] = useState(false);

//   return (
//     <div className="mt-4">
//       <label className="block text-sm font-semibold text-gray-700 mb-2">
//         {label}
//       </label>

//       <div className="relative">
//         <input
//           type={show ? "text" : "password"}
//           value={value}
//           autoComplete="new-password"
//           spellCheck={false}
//           onChange={(e) => onChange(e)}  // ← Pass the FULL event, not just value
//           className="w-full px-5 py-4 pr-14 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
//           placeholder="••••••••"
//         />

//         <button
//           type="button"
//           onClick={() => setShow(!show)}
//           className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
//         >
//           {show ? <EyeOff size={20} /> : <Eye size={20} />}
//         </button>
//       </div>
//     </div>
//   )
// }

// // Reusable Components
// const SettingField = ({ label, desc, children }) => (
//   <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:shadow-lg transition">
//     <div className="flex justify-between items-start mb-6">
//       <div>
//         <h4 className="text-xl font-bold text-gray-900">{label}</h4>
//         <p className="text-gray-600 mt-1">{desc}</p>
//       </div>
//     </div>
//     <div>{children}</div>
//   </div>
// );

// const Toggle = ({ checked, onChange }) => (
//   <label className="relative inline-flex items-center cursor-pointer">
//     <input
//       type="checkbox"
//       checked={checked}
//       onChange={(e) => onChange(e.target.checked)}
//       className="sr-only peer"
//     />
//     <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-6 peer-checked:bg-linear-to-r peer-checked:from-blue-500 peer-checked:to-indigo-600 shadow-inner"></div>
//   </label>
// );

// const FeatureCard = ({ title, desc, icon }) => (
//   <div className="p-8 bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:shadow-xl transition transform hover:-translate-y-2">
//     <div className="text-5xl mb-4">{icon}</div>
//     <h4 className="text-xl font-bold text-gray-800 mb-2">{title}</h4>
//     <p className="text-gray-600">{desc}</p>
//   </div>
// );



//==================only password====================================



import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Lock, X, Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const [showChangeModal, setShowChangeModal] = useState(true); // Open modal by default
  const [changeLoading, setChangeLoading] = useState(false);

  const [changeForm, setChangeForm] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChangeCredentials = async () => {
    if (changeForm.newPassword && changeForm.newPassword !== changeForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (changeForm.newPassword && changeForm.newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    if (!changeForm.email && !changeForm.newPassword) {
      alert("Please enter new email or password");
      return;
    }

    if (changeForm.newPassword && !changeForm.currentPassword) {
      alert("Please enter your current password to change password");
      return;
    }

    setChangeLoading(true);

    try {
      // const token = localStorage.getItem("adminToken");
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please login again.");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email: changeForm.email || undefined,
          password: changeForm.newPassword || undefined,
          currentPassword: changeForm.currentPassword || undefined
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Admin account updated successfully!");
        setChangeForm({
          email: "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        // Optionally: navigate("/admin") or close modal
        // setShowChangeModal(false);
      } else {
        alert(data.message || "Failed to update account");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setChangeLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
              >
                <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Admin
              </button>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Change Password
                </h1>
                <p className="text-gray-600 font-medium mt-1">
                  Update your admin account credentials
                </p>
              </div>
            </div>
          </div>

          {/* Main Content - Directly show change password section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-10">
            <div className="max-w-2xl mx-auto py-12">
              <div className="text-center mb-12">
                <Lock size={80} className="mx-auto text-indigo-600 mb-6" />
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Admin Account Settings</h3>
                <p className="text-lg text-gray-600">
                  Update your admin email and/or password securely.
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-8">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Email (optional)</label>
                  <input
                    type="email"
                    value={changeForm.email}
                    onChange={(e) => setChangeForm({ ...changeForm, email: e.target.value })}
                    placeholder="new-admin@example.com"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                  />
                </div>

                {/* Password Section */}
                <div className="border-t pt-8">
                  <h4 className="font-bold text-gray-800 mb-6 text-xl">Change Password</h4>

                  <PasswordInput
                    label="Current Password"
                    value={changeForm.currentPassword}
                    onChange={(e) => setChangeForm({ ...changeForm, currentPassword: e.target.value })}
                  />

                  <PasswordInput
                    label="New Password"
                    value={changeForm.newPassword}
                    onChange={(e) => setChangeForm({ ...changeForm, newPassword: e.target.value })}
                  />

                  <PasswordInput
                    label="Confirm New Password"
                    value={changeForm.confirmPassword}
                    onChange={(e) => setChangeForm({ ...changeForm, confirmPassword: e.target.value })}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-12">
                  <button
                    onClick={() => navigate("/admin")}
                    className="cursor-pointer flex-1 px-8 py-5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleChangeCredentials}
                    disabled={changeLoading}
                    className="cursor-pointer flex-1 px-8 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg"
                  >
                    {changeLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Update Account"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Reusable Password Input Component
const PasswordInput = ({ label, value, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          autoComplete="new-password"
          onChange={onChange}
          className="w-full px-5 py-4 pr-14 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition cursor-pointer"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};