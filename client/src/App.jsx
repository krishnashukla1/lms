


// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Login from "./pages/Login";
import Query from "./pages/Query";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CourseModules from "./pages/CourseModules";
import AssignmentPage from "./pages/AssignmentPage";
import FinalExamPage from "./pages/FinalExamPage";
import ModuleQuiz from "./pages/ModuleQuiz";
import QuizReview from "./pages/QuizReview";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import AdminAssignment from "./pages/AdminAssignment";
import AdminEnrollments from './pages/AdminEnrollments'
import FinalExam from './pages/AdminFinalExam'
import QuizList from './components/QuizList'
import ViewQuestions from './components/ViewQuestions'
import Notification from './pages/AdminNotifications'


// Components
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import AddModule from "./components/AddModule";
import ModuleList from "./components/ModuleList";
import ModuleDetail from './pages/ModuleDetail'
import EditModule from './components/ModuleEdit'
import ProtectedRoute from "./components/ProtectedRoute";

import CourseScoresPage from './pages/CourseScoresPage'

import { useAuth } from "./store/authStore";
import './App.css'

export default function App() {
  const initAuth = useAuth((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/query" element={<Query />} />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<ProtectedRoute allowed={["admin"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/add-student" element={<ProtectedRoute allowed={["admin"]}><AddStudent /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute allowed={["admin"]}><StudentList /></ProtectedRoute>} />
        <Route path="/admin/add-module" element={<ProtectedRoute allowed={["admin"]}><AddModule /></ProtectedRoute>} />
        <Route path="/admin/modules" element={<ProtectedRoute allowed={["admin"]}><ModuleList /></ProtectedRoute>} />
        <Route path="/admin/assignment-progress" element={<ProtectedRoute allowed={["admin"]}><AdminAssignment /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute allowed={["admin"]}><Analytics /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute allowed={["admin"]}><Settings /></ProtectedRoute>} />
        <Route path="/admin/support" element={<ProtectedRoute allowed={["admin"]}><Support /></ProtectedRoute>} />

        <Route path="/admin/notification" element={<ProtectedRoute allowed={["admin"]}><Notification /></ProtectedRoute>} />

        <Route path="/admin/enrollment" element={<ProtectedRoute allowed={["admin"]}><AdminEnrollments /></ProtectedRoute>} />
        <Route path="/admin/final-exam" element={<ProtectedRoute allowed={["admin"]}><FinalExam /></ProtectedRoute>} />

        <Route path="/admin/module/:id" element={<ProtectedRoute allowed={["admin"]}><ModuleDetail /></ProtectedRoute>} />
        <Route path="/admin/module/edit/:id" element={<ProtectedRoute allowed={["admin"]}><EditModule /></ProtectedRoute>} />


        <Route path="/admin/quiz" element={<ProtectedRoute allowed={["admin"]}> <QuizList /></ProtectedRoute>} />
        <Route path="/view-questions/:moduleId" element={<ProtectedRoute allowed={["admin"]}> <ViewQuestions /></ProtectedRoute>} />
        



        {/* Student Protected Routes */}
        <Route path="/student" element={<ProtectedRoute allowed={["student"]}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/modules/:courseType" element={<ProtectedRoute allowed={["student"]}><CourseModules /></ProtectedRoute>} />

        {/* Assignment & Exam */}
        <Route path="/assignment" element={<ProtectedRoute allowed={["student"]}><AssignmentPage /></ProtectedRoute>} />
        <Route path="/final-exam/:courseType" element={<ProtectedRoute allowed={["student"]}><FinalExamPage /></ProtectedRoute>} />

        {/* QUIZ ROUTES - ADD THESE TWO */}
        <Route
          path="/quiz/module/:moduleId"
          element={
            <ProtectedRoute allowed={["student"]}>
              <ModuleQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/review/:moduleId"
          element={
            <ProtectedRoute allowed={["student"]}>
              <QuizReview />
            </ProtectedRoute>
          }
        />
        <Route path="/courses/:courseType/scores" element={<CourseScoresPage />} />

        {/* 404 */}
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-4xl font-bold text-gray-500">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}