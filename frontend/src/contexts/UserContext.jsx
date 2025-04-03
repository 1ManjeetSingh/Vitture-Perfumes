import { createContext, useContext, useState, useEffect } from "react";
// Create the context
const UserContext = createContext();

// Provide user context to the entire app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Check if user details exist in local storage (helps with persistence)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Update user state and local storage when logging in
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Clear user data on logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = () => {
  return useContext(UserContext);
};
