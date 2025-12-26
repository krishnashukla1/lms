

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchEnrollments,
  fetchStudents,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../api/enrollmentApi";

import EnrollmentFormModal from "../components/EnrollmentFormModal";
import { FiEdit3, FiTrash2, FiPlus, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function AdminEnrollments() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: enrollments = [] } = useQuery({
    queryKey: ["enrollments"],
    queryFn: fetchEnrollments,
  });

  const { data: students = [] } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  // Modal state
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({
    id: "",
    studentId: "",
    courseType: "",
    duration: "1y",
    expiresAt: "",
    isActive: true,
  });

  // Create
  const createMutation = useMutation({
    mutationFn: createEnrollment,
    onSuccess: () => {
      toast.success("Enrollment Created");
      queryClient.invalidateQueries(["enrollments"]);
      setOpen(false);
    },
  });

  // Update
  const updateMutation = useMutation({
    mutationFn: updateEnrollment,
    onSuccess: () => {
      toast.success("Enrollment Updated");
      queryClient.invalidateQueries(["enrollments"]);
      setOpen(false);
    },
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: deleteEnrollment,
    onSuccess: () => {
      toast.success("Deleted Successfully");
      queryClient.invalidateQueries(["enrollments"]);
    },
  });

  // Submit handler
  const handleSubmit = () => {
    if (!selected.courseType || (!selected.id && !selected.studentId)) {
      toast.error("Please select student and course");
      return;
    }

    const payload = {
      courseType: selected.courseType,
      duration: selected.duration || "1y",
      isActive: selected.isActive,
    };

    // Only send expiresAt if manually set
    if (selected.expiresAt && selected.manualDate) {
      payload.expiresAt = selected.expiresAt;
    }

    if (selected.id) {
      updateMutation.mutate({ id: selected.id, payload });
    } else {
      createMutation.mutate({
        studentId: selected.studentId,
        ...payload,
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Page Title */}
        <div className="my-10 flex justify-center">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
            Manage Enrollments
          </h1>
        </div>

        {/* Buttons */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-gray-700 font-medium"
          >
            <FiArrowLeft className="w-5 h-5" /> Back
          </button>

          <button
            onClick={() => {
              setSelected({
                id: "",
                studentId: "",
                courseType: "",
                duration: "1y",
                expiresAt: "",
                isActive: true,
              });
              setOpen(true);
            }}
            className="cursor-pointer flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <FiPlus className="w-5 h-5" /> New Enrollment
          </button>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-x-auto mr">
          <table className="w-full min-w-[800px]">
            <thead className="bg-indigo-600 text-white ">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Course</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Enrolled</th>
                <th className="p-4">Expires</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {enrollments.map((en) => (
                <tr key={en._id} className="border-t hover:bg-gray-50 text-center ">
                  <td className="p-4">
                    <div className="font-semibold">{en.student?.name}</div>
                    <div className="text-sm text-gray-500">{en.student?.email}</div>
                  </td>

                  <td className="p-4 capitalize">{en.courseType}</td>

                  {/* FIXED — Duration uppercase OR fallback "-" */}
                  {/* <td className="p-4">
                    {en.duration ? en.duration.toUpperCase() : "-"}
                  </td> */}

                  <td className="p-4 font-medium">
                    {/* {en.duration === "3m" && "3 Months"}
                    {en.duration === "6m" && "6 Months"}
                    {en.duration === "1y" && "1 Year"} */}
                       {en.duration === "6m" && "6 Months"}
                    {en.duration === "9m" && "9 Months"}
                    {en.duration === "12m" && "12 Months"}
                    {!en.duration && "-"}
                  </td>
                  <td className="p-4">
                    {format(new Date(en.enrolledAt), "dd MMM yyyy")}
                  </td>

                  <td className="p-4">
                    {format(new Date(en.expiresAt), "dd MMM yyyy")}
                  </td>

                  <td className="p-4">
                    {en.isActive ? (
                      <span className="text-green-600 font-semibold">Active</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Inactive</span>
                    )}
                  </td>

                  <td className="p-4 flex gap-4 justify-center">
                    <FiEdit3
                    className="cursor-pointer "
                      onClick={() => {
                        setSelected({
                          id: en._id,
                          studentId: en.student?._id,
                          courseType: en.courseType,
                          duration: en.duration || "1y",
                          expiresAt: en.expiresAt ? format(new Date(en.expiresAt), "yyyy-MM-dd") : "",
                          enrolledAt: en.enrolledAt,
                          isActive: en.isActive,
                          manualDate: false,
                        });
                        setOpen(true);
                      }}
                    />

                    <FiTrash2
                      className="text-red-600 cursor-pointer hover:scale-110 "
                      onClick={() => {
                        if (window.confirm("Delete enrollment?")) {
                          deleteMutation.mutate(en._id);
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <EnrollmentFormModal
          open={open}
          onClose={() => setOpen(false)}
          students={students?.students || []}
          selected={selected}
          setSelected={setSelected}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

