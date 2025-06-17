
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, CheckCircle, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  zipCode: string;
  status: 'assigned' | 'contacted' | 'qualified' | 'sold' | 'replacement-requested' | 'replaced';
  assignedDate: string;
  lastContact: string | null;
  priority: 'high' | 'medium' | 'low';
  insuranceType: string;
  assignedTo: string;
  replacementReason?: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    state: 'CA',
    zipCode: '90210',
    status: 'assigned',
    assignedDate: '2024-01-15',
    lastContact: null,
    priority: 'high',
    insuranceType: 'Auto',
    assignedTo: 'current-user'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 987-6543',
    state: 'TX',
    zipCode: '75201',
    status: 'contacted',
    assignedDate: '2024-01-14',
    lastContact: '2024-01-15',
    priority: 'medium',
    insuranceType: 'Home',
    assignedTo: 'current-user'
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Davis',
    email: 'mike.davis@email.com',
    phone: '(555) 456-7890',
    state: 'FL',
    zipCode: '33101',
    status: 'qualified',
    assignedDate: '2024-01-13',
    lastContact: '2024-01-14',
    priority: 'high',
    insuranceType: 'Life',
    assignedTo: 'current-user'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Wilson',
    email: 'emily.w@email.com',
    phone: '(555) 321-0987',
    state: 'NY',
    zipCode: '10001',
    status: 'replacement-requested',
    assignedDate: '2024-01-12',
    lastContact: '2024-01-13',
    priority: 'low',
    insuranceType: 'Auto',
    assignedTo: 'current-user',
    replacementReason: 'Lead not responsive after multiple attempts'
  }
];

const LeadManagementTable = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const { toast } = useToast();

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = `${lead.firstName} ${lead.lastName} ${lead.email} ${lead.state}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleMarkAsSold = (leadId: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: 'sold' as const } : lead
    ));
    toast({
      title: "Lead Marked as Sold",
      description: "The lead has been successfully marked as sold.",
      duration: 3000,
    });
  };

  const handleRequestReplacement = (leadId: string, reason: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { 
        ...lead, 
        status: 'replacement-requested' as const,
        replacementReason: reason 
      } : lead
    ));
    toast({
      title: "Replacement Requested",
      description: "Your replacement request has been submitted for admin approval.",
      duration: 3000,
    });
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'assigned': return 'bg-blue-500/20 text-blue-300 border-blue-400/50';
      case 'contacted': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50';
      case 'qualified': return 'bg-green-500/20 text-green-300 border-green-400/50';
      case 'sold': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50';
      case 'replacement-requested': return 'bg-orange-500/20 text-orange-300 border-orange-400/50';
      case 'replaced': return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
    }
  };

  const getPriorityColor = (priority: Lead['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              My Assigned Leads
            </CardTitle>
            <p className="text-cyan-100/70">Manage your lead assignments and track progress</p>
          </div>
          <div className="flex gap-4">
            <div className="w-64">
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800/50 border-cyan-400/30 text-white placeholder-gray-400"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-800/50 border border-cyan-400/30 text-white rounded-md px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="assigned">Assigned</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="sold">Sold</option>
              <option value="replacement-requested">Replacement Requested</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-gray-700/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-800/30 border-gray-700/50">
                <TableHead className="text-cyan-200">Contact Information</TableHead>
                <TableHead className="text-cyan-200">Location</TableHead>
                <TableHead className="text-cyan-200">Type</TableHead>
                <TableHead className="text-cyan-200">Status</TableHead>
                <TableHead className="text-cyan-200">Priority</TableHead>
                <TableHead className="text-cyan-200">Assigned Date</TableHead>
                <TableHead className="text-cyan-200">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="border-gray-700/50 hover:bg-gray-800/20">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-white">
                        {lead.firstName} {lead.lastName}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Mail className="h-3 w-3" />
                        <span>{lead.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Phone className="h-3 w-3" />
                        <span>{lead.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-white">{lead.state}</span>
                      <span className="text-gray-400">{lead.zipCode}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-purple-400/50 text-purple-300">
                      {lead.insuranceType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                    {lead.replacementReason && (
                      <div className="text-xs text-gray-400 mt-1 max-w-32">
                        {lead.replacementReason}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className={`font-medium ${getPriorityColor(lead.priority)}`}>
                      {lead.priority.toUpperCase()}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(lead.assignedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {lead.status !== 'sold' && lead.status !== 'replacement-requested' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleMarkAsSold(lead.id)}
                          className="bg-green-600/20 border border-green-500/50 text-green-300 hover:bg-green-500/30"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Mark Sold
                        </Button>
                      )}
                      {lead.status !== 'sold' && lead.status !== 'replacement-requested' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            const reason = prompt("Please provide a reason for replacement:");
                            if (reason) {
                              handleRequestReplacement(lead.id, reason);
                            }
                          }}
                          className="border-orange-400/50 text-orange-300 hover:bg-orange-500/20"
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Request Replacement
                        </Button>
                      )}
                      {lead.status === 'replacement-requested' && (
                        <Badge className="bg-orange-500/20 text-orange-300">
                          Pending Approval
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredLeads.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No leads found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadManagementTable;
