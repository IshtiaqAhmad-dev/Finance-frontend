import client from "./client";

export const getNotifications = (params = {}) =>
  client.get("/notifications", { params }).then((r) => r.data);

export const markAsRead = (id) =>
  client.put(`/notifications/${id}/read`).then((r) => r.data);

export const markAllAsRead = () =>
  client.put("/notifications/read-all").then((r) => r.data);

export const deleteNotification = (id) =>
  client.delete(`/notifications/${id}`).then((r) => r.data);

export const getPreferences = () =>
  client.get("/notifications/preferences").then((r) => r.data);

export const updatePreferences = (data) =>
  client.put("/notifications/preferences", data).then((r) => r.data);
