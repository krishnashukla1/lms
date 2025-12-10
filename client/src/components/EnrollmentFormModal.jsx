// src/components/EnrollmentFormModal.jsx
// import { FiX } from "react-icons/fi";

// export default function EnrollmentFormModal({
//   open,
//   onClose,
//   students,
//   selected,
//   setSelected,
//   handleSubmit
// }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//       <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">
//             {selected?.id ? "Edit Enrollment" : "Create Enrollment"}
//           </h2>
//           <FiX className="cursor-pointer" size={22} onClick={onClose} />
//         </div>

//         {/* Select Student */}
//         <label className="text-sm font-semibold">Student</label>
//         <select
//           className="w-full border p-2 rounded mt-1 mb-4"
//           value={selected.studentId}
//           onChange={(e) =>
//             setSelected((prev) => ({ ...prev, studentId: e.target.value }))
//           }
//         >
//           <option value="">Select Student</option>
//           {students.map((stu) => (
//             <option key={stu._id} value={stu._id}>
//               {stu.name} ({stu.email})
//             </option>
//           ))}
//         </select>

//         {/* CourseType */}
//         <label className="text-sm font-semibold">Course Type</label>
//         <select
//           className="w-full border p-2 rounded mt-1 mb-4"
//           value={selected.courseType}
//           onChange={(e) =>
//             setSelected((prev) => ({ ...prev, courseType: e.target.value }))
//           }
//         >
//           <option value="">Select Course</option>
//           <option value="basic">Basic</option>
//           <option value="intermediate">Intermediate</option>
//           <option value="advanced">Advanced</option>
//         </select>

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
//         >
//           {selected?.id ? "Update Enrollment" : "Create Enrollment"}
//         </button>
//       </div>
//     </div>
//   );
// }

//===============stylish==========

// // src/components/EnrollmentFormModal.jsx
// import { FiX } from "react-icons/fi";

// export default function EnrollmentFormModal({
//   open,
//   onClose,
//   students,
//   selected,
//   setSelected,
//   handleSubmit
// }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//       <div className="bg-white/90 backdrop-blur-xl w-full max-w-md rounded-3xl p-6 shadow-2xl border border-gray-200 transition-all">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {selected?.id ? "Edit Enrollment" : "Create Enrollment"}
//           </h2>
//           <FiX
//             className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
//             size={24}
//             onClick={onClose}
//           />
//         </div>

//         {/* Select Student */}
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Student
//           </label>
//           <select
//             className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
//             value={selected.studentId}
//             onChange={(e) =>
//               setSelected((prev) => ({ ...prev, studentId: e.target.value }))
//             }
//           >
//             <option value="">Select Student</option>
//             {students.map((stu) => (
//               <option key={stu._id} value={stu._id}>
//                 {stu.name} ({stu.username})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Course Type */}
//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Course Type
//           </label>
//           <select
//             className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
//             value={selected.courseType}
//             onChange={(e) =>
//               setSelected((prev) => ({ ...prev, courseType: e.target.value }))
//             }
//           >
//             <option value="">Select Course</option>
//             <option value="basic">Basic</option>
//             <option value="intermediate">Intermediate</option>
//             <option value="advanced">Advanced</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit}
//           className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
//         >
//           {selected?.id ? "Update Enrollment" : "Create Enrollment"}
//         </button>
//       </div>
//     </div>
//   );
// }

//=====with duration=======

// src/components/EnrollmentFormModal.jsx
import { FiX } from "react-icons/fi";
import { useEffect } from "react";
import { format, addMonths, addYears } from "date-fns";

const durationOptions = [
  { value: "3m", label: "3 Months" },
  { value: "6m", label: "6 Months" },
  { value: "1y", label: "1 Year" },
];

export default function EnrollmentFormModal({
  open,
  onClose,
  students,
  selected,
  setSelected,
  handleSubmit,
}) {
  // Auto-calculate expiresAt when duration changes (only if not manually overridden)
  useEffect(() => {
    if (!selected.duration || selected.manualDate) return;

    const baseDate = selected.id
      ? new Date(selected.enrolledAt || Date.now())
      : new Date();

    let expires;
    if (selected.duration === "3m") expires = addMonths(baseDate, 3);
    else if (selected.duration === "6m") expires = addMonths(baseDate, 6);
    else expires = addYears(baseDate, 1);

    setSelected((prev) => ({
      ...prev,
      expiresAt: format(expires, "yyyy-MM-dd"),
    }));
  }, [selected.duration, selected.id, selected.enrolledAt]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {selected?.id ? "Edit Enrollment" : "New Enrollment"}
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-red-600 transition"
          >
            <FiX size={28} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Student - Only show when creating new */}
          {!selected?.id && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student <span className="text-red-500">*</span>
              </label>
              <select
                className="cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                value={selected.studentId || ""}
                onChange={(e) =>
                  setSelected((prev) => ({ ...prev, studentId: e.target.value }))
                }
                required
              >
                <option value="">Choose a student</option>
                {students.map((s) => (
                  <option key={s._ided} value={s._id}>
                    {s.name} ({s.username || s.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Course Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Course Type <span className="text-red-500">*</span>
            </label>
            <select
              className="cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={selected.courseType || ""}
              onChange={(e) =>
                setSelected((prev) => ({ ...prev, courseType: e.target.value }))
              }
            >
              <option value="">Select course</option>
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Duration
            </label>
            <select
              className="cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={selected.duration || "1y"}
              onChange={(e) =>
                setSelected((prev) => ({
                  ...prev,
                  duration: e.target.value,
                  manualDate: false,
                }))
              }
            >
              {durationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Expiry Date (Optional) LATTER IF NEED THEN UNCOMMENT*/}
          {/* <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Custom Expiry Date (Optional)
            </label>
            <input
              type="date"
              className="cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={selected.expiresAt || ""}
              onChange={(e) =>
                setSelected((prev) => ({
                  ...prev,
                  expiresAt: e.target.value,
                  manualDate: true,
                }))
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to auto-calculate from duration
            </p>
          </div> */}

          {/* Status Toggle (Only on Edit) */}
          {selected?.id && (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={selected.isActive}
                onChange={(e) =>
                  setSelected((prev) => ({ ...prev, isActive: e.target.checked }))
                }
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="isActive" className="font-medium text-gray-700">
                Enrollment Active
              </label>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-10">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="cursor-pointer flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            {selected?.id ? "Update Enrollment" : "Create Enrollment"}
          </button>
        </div>
      </div>
    </div>
  );
}
