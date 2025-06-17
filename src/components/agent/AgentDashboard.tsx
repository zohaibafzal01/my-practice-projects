
import { useState } from 'react';
import { AgentOverview } from './sections/AgentOverview';
import { AgentLeadsTable } from './sections/AgentLeadsTable';
import { AgentPerformanceAnalytics } from './sections/AgentPerformanceAnalytics';
import { AgentSubscriptionBilling } from './sections/AgentSubscriptionBilling';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AgentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-dark-base">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-elevated-bg backdrop-blur-md border border-input-border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cream-primary/20 data-[state=active]:text-cream-primary">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-cream-primary/20 data-[state=active]:text-cream-primary">
              My Leads
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-cream-primary/20 data-[state=active]:text-cream-primary">
              Performance
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-cream-primary/20 data-[state=active]:text-cream-primary">
              Subscription
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
        </Tabs>
      </main>
    </div>
  );
}
