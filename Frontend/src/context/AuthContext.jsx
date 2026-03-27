import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const raw = localStorage.getItem('hci_session');
    return raw ? JSON.parse(raw) : null;
  });

  const login = (payload) => {
    setSession(payload);
    localStorage.setItem('hci_session', JSON.stringify(payload));
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem('hci_session');
  };

  const value = useMemo(
    () => ({
      session,
      login,
      logout,
      isAuthenticated: Boolean(session?.token)
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
