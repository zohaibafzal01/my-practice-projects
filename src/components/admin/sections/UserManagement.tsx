
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Eye, UserX, UserCheck, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  assignedLeads: number;
  maxLeads: number;
  status: 'active' | 'suspended' | 'inactive';
  joinDate: string;
  lastActive: string;
  totalSales: number;
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    plan: 'Pro',
    assignedLeads: 15,
    maxLeads: 20,
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-01-16',
    totalSales: 25
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 987-6543',
    plan: 'Enterprise',
    assignedLeads: 28,
    maxLeads: 30,
    status: 'active',
    joinDate: '2024-01-10',
    lastActive: '2024-01-16',
    totalSales: 42
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike.davis@email.com',
    phone: '(555) 456-7890',
    plan: 'Basic',
    assignedLeads: 8,
    maxLeads: 10,
    status: 'suspended',
    joinDate: '2024-01-08',
    lastActive: '2024-01-14',
    totalSales: 12
  }
];

export function UserManagement() {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (agentId: string, newStatus: Agent['status']) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, status: newStatus } : agent
    ));
    
    const statusAction = newStatus === 'suspended' ? 'suspended' : 'reactivated';
    toast({
      title: `Agent ${statusAction}`,
      description: `The agent has been successfully ${statusAction}.`,
      duration: 3000,
    });
  };

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300 border-green-400/50';
      case 'suspended': return 'bg-red-500/20 text-red-300 border-red-400/50';
      case 'inactive': return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
    }
  };

  const getPlanColor = (plan: Agent['plan']) => {
    switch (plan) {
      case 'Basic': return 'bg-blue-500/20 text-blue-300 border-blue-400/50';
      case 'Pro': return 'bg-purple-500/20 text-purple-300 border-purple-400/50';
      case 'Enterprise': return 'bg-orange-500/20 text-orange-300 border-orange-400/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
          User Management
        </h2>
        <p className="text-purple-100/70">Manage agent accounts and monitor performance</p>
      </div>

      <Card className="bg-black/40 backdrop-blur-md border border-purple-400/30 shadow-xl shadow-purple-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Active Agents ({filteredAgents.length})
            </CardTitle>
            <div className="flex gap-4">
              <div className="w-64">
                <Input
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800/50 border-purple-400/30 text-white placeholder-gray-400"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-800/50 border border-purple-400/30 text-white rounded-md px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-700/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800/30 border-gray-700/50">
                  <TableHead className="text-purple-200">Agent Information</TableHead>
                  <TableHead className="text-purple-200">Plan</TableHead>
                  <TableHead className="text-purple-200">Lead Assignment</TableHead>
                  <TableHead className="text-purple-200">Status</TableHead>
                  <TableHead className="text-purple-200">Performance</TableHead>
                  <TableHead className="text-purple-200">Last Active</TableHead>
                  <TableHead className="text-purple-200">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id} className="border-gray-700/50 hover:bg-gray-800/20">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-white">{agent.name}</div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Mail className="h-3 w-3" />
                          <span>{agent.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Phone className="h-3 w-3" />
                          <span>{agent.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPlanColor(agent.plan)}>
                        {agent.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-white font-medium">
                          {agent.assignedLeads}/{agent.maxLeads} leads
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              (agent.assignedLeads / agent.maxLeads) > 0.8 ? 'bg-red-500' :
                              (agent.assignedLeads / agent.maxLeads) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${(agent.assignedLeads / agent.maxLeads) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-white font-medium">{agent.totalSales} sales</div>
                      <div className="text-gray-400 text-sm">
                        Joined {new Date(agent.joinDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {new Date(agent.lastActive).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-purple-400/50 text-purple-300 hover:bg-purple-500/20"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        {agent.status === 'active' ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(agent.id, 'suspended')}
                            className="border-red-400/50 text-red-300 hover:bg-red-500/20"
                          >
                            <UserX className="h-3 w-3 mr-1" />
                            Suspend
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(agent.id, 'active')}
                            className="border-green-400/50 text-green-300 hover:bg-green-500/20"
                          >
                            <UserCheck className="h-3 w-3 mr-1" />
                            Activate
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
