import { createContext, useContext, useState, useEffect } from "react";
// Create the context
const UserContext = createContext();

// Provide user context to the entire app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [exp, setExpiry] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const Token = JSON.parse(localStorage.getItem("token"));

    if (!Token || !storedUser || (Token.expiry < Date.now())) {
      logout();
    } else if (storedUser && (storedUser.expiry >= Date.now())) {
      setUser(storedUser.value);
    }
  }, []);

  const login = (data) => {

    setUser(data.user);
    const now = Date.now();
    setExpiry(now + 3600000);

    const Token = {
      value: data.token,
      expiry: now + 3600000,
    };

    const User = {
      value: data.user,
      expiry: now + 3600000,
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
    <UserContext.Provider value={{ user, login, logout, exp }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = () => {
  return useContext(UserContext);
};
