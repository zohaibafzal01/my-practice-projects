import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  User,
  UserCheck,
  RotateCcw,
  BarChart3,
  DollarSign,
  CreditCard,
  Bell,
  Shield,
} from "lucide-react";

const adminMenuItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    id: "overview",
    route: "/admin/overview",
  },
  {
    title: "User Management",
    icon: Users,
    id: "users",
    route: "/admin/users",
  },
  {
    title: "Lead Management",
    icon: UserCheck,
    id: "leads",
    route: "/admin/leads",
  },
  {
    title: "Replacement Requests",
    icon: RotateCcw,
    id: "replacements",
    route: "/admin/replacements",
  },
  {
    title: "Performance Analytics",
    icon: BarChart3,
    id: "analytics",
    route: "/admin/analytics",
  },
  // {
  //   title: "Sales Reporting",
  //   icon: DollarSign,
  //   id: "sales",
  //   route: "/admin/sales",
  // },
  {
    title: "Subscriptions",
    icon: CreditCard,
    id: "subscriptions",
    route: "/admin/subscriptions",
  },
  {
    title: "Profile",
    icon: User,
    id: "profile",
    route: "/admin/profile",
  },
  // {
  //   title: "Notifications",
  //   icon: Bell,
  //   id: "notifications",
  //   route: "/admin/notifications",
  // },
];

export function AdminSidebar() {
  // Get active section from current route
  const location = useLocation();
  const activeSection = location.pathname.split("/").pop() || "overview";

  return (
    <Sidebar className="border-r border-input-border bg-elevated-bg/40 backdrop-blur-md">
      <SidebarHeader className="border-b border-input-border p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cream-primary/20 border border-cream-primary/50">
            <Shield className="h-6 w-6 text-cream-primary" />
          </div>
          <div>
            <div className="text-xl font-bold text-cream-primary">
              Admin Panel
            </div>
            <p className="text-secondary-text text-sm">System Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-cream-primary">
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === item.id}
                    className="text-primary-text hover:bg-cream-primary/20 hover:text-cream-primary data-[active=true]:bg-cream-primary/30 data-[active=true]:text-cream-primary"
                  >
                    <Link to={item.route}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-cream-primary">
            Quick Access
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="text-primary-text hover:bg-cream-primary/20 hover:text-cream-primary"
                >
                  <Link to="/">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Main Site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-input-border p-4">
        <Link to="/auth" className="w-full">
          <Button className="w-full bg-cream-primary hover:bg-cream-hover text-dark-base font-semibold">
            Switch Account
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}