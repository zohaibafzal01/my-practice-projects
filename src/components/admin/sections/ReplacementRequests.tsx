import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Clock, MessageSquare } from "lucide-react";
import leadsApi from "@/api/leads";
import { Badge } from "@/components/ui/badge";

export function ReplacementRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [adminResponse, setAdminResponse] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await leadsApi.getAllReplacementRequestLeads();
      const transformed = response.items.map((item: any) => ({
        id: item?._id,
        leadName: `${item?.firstName} ${item?.lastName}`,
        leadEmail: item?.email,
        leadState: item?.region,
        requestingAgent: item?.replacementRequestedBy
          ? `${item?.replacementRequestedBy?.firstName} ${item?.replacementRequestedBy?.lastName}`
          : "N/A",
        reason: item?.replacementReason || "No reason provided",
        dateRequested: item?.requestedAt
          ? new Date(item?.requestedAt).toLocaleDateString()
          : "N/A",
        status: item?.replacementStatus?.toLowerCase() || "pending",
      }));

      setRequests(transformed);
    };
    fetchRequests();
  }, []);

  const handleApprove = async (requestId: string) => {
    try {
      await leadsApi.updateReplacementstatus(requestId, "APPROVED");
      setRequests((prev) =>
        prev.map((req) =>
          req?.id === requestId ? { ...req, status: "approved" } : req
        )
      );
    } catch (error) {
      console.error("Failed to approve request:", error);
    }
  };

  const handleDeny = async (requestId: string, reason: string) => {
    try {
      await leadsApi.updateReplacementstatus(requestId, "REJECTED", reason);
      setRequests((prev) =>
        prev.map((req) =>
          req?.id === requestId ? { ...req, status: "denied" } : req
        )
      );
    } catch (error) {
      console.error("Failed to deny request:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-400/50",
      approved: "bg-green-500/20 text-green-400 border-green-400/50",
      denied: "bg-red-500/20 text-red-400 border-red-400/50",
    };

    const icons = {
      pending: Clock,
      approved: CheckCircle,
      denied: XCircle,
    };

    const Icon = icons[status as keyof typeof icons];

    if (!Icon) {
      return (
        <Badge className="bg-gray-500/20 text-gray-400 border-gray-400/50">
          {status}
        </Badge>
      );
    }

    return (
      <Badge className={colors[status as keyof typeof colors]}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const pendingCount = requests.filter(
    (req) => req.status === "pending"
  ).length;
  const approvedCount = requests.filter(
    (req) => req.status === "approved"
  ).length;
  const deniedCount = requests.filter(
    (req) => req.status === "rejected"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-cream-primary">
            Replacement Requests
          </h2>
          <p className="text-secondary-text">
            Review and manage lead replacement requests
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              Total Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cream-primary">
              {requests.length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              {pendingCount}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-theme-success">
              {approvedCount}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-theme-danger">
              {deniedCount}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card className="bg-elevated-bg border-input-border">
        <CardHeader>
          <CardTitle className="text-cream-primary">
            Replacement Requests
          </CardTitle>
          <CardDescription className="text-secondary-text">
            Review and approve or deny replacement requests from agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-input-border">
                  <TableHead className="text-cream-primary">
                    Lead Info
                  </TableHead>
                  <TableHead className="text-cream-primary">
                    Requesting Agent
                  </TableHead>
                  <TableHead className="text-cream-primary">Reason</TableHead>
                  <TableHead className="text-cream-primary">Date</TableHead>
                  <TableHead className="text-cream-primary">Status</TableHead>
                  <TableHead className="text-cream-primary">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id} className="border-input-border">
                    <TableCell className="text-primary-text">
                      <div className="font-medium">{request.leadName}</div>
                      <div className="text-sm text-secondary-text">
                        {request.leadEmail}
                      </div>
                      <div className="text-sm text-secondary-text">
                        {request.leadState}
                      </div>
                    </TableCell>
                    <TableCell className="text-primary-text">
                      {request.requestingAgent}
                    </TableCell>
                    <TableCell className="text-secondary-text max-w-xs">
                      <div className="truncate">{request.reason}</div>
                    </TableCell>
                    <TableCell className="text-primary-text">
                      {request.dateRequested}
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {request.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(request?.id)}
                              className="bg-theme-success/20 hover:bg-theme-success/30 text-theme-success border border-theme-success/50"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-theme-danger/30 text-theme-danger hover:bg-theme-danger/20"
                                  onClick={() => setSelectedRequest(request)}
                                >
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Deny
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-elevated-bg border-input-border">
                                <DialogHeader>
                                  <DialogTitle className="text-cream-primary">
                                    Deny Replacement Request
                                  </DialogTitle>
                                  <DialogDescription className="text-secondary-text">
                                    Provide a reason for denying this
                                    replacement request.
                                  </DialogDescription>
                                </DialogHeader>
                                <Textarea
                                  placeholder="Enter reason for denial..."
                                  value={adminResponse}
                                  onChange={(e) =>
                                    setAdminResponse(e.target.value)
                                  }
                                  className="bg-section-bg border-input-border text-primary-text"
                                />
                                <DialogFooter>
                                  <Button
                                    onClick={() => {
                                      handleDeny(request.id, adminResponse);
                                      setAdminResponse("");
                                      setSelectedRequest(null);
                                    }}
                                    className="bg-theme-danger/20 hover:bg-theme-danger/30 text-theme-danger border border-theme-danger/50"
                                  >
                                    Deny Request
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                        {/* <Button
                          size="sm"
                          variant="outline"
                          className="border-input-border text-secondary-text hover:bg-cream-primary/20 hover:text-cream-primary"
                        >
                          <MessageSquare className="w-3 h-3" />
                        </Button> */}
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
