import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function PrivateRoutes({ children }) {
  const { isLoggedIn } = useAuth();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !token) {
      navigate("/login");
    } else if (!token) {
      navigate("/jwt-expired");
    }
  }, [isLoggedIn, token]);

  return <>{isLoggedIn && children}</>;
}
