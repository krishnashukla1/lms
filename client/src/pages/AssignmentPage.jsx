
//===============correcxt====================================

// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { FiUpload, FiCheckCircle, FiFileText, FiArrowLeft } from "react-icons/fi";
// import { motion } from "framer-motion";

// export default function AssignmentPage() {
//   const [file, setFile] = useState(null);
//   const [courseType, setCourseType] = useState("basic"); // Fixed course
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const navigate = useNavigate();

//   // Check if assignment is already submitted for this course
//   useEffect(() => {
//     api.get("/final-assignments/assignment-status")
//       .then(res => {
//         setSubmitted(!!res.data[courseType]?.submittedAt);
//       })
//       .catch(() => { });
//   }, [courseType]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please select a file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("assignment", file);
//     formData.append("courseType", courseType);

//     try {
//       setLoading(true);

//       const response = await api.post("/final-assignments", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert(response.data.message || "Assignment submitted successfully!");

//       // Update submitted state
//       const res = await api.get(`/final-assignments/assignment-status?t=${Date.now()}`);
//       setSubmitted(!!res.data[courseType]?.submittedAt);

//     } catch (err) {
//       console.error("Submission failed:", err);
//       alert(err.response?.data?.message || "Submission failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // If assignment already submitted
//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-8">
//         <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
//           <FiCheckCircle className="mx-auto text-emerald-600 mb-8" size={120} />
//           <h1 className="text-6xl font-black text-emerald-700 mb-6">Submitted Successfully!</h1>
//           <p className="text-2xl text-gray-700 mb-12">Your final assignment has been received</p>
//           <div className="flex justify-center mt-10">
//             <button
//               onClick={() => navigate("/modules/basic")}
//               className="cursor-pointer flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 
//                rounded-xl text-lg font-semibold shadow-md hover:bg-emerald-700 
//                transition-all"
//             >
//               <FiArrowLeft size={20} />
//               Back to Course
//             </button>
//           </div>

//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 p-8">
//       <div className="max-w-3xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">

//           {/* Back Button Above Form */}


//           <button
//             onClick={() => navigate(-1)}
//             className="cursor-pointer flex items-center gap-2 mb-8 text-indigo-600 font-bold hover:text-indigo-800"
//           >
//             <FiArrowLeft size={20} /> Back
//           </button>


//           <div className="text-center mb-12">
//             <FiFileText className="mx-auto text-indigo-600 mb-6" size={80} />
//             <h1 className="text-5xl font-black bg-linear-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
//               Submit Final Assignment
//             </h1>
//             <p className="text-xl text-gray-600 mt-6">One-time submission to complete your course</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-10">

//             <div>
//               <label className="block text-2xl font-bold text-gray-800 mb-4">Upload Your Assignment</label>
//               {/* <div className="cursor-pointer border-4 border-dashed border-indigo-300 rounded-3xl p-16 text-center hover:border-indigo-500 transition">
//                 <FiUpload className="mx-auto text-indigo-600 mb-6" size={64} />
//                 <input
//                   type="file"
//                   accept=".pdf,.docx,.zip,.jpg,.jpeg,.png"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   className="hidden"
//                   id="file-upload"
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer text-xl font-bold text-indigo-700 hover:text-indigo-900">
//                   Click to select file
//                 </label>
//                 {file && <p className="mt-6 text-green-600 font-bold text-2xl">{file.name}</p>}
//               </div> */}


//               <label
//                 htmlFor="file-upload"
//                 className="cursor-pointer block border-4 border-dashed border-indigo-300 rounded-3xl p-16 text-center hover:border-indigo-500 transition"
//               >
//                 <FiUpload className="mx-auto text-indigo-600 mb-6" size={64} />

//                 <input
//                   type="file"
//                   accept=".pdf,.docx,.zip,.jpg,.jpeg,.png"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   className="hidden"
//                   id="file-upload"
//                 />

//                 <p className="text-xl font-bold text-indigo-700 hover:text-indigo-900">
//                   Click to select file
//                 </p>

//                 {file && (
//                   <p className="mt-6 text-green-600 font-bold text-2xl">{file.name}</p>
//                 )}
//               </label>


//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               disabled={loading}
//               className="cursor-pointer w-full bg-linear-to-r from-indigo-600 to-purple-700 text-white py-8 rounded-3xl text-3xl font-black shadow-2xl hover:shadow-3xl disabled:opacity-60"
//             >
//               {loading ? "Uploading..." : "Submit Final Assignment"}
//             </motion.button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

//====================

import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FiUpload, FiCheckCircle, FiFileText, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AssignmentPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const courseType =
    location.state?.courseType || params.courseType || "basic";

  // const courseNames = {
  //   basic: "Basic Web Development",
  //   intermediate: "Intermediate JavaScript",
  //   advanced: "Full Stack Mastery",
  // };

   const courseNames = {
  basic: "Basic Level",
  intermediate: "Intermediate Level",
  advanced: "Advanced Level",
};
  useEffect(() => {
    const checkSubmissionStatus = async () => {
      try {
        const res = await api.get("/final-assignments/assignment-status");
        const isSubmitted = !!res.data[courseType]?.submittedAt;
        setSubmitted(isSubmitted);
      } catch (err) {
        console.error("Failed to check assignment status:", err);
      }
    };
    checkSubmissionStatus();
  }, [courseType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file to upload");

    const formData = new FormData();
    formData.append("assignment", file);
    formData.append("courseType", courseType);

    try {
      setLoading(true);
      const response = await api.post("/final-assignments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message || "Assignment submitted successfully!");
      setSubmitted(true);
      setFile(null);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Submission failed. Please try again.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center"
        >
          <FiCheckCircle className="mx-auto text-emerald-600 mb-8" size={120} />
          <h1 className="text-6xl font-black text-emerald-700 mb-6">
            Submitted Successfully!
          </h1>
          <p className="text-2xl text-gray-700 mb-12">
            Your final assignment for <strong>{courseNames[courseType]}</strong> has been received.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center gap-3 mx-auto bg-emerald-600 text-white px-8 py-4 
            rounded-2xl text-xl font-bold shadow-lg hover:bg-emerald-700 transition-all duration-300"
          >
            <FiArrowLeft size={24} />
            Back to Course
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100"
        >
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center gap-2 mb-8 text-indigo-600 font-semibold text-lg hover:text-indigo-800 transition"
          >
            <FiArrowLeft size={22} /> Back
          </button>

          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Course: <span className="text-indigo-600">{courseNames[courseType]}</span>
          </h2>

          <div className="text-center mb-5">
            <FiFileText className="mx-auto text-indigo-600 mb-6" size={80} />
            <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
              Submit Final Assignment
            </h1>
            <p className="text-xl text-gray-600 mt-6">
              One-time submission • Cannot be changed after upload
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-6">
                Upload Your Project Files
              </label>

              <label
                htmlFor="file-upload"
                className="block border-4 border-dashed border-indigo-300 
             rounded-3xl p-10 text-center
             hover:border-indigo-500 hover:bg-indigo-50 
             transition-all duration-300 cursor-pointer"
              >
                <FiUpload className="mx-auto text-indigo-600 mb-4" size={50} />
                <p className="text-xl font-bold text-indigo-700">
                  Click to select your assignment
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                  Supported: PDF, DOCX, ZIP, Images
                </p>

                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf,.docx,.zip,.jpg,.jpeg,.png,.gif"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />

                {file && (
                  <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-2xl">
                    <p className="text-green-700 font-bold text-lg">
                      Selected: {file.name}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </label>

            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !file}
              className="cursor-pointer w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white 
              py-5 rounded-3xl text-3xl font-black shadow-2xl 
              disabled:opacity-50 disabled:cursor-not-allowed 
              transition-all duration-300"
            >
              {loading ? "Uploading Assignment..." : "Submit Final Assignment"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
