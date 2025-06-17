
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mail, Calendar, FileText, MessageSquare, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LeadActionsProps {
  leadId: string | null;
}

const LeadActions = ({ leadId }: LeadActionsProps) => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  if (!leadId) {
    return (
      <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-cyan-100/70">Select a lead from the queue to perform actions</p>
        </CardContent>
      </Card>
    );
  }

  const handleStatusUpdate = (status: string) => {
    setSelectedStatus(status);
    toast({
      title: "Status Updated",
      description: `Lead status changed to ${status}`,
    });
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: "Action Completed",
      description: `${action} action performed successfully`,
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Quick Actions */}
      <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => handleQuickAction('Call')}
              className="bg-green-500/20 border border-green-400/50 text-green-300 hover:bg-green-500/30 flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>Call Lead</span>
            </Button>
            
            <Button 
              onClick={() => handleQuickAction('Email')}
              className="bg-blue-500/20 border border-blue-400/50 text-blue-300 hover:bg-blue-500/30 flex items-center space-x-2"
            >
              <Mail className="h-4 w-4" />
              <span>Send Email</span>
            </Button>
            
            <Button 
              onClick={() => handleQuickAction('Schedule')}
              className="bg-purple-500/20 border border-purple-400/50 text-purple-300 hover:bg-purple-500/30 flex items-center space-x-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </Button>
            
            <Button 
              onClick={() => handleQuickAction('SMS')}
              className="bg-yellow-500/20 border border-yellow-400/50 text-yellow-300 hover:bg-yellow-500/30 flex items-center space-x-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Send SMS</span>
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-700/50">
            <Button 
              onClick={() => handleQuickAction('Generate Quote')}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Quote
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Management */}
      <Card className="bg-black/40 backdrop-blur-md border border-green-400/30 shadow-xl shadow-green-500/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
            Update Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { status: 'contacted', color: 'yellow', label: 'Contacted' },
              { status: 'qualified', color: 'green', label: 'Qualified' },
              { status: 'quoted', color: 'purple', label: 'Quoted' },
              { status: 'closed', color: 'emerald', label: 'Closed Won' },
              { status: 'not-interested', color: 'red', label: 'Not Interested' },
              { status: 'follow-up', color: 'blue', label: 'Follow Up' }
            ].map(({ status, color, label }) => (
              <Button
                key={status}
                onClick={() => handleStatusUpdate(status)}
                variant="outline"
                className={`border-${color}-400/50 text-${color}-300 hover:bg-${color}-500/20 ${
                  selectedStatus === status ? `bg-${color}-500/20` : ''
                }`}
              >
                {label}
              </Button>
            ))}
          </div>

          {selectedStatus && (
            <div className="p-3 rounded-lg bg-gray-800/30 border border-gray-700/50">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-white">Status updated to: </span>
                <Badge className="bg-green-500/20 text-green-300 border-green-400/50">
                  {selectedStatus.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Follow-up Actions */}
      <Card className="lg:col-span-2 bg-black/40 backdrop-blur-md border border-purple-400/30 shadow-xl shadow-purple-500/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Follow-up & Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="follow-up" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
              <TabsTrigger value="follow-up">Schedule Follow-up</TabsTrigger>
              <TabsTrigger value="notes">Add Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="follow-up" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Button 
                  onClick={() => handleQuickAction('Follow-up in 1 day')}
                  variant="outline" 
                  className="border-cyan-400/50 text-cyan-300"
                >
                  1 Day
                </Button>
                <Button 
                  onClick={() => handleQuickAction('Follow-up in 3 days')}
                  variant="outline" 
                  className="border-cyan-400/50 text-cyan-300"
                >
                  3 Days
                </Button>
                <Button 
                  onClick={() => handleQuickAction('Follow-up in 1 week')}
                  variant="outline" 
                  className="border-cyan-400/50 text-cyan-300"
                >
                  1 Week
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-4">
              <textarea 
                className="w-full h-32 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 resize-none"
                placeholder="Add notes about this lead..."
              />
              <Button 
                onClick={() => handleQuickAction('Save Notes')}
                className="bg-blue-500/20 border border-blue-400/50 text-blue-300 hover:bg-blue-500/30"
              >
                Save Notes
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadActions;
