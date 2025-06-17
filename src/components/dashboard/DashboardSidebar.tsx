
import { useState } from 'react';
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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, BarChart3, CreditCard, Settings } from 'lucide-react';

const menuItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    id: "overview"
  },
  {
    title: "Lead Management", 
    icon: Users,
    id: "leads"
  },
  {
    title: "Performance",
    icon: BarChart3,
    id: "performance"
  },
  {
    title: "Subscription",
    icon: CreditCard,
    id: "subscription"
  },
];

interface DashboardSidebarProps {
  onMenuSelect?: (menuId: string) => void;
  activeMenu?: string;
}

export function DashboardSidebar({ onMenuSelect, activeMenu = "overview" }: DashboardSidebarProps) {
  return (
    <Sidebar className="border-r border-cyan-400/30 bg-black/40 backdrop-blur-md">
      <SidebarHeader className="border-b border-cyan-400/30 p-6">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          InsuranceElite
        </div>
        <p className="text-cyan-100/70 text-sm">Lead Management Dashboard</p>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-cyan-200">Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onMenuSelect?.(item.id)}
                    isActive={activeMenu === item.id}
                    className="text-cyan-100 hover:bg-cyan-500/20 hover:text-cyan-50 data-[active=true]:bg-cyan-500/30 data-[active=true]:text-cyan-50"
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
          <SidebarGroupLabel className="text-cyan-200">Quick Access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-cyan-100 hover:bg-cyan-500/20 hover:text-cyan-50">
                  <Link to="/leads">
                    <Users className="h-4 w-4" />
                    <span>Full Lead Queue</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-cyan-100 hover:bg-cyan-500/20 hover:text-cyan-50">
                  <Link to="/">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Main Site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-cyan-200">Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-cyan-100 hover:bg-cyan-500/20 hover:text-cyan-50">
                  <Settings className="h-4 w-4" />
                  <span>Preferences</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-cyan-400/30 p-4">
        <Link to="/auth" className="w-full">
          <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white">
            Account Settings
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
