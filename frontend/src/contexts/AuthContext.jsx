import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [errorMessage, setErrorMessage] = useState();
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState(
    () => localStorage.getItem("token") ?? null
  );
  const [adminPhotos, setAdminPhotos] = useState([]);

  const navigate = useNavigate();

  function handleLogin(payload) {
    storeToken(payload.token);
    setIsLoggedIn(true);
    setUser(payload);
    setTimeout(() => {
      navigate("/admin/photos");
    });
  }

  useEffect(() => {
    if (user && user.user && user.user.id) {
      setUserId(user.user.id);
    }
  }, [handleLogin]);

  function handleLogout() {
    setIsLoggedIn(false);
    setUser({});
    setToken(null);
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  function storeToken(token) {
    setToken(token);
    localStorage.setItem("token", token);
  }

  const values = {
    isLoggedIn,
    user,
    setUser,
    token,
    handleLogin,
    handleLogout,
    setErrorMessage,
    adminPhotos,
    setAdminPhotos,
    userId,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
