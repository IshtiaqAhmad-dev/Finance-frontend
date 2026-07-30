import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const UPLOADS_BASE_URL = import.meta.env.VITE_UPLOADS_BASE_URL || "http://localhost:5000";

const client = axios.create({
  baseURL: BASE_URL,
});

// Har request ke sath token attach karna (agar login hai)
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Agar token invalid/expire ho jaye (401) to user ko login pe bhej dena
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (!window.location.pathname.startsWith("/auth")) {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

// Har error se ek readable message nikalne ki helper (backend { success, message } format follow karta hai)
export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

// Full image URL banana (avatar path backend se relative "/uploads/..." aata hai)
export const resolveImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${UPLOADS_BASE_URL}${path}`;
};

export default client;
