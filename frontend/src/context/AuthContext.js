import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    http.get("/auth/me").then((r) => setUser(r.data)).catch(() => setUser(false));
  }, []);

  const logout = async () => {
    await http.post("/auth/logout").catch(() => {});
    setUser(false);
  };

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
