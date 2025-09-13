import { useState, useEffect } from 'react';
import { getAuthSession, clearAuthSession } from '@/lib/auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing session on mount
    const hasSession = getAuthSession();
    setIsAuthenticated(hasSession);
    setIsLoading(false);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearAuthSession();
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  };
}