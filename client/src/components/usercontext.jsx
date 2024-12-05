import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Create a custom hook to access the context
export const useUser = () => {
  return useContext(UserContext);
};

// Create the provider to wrap the app
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState(null);

  // Fetch data from localStorage on initial load
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedPassword = localStorage.getItem("password");
    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, password, setPassword }}>
      {children}
    </UserContext.Provider>
  );
};
