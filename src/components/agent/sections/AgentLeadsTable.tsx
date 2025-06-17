
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, CheckCircle, RotateCcw } from 'lucide-react';
import { MarkAsSoldModal } from '../modals/MarkAsSoldModal';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  state: string;
  zipCode: string;
  leadType: 'Fresh' | 'Aged';
  status: 'New' | 'Sold' | 'Replacement Requested' | 'Replaced';
  assignedDate: string;
  replacementStatus?: 'Pending' | 'Approved' | 'Denied';
}

const mockLeads: Lead[] = [
  {
    id: '1',
    clientName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    state: 'CA',
    zipCode: '90210',
    leadType: 'Fresh',
    status: 'New',
    assignedDate: '2024-01-15'
  },
  {
    id: '2',
    clientName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 987-6543',
    state: 'TX',
    zipCode: '75201',
    leadType: 'Aged',
    status: 'Sold',
    assignedDate: '2024-01-14'
  },
  {
    id: '3',
    clientName: 'Mike Davis',
    email: 'mike.davis@email.com',
    phone: '(555) 456-7890',
    state: 'FL',
    zipCode: '33101',
    leadType: 'Fresh',
    status: 'Replacement Requested',
    assignedDate: '2024-01-13',
    replacementStatus: 'Pending'
  }
];

export function AgentLeadsTable() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showSoldModal, setShowSoldModal] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = `${lead.clientName} ${lead.email} ${lead.state}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleMarkAsSold = (leadId: string) => {
    setSelectedLeadId(leadId);
    setShowSoldModal(true);
  };

  const handleSoldSubmit = (saleData: any) => {
    setLeads(prev => prev.map(lead => 
      lead.id === selectedLeadId ? { ...lead, status: 'Sold' as const } : lead
    ));
    setShowSoldModal(false);
    setSelectedLeadId(null);
    toast({
      title: "Sale Recorded",
      description: "The lead has been successfully marked as sold.",
    });
  };

  const handleRequestReplacement = (leadId: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { 
        ...lead, 
        status: 'Replacement Requested' as const,
        replacementStatus: 'Pending'
      } : lead
    ));
    toast({
      title: "Replacement Requested",
      description: "Your replacement request has been submitted for admin approval.",
    });
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'New': return 'bg-blue-500/20 text-blue-300 border-blue-400/50';
      case 'Sold': return 'bg-green-500/20 text-green-300 border-green-400/50';
      case 'Replacement Requested': return 'bg-orange-500/20 text-orange-300 border-orange-400/50';
      case 'Replaced': return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
    }
  };

  const getLeadTypeColor = (type: Lead['leadType']) => {
    return type === 'Fresh' 
      ? 'bg-green-500/20 text-green-300 border-green-400/50'
      : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50';
  };

  return (
    <>
      <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                My Leads
              </CardTitle>
              <p className="text-cyan-100/70">Manage your assigned leads</p>
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
                <option value="New">New</option>
                <option value="Sold">Sold</option>
                <option value="Replacement Requested">Replacement Requested</option>
                <option value="Replaced">Replaced</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-700/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800/30 border-gray-700/50">
                  <TableHead className="text-cyan-200">Client Name</TableHead>
                  <TableHead className="text-cyan-200">Contact Info</TableHead>
                  <TableHead className="text-cyan-200">State</TableHead>
                  <TableHead className="text-cyan-200">Lead Type</TableHead>
                  <TableHead className="text-cyan-200">Status</TableHead>
                  <TableHead className="text-cyan-200">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="border-gray-700/50 hover:bg-gray-800/20">
                    <TableCell>
                      <div className="font-medium text-white">{lead.clientName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
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
                      <Badge className={getLeadTypeColor(lead.leadType)}>
                        {lead.leadType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                        {lead.replacementStatus && (
                          <div className="text-xs text-gray-400">
                            Status: {lead.replacementStatus}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {lead.status !== 'Sold' && lead.status !== 'Replacement Requested' && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleMarkAsSold(lead.id)}
                              className="bg-green-600/20 border border-green-500/50 text-green-300 hover:bg-green-500/30"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mark Sold
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRequestReplacement(lead.id)}
                              className="border-orange-400/50 text-orange-300 hover:bg-orange-500/20"
                            >
                              <RotateCcw className="h-3 w-3 mr-1" />
                              Request Replacement
                            </Button>
                          </>
                        )}
                        {lead.status === 'Replacement Requested' && (
                          <Badge className="bg-orange-500/20 text-orange-300">
                            {lead.replacementStatus}
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

      <MarkAsSoldModal
        isOpen={showSoldModal}
        onClose={() => {
          setShowSoldModal(false);
          setSelectedLeadId(null);
        }}
        onSubmit={handleSoldSubmit}
        leadId={selectedLeadId}
      />
    </>
  );
}
