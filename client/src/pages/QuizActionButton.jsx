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
