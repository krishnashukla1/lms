
//============correct===============


// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import api from "../api/axios";

// export const useAuth = create(
//   persist(
//     (set, get) => ({
//       token: null,
//       role: null,

//       init: () => {
//         const token = localStorage.getItem("token");
//         const role = localStorage.getItem("role");

//         if (token && role) {
//           api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//           set({ token, role });
//         }
//       },

//       login: async (usernameOrEmail, password) => {
//         try {
//           let res;
//           let role = "";

//           if (usernameOrEmail.includes("@")) {
//             // Admin login
//             res = await api.post("/admin/login", {
//               email: usernameOrEmail.trim(),
//               password
//             });
//             role = "admin";
//           } else {
//             // Student login
//             res = await api.post("/student/login", {
//               username: usernameOrEmail.trim(),
//               password
//             });
//             role = "student";
//           }

//           const token = res.data.token;

//           // SAVE CORRECT KEYS ✔
//           localStorage.setItem("token", token);
//           localStorage.setItem("role", role);

//           api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//           set({ token, role });

//           return role;
//         } catch (err) {
//           throw new Error(err.response?.data?.message || "Login failed");
//         }
//       },

//       logout: () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("role");

//         delete api.defaults.headers.common["Authorization"];
//         set({ token: null, role: null });
//       }
//     }),
//     {
//       name: "auth-storage", // Zustand persistence
//       partialize: (state) => ({ token: state.token, role: state.role })
//     }
//   )
// );

// // Auto-init
// useAuth.getState().init();

//=================kp=============

// import { create } from "zustand";
// import axios from "axios";

// export const useAuth = create((set) => ({
//   user: null,
//   token: localStorage.getItem("token") || null,
//   role: localStorage.getItem("role") || null,

//   login: async (usernameOrEmail, password) => {
//     try {
//       const isEmail = usernameOrEmail.includes("@");

//       // Correct API endpoints
//       const endpoint = isEmail
//         ? "http://localhost:5000/api/admin/login"
//         : "http://localhost:5000/api/student/login";

//       // Correct request body based on backend
//       const payload = isEmail
//         ? { email: usernameOrEmail, password }
//         : { username: usernameOrEmail, password };

//       const res = await axios.post(endpoint, payload);
//       const data = res.data;

//       // For admin
//       const userData = data.admin || data.student;
//       const role = data.admin ? "admin" : "student";

//       // Save to localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", role);

//       set({
//         user: userData,
//         token: data.token,
//         role: role,
//       });

//       return role; // For redirecting in Login.jsx
//     } catch (err) {
//       console.error("Login Failed:", err.response?.data || err);
//       throw new Error(err.response?.data?.message || "Login failed");
//     }
//   },

//   logout: () => {
//     localStorage.clear();
//     set({ user: null, token: null, role: null });
//   },
// }));

//======today kp=========


// store/authStore.js
// import { create } from "zustand";
// import axios from "axios";

// const API_BASE = "http://localhost:5000/api";

// export const useAuth = create((set) => ({
//   user: null,
//   token: localStorage.getItem("token") || null,
//   role: localStorage.getItem("role") || null,

//   // Call this once when app starts (in App.jsx)
//   initAuth: () => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");

//     if (token && role) {
//       set({ token, role });
//       // Optional: verify token with backend
//       // axios.get("/auth/me")...
//     } else {
//       set({ token: null, role: null, user: null });
//     }
//   },

//   login: async (usernameOrEmail, password) => {
//     try {
//       const isEmail = usernameOrEmail.includes("@");
//       const endpoint = isEmail
//         ? `${API_BASE}/admin/login`
//         : `${API_BASE}/student/login`;

//       const payload = isEmail
//         ? { email: usernameOrEmail, password }
//         : { username: usernameOrEmail, password };

//       const res = await axios.post(endpoint, payload);
//       const { token, admin, student } = res.data;

//       const userData = admin || student;
//       const userRole = admin ? "admin" : "student";

//       // Save to localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", userRole);

//       set({
//         user: userData,
//         token,
//         role: userRole,
//       });

//       return userRole; // used for redirect in Login page
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

//=========================
import { create } from "zustand";
import api from "../api/axios";

export const useAuth = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,

  login: async (usernameOrEmail, password) => {
    try {
      const isEmail = usernameOrEmail.includes("@");

      const res = await api.post(
        isEmail ? "/admin/login" : "/student/login",
        isEmail
          ? { email: usernameOrEmail, password }
          : { username: usernameOrEmail, password }
      );

      const { token, admin, student } = res.data;

      const userData = admin || student;
      const userRole = admin ? "admin" : "student";

      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);

      set({
        user: userData,
        token,
        role: userRole,
      });

      return userRole;
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

