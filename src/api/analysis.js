import client from "./client";

export const getTrend = (params = {}) =>
  client.get("/analysis/trend", { params }).then((r) => r.data);

export const getCategoryBreakdown = (params = {}) =>
  client.get("/analysis/category-breakdown", { params }).then((r) => r.data);

export const getReportSummary = (params = {}) =>
  client.get("/analysis/summary", { params }).then((r) => r.data);
