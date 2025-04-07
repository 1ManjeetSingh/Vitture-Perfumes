import { createContext, useContext, useState, useEffect } from "react";
// Create the context
const UserContext = createContext();

// Provide user context to the entire app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser.value);
    }
  }, []);


  const login = (data) => {

    setUser(data.user);
    const now = Date.now();

    const Token = {
      value: data.token,
      expiry: now + 7200000,
    };

    const User = {
      value: data.user,
      expiry: now + 7200000,
    };

    localStorage.setItem("user", JSON.stringify(User))
    localStorage.setItem("token", JSON.stringify(Token));  // ✅ stringify here!
    ;

  };


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
