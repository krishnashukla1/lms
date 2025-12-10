// import api from "./axios";  // Your axios instance

// export const fetchEnrollments = () => api.get("/enrollments/all");
// export const fetchStudents = () => api.get("/students");  // NEW: Fetch all students (implement backend route)
// export const createEnrollment = (data) => api.post("/enrollments", data);
// export const updateEnrollment = (id, data) => api.put(`/enrollments/${id}`, data);
// export const deleteEnrollment = (id) => api.delete(`/enrollments/${id}`);


// src/api/enrollmentApi.js
import api from "./axios";

export const fetchEnrollments = async () => {
  const { data } = await api.get("/enrollments/all");
  return data;
};

export const fetchStudents = async () => {
  const { data } = await api.get("/admin/students"); 
  return data;       // MUST HAVE THIS ROUTE
};

export const createEnrollment = async (payload) => {
  const { data } = await api.post("/enrollments", payload);
  return data;
};

export const updateEnrollment = async ({ id, payload }) => {
  const { data } = await api.put(`/enrollments/${id}`, payload);
  return data;
};

export const deleteEnrollment = async (id) => {
  const { data } = await api.delete(`/enrollments/${id}`);
  return data;
};
