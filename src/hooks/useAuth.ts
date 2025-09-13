import { useState, useEffect } from "react";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session
    const isAuth = localStorage.getItem("gtm_authenticated") === "true";
    setAuthState({
      isAuthenticated: isAuth,
      isLoading: false,
    });
  }, []);

  const login = () => {
    localStorage.setItem("gtm_authenticated", "true");
    setAuthState({
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem("gtm_authenticated");
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    logout,
  };
};