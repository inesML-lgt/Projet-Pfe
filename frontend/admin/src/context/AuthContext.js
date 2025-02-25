import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "axiosApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/css/sweetAlertStyle.css";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/login/", {
        email,
        password,
      });

      const { access_token, refresh_token } = response.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      axiosInstance.defaults.headers["Authorization"] =
        "Bearer " + access_token;

      const userResponse = await axiosInstance.get("/details/");
      const user = userResponse.data;

      setCurrentUser(user);
      setIsLoggedIn(true);
      navigate("/admin/index");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Invalid Credentials",
          text: "Invalid Email or Password",
          customClass: {
            container: "custom-swal-container",
          },
        });
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    setCurrentUser(null);
    delete axiosInstance.defaults.headers["Authorization"];
    navigate("/auth/login");
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      const isAuthenticated = !!accessToken && !!refreshToken;
      setIsLoggedIn(isAuthenticated);

      if (isAuthenticated) {
        const userResponse = await axiosInstance.get("/details");
        const user = userResponse.data;
        setCurrentUser(user);
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const value = {
    isLoggedIn,
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
