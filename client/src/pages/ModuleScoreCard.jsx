import React from "react";
import { FiCheckCircle, FiXCircle, FiBarChart2 } from "react-icons/fi";
import { motion } from "framer-motion";

const ModuleScoreCard = ({ module, score, total, passed, date, timeTaken }) => {
  const percentage = total > 0 ? ((score / total) * 100).toFixed(2) : 0;
  
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-6 text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">{module}</h3>
          <FiBarChart2 className="text-3xl" />
        </div>
      </div>
      
      {/* Score Details */}
      <div className="p-6">
        {/* Marks Row */}
        <div className="flex justify-between items-center mb-6 p-4 bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl">
          <div className="text-xl font-bold text-gray-700">Marks</div>
          <div className="text-4xl font-black text-indigo-700">
            {score}/{total}
          </div>
        </div>
        
        {/* Percentage Row */}
        <div className="flex justify-between items-center mb-6 p-4 bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl">
          <div className="text-xl font-bold text-gray-700">Percentage</div>
          <div className="text-3xl font-black text-rose-700">
            {percentage}%
          </div>
        </div>
        
        {/* Status Row */}
        <div className="flex justify-between items-center mb-6 p-4 bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl">
          <div className="text-xl font-bold text-gray-700">Status</div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold ${
            passed 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {passed ? (
              <>
                <FiCheckCircle /> PASSED
              </>
            ) : (
              <>
                <FiXCircle /> FAILED
              </>
            )}
          </div>
        </div>
        
        {/* Date & Time */}
        {date && (
          <div className="text-center text-gray-600 text-sm p-4 border-t border-gray-200">
            <div>Completed on: {date}</div>
            {timeTaken && <div>Time taken: {timeTaken}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleScoreCard;