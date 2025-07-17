import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/slices/userSlice";
import { selectUserInfo } from "@/redux/selectors/userSelectors";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

interface SignOutProps {
  className?: string;
  children?: React.ReactNode;
}
const SignOut: React.FC<SignOutProps> = ({ className, children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userType } = useSelector(selectUserInfo) ?? {};

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user_info");
    sessionStorage.removeItem("authToken");

    dispatch(logout());

    toast.success("Signed out", { description: "See you soon!" });

    const role = (userType ?? "").toUpperCase();
    navigate(role === "ADMIN" ? "/admin-login" : "/login", { replace: true });
  };

  return (
    <button onClick={handleSignOut} className={className}>
      {children ?? (
        <>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Sign Out</span>
        </>
      )}
    </button>
  );
};

export default SignOut;
