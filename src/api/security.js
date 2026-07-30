import client from "./client";

export const changePassword = (data) =>
  client.put("/security/change-password", data).then((r) => r.data);

export const setPin = (pin) => client.put("/security/pin", { pin }).then((r) => r.data);

export const verifyPin = (pin) =>
  client.post("/security/pin/verify", { pin }).then((r) => r.data);

export const removePin = () => client.delete("/security/pin").then((r) => r.data);

export const toggleFingerprint = (enabled) =>
  client.put("/security/fingerprint", { enabled }).then((r) => r.data);
