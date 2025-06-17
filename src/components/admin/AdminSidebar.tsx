
import { Link } from 'react-router-dom';
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
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  RotateCcw, 
  BarChart3, 
  DollarSign, 
  CreditCard, 
  Bell,
  Shield
} from 'lucide-react';

const adminMenuItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    id: "overview"
  },
  {
    title: "User Management",
    icon: Users,
    id: "users"
  },
  {
    title: "Lead Management", 
    icon: UserCheck,
    id: "leads"
  },
  {
    title: "Replacement Requests",
    icon: RotateCcw,
    id: "replacements"
  },
  {
    title: "Performance Analytics",
    icon: BarChart3,
    id: "analytics"
  },
  {
    title: "Sales Reporting",
    icon: DollarSign,
    id: "sales"
  },
  {
    title: "Subscriptions",
    icon: CreditCard,
    id: "subscriptions"
  },
  {
    title: "Notifications",
    icon: Bell,
    id: "notifications"
  }
];

interface AdminSidebarProps {
  onSectionSelect?: (sectionId: string) => void;
  activeSection?: string;
}

export function AdminSidebar({ onSectionSelect, activeSection = "overview" }: AdminSidebarProps) {
  return (
    <Sidebar className="border-r border-purple-400/30 bg-black/40 backdrop-blur-md">
      <SidebarHeader className="border-b border-purple-400/30 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Admin Panel
            </div>
            <p className="text-purple-100/70 text-sm">System Management</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-200">Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onSectionSelect?.(item.id)}
                    isActive={activeSection === item.id}
                    className="text-purple-100 hover:bg-purple-500/20 hover:text-purple-50 data-[active=true]:bg-purple-500/30 data-[active=true]:text-purple-50"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-200">Quick Access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-purple-100 hover:bg-purple-500/20 hover:text-purple-50">
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

      <SidebarFooter className="border-t border-purple-400/30 p-4">
        <Link to="/auth" className="w-full">
          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white">
            Switch Account
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
