import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AdminOverview } from "./sections/AdminOverview";
import { UserManagement } from "./sections/UserManagement";
import { LeadManagement } from "./sections/LeadManagement";
import { ReplacementRequests } from "./sections/ReplacementRequests";
import { PerformanceAnalytics } from "./sections/PerformanceAnalytics";
import { SalesReporting } from "./sections/SalesReporting";
import { SubscriptionManagement } from "./sections/SubscriptionManagement";
import { NotificationCenter } from "./sections/NotificationCenter";
import CreateProfilePage from "./sections/ProfilePage";
import { selectUserInfo } from "@/redux/selectors/userSelectors";
import { useSelector } from "react-redux";
import ReviewsPage from "./sections/ReviewsPage";

interface UserActionMenuProps {
  userName?: string;
}

const UserActionMenu: React.FC<UserActionMenuProps> = ({
  userName = "Admin User",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfile = () => {
    setIsOpen(false);
    navigate("/admin/profile");
  };

  const handleLogout = () => {
    localStorage.clear();
    console.log("Logout user");
    setIsOpen(false);
    navigate("/admin-login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-elevated-bg border border-input-border hover:bg-cream-primary/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cream-primary/50"
      >
        <div className="w-8 h-8 rounded-full bg-cream-primary/20 flex items-center justify-center">
          <User className="w-4 h-4 text-cream-primary" />
        </div>
        <span className="text-sm font-medium text-primary-text hidden md:block">
          {userName}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-secondary-text transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-40 bg-elevated-bg border border-input-border rounded-lg shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
            {/* Menu Options */}
            <div className="py-2">
              {/* Profile Option */}
              <button
                onClick={handleProfile}
                className="w-full flex items-center px-4 py-2 text-sm text-primary-text hover:bg-cream-primary/10 transition-colors duration-200 focus:outline-none focus:bg-cream-primary/10"
              >
                <User className="w-4 h-4 mr-3 text-cream-primary" />
                <span>View Profile</span>
              </button>

              {/* Divider */}
              <div className="border-t border-input-border my-1"></div>

              {/* Logout Option */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200 focus:outline-none focus:bg-red-500/10"
              >
                <LogOut className="w-4 h-4 mr-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export function AdminContent() {
  // Get the current route and extract the section
  const location = useLocation();
  const activeSection = location.pathname.split("/").pop() || "overview";
  const userInfo = useSelector(selectUserInfo);

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <AdminOverview />;
      case "users":
        return <UserManagement />;
      case "leads":
        return <LeadManagement />;
      case "replacements":
        return <ReplacementRequests />;
      case "analytics":
        return <PerformanceAnalytics />;
      case "sales":
        return <SalesReporting />;
      case "subscriptions":
        return <SubscriptionManagement />;
      case "reviews":
        return <ReviewsPage />;
      case "profile":
        return <CreateProfilePage />;
      case "notifications":
        return <NotificationCenter />;
      default:
        return <AdminOverview />;
    }
  };

  const getSectionTitle = (section: string) => {
    const titles: { [key: string]: string } = {
      overview: "Overview",
      users: "User Management",
      leads: "Lead Management",
      replacements: "Replacement Requests",
      analytics: "Performance Analytics",
      sales: "Sales Reporting",
      subscriptions: "Subscriptions",
      reviews: "Reviews",
      profile: "Profile",
      notifications: "Notifications",
    };
    return titles[section] || "Overview";
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-elevated-bg/90 backdrop-blur-md border-b border-input-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="text-cream-primary hover:text-primary-text" />
            <div>
              <h1 className="text-2xl font-bold text-cream-primary">
                Admin Dashboard
              </h1>
              <p className="text-secondary-text text-sm">
                {getSectionTitle(activeSection)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs bg-cream-primary/20 text-cream-primary px-3 py-1 rounded border border-cream-primary/50">
              ADMIN ACCESS
            </div>
            {/* User Action Menu */}
            <UserActionMenu
              userName={userInfo?.adminRef?.name || "Admin User"}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-dark-base">{renderContent()}</main>
    </div>
  );
}
