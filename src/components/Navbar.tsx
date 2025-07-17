import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import leadslogo from "../../public/leadslogo.svg";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/redux/selectors/userSelectors";
const Navbar = () => {
  const navigate = useNavigate();

  const userInfo = useSelector(selectUserInfo);

  const token =
    userInfo?.token ||
    sessionStorage.getItem("authToken") ||
    localStorage.getItem("authToken");

  const role = (
    userInfo?.userType ??
    localStorage.getItem("userRole") ??
    ""
  ).toUpperCase();

  const dashPath = role === "ADMIN" ? "/admin/overview" : "/dashboard";

  const handleScrollNavigation = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    if (window.location.pathname !== "/") navigate("/");

    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={leadslogo} alt="Londen Leads" />
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-[#E2DCD5] hover:text-cyan-100 transition-colors"
            >
              Home
            </Link>
            <a
              href="#features"
              onClick={(e) => handleScrollNavigation(e, "features")}
              className="text-[#F8FAFC] hover:text-[#F8FAFC] text-[16px] transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleScrollNavigation(e, "testimonials")}
              className="text-[#F8FAFC] hover:text-[#F8FAFC] text-[16px] transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleScrollNavigation(e, "pricing")}
              className="text-[#F8FAFC] hover:text-[#F8FAFC] text-[16px] transition-colors"
            >
              Pricing
            </a>
            <Link
              to="/about"
              className="text-[#F8FAFC] hover:text-[#F8FAFC] text-[16px] transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-[#F8FAFC] hover:text-[#F8FAFC] text-[16px] transition-colors"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {token ? (
              <Link to={dashPath}>
                <Button className="bg-[#E2DCD5] hover:bg-[#E2DCD5] text-[#0A0A0F] text-[14px] font-semibold">
                  {role === "ADMIN" ? "Admin Dashboard" : "Dashboard"}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="bg-[#E2DCD5] hover:bg-[#E2DCD5] text-[#0A0A0F] text-[14px] font-semibold ">
                  Login / Signup
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
