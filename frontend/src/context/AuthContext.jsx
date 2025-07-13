import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const decodedUser = jwtDecode(storedToken);

          // Check if token is expired
          if (decodedUser.exp * 1000 < Date.now()) {
            logout();
            return;
          }

          setUser(decodedUser);
          setToken(storedToken);
        } catch (error) {
          console.error("Invalid token:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    return !!user && !!token;
  };

  const isAdmin = () => {
    return user?.user_type === 1;
  };

  const isVolunteer = () => {
    return user?.user_type === 3;
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isVolunteer,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
