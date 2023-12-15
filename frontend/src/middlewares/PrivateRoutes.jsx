import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function PrivateRoutes({ children }) {
  const { isLoggedIn } = useAuth();
  const { tokenIsValid } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || !tokenIsValid) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return <>{isLoggedIn && children}</>;
}
