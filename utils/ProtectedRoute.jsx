import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../src/context/StoreContextProvider";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, roll } = useContext(StoreContext);

  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  if (!allowedRoles.includes(roll)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
