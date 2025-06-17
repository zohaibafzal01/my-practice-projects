
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Users, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReplacementRequest {
  id: string;
  leadId: string;
  leadName: string;
  requestedBy: string;
  reason: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'denied';
}

interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  assignedLeads: number;
  maxLeads: number;
}

interface UnassignedLead {
  id: string;
  firstName: string;
  lastName: string;
  state: string;
  insuranceType: string;
  priority: 'high' | 'medium' | 'low';
  dateReceived: string;
}

const mockReplacementRequests: ReplacementRequest[] = [
  {
    id: '1',
    leadId: '4',
    leadName: 'Emily Wilson',
    requestedBy: 'John Agent',
    reason: 'Lead not responsive after multiple attempts',
    requestDate: '2024-01-15',
    status: 'pending'
  },
  {
    id: '2',
    leadId: '7',
    leadName: 'Robert Brown',
    requestedBy: 'Sarah Agent',
    reason: 'Phone number disconnected',
    requestDate: '2024-01-14',
    status: 'pending'
  }
];

const mockUsers: User[] = [
  { id: '1', name: 'John Agent', email: 'john@company.com', isActive: true, assignedLeads: 15, maxLeads: 20 },
  { id: '2', name: 'Sarah Agent', email: 'sarah@company.com', isActive: true, assignedLeads: 18, maxLeads: 20 },
  { id: '3', name: 'Mike Agent', email: 'mike@company.com', isActive: true, assignedLeads: 12, maxLeads: 20 },
  { id: '4', name: 'Lisa Agent', email: 'lisa@company.com', isActive: false, assignedLeads: 0, maxLeads: 20 }
];

const mockUnassignedLeads: UnassignedLead[] = [
  {
    id: '101',
    firstName: 'David',
    lastName: 'Clark',
    state: 'CA',
    insuranceType: 'Auto',
    priority: 'high',
    dateReceived: '2024-01-16'
  },
  {
    id: '102',
    firstName: 'Jennifer',
    lastName: 'Martinez',
    state: 'TX',
    insuranceType: 'Home',
    priority: 'medium',
    dateReceived: '2024-01-16'
  }
];

const AdminLeadManagement = () => {
  const [replacementRequests, setReplacementRequests] = useState<ReplacementRequest[]>(mockReplacementRequests);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [unassignedLeads, setUnassignedLeads] = useState<UnassignedLead[]>(mockUnassignedLeads);
  const { toast } = useToast();

  const handleReplacementRequest = (requestId: string, action: 'approve' | 'deny') => {
    setReplacementRequests(prev => prev.map(request => 
      request.id === requestId ? { ...request, status: action === 'approve' ? 'approved' : 'denied' } : request
    ));

    toast({
      title: action === 'approve' ? "Request Approved" : "Request Denied",
      description: `The replacement request has been ${action}d.`,
      duration: 3000,
    });

    if (action === 'approve') {
      // Trigger automatic reassignment
      autoAssignReplacement(requestId);
    }
  };

  const autoAssignReplacement = (requestId: string) => {
    // Find user with lowest lead count who is active
    const activeUsers = users.filter(user => user.isActive && user.assignedLeads < user.maxLeads);
    const targetUser = activeUsers.sort((a, b) => a.assignedLeads - b.assignedLeads)[0];

    if (targetUser && unassignedLeads.length > 0) {
      const leadToAssign = unassignedLeads[0];
      setUnassignedLeads(prev => prev.filter(lead => lead.id !== leadToAssign.id));
      setUsers(prev => prev.map(user => 
        user.id === targetUser.id ? { ...user, assignedLeads: user.assignedLeads + 1 } : user
      ));

      toast({
        title: "Lead Auto-Assigned",
        description: `Lead ${leadToAssign.firstName} ${leadToAssign.lastName} has been assigned to ${targetUser.name}.`,
        duration: 3000,
      });
    }
  };

  const manualAssignLead = (leadId: string, userId: string) => {
    const lead = unassignedLeads.find(l => l.id === leadId);
    const user = users.find(u => u.id === userId);

    if (lead && user && user.assignedLeads < user.maxLeads) {
      setUnassignedLeads(prev => prev.filter(l => l.id !== leadId));
      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, assignedLeads: u.assignedLeads + 1 } : u
      ));

      toast({
        title: "Lead Manually Assigned",
        description: `Lead ${lead.firstName} ${lead.lastName} has been assigned to ${user.name}.`,
        duration: 3000,
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/40 backdrop-blur-md border border-cyan-400/30">
          <TabsTrigger value="requests" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
            Replacement Requests
          </TabsTrigger>
          <TabsTrigger value="assignment" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
            Lead Assignment
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-100">
            User Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
          <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Replacement Requests
              </CardTitle>
              <p className="text-cyan-100/70">Review and approve lead replacement requests</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-800/30 border-gray-700/50">
                    <TableHead className="text-cyan-200">Lead Name</TableHead>
                    <TableHead className="text-cyan-200">Requested By</TableHead>
                    <TableHead className="text-cyan-200">Reason</TableHead>
                    <TableHead className="text-cyan-200">Request Date</TableHead>
                    <TableHead className="text-cyan-200">Status</TableHead>
                    <TableHead className="text-cyan-200">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {replacementRequests.map((request) => (
                    <TableRow key={request.id} className="border-gray-700/50 hover:bg-gray-800/20">
                      <TableCell className="text-white font-medium">{request.leadName}</TableCell>
                      <TableCell className="text-gray-300">{request.requestedBy}</TableCell>
                      <TableCell className="text-gray-300 max-w-64">{request.reason}</TableCell>
                      <TableCell className="text-gray-300">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                          request.status === 'approved' ? 'bg-green-500/20 text-green-300' :
                          'bg-red-500/20 text-red-300'
                        }>
                          {request.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button 
                              size="sm"
                              onClick={() => handleReplacementRequest(request.id, 'approve')}
                              className="bg-green-600/20 border border-green-500/50 text-green-300 hover:bg-green-500/30"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => handleReplacementRequest(request.id, 'deny')}
                              className="border-red-400/50 text-red-300 hover:bg-red-500/20"
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Deny
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignment" className="space-y-6">
          <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Unassigned Leads ({unassignedLeads.length})
              </CardTitle>
              <p className="text-cyan-100/70">Manually assign leads to agents or use auto-assignment</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-800/30 border-gray-700/50">
                    <TableHead className="text-cyan-200">Lead Name</TableHead>
                    <TableHead className="text-cyan-200">State</TableHead>
                    <TableHead className="text-cyan-200">Insurance Type</TableHead>
                    <TableHead className="text-cyan-200">Priority</TableHead>
                    <TableHead className="text-cyan-200">Date Received</TableHead>
                    <TableHead className="text-cyan-200">Assign To</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unassignedLeads.map((lead) => (
                    <TableRow key={lead.id} className="border-gray-700/50 hover:bg-gray-800/20">
                      <TableCell className="text-white font-medium">
                        {lead.firstName} {lead.lastName}
                      </TableCell>
                      <TableCell className="text-gray-300">{lead.state}</TableCell>
                      <TableCell className="text-gray-300">{lead.insuranceType}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${getPriorityColor(lead.priority)}`}>
                          {lead.priority.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {new Date(lead.dateReceived).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <select
                          className="bg-gray-800/50 border border-cyan-400/30 text-white rounded-md px-3 py-1"
                          onChange={(e) => {
                            if (e.target.value) {
                              manualAssignLead(lead.id, e.target.value);
                            }
                          }}
                          defaultValue=""
                        >
                          <option value="">Select Agent</option>
                          {users.filter(user => user.isActive && user.assignedLeads < user.maxLeads).map(user => (
                            <option key={user.id} value={user.id}>
                              {user.name} ({user.assignedLeads}/{user.maxLeads})
                            </option>
                          ))}
                        </select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Agent Management
              </CardTitle>
              <p className="text-cyan-100/70">Monitor agent workloads and status</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-800/30 border-gray-700/50">
                    <TableHead className="text-cyan-200">Agent Name</TableHead>
                    <TableHead className="text-cyan-200">Email</TableHead>
                    <TableHead className="text-cyan-200">Status</TableHead>
                    <TableHead className="text-cyan-200">Assigned Leads</TableHead>
                    <TableHead className="text-cyan-200">Capacity</TableHead>
                    <TableHead className="text-cyan-200">Load %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-gray-700/50 hover:bg-gray-800/20">
                      <TableCell className="text-white font-medium">{user.name}</TableCell>
                      <TableCell className="text-gray-300">{user.email}</TableCell>
                      <TableCell>
                        <Badge className={user.isActive ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
                          {user.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{user.assignedLeads}</TableCell>
                      <TableCell className="text-gray-300">{user.maxLeads}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                (user.assignedLeads / user.maxLeads) > 0.8 ? 'bg-red-500' :
                                (user.assignedLeads / user.maxLeads) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${(user.assignedLeads / user.maxLeads) * 100}%` }}
                            />
                          </div>
                          <span className="text-gray-300 text-sm">
                            {Math.round((user.assignedLeads / user.maxLeads) * 100)}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminLeadManagement;
