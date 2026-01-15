import React, { createContext, useState, useContext,useEffect } from 'react'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState('student')
  const [user, setUser] = useState();
  useEffect(() => {
    const refreshLogin = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/refresh", {
          method: "POST",
          credentials: "include", 
        });

        if (!res.ok) throw new Error("Not logged in");

        const data = await res.json();
        console.log("data" ,data)
        localStorage.setItem("token", data.accessToken);
        setUser(data.user);
        setRole(data.user.role)
        setIsLogin(true);
      } catch (err) {
        setUser(null);
        setIsLogin(false);
      }
    };

    refreshLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, role, setRole, user, setUser ,token:localStorage.getItem("token")}}>
      {children}
    </AuthContext.Provider >
  )
}

// making our constom hook which give the status of login
export default function useAuth() {
  return useContext(AuthContext);
}