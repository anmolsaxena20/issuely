import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../AuthContext/AuthContextProvider"

export default function Logout() {
    const navigate = useNavigate();
    const{setIsLogin} = useAuth();
    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        await fetch("/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        localStorage.removeItem("token");
        setIsLogin(false);
        navigate("/");
    };


    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
        >
            Logout
        </button>
    );
}
