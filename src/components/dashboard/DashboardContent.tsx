import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardSidebar } from './DashboardSidebar';
import LeadDistributionChart from './LeadDistributionChart';
import ConversionMetrics from './ConversionMetrics';
import SubscriptionOverview from './SubscriptionOverview';
import SalesReportingModal from './SalesReportingModal';
import LeadPerformanceTable from './LeadPerformanceTable';
import GeographicHeatMap from './GeographicHeatMap';
import RealtimeMetrics from './RealtimeMetrics';
import LeadManagementTable from './LeadManagementTable';
import AdminLeadManagement from './AdminLeadManagement';

export function DashboardContent() {
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState("overview");
  const location = useLocation();
  const userRole = location.state?.role || 'agent';

  const renderContent = () => {
    switch (activeMenu) {
      case "overview":
        return (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <LeadDistributionChart />
              <ConversionMetrics />
            </div>
            <GeographicHeatMap />
          </div>
        );
      case "leads":
        return (
          <div className="space-y-8">
            {userRole === 'admin' ? (
              <AdminLeadManagement />
            ) : (
              <LeadManagementTable />
            )}
            <LeadPerformanceTable />
          </div>
        );
      case "performance":
        return (
          <div className="space-y-8">
            <ConversionMetrics />
            <LeadPerformanceTable />
          </div>
        );
      case "subscription":
        return (
          <div className="space-y-8">
            <SubscriptionOverview />
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <LeadDistributionChart />
              <ConversionMetrics />
            </div>
            <GeographicHeatMap />
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/30 backdrop-blur-md border-b border-cyan-400/30">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="text-cyan-300 hover:text-cyan-100" />
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Dashboard
              </h1>
              <p className="text-cyan-100/70 text-sm">
                {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)} 
                {userRole === 'admin' ? ' - Admin Panel' : ' - Agent Panel'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => setShowSalesModal(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold shadow-lg shadow-green-500/25"
            >
              Mark Sale
            </Button>
            {userRole === 'admin' && (
              <div className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-400/50">
                ADMIN
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Real-time Metrics Bar */}
        <RealtimeMetrics />

        {/* Dashboard Content */}
        <div className="mt-8">
          <Tabs value={activeMenu} onValueChange={setActiveMenu} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/40 backdrop-blur-md border border-cyan-400/30">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
                Overview
              </TabsTrigger>
              <TabsTrigger value="leads" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
                {userRole === 'admin' ? 'Lead Management' : 'My Leads'}
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
                Performance
              </TabsTrigger>
              <TabsTrigger value="subscription" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
                Subscription
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <LeadDistributionChart />
                  <ConversionMetrics />
                </div>
                <GeographicHeatMap />
              </div>
            </TabsContent>

            <TabsContent value="leads" className="mt-8">
              <div className="space-y-8">
                {userRole === 'admin' ? (
                  <AdminLeadManagement />
                ) : (
                  <LeadManagementTable />
                )}
                <LeadPerformanceTable />
              </div>
            </TabsContent>

            <TabsContent value="performance" className="mt-8">
              <div className="space-y-8">
                <ConversionMetrics />
                <LeadPerformanceTable />
              </div>
            </TabsContent>

            <TabsContent value="subscription" className="mt-8">
              <div className="space-y-8">
                <SubscriptionOverview />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Hidden Sidebar for mobile - integrate with existing sidebar */}
      <div className="md:hidden">
        <DashboardSidebar onMenuSelect={setActiveMenu} activeMenu={activeMenu} />
      </div>

      {/* Sales Reporting Modal */}
      <SalesReportingModal 
        isOpen={showSalesModal} 
        onClose={() => setShowSalesModal(false)} 
      />
    </div>
  );
}
