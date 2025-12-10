import React from "react";
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiBarChart2,
  FiList,
  FiAward,
  FiBook,
  FiPercent,
  FiTrendingUp
} from "react-icons/fi";
import { motion } from "framer-motion";

const ScoreTable = ({
  examResult,
  examReview,
  modules = [],
  courseType,
  courseName
}) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not attempted";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Format time taken
  const formatTimeTaken = (milliseconds) => {
    if (!milliseconds) return "N/A";
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes} mins ${seconds} secs`;
  };

  // Calculate overall statistics
  const totalModules = modules.length;
  const completedModules = modules.filter(m => m.completed).length;
  const modulesWithQuiz = modules.filter(m => m.hasTakenQuiz);
  const passedModules = modules.filter(m => m.quizPassed).length;

  const totalQuizScore = modulesWithQuiz.reduce((sum, m) => sum + m.quizScore, 0);
  const totalQuizPossible = modulesWithQuiz.reduce((sum, m) => sum + m.quizTotal, 0);
  const averageQuizPercentage = totalQuizPossible > 0
    ? Math.round((totalQuizScore / totalQuizPossible) * 100)
    : 0;

  // If no exam result yet
  if (!examResult && modulesWithQuiz.length === 0) {
    return (
      <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-3xl shadow-xl p-12 text-center">
        <FiBook className="mx-auto text-6xl text-gray-400 mb-6" />
        <h3 className="text-3xl font-bold text-gray-700 mb-4">No Scores Available Yet</h3>
        <p className="text-xl text-gray-600">Complete modules and take the final exam to see your scores here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-4xl font-black mb-2 flex items-center gap-4">
              <FiBarChart2 className="text-5xl" />
              {courseName || courseType?.toUpperCase()} - Performance Report
            </h2>
            <p className="text-xl opacity-90">
              Comprehensive overview of your learning progress
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black">{averageQuizPercentage}%</div>
            <div className="text-lg">Average Quiz Score</div>
          </div>
        </div>
      </div>

      {/* Overall Stats Cards */}
      <div className="p-8 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Progress Card */}
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-blue-800">Progress</div>
              <FiTrendingUp className="text-3xl text-blue-600" />
            </div>
            <div className="text-4xl font-black text-blue-700">
              {completedModules}/{totalModules}
            </div>
            <div className="text-lg text-blue-600 mt-2">Modules Completed</div>
            <div className="mt-4">
              <div className="w-full h-3 bg-blue-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedModules / totalModules) * 100}%` }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Quiz Performance Card */}
          <div className="bg-linear-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-emerald-800">Quiz Performance</div>
              <FiPercent className="text-3xl text-emerald-600" />
            </div>
            <div className="text-4xl font-black text-emerald-700">
              {passedModules}/{modulesWithQuiz.length}
            </div>
            <div className="text-lg text-emerald-600 mt-2">Modules Passed</div>
            <div className="text-sm text-gray-500 mt-2">
              Average: {averageQuizPercentage}%
            </div>
          </div>

          {/* Final Exam Card (if taken) */}
          {examResult && (
            <div className={`p-6 rounded-2xl border ${examResult.passed
                ? 'bg-linear-to-br from-emerald-50 to-green-50 border-emerald-200'
                : 'bg-linear-to-br from-red-50 to-rose-50 border-red-200'
              }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold flex items-center gap-2">
                  {examResult.passed ? (
                    <>
                      <FiCheckCircle className="text-emerald-600" /> Final Exam
                    </>
                  ) : (
                    <>
                      <FiXCircle className="text-red-600" /> Final Exam
                    </>
                  )}
                </div>
                <FiAward className="text-3xl" />
              </div>
              <div className={`text-4xl font-black ${examResult.passed ? 'text-emerald-700' : 'text-red-700'
                }`}>
                {examResult.score}%
              </div>
              <div className={`text-lg font-bold mt-2 ${examResult.passed ? 'text-emerald-600' : 'text-red-600'
                }`}>
                {examResult.passed ? "PASSED" : "FAILED"}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {formatDate(examResult.attemptedAt)}
              </div>
            </div>
          )}

          {/* Overall Grade Card */}
          <div className="bg-linear-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-purple-800">Overall Grade</div>
              <FiBook className="text-3xl text-purple-600" />
            </div>
            <div className="text-5xl font-black text-purple-700">
              {calculateOverallGrade(examResult, averageQuizPercentage)}
            </div>
            <div className="text-lg text-purple-600 mt-2">
              Based on quizzes & exam
            </div>
          </div>
        </div>
      </div>

      {/* Module-wise Scores Table */}
      <div className="p-8">
        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800 border-b pb-4">
          <FiList className="text-indigo-600 text-4xl" /> Module-wise Quiz Scores
        </h3>

        {modulesWithQuiz.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-8 py-6 text-left text-xl font-bold text-gray-700">
                    Module
                  </th>
                  <th className="px-8 py-6 text-left text-xl font-bold text-gray-700">
                    Status
                  </th>
                  <th className="px-8 py-6 text-left text-xl font-bold text-gray-700">
                    Score
                  </th>
                  <th className="px-8 py-6 text-left text-xl font-bold text-gray-700">
                    Percentage
                  </th>
                  <th className="px-8 py-6 text-left text-xl font-bold text-gray-700">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {modules
                  .filter(m => m.hasTakenQuiz)
                  .map((module, index) => (
                    <motion.tr
                      key={module._id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-black text-indigo-700">
                            #{index + 1}
                          </div>
                          <div>
                            <div className="text-xl font-bold text-gray-900">
                              {module.title || `Module ${index + 1}`}
                            </div>
                            <div className="text-sm text-gray-500">
                              {module.completed ? "Completed" : "In Progress"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${module.completed
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                          }`}>
                          {module.completed ? (
                            <>
                              <FiCheckCircle className="text-sm" /> Completed
                            </>
                          ) : (
                            "In Progress"
                          )}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-3xl font-black text-gray-900">
                          {module.quizScore}/{module.quizTotal}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {module.quizPercentage}%
                          </div>
                          <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(module.quizPercentage, 100)}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className={`h-full rounded-full ${module.quizPercentage >= 70 ? 'bg-emerald-500' :
                                  module.quizPercentage >= 50 ? 'bg-amber-500' :
                                    'bg-red-500'
                                }`}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold ${module.quizPassed
                            ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white'
                            : 'bg-linear-to-r from-red-500 to-rose-500 text-white'
                          }`}>
                          {module.quizPassed ? (
                            <>
                              <FiCheckCircle /> PASS
                            </>
                          ) : (
                            <>
                              <FiXCircle /> FAIL
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 bg-linear-to-r from-gray-50 to-gray-100 rounded-3xl">
            <FiBook className="mx-auto text-6xl text-gray-400 mb-6" />
            <h4 className="text-2xl font-bold text-gray-700 mb-4">No Quiz Scores Yet</h4>
            <p className="text-lg text-gray-600 mb-8">
              Complete module quizzes to see your scores here
            </p>
          </div>
        )}

        {/* Final Exam Section (if taken) */}
        {examResult && (
          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800 border-b pb-4">
              <FiAward className="text-amber-600 text-4xl" /> Final Exam Result
            </h3>

            <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-3xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Exam Score */}
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="text-2xl font-bold text-gray-700 mb-2">Score</div>
                  <div className="text-6xl font-black text-indigo-700">
                    {examResult.score}%
                  </div>
                </div>

                {/* Status */}
                <div className={`text-center p-6 rounded-2xl shadow-lg ${examResult.passed
                    ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white'
                    : 'bg-linear-to-r from-red-500 to-rose-500 text-white'
                  }`}>
                  <div className="text-2xl font-bold mb-2">Status</div>
                  <div className="text-4xl font-black">
                    {examResult.passed ? "PASSED" : "FAILED"}
                  </div>
                </div>

                {/* Date */}
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="text-2xl font-bold text-gray-700 mb-2 flex items-center justify-center gap-2">
                    <FiCalendar /> Date
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    {formatDate(examResult.attemptedAt)}
                  </div>
                </div>

                {/* Action */}
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="text-2xl font-bold text-gray-700 mb-2">Action</div>
                  <div className="mt-4">
                    {examResult.passed ? (
                      <div className="text-lg font-bold text-emerald-600">
                        Certificate Ready!
                      </div>
                    ) : (
                      <div className="text-lg font-bold text-amber-600">
                        Retake Available
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              {/* <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white rounded-2xl">
                  <div className="text-4xl font-black text-emerald-700">
                    {Math.round((examResult.score * 20) / 100)}
                  </div>
                  <div className="text-lg text-gray-600">Correct Answers</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl">
                  <div className="text-4xl font-black text-rose-700">
                    {20 - Math.round((examResult.score * 20) / 100)}
                  </div>
                  <div className="text-lg text-gray-600">Incorrect Answers</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl">
                  <div className="text-4xl font-black text-blue-700">20</div>
                  <div className="text-lg text-gray-600">Total Questions</div>
                </div>
              </div> */}

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white rounded-2xl shadow">
                  <div className="text-4xl font-black text-emerald-700">
                    {examReview?.correct ?? "—"}
                  </div>
                  <div className="text-lg text-gray-600">Correct Answers</div>
                </div>

                <div className="text-center p-6 bg-white rounded-2xl shadow">
                  <div className="text-4xl font-black text-rose-700">
                    {examReview?.incorrect ?? "—"}
                  </div>
                  <div className="text-lg text-gray-600">Incorrect Answers</div>
                </div>

                <div className="text-center p-6 bg-white rounded-2xl shadow">
                  <div className="text-4xl font-black text-blue-700">
                    {examReview?.total ?? "—"}
                  </div>
                  <div className="text-lg text-gray-600">Total Questions</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="p-8 bg-linear-to-r from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="text-center">
          <h4 className="text-2xl font-bold text-gray-800 mb-4">Performance Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 bg-white rounded-2xl shadow">
              <div className="text-4xl font-black text-indigo-700">{averageQuizPercentage}%</div>
              <div className="text-lg text-gray-600">Quiz Average</div>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <div className="text-4xl font-black text-emerald-700">{passedModules}</div>
              <div className="text-lg text-gray-600">Modules Passed</div>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <div className="text-4xl font-black text-purple-700">
                {examResult ? `${examResult.score}%` : "N/A"}
              </div>
              <div className="text-lg text-gray-600">Final Exam</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate overall grade
const calculateOverallGrade = (examResult, quizAverage) => {
  if (!examResult) {
    // Only quizzes taken
    if (quizAverage >= 90) return "A+";
    if (quizAverage >= 80) return "A";
    if (quizAverage >= 70) return "B";
    if (quizAverage >= 60) return "C";
    if (quizAverage >= 50) return "D";
    return "F";
  }

  // Both exam and quizzes
  const overallScore = (examResult.score + quizAverage) / 2;

  if (overallScore >= 90) return "A+";
  if (overallScore >= 80) return "A";
  if (overallScore >= 70) return "B";
  if (overallScore >= 60) return "C";
  if (overallScore >= 50) return "D";
  return "F";
};

export default ScoreTable;