import client from "./client";

export const getGoals = (params = {}) => client.get("/goals", { params }).then((r) => r.data);

export const getGoalById = (id) => client.get(`/goals/${id}`).then((r) => r.data);

export const createGoal = (data) => client.post("/goals", data).then((r) => r.data);

export const updateGoal = (id, data) => client.put(`/goals/${id}`, data).then((r) => r.data);

export const contributeToGoal = (id, amount) =>
  client.put(`/goals/${id}/contribute`, { amount }).then((r) => r.data);

export const deleteGoal = (id) => client.delete(`/goals/${id}`).then((r) => r.data);
