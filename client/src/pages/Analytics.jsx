//===============correct=============

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/authStore";
// import api from "../api/axios";

// export default function Analytics() {
//   const navigate = useNavigate();
//   const [analyticsData, setAnalyticsData] = useState({
//     studentProgress: [],
//     moduleCompletion: [],
//     quizPerformance: [],
//     activityData: []
//   });
//   const [timeRange, setTimeRange] = useState("month");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAnalyticsData();
//   }, [timeRange]);

//   const fetchAnalyticsData = async () => {
//     try {
//       setLoading(true);
//       // Simulated API calls - replace with actual endpoints
//       const [progressRes, modulesRes, quizzesRes] = await Promise.all([
//         api.get("/admin/analytics/progress"),
//         api.get("/admin/analytics/modules"),
//         api.get("/admin/analytics/quizzes")
//       ]);

//       setAnalyticsData({
//         studentProgress: progressRes.data || generateMockProgress(),
//         moduleCompletion: modulesRes.data || generateMockModules(),
//         quizPerformance: quizzesRes.data || generateMockQuizzes(),
//         activityData: generateActivityData()
//       });
//     } catch (error) {
//       console.error("Error fetching analytics:", error);
//       // Fallback to mock data
//       setAnalyticsData({
//         studentProgress: generateMockProgress(),
//         moduleCompletion: generateMockModules(),
//         quizPerformance: generateMockQuizzes(),
//         activityData: generateActivityData()
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mock data generators
//   const generateMockProgress = () => [
//     { name: "Week 1", completed: 45, inProgress: 25, notStarted: 30 },
//     { name: "Week 2", completed: 52, inProgress: 30, notStarted: 18 },
//     { name: "Week 3", completed: 60, inProgress: 25, notStarted: 15 },
//     { name: "Week 4", completed: 68, inProgress: 20, notStarted: 12 }
//   ];

//   const generateMockModules = () => [
//     { name: "React Basics", completion: 85, students: 45 },
//     { name: "JavaScript ES6", completion: 72, students: 38 },
//     { name: "Node.js", completion: 65, students: 32 },
//     { name: "Database Design", completion: 58, students: 28 },
//     { name: "API Development", completion: 45, students: 22 }
//   ];

//   const generateMockQuizzes = () => [
//     { name: "React Quiz", averageScore: 78, attempts: 42 },
//     { name: "JavaScript Quiz", averageScore: 82, attempts: 38 },
//     { name: "Node.js Quiz", averageScore: 71, attempts: 35 },
//     { name: "Database Quiz", averageScore: 65, attempts: 28 }
//   ];

//   const generateActivityData = () => [
//     { time: "9:00", logins: 40, completions: 12 },
//     { time: "12:00", logins: 65, completions: 28 },
//     { time: "15:00", logins: 85, completions: 45 },
//     { time: "18:00", logins: 55, completions: 32 },
//     { time: "21:00", logins: 35, completions: 18 }
//   ];

//   const StatCard = ({ title, value, change, icon, color }) => (
//     <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-600 font-medium text-sm">{title}</p>
//           <p className="text-3xl font-black text-gray-900 mt-2">{value}</p>
//           <p className={`text-sm font-semibold mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {change >= 0 ? '↗' : '↘'} {Math.abs(change)}% from last period
//           </p>
//         </div>
//         <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${color} flex items-center justify-center`}>
//           <span className="text-2xl text-white">{icon}</span>
//         </div>
//       </div>
//     </div>
//   );

//   const ProgressBar = ({ percentage, color }) => (
//     <div className="w-full bg-gray-200 rounded-full h-3">
//       <div 
//         className={`h-3 rounded-full ${color}`}
//         style={{ width: `${percentage}%` }}
//       ></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50/30 p-8">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-4xl font-black text-gray-900 mb-2">Analytics Dashboard</h1>
//           <p className="text-gray-600 font-medium">Track platform performance and student engagement</p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <select 
//             value={timeRange}
//             onChange={(e) => setTimeRange(e.target.value)}
//             className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl px-4 py-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="week">Last 7 Days</option>
//             <option value="month">Last 30 Days</option>
//             <option value="quarter">Last 3 Months</option>
//             <option value="year">Last Year</option>
//           </select>
//           <button 
//             onClick={fetchAnalyticsData}
//             className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
//           >
//             Refresh Data
//           </button>
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard 
//           title="Active Students" 
//           value="1,234" 
//           change={12} 
//           icon="👨‍🎓" 
//           color="from-blue-500 to-blue-700" 
//         />
//         <StatCard 
//           title="Course Completion" 
//           value="68%" 
//           change={8} 
//           icon="✅" 
//           color="from-emerald-500 to-emerald-700" 
//         />
//         <StatCard 
//           title="Avg. Quiz Score" 
//           value="76%" 
//           change={-3} 
//           icon="📊" 
//           color="from-purple-500 to-purple-700" 
//         />
//         <StatCard 
//           title="Engagement Rate" 
//           value="82%" 
//           change={15} 
//           icon="🔥" 
//           color="from-amber-500 to-amber-700" 
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Module Completion */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
//           <h3 className="text-xl font-black text-gray-900 mb-6">Module Completion Rates</h3>
//           <div className="space-y-6">
//             {analyticsData.moduleCompletion.map((module, index) => (
//               <div key={index} className="flex items-center justify-between">
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="font-semibold text-gray-800">{module.name}</span>
//                     <span className="text-sm font-bold text-gray-700">{module.completion}%</span>
//                   </div>
//                   <ProgressBar 
//                     percentage={module.completion} 
//                     color="bg-linear-to-r from-emerald-400 to-emerald-600"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">{module.students} students enrolled</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quiz Performance */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
//           <h3 className="text-xl font-black text-gray-900 mb-6">Quiz Performance</h3>
//           <div className="space-y-6">
//             {analyticsData.quizPerformance.map((quiz, index) => (
//               <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
//                 <div>
//                   <h4 className="font-semibold text-gray-800">{quiz.name}</h4>
//                   <p className="text-sm text-gray-600">{quiz.attempts} attempts</p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-2xl font-black text-gray-900">{quiz.averageScore}%</div>
//                   <div className="text-xs font-medium text-gray-500">Average Score</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Student Progress Over Time */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 lg:col-span-2">
//           <h3 className="text-xl font-black text-gray-900 mb-6">Student Progress Overview</h3>
//           <div className="grid grid-cols-4 gap-4">
//             {analyticsData.studentProgress.map((period, index) => (
//               <div key={index} className="text-center p-4 bg-white/50 rounded-xl">
//                 <h4 className="font-semibold text-gray-800 mb-3">{period.name}</h4>
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-emerald-600 font-medium">Completed</span>
//                     <span className="font-semibold">{period.completed}%</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-blue-600 font-medium">In Progress</span>
//                     <span className="font-semibold">{period.inProgress}%</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600 font-medium">Not Started</span>
//                     <span className="font-semibold">{period.notStarted}%</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Activity Heatmap */}
//       <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 mt-8">
//         <h3 className="text-xl font-black text-gray-900 mb-6">Daily Activity Pattern</h3>
//         <div className="flex items-end justify-between h-32">
//           {analyticsData.activityData.map((data, index) => (
//             <div key={index} className="flex flex-col items-center flex-1">
//               <div className="text-xs text-gray-600 mb-2">{data.time}</div>
//               <div className="flex space-x-1 w-full justify-center">
//                 <div 
//                   className="bg-blue-500 rounded-t transition-all duration-500 hover:bg-blue-600"
//                   style={{ height: `${data.logins}%`, width: '45%' }}
//                   title={`${data.logins} logins`}
//                 ></div>
//                 <div 
//                   className="bg-emerald-500 rounded-t transition-all duration-500 hover:bg-emerald-600"
//                   style={{ height: `${data.completions}%`, width: '45%' }}
//                   title={`${data.completions} completions`}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center space-x-6 mt-4 text-sm">
//           <div className="flex items-center space-x-2">
//             <div className="w-3 h-3 bg-blue-500 rounded"></div>
//             <span className="text-gray-600">User Logins</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-3 h-3 bg-emerald-500 rounded"></div>
//             <span className="text-gray-600">Course Completions</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//===================stylish==============

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import api from "../api/axios";
import {
  FiArrowLeft,
  FiUsers,
  FiCheckCircle,
  FiBarChart2,
  FiTrendingUp,
  FiRefreshCw,
  FiBook,
  FiAward,
  FiActivity,
  FiClock,
  FiEye
} from "react-icons/fi";

export default function Analytics() {
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState({
    studentProgress: [],
    moduleCompletion: [],
    quizPerformance: [],
    activityData: []
  });
  const [timeRange, setTimeRange] = useState("month");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      // Simulated API calls - replace with actual endpoints
      const [progressRes, modulesRes, quizzesRes] = await Promise.all([
        api.get("/admin/analytics/progress"),
        api.get("/admin/analytics/modules"),
        api.get("/admin/analytics/quizzes")
      ]);

      setAnalyticsData({
        studentProgress: progressRes.data || generateMockProgress(),
        moduleCompletion: modulesRes.data || generateMockModules(),
        quizPerformance: quizzesRes.data || generateMockQuizzes(),
        activityData: generateActivityData()
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      // Fallback to mock data
      setAnalyticsData({
        studentProgress: generateMockProgress(),
        moduleCompletion: generateMockModules(),
        quizPerformance: generateMockQuizzes(),
        activityData: generateActivityData()
      });
    } finally {
      setLoading(false);
    }
  };

  // Mock data generators
  const generateMockProgress = () => [
    { name: "Week 1", completed: 45, inProgress: 25, notStarted: 30 },
    { name: "Week 2", completed: 52, inProgress: 30, notStarted: 18 },
    { name: "Week 3", completed: 60, inProgress: 25, notStarted: 15 },
    { name: "Week 4", completed: 68, inProgress: 20, notStarted: 12 }
  ];

  const generateMockModules = () => [
    { name: "React Basics", completion: 85, students: 45 },
    { name: "JavaScript ES6", completion: 72, students: 38 },
    { name: "Node.js", completion: 65, students: 32 },
    { name: "Database Design", completion: 58, students: 28 },
    { name: "API Development", completion: 45, students: 22 }
  ];

  const generateMockQuizzes = () => [
    { name: "React Quiz", averageScore: 78, attempts: 42 },
    { name: "JavaScript Quiz", averageScore: 82, attempts: 38 },
    { name: "Node.js Quiz", averageScore: 71, attempts: 35 },
    { name: "Database Quiz", averageScore: 65, attempts: 28 }
  ];

  const generateActivityData = () => [
    { time: "9:00", logins: 40, completions: 12 },
    { time: "12:00", logins: 65, completions: 28 },
    { time: "15:00", logins: 85, completions: 45 },
    { time: "18:00", logins: 55, completions: 32 },
    { time: "21:00", logins: 35, completions: 18 }
  ];

  const StatCard = ({ title, value, change, icon, color, gradient }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 font-medium text-sm mb-2">{title}</p>
          <p className="text-3xl font-black text-gray-900 mb-2">{value}</p>
          <p className={`flex items-center gap-1 text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? <FiTrendingUp size={16} /> : <FiTrendingUp className="rotate-180" size={16} />}
            {Math.abs(change)}% from last period
          </p>
        </div>
        <div className={`w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ percentage, color, gradient }) => (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div 
        className={`h-3 rounded-full ${gradient} transition-all duration-1000 ease-out`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50/30 p-8">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
            >
              <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to Admin
            </button>
            <div>
              <h1 className="text-4xl font-black bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 font-medium">Track platform performance and student engagement</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:shadow-lg transition-all"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">Last Year</option>
            </select>
            <button 
              onClick={fetchAnalyticsData}
              disabled={loading}
              className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiRefreshCw className={loading ? "animate-spin" : ""} size={18} />
              <span>{loading ? "Refreshing..." : "Refresh Data"}</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Active Students" 
            value="1,234" 
            change={12} 
            icon={<FiUsers className="text-white" size={24} />}
            gradient="bg-linear-to-br from-blue-500 to-blue-600"
          />
          <StatCard 
            title="Course Completion" 
            value="68%" 
            change={8} 
            icon={<FiCheckCircle className="text-white" size={24} />}
            gradient="bg-linear-to-br from-emerald-500 to-emerald-600"
          />
          <StatCard 
            title="Avg. Quiz Score" 
            value="76%" 
            change={-3} 
            icon={<FiBarChart2 className="text-white" size={24} />}
            gradient="bg-linear-to-br from-purple-500 to-purple-600"
          />
          <StatCard 
            title="Engagement Rate" 
            value="82%" 
            change={15} 
            icon={<FiActivity className="text-white" size={24} />}
            gradient="bg-linear-to-br from-amber-500 to-amber-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Module Completion */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-gray-900">Module Completion Rates</h3>
              <FiBook className="text-blue-600" size={24} />
            </div>
            <div className="space-y-6">
              {analyticsData.moduleCompletion.map((module, index) => (
                <div key={index} className="group hover:bg-white/50 rounded-xl p-3 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{module.name}</span>
                    <span className="text-sm font-bold text-gray-700 bg-blue-50 px-3 py-1 rounded-full">{module.completion}%</span>
                  </div>
                  <ProgressBar 
                    percentage={module.completion} 
                    gradient="bg-linear-to-r from-emerald-400 to-emerald-600"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">{module.students} students enrolled</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <FiEye size={12} />
                      <span>View Details</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Performance */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-gray-900">Quiz Performance</h3>
              <FiAward className="text-purple-600" size={24} />
            </div>
            <div className="space-y-4">
              {analyticsData.quizPerformance.map((quiz, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-all duration-300 group cursor-pointer border border-transparent hover:border-purple-200">
                  <div>
                    <h4 className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">{quiz.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <FiUsers size={14} />
                      {quiz.attempts} attempts
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gray-900 group-hover:text-purple-600 transition-colors">
                      {quiz.averageScore}%
                    </div>
                    <div className="text-xs font-medium text-gray-500">Average Score</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Progress Over Time */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 lg:col-span-2 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-gray-900">Student Progress Overview</h3>
              <FiTrendingUp className="text-green-600" size={24} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {analyticsData.studentProgress.map((period, index) => (
                <div key={index} className="text-center p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-all duration-300 group cursor-pointer border border-transparent hover:border-green-200">
                  <h4 className="font-semibold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">{period.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <FiCheckCircle size={12} />
                        Completed
                      </span>
                      <span className="font-semibold bg-emerald-50 px-2 py-1 rounded-full">{period.completed}%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-blue-600 font-medium flex items-center gap-1">
                        <FiClock size={12} />
                        In Progress
                      </span>
                      <span className="font-semibold bg-blue-50 px-2 py-1 rounded-full">{period.inProgress}%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-medium">Not Started</span>
                      <span className="font-semibold bg-gray-50 px-2 py-1 rounded-full">{period.notStarted}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 mt-8 hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-gray-900">Daily Activity Pattern</h3>
            <FiActivity className="text-blue-600" size={24} />
          </div>
          <div className="flex items-end justify-between h-32 mb-6">
            {analyticsData.activityData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1 group">
                <div className="text-xs text-gray-600 mb-2 group-hover:text-blue-600 transition-colors">{data.time}</div>
                <div className="flex space-x-1 w-full justify-center">
                  <div 
                    className="bg-linear-to-t from-blue-500 to-blue-600 rounded-t transition-all duration-500 hover:from-blue-600 hover:to-blue-700 cursor-pointer transform hover:scale-105"
                    style={{ height: `${data.logins}%`, width: '45%' }}
                    title={`${data.logins} logins`}
                  ></div>
                  <div 
                    className="bg-linear-to-t from-emerald-500 to-emerald-600 rounded-t transition-all duration-500 hover:from-emerald-600 hover:to-emerald-700 cursor-pointer transform hover:scale-105"
                    style={{ height: `${data.completions}%`, width: '45%' }}
                    title={`${data.completions} completions`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-8 mt-4 text-sm">
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-xl">
              <div className="w-3 h-3 bg-linear-to-r from-blue-500 to-blue-600 rounded"></div>
              <span className="text-gray-700 font-medium">User Logins</span>
            </div>
            <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-xl">
              <div className="w-3 h-3 bg-linear-to-r from-emerald-500 to-emerald-600 rounded"></div>
              <span className="text-gray-700 font-medium">Course Completions</span>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm font-medium">
            Last updated: {new Date().toLocaleString()} • 
            <span className="text-blue-600 ml-1">Real-time analytics</span>
          </p>
        </div>
      </div>
    </div>
  );
}