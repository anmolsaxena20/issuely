import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../AuthContext/AuthContextProvider"

export default function Logout() {
    const navigate = useNavigate();
    const{setIsLogin} = useAuth();
    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(!res.ok) throw new Error("unable to logout");
        localStorage.removeItem("token");
        setIsLogin(false);
        navigate("/");
    };


    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-linear-to-br from-fuchsia-400 to bg-pink-800  hover:rounded-2xl hover:bg-pink-900  rounded   cursor-pointer"
        >
            Logout
        </button>
    );
}
