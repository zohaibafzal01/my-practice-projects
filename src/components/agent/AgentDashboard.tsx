import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import { AgentOverview } from "./sections/AgentOverview";
import { AgentLeadsTable } from "./sections/AgentLeadsTable";
import { AgentPerformanceAnalytics } from "./sections/AgentPerformanceAnalytics";
import { AgentSubscriptionBilling } from "./sections/AgentSubscriptionBilling";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateProfilePage from "../admin/sections/ProfilePage";
import { useNavigate } from "react-router-dom";

interface UserActionMenuProps {
  userName?: string;
}

const UserActionMenu: React.FC<UserActionMenuProps> = ({
  userName = "Agent User",
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
    console.log("Navigate to profile");
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    console.log("Logout user");
    setIsOpen(false);
    navigate("/auth");
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

export function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-elevated-bg/90 backdrop-blur-md border-b border-input-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="text-cream-primary hover:text-primary-text" />
            <div>
              <h1 className="text-2xl font-bold text-cream-primary">
                Agent Dashboard
              </h1>
              <p className="text-secondary-text text-sm">
                Manage your leads and track performance
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs bg-cream-primary/20 text-cream-primary px-3 py-1 rounded border border-cream-primary/50">
              AGENT ACCESS
            </div>
            {/* User Action Menu */}
            <UserActionMenu userName="Jane Smith" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-dark-base">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-elevated-bg backdrop-blur-md border border-input-border">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-cream-primary/20 data-[state=active]:text-cream-primary"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="leads"
              className="data-[state=active]:bg-cream-primary/20 data-[state=active]:text-cream-primary"
            >
              My Leads
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-cream-primary/20 data-[state=active]:text-cream-primary"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="data-[state=active]:bg-cream-primary/20 data-[state=active]:text-cream-primary"
            >
              Subscription
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-cream-primary/20 data-[state=active]:text-cream-primary"
            >
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <AgentOverview />
          </TabsContent>

          <TabsContent value="leads" className="mt-8">
            <AgentLeadsTable />
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <AgentPerformanceAnalytics />
          </TabsContent>

          <TabsContent value="billing" className="mt-8">
            <AgentSubscriptionBilling />
          </TabsContent>

          <TabsContent value="profile" className="mt-8">
            <CreateProfilePage />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
