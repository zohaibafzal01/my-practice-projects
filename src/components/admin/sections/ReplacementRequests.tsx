
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Clock, MessageSquare } from 'lucide-react';

// Mock data for replacement requests
const mockRequests = [
  {
    id: 1,
    leadName: "John Smith",
    leadEmail: "john@email.com",
    leadState: "CA",
    requestingAgent: "Agent Johnson",
    reason: "Lead not responding after multiple attempts",
    dateRequested: "2024-01-15",
    status: "pending"
  },
  {
    id: 2,
    leadName: "Jane Doe",
    leadEmail: "jane@email.com",
    leadState: "TX",
    requestingAgent: "Agent Davis",
    reason: "Incorrect contact information",
    dateRequested: "2024-01-14",
    status: "approved"
  },
  {
    id: 3,
    leadName: "Bob Wilson",
    leadEmail: "bob@email.com",
    leadState: "FL",
    requestingAgent: "Agent Smith",
    reason: "Lead already has insurance",
    dateRequested: "2024-01-13",
    status: "denied"
  }
];

export function ReplacementRequests() {
  const [requests, setRequests] = useState(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [adminResponse, setAdminResponse] = useState("");

  const handleApprove = (requestId: number) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: "approved" }
        : req
    ));
  };

  const handleDeny = (requestId: number, response: string) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: "denied", adminResponse: response }
        : req
    ));
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-400/50",
      approved: "bg-green-500/20 text-green-400 border-green-400/50",
      denied: "bg-red-500/20 text-red-400 border-red-400/50"
    };
    const icons = {
      pending: Clock,
      approved: CheckCircle,
      denied: XCircle
    };
    const Icon = icons[status as keyof typeof icons];
    return (
      <Badge className={colors[status as keyof typeof colors] || "bg-gray-500/20 text-gray-400"}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const pendingCount = requests.filter(req => req.status === 'pending').length;
  const approvedCount = requests.filter(req => req.status === 'approved').length;
  const deniedCount = requests.filter(req => req.status === 'denied').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Replacement Requests
          </h2>
          <p className="text-purple-100/70">Review and manage lead replacement requests</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{requests.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{approvedCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{deniedCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card className="bg-black/40 border-purple-400/30">
        <CardHeader>
          <CardTitle className="text-purple-100">Replacement Requests</CardTitle>
          <CardDescription className="text-purple-100/70">
            Review and approve or deny replacement requests from agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-purple-400/30">
                  <TableHead className="text-purple-200">Lead Info</TableHead>
                  <TableHead className="text-purple-200">Requesting Agent</TableHead>
                  <TableHead className="text-purple-200">Reason</TableHead>
                  <TableHead className="text-purple-200">Date</TableHead>
                  <TableHead className="text-purple-200">Status</TableHead>
                  <TableHead className="text-purple-200">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id} className="border-purple-400/30">
                    <TableCell className="text-purple-100">
                      <div className="font-medium">{request.leadName}</div>
                      <div className="text-sm text-purple-100/70">{request.leadEmail}</div>
                      <div className="text-sm text-purple-100/70">{request.leadState}</div>
                    </TableCell>
                    <TableCell className="text-purple-100">{request.requestingAgent}</TableCell>
                    <TableCell className="text-purple-100/70 max-w-xs">
                      <div className="truncate">{request.reason}</div>
                    </TableCell>
                    <TableCell className="text-purple-100">{request.dateRequested}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(request.id)}
                              className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-400/50"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-400/30 text-red-400 hover:bg-red-500/20"
                                  onClick={() => setSelectedRequest(request)}
                                >
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Deny
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-black/90 border-purple-400/30">
                                <DialogHeader>
                                  <DialogTitle className="text-purple-100">Deny Replacement Request</DialogTitle>
                                  <DialogDescription className="text-purple-100/70">
                                    Provide a reason for denying this replacement request.
                                  </DialogDescription>
                                </DialogHeader>
                                <Textarea
                                  placeholder="Enter reason for denial..."
                                  value={adminResponse}
                                  onChange={(e) => setAdminResponse(e.target.value)}
                                  className="bg-black/20 border-purple-400/30 text-purple-100"
                                />
                                <DialogFooter>
                                  <Button
                                    onClick={() => {
                                      handleDeny(request.id, adminResponse);
                                      setAdminResponse("");
                                      setSelectedRequest(null);
                                    }}
                                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-400/50"
                                  >
                                    Deny Request
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                        <Button size="sm" variant="outline" className="border-purple-400/30 text-purple-100 hover:bg-purple-500/20">
                          <MessageSquare className="w-3 h-3" />
                        </Button>
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
