
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import LeadQueue from '@/components/leads/LeadQueue';
import LeadDetails from '@/components/leads/LeadDetails';
import LeadActions from '@/components/leads/LeadActions';

const Leads = () => {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-cyan-400/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              InsuranceElite Leads
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-cyan-300 hover:text-cyan-100 transition-colors">Home</Link>
              <Link to="/dashboard" className="text-cyan-300 hover:text-cyan-100 transition-colors">Dashboard</Link>
              <Link to="/about-neon" className="text-cyan-300 hover:text-cyan-100 transition-colors">About Us</Link>
              <Link to="/contact-neon" className="text-cyan-300 hover:text-cyan-100 transition-colors">Contact</Link>
              <Link to="/auth" className="text-cyan-300 hover:text-cyan-100 transition-colors">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="queue" className="mt-8">
            <TabsList className="grid w-full grid-cols-3 bg-black/40 backdrop-blur-md border border-cyan-400/30">
              <TabsTrigger value="queue" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
                Lead Queue
              </TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
                Lead Details
              </TabsTrigger>
              <TabsTrigger value="actions" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
                Actions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="queue" className="space-y-8">
              <LeadQueue onSelectLead={setSelectedLeadId} selectedLeadId={selectedLeadId} />
            </TabsContent>

            <TabsContent value="details" className="space-y-8">
              <LeadDetails leadId={selectedLeadId} />
            </TabsContent>

            <TabsContent value="actions" className="space-y-8">
              <LeadActions leadId={selectedLeadId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Leads;
