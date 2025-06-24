import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-dark-base">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AdminDashboard />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminPage;
