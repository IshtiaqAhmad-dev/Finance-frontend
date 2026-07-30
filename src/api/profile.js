import client from "./client";

export const getProfile = () => client.get("/profile").then((r) => r.data);

// data: { name, phone, avatarFile } — agar avatarFile diya to FormData use hoga
export const updateProfile = ({ avatarFile, ...fields }) => {
  if (avatarFile) {
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value);
    });
    formData.append("avatar", avatarFile);
    return client
      .put("/profile", formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then((r) => r.data);
  }
  return client.put("/profile", fields).then((r) => r.data);
};

export const deleteAccount = () => client.delete("/profile").then((r) => r.data);
