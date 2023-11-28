// AuthContext.js

import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ role: null });

  // function to update user state
  const loginUser = (userData) => {
    setUser(userData);
  };

  // ... other auth related functions ...

  return (
    <AuthContext.Provider value={{ user, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};