import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { loginApi, signupApi, getMeApi } from "../api/auth";
import { getErrorMessage } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [initializing, setInitializing] = useState(true);

  // App load hote hi, agar token hai to /auth/me se fresh profile verify karna
  useEffect(() => {
    const verify = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setInitializing(false);
        return;
      }
      try {
        const res = await getMeApi();
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } finally {
        setInitializing(false);
      }
    };
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistSession = (data) => {
    const { token: newToken, ...userData } = data;
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const login = useCallback(async ({ email, password }) => {
    try {
      const res = await loginApi({ email, password });
      persistSession(res.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  }, []);

  const signup = useCallback(async ({ name, email, password, phone }) => {
    try {
      const res = await signupApi({ name, email, password, phone });
      persistSession(res.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  // Profile update hone ke baad (name/phone/avatar) local user cache refresh karna
  const updateLocalUser = useCallback((partial) => {
    setUser((prev) => {
      const next = { ...prev, ...partial };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        initializing,
        login,
        signup,
        logout,
        updateLocalUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
