import { motion } from "framer-motion";
import { FiFileText, FiUpload, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AssignmentSubmitCard = ({
  hasSubmitted = false,           // true → already submitted
  onSubmitClick = () => {},       // optional custom handler
  className = "",                 // extra classes if needed
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (hasSubmitted) return; // nothing to do when already submitted
    if (onSubmitClick) {
      onSubmitClick();
    } else {
      navigate("/assignment"); // default behaviour
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`
        backdrop-blur-xl 
        bg-linear-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 
        rounded-3xl shadow-xl border border-emerald-300/40 
        p-6 flex flex-col h-full ${className}`}
    >
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        {/* Icon */}
        <div className="p-4 bg-emerald-100 rounded-full mb-4">
          <FiFileText className="text-4xl text-emerald-600" />
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">Final Assignment</h3>
        <p className="text-sm text-gray-600 mb-6">One-time submission for the course</p>

        {/* Button / Status */}
        {hasSubmitted ? (
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white font-bold text-lg rounded-3xl shadow-lg cursor-default">
            <FiCheckCircle className="text-2xl" />
            Submitted
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="
              inline-flex items-center gap-3 
              px-8 py-5 
              bg-linear-to-r from-emerald-500 to-teal-600 
              hover:from-emerald-600 hover:to-teal-700 
              text-white font-bold text-lg 
              rounded-3xl shadow-xl 
              hover:shadow-emerald-500/50 
              transition-all"
          >
            <FiUpload className="text-2xl" />
            Submit Assignment
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default AssignmentSubmitCard;