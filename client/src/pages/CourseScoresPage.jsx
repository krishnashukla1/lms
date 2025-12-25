
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FiArrowLeft, FiBarChart2, FiAward, FiBook, FiTrendingUp, FiDownload, FiPrinter } from "react-icons/fi";
import ScoreTable from "./ScoreTable";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Certificate Component
function Certificate({ studentName, courseName, finalScore, date, onClose, onDownload }) {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="certificate bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-5xl text-center relative">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Close
        </button>

        {/* Decorative Border */}
        <div className="absolute inset-4 border-8 border-gold-500 rounded-lg pointer-events-none"></div>

        {/* Certificate Header */}
        <div className="mb-8">
          <div className="text-6xl font-bold text-indigo-700 mb-2">CERTIFICATE</div>
          <div className="text-2xl text-gray-600">OF ACHIEVEMENT</div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <p className="text-xl text-gray-700 mb-6">This is to certify that</p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {studentName}
          </h2>
          <p className="text-xl text-gray-700 mb-6">has successfully completed the course</p>
          <h3 className="text-3xl font-bold text-indigo-600 mb-8 border-b-4 border-indigo-300 pb-4">
            {courseName}
          </h3>

          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md">
              <div className="text-4xl font-black text-indigo-600">{finalScore}%</div>
              <div className="text-gray-600">Final Score</div>
            </div>
          </div>

          <p className="text-gray-500 text-lg">Awarded on {formatDate(date)}</p>
        </div>

        {/* Signatures */}
        <div className="mt-12 flex justify-between items-center px-8">
          <div className="text-center">
            <div className="border-t-2 border-gray-700 w-40 mx-auto mb-2"></div>
            <p className="font-semibold text-gray-700">Course Director</p>
          </div>
          <div className="text-center">
            <div className="border-t-2 border-gray-700 w-40 mx-auto mb-2"></div>
            <p className="font-semibold text-gray-700">Student</p>
          </div>
        </div>

        {/* Certificate ID */}
        <div className="mt-8 text-gray-500 text-sm">
          Certificate ID: {Date.now().toString(36).toUpperCase()}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => onDownload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2"
          >
            <FiDownload /> Download PDF
          </button>
          <button
            onClick={() => window.print()}
            className="cursor-pointer px-6 py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <FiPrinter /> Print Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

// Print Stylesheet
const printStyles = `
  @media print {
    @page {
      margin: 0;
      size: landscape;
    }
    
    body * {
      visibility: hidden;
    }
    
    .certificate-container,
    .certificate-container * {
      visibility: visible;
    }
    
    .certificate-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    
    .no-print {
      display: none !important;
    }
  }
`;

export default function CourseScoresPage() {
  const { courseType } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState([]);
  const [examResult, setExamResult] = useState(null);
  const [examReview, setExamReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSubmittedAssignment, setHasSubmittedAssignment] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const courseNames = {
    basic: "Basic Web Development",
    intermediate: "Intermediate JavaScript",
    advanced: "Full Stack Mastery",
  };

  useEffect(() => {
    const fetchAllScores = async () => {
      try {
        setLoading(true);
        const timestamp = Date.now();

        const [examRes, examReviewRes, dashRes, assignRes] = await Promise.all([
          api.get(`/final-exams/results/my?t=${timestamp}`),
          api.get(`/final-exams/review/my?t=${timestamp}`),
          api.get(`/student/dashboard?t=${timestamp}`),
          api.get(`/final-assignments/assignment-status?t=${timestamp}`),
        ]);

        // Exam result
        const examResult = examRes.data.results?.find(
          (r) => r.courseType === courseType
        );
        const examReview = examReviewRes.data.results?.find(r => r.courseType === courseType);

        // Assignment status
        const assignmentData = assignRes.data || {};
        setHasSubmittedAssignment(!!assignmentData[courseType]?.submittedAt);

        // Student Name
        if (dashRes.data.student) setStudentName(dashRes.data.student.name || "");

        // Module scores
        const allModules = dashRes.data.modules || [];
        const filteredModules = allModules.filter(
          (m) => (m.courseType || "basic") === courseType
        );

        const modulesWithScores = await Promise.all(
          filteredModules.map(async (module) => {
            try {
              if (module.hasQuiz && module._id) {
                const reviewRes = await api.get(`/quiz/review/${module._id}`);
                if (reviewRes.data) {
                  const score = reviewRes.data.score || 0;
                  const total = reviewRes.data.total || 0;
                  const percentage = total > 0 ? score / total : 0;
                  const passed = reviewRes.data.passed === true || percentage >= 0.7;

                  return {
                    ...module,
                    quizScore: score,
                    quizTotal: total,
                    quizPassed: passed,
                    quizPercentage: Math.round(percentage * 100),
                    hasTakenQuiz: true,
                    quizData: reviewRes.data
                  };
                }
              }
              return {
                ...module,
                quizScore: 0,
                quizTotal: 0,
                quizPassed: false,
                quizPercentage: 0,
                hasTakenQuiz: false
              };
            } catch (err) {
              return {
                ...module,
                quizScore: 0,
                quizTotal: 0,
                quizPassed: false,
                quizPercentage: 0,
                hasTakenQuiz: false
              };
            }
          })
        );

        setModules(modulesWithScores);
        setExamResult(examResult || null);
        setExamReview(examReview || null);
      } catch (err) {
        console.error("Failed to load scores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllScores();
  }, [courseType]);

  // Statistics
  const completedModules = modules.filter(m => m.completed).length;
  const totalModules = modules.length;
  const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const modulesWithQuiz = modules.filter(m => m.hasTakenQuiz);
  const passedModules = modules.filter(m => m.quizPassed).length;
  const totalQuizScore = modulesWithQuiz.reduce((sum, m) => sum + m.quizScore, 0);
  const totalQuizPossible = modulesWithQuiz.reduce((sum, m) => sum + m.quizTotal, 0);
  const averageQuizPercentage = totalQuizPossible > 0
    ? Math.round((totalQuizScore / totalQuizPossible) * 100)
    : 0;

  const handleDownloadPDF = async () => {
    setGeneratingPDF(true);
    try {
      const input = document.getElementById('certificate-content');
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`Certificate_${studentName}_${courseType}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setGeneratingPDF(false);
    }
  };

  const handlePrintReport = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Performance Report - ${courseNames[courseType]}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .report-header { text-align: center; margin-bottom: 30px; }
            .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 30px 0; }
            .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
            table { width: 100%; border-collapse: collapse; margin: 30px 0; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f5f5f5; }
            .print-button { display: none; }
          </style>
        </head>
        <body>
          <div class="report-header">
            <h1>Performance Report</h1>
            <h2>${courseNames[courseType]}</h2>
            <p>Student: ${studentName}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="stats-grid">
            <div class="stat-card">
              <h3>Course Progress</h3>
              <p>${progressPercentage}%</p>
            </div>
            <div class="stat-card">
              <h3>Quizzes Passed</h3>
              <p>${passedModules}/${modulesWithQuiz.length}</p>
            </div>
            <div class="stat-card">
              <h3>Quiz Average</h3>
              <p>${averageQuizPercentage}%</p>
            </div>
            <div class="stat-card">
              <h3>Final Exam</h3>
              <p>${examResult ? `${examResult.score}%` : "N/A"}</p>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Module</th>
                <th>Completed</th>
                <th>Quiz Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${modules.map(module => `
                <tr>
                  <td>${module.title}</td>
                  <td>${module.completed ? 'Yes' : 'No'}</td>
                  <td>${module.quizScore}/${module.quizTotal} (${module.quizPercentage}%)</td>
                  <td>${module.quizPassed ? 'Passed' : 'Not Passed'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <script>
            window.onload = () => {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="w-20 h-20 border-8 border-t-indigo-600 border-indigo-200 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <>
      <style>{printStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto p-4 md:p-8 py-8 md:py-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12 gap-6">
            <button
              onClick={() => navigate(`/modules/${courseType}`)}
              className="no-print cursor-pointer flex items-center gap-3 text-indigo-700 font-bold text-lg hover:text-indigo-900 transition-colors"
            >
              <FiArrowLeft size={24} /> Back to Course
            </button>

            <div className="text-center md:text-right">
              <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Performance Report
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mt-2">{courseNames[courseType]}</p>
              <p className="text-gray-500 mt-1">Student: {studentName}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 bg-indigo-100 rounded-xl">
                  <FiTrendingUp className="text-xl md:text-2xl text-indigo-600" />
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-black text-gray-900">{progressPercentage}%</div>
                  <div className="text-sm md:text-base text-gray-600">Course Progress</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 bg-emerald-100 rounded-xl">
                  <FiBook className="text-xl md:text-2xl text-emerald-600" />
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-black text-gray-900">{passedModules}/{modulesWithQuiz.length}</div>
                  <div className="text-sm md:text-base text-gray-600">Quizzes Passed</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 bg-amber-100 rounded-xl">
                  <FiBarChart2 className="text-xl md:text-2xl text-amber-600" />
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-black text-gray-900">{averageQuizPercentage}%</div>
                  <div className="text-sm md:text-base text-gray-600">Quiz Average</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 bg-purple-100 rounded-xl">
                  <FiAward className="text-xl md:text-2xl text-purple-600" />
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-black text-gray-900">
                    {examResult ? `${examResult.score}%` : "N/A"}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">Final Exam</div>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Status */}
          {hasSubmittedAssignment && (
            <div className="mb-8 md:mb-12 p-4 md:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-emerald-100 rounded-xl">
                    <FiAward className="text-xl md:text-2xl text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">Assignment Submitted</h3>
                    <p className="text-sm md:text-base text-gray-600">Your final assignment has been submitted</p>
                  </div>
                </div>
                <span className="px-3 md:px-4 py-1 md:py-2 bg-emerald-500 text-white rounded-full text-xs md:text-sm font-bold">
                  SUBMITTED
                </span>
              </div>
            </div>
          )}

          {/* Score Table */}
          <div className="mb-8 md:mb-12">
            <ScoreTable
              examResult={examResult}
              examReview={examReview}
              modules={modules}
              courseType={courseType}
              courseName={courseNames[courseType] || courseType.toUpperCase()}
            />
          </div>

          {/* Action Buttons */}
          <div className="no-print flex flex-wrap justify-center gap-3 md:gap-6">
            <button
              onClick={() => navigate(`/modules/${courseType}`)}
              className="cursor-pointer px-4 md:px-8 py-2 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2"
            >
              <FiArrowLeft /> Back to Learning
            </button>

            <button
              onClick={() => setShowCertificate(true)}
              className="cursor-pointer px-4 md:px-8 py-2 md:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-2"
            >
              <FiAward /> View Certificate
            </button>

            <button
              onClick={handlePrintReport}
              className="cursor-pointer px-4 md:px-8 py-2 md:py-4 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-xl font-bold hover:from-gray-700 hover:to-slate-700 transition-all flex items-center gap-2"
            >
              <FiPrinter /> Print Report
            </button>
          </div>

          {/* Certificate Preview */}
          {showCertificate && (
            <div className="certificate-container" id="certificate-content">
              <Certificate
                studentName={studentName || "Student Name"}
                courseName={courseNames[courseType]}
                finalScore={examResult?.score || averageQuizPercentage}
                date={new Date()}
                onClose={() => setShowCertificate(false)}
                onDownload={handleDownloadPDF}
              />
            </div>
          )}

          {/* PDF Loading Overlay */}
          {generatingPDF && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-2xl text-center">
                <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-700 font-semibold">Generating PDF Certificate...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}