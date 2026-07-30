import client from "./client";

export const getTransactions = (params = {}) =>
  client.get("/transactions", { params }).then((r) => r.data);

export const getTransactionById = (id) =>
  client.get(`/transactions/${id}`).then((r) => r.data);

export const addTransaction = (data) =>
  client.post("/transactions", data).then((r) => r.data);

export const updateTransaction = (id, data) =>
  client.put(`/transactions/${id}`, data).then((r) => r.data);

export const deleteTransaction = (id) =>
  client.delete(`/transactions/${id}`).then((r) => r.data);

export const getTransactionsByDate = (date) =>
  client.get(`/transactions/by-date/${date}`).then((r) => r.data);

export const getSummary = () =>
  client.get("/transactions/summary").then((r) => r.data);
