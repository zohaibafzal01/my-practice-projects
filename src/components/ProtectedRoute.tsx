import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "@/redux/selectors/userSelectors";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector(selectUserInfo);  

  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
