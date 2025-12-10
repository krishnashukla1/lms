// src/pages/QuizActionButton.jsx
// import { motion } from "framer-motion";
// import { FiAward, FiBookOpen } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// export default function QuizActionButton({ module }) {
//   const navigate = useNavigate();
//   const { _id, completed, hasQuiz, unlocked } = module;

//   const isNext = unlocked && !completed; // Can start quiz
//   const isLocked = !unlocked || !hasQuiz; // Locked or no quiz

//   // Already completed with quiz → Review button
//   if (completed && hasQuiz) {
//     return (
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => navigate(`/quiz/review/${_id}`)}
//         className="w-full max-w-md mx-auto px-10 py-5 rounded-3xl font-bold text-xl flex items-center justify-center gap-4 bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-xl hover:shadow-2xl transition-all"
//       >
//         <FiBookOpen className="text-2xl" />
//         Review Quiz
//       </motion.button>
//     );
//   }

//   // Locked or no quiz → Disabled button
//   if (isLocked) {
//     return (
//       <button
//         disabled
//         className="w-full max-w-md mx-auto px-10 py-5 rounded-3xl font-bold text-xl flex items-center justify-center gap-4 bg-gray-300 text-gray-500 cursor-not-allowed"
//       >
//         <FiAward className="text-2xl" />
//         {hasQuiz ? "Locked" : "No Quiz"}
//       </button>
//     );
//   }

//   // Can start quiz
//   return (
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={() => navigate(`/quiz/module/${_id}`)}
//       className="w-full max-w-md mx-auto px-10 py-5 rounded-3xl font-bold text-xl flex items-center justify-center gap-4 bg-linear-to-r from-indigo-600 to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all"
//     >
//       <FiAward className="text-2xl" />
//       Start Quiz
//     </motion.button>
//   );
// }

//==================kp==============
// import { motion } from "framer-motion";
// import { FiAward, FiBookOpen, FiLock } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// export default function QuizActionButton({ module }) {
//   const navigate = useNavigate();
//   const { _id, completed, hasQuiz, unlocked } = module;

//   const isNext = unlocked && !completed;
//   const isLocked = !unlocked;

//   // ✔ Completed quiz → Review Quiz button
//   if (completed && hasQuiz) {
//     return (
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => navigate(`/quiz/review/${_id}`)}
//         className="w-full px-10 py-5 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-bold text-xl rounded-3xl shadow-xl hover:shadow-2xl flex items-center justify-center gap-4"
//       >
//         <FiBookOpen size={28} />
//         Review Quiz
//       </motion.button>
//     );
//   }

//   // ✔ Locked or no quiz → Disabled button
//   if (isLocked || !hasQuiz) {
//     return (
//       <button
//         disabled
//         className="w-full px-10 py-5 bg-gray-300 text-gray-500 font-bold text-xl rounded-3xl flex items-center justify-center gap-4 cursor-not-allowed"
//       >
//         <FiLock size={28} />
//         {hasQuiz ? "Locked" : "No Quiz"}
//       </button>
//     );
//   }

//   // ✔ Quiz available → Start Quiz button
//   return (
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={() => navigate(`/quiz/module/${_id}`)}
//       className="w-full px-10 py-5 bg-linear-to-r from-indigo-600 to-purple-700 text-white font-bold text-xl rounded-3xl shadow-xl hover:shadow-2xl flex items-center justify-center gap-4 animate-pulse"
//     >
//       <FiAward size={28} />
//       Start Quiz Now
//     </motion.button>
//   );
// }

//=============11 pm 6 dec=========

import { motion } from "framer-motion";
import { FiAward, FiBookOpen, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function QuizActionButton({ module }) {
  const navigate = useNavigate();
  const { _id, completed, hasQuiz, unlocked } = module;

  if (completed && hasQuiz) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(`/quiz/review/${_id}`)}
        className="w-full py-6 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-bold text-2xl rounded-3xl shadow-2xl flex items-center justify-center gap-4"
      >
        <FiBookOpen size={32} />
        Review Quiz
      </motion.button>
    );
  }

  if (!unlocked || !hasQuiz) {
    return (
      <button disabled className="w-full py-6 bg-gray-300 text-gray-600 font-bold text-2xl rounded-3xl flex items-center justify-center gap-4 cursor-not-allowed">
        <FiLock size={32} />
        {hasQuiz ? "Locked" : "No Quiz"}
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(`/quiz/module/${_id}`)}
      className="w-full py-6 bg-linear-to-r from-emerald-600 to-teal-600 text-white font-bold text-2xl rounded-3xl shadow-2xl flex items-center justify-center gap-4 animate-pulse"
    >
      <FiAward size={32} />
      Start Quiz
    </motion.button>
  );
}
