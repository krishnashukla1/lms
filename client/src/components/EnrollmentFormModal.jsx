

// src/components/EnrollmentFormModal.jsx
import { FiX } from "react-icons/fi";
import { useEffect } from "react";
import { format, addMonths, addYears } from "date-fns";

const durationOptions = [
 { value: "6m", label: "6 Months" },
  { value: "9m", label: "9 Months" },
  { value: "12m", label: "12 Months" },
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
    if (selected.duration === "6m") expires = addMonths(baseDate, 6);
    else if (selected.duration === "9m") expires = addMonths(baseDate, 9);
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
