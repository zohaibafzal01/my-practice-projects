
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  zipCode: string;
  status: 'new' | 'contacted' | 'qualified' | 'quoted' | 'closed' | 'not-interested';
  assignedDate: string;
  lastContact: string | null;
  priority: 'high' | 'medium' | 'low';
  insuranceType: string;
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
    status: 'new',
    assignedDate: '2024-01-15',
    lastContact: null,
    priority: 'high',
    insuranceType: 'Auto'
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
    insuranceType: 'Home'
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
    insuranceType: 'Life'
  }
];

interface LeadQueueProps {
  onSelectLead: (leadId: string) => void;
  selectedLeadId: string | null;
}

const LeadQueue = ({ onSelectLead, selectedLeadId }: LeadQueueProps) => {
  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-300 border-blue-400/50';
      case 'contacted': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50';
      case 'qualified': return 'bg-green-500/20 text-green-300 border-green-400/50';
      case 'quoted': return 'bg-purple-500/20 text-purple-300 border-purple-400/50';
      case 'closed': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50';
      case 'not-interested': return 'bg-red-500/20 text-red-300 border-red-400/50';
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
        <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          Lead Queue
        </CardTitle>
        <p className="text-cyan-100/70">Your assigned leads waiting for action</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700/50">
              <TableHead className="text-cyan-300">Contact</TableHead>
              <TableHead className="text-cyan-300">Location</TableHead>
              <TableHead className="text-cyan-300">Type</TableHead>
              <TableHead className="text-cyan-300">Status</TableHead>
              <TableHead className="text-cyan-300">Priority</TableHead>
              <TableHead className="text-cyan-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLeads.map((lead) => (
              <TableRow 
                key={lead.id} 
                className={`border-gray-700/50 hover:bg-gray-800/30 cursor-pointer ${
                  selectedLeadId === lead.id ? 'bg-cyan-500/10' : ''
                }`}
                onClick={() => onSelectLead(lead.id)}
              >
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
                </TableCell>
                <TableCell>
                  <div className={`font-medium ${getPriorityColor(lead.priority)}`}>
                    {lead.priority.toUpperCase()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-green-400/50 text-green-300 hover:bg-green-500/20">
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-blue-400/50 text-blue-300 hover:bg-blue-500/20">
                      <Mail className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LeadQueue;
