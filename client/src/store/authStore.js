// store/authStore.js
import { create } from "zustand";
import axios from "axios";

const API_BASE = "https://lms-backend-kicx.onrender.com/api";

export const useAuth = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,

  // Call this once when app starts (in App.jsx)
  initAuth: () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      set({ token, role });
      // Optional: verify token with backend
      // axios.get("/auth/me")...
    } else {
      set({ token: null, role: null, user: null });
    }
  },

  login: async (usernameOrEmail, password) => {
    try {
      const isEmail = usernameOrEmail.includes("@");
      const endpoint = isEmail
        ? `${API_BASE}/admin/login`
        : `${API_BASE}/student/login`;

      const payload = isEmail
        ? { email: usernameOrEmail, password }
        : { username: usernameOrEmail, password };

      const res = await axios.post(endpoint, payload);
      const { token, admin, student } = res.data;

      const userData = admin || student;
      const userRole = admin ? "admin" : "student";

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);

      set({
        user: userData,
        token,
        role: userRole,
      });

      return userRole; // used for redirect in Login page
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    set({ user: null, token: null, role: null });
  },
}));

//=========================

// import { create } from "zustand";
// import api from "../api/axios";

// export const useAuth = create((set) => ({
//   user: null,
//   token: localStorage.getItem("token") || null,
//   role: localStorage.getItem("role") || null,

//   login: async (usernameOrEmail, password) => {
//     try {
//       const isEmail = usernameOrEmail.includes("@");

//       const res = await api.post(
//         isEmail ? "/admin/login" : "/student/login",
//         isEmail
//           ? { email: usernameOrEmail, password }
//           : { username: usernameOrEmail, password }
//       );

//       const { token, admin, student } = res.data;

//       const userData = admin || student;
//       const userRole = admin ? "admin" : "student";

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", userRole);

//       set({
//         user: userData,
//         token,
//         role: userRole,
//       });

//       return userRole;
//     } catch (err) {
//       console.error("Login error:", err.response?.data || err.message);
//       throw err;
//     }
//   },

//   logout: () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     set({ user: null, token: null, role: null });
//   },
// }));

