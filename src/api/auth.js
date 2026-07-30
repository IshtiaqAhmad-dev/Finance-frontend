import client from "./client";

export const signupApi = (data) => client.post("/auth/signup", data).then((r) => r.data);
export const loginApi = (data) => client.post("/auth/login", data).then((r) => r.data);
export const getMeApi = () => client.get("/auth/me").then((r) => r.data);
export const forgotPasswordApi = (email) =>
  client.post("/auth/forgot-password", { email }).then((r) => r.data);
export const resetPasswordApi = (token, password) =>
  client.put(`/auth/reset-password/${token}`, { password }).then((r) => r.data);
