import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const isAuthenticated = () => {
    return !!currentUser; 
  };

  const isLogged = isAuthenticated();

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isAuthenticated, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


