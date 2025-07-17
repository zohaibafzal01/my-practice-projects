import { agentApi } from "@/api/agent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { selectUserInfo } from "@/redux/selectors/userSelectors";
import { Eye, Mail, Phone, UserCheck, UserX, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: "Basic" | "Pro" | "Enterprise";
  assignedLeads: number;
  maxLeads: number;
  status: "active" | "suspended" | "inactive" | "pending";
  joinDate: string;
  lastActive: string;
  totalSales: number;
  currentIMO?: string;
  directUpline?: string;
  experienceInMortgageProtection?: "Yes" | "No";
  mortgageProtectionDuration?: number;
  regions?: string[];
}

export function UserManagement() {
  const userInfo = useSelector(selectUserInfo);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const fetchAgents = async (page = 1, search = "", status = "") => {
    try {
      if (!userInfo?.token) return;
      const response = await agentApi.getAllAgents(page, search, status);

      const fetchedAgents = response.items.map(
        (agent: any): Agent => ({
          id: agent?._id,
          name: `${agent?.firstName} ${agent?.lastName}`,
          email: agent.email,
          phone: agent.phoneNumber,
          plan: "Pro",
          assignedLeads: agent?.totalLeadsAssigned || 0,
          maxLeads: agent?.totalLeadsPurchased || 10,
          status: agent?.status?.toLowerCase() as Agent["status"],
          joinDate: agent?.createdAt,
          lastActive:
            agent?.lastLoginAt || agent?.updatedAt || agent?.createdAt,
          totalSales: 0,
          currentIMO: agent?.currentIMO,
          directUpline: agent?.directUpline,
          experienceInMortgageProtection: agent?.experienceInMortgageProtection,
          mortgageProtectionDuration: agent?.mortgageProtectionDuration,
          regions: agent?.regions || [],
        })
      );

      setAgents(fetchedAgents);
      setTotalPages(response.totalPages || 1);
      setCurrentPage(response.page || 1);
    } catch (error: any) {
      toast({
        title: "Failed to fetch agents",
        description: error?.response?.data?.message || error.message,
      });
    }
  };

  useEffect(() => {
    fetchAgents(currentPage, searchTerm, statusFilter);
  }, [userInfo, currentPage]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchAgents(1, searchTerm, statusFilter);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, statusFilter]);

  const handleStatusChange = async (
    agentId: string,
    newStatus: Agent["status"]
  ) => {
    try {
      if (!userInfo?.token) return;
      if (newStatus === "suspended") await agentApi.agentSuspend(agentId);
      else if (newStatus === "active") await agentApi.agentReactivate(agentId);

      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === agentId ? { ...agent, status: newStatus } : agent
        )
      );

      toast({
        title: `Agent ${
          newStatus === "suspended" ? "suspended" : "reactivated"
        }`,
        description: `The agent has been successfully ${
          newStatus === "suspended" ? "suspended" : "reactivated"
        }.`,
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-400/50";
      case "pending":
        return "bg-red-500/20 text-red-300 border-red-400/50";
      case "inactive":
        return "bg-gray-500/20 text-gray-300 border-gray-400/50";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/50";
    }
  };

  const getPlanColor = (plan: Agent["plan"]) => {
    switch (plan) {
      case "Basic":
        return "bg-blue-500/20 text-blue-300 border-blue-400/50";
      case "Pro":
        return "bg-purple-500/20 text-purple-300 border-purple-400/50";
      case "Enterprise":
        return "bg-orange-500/20 text-orange-300 border-orange-400/50";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/50";
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-cream-primary mb-2">
            User Management
          </h2>
          <p className="text-secondary-text">
            Manage agent accounts and monitor performance
          </p>
        </div>

        <Card className="bg-elevated-bg border-input-border shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-cream-primary">
                Active Agents ({filteredAgents.length})
              </CardTitle>
              <div className="flex gap-4">
                <div className="w-64">
                  <Input
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-section-bg border-input-border text-primary-text placeholder-secondary-text"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-section-bg border border-input-border text-primary-text rounded-md px-3 py-2"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-input-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-section-bg border-input-border">
                    <TableHead className="text-cream-primary">
                      Agent Information
                    </TableHead>
                    {/* <TableHead className="text-cream-primary">Plan</TableHead> */}
                    <TableHead className="text-cream-primary">
                      Lead Assignment
                    </TableHead>
                    <TableHead className="text-cream-primary">Status</TableHead>
                    <TableHead className="text-cream-primary">
                      Performance
                    </TableHead>
                    <TableHead className="text-cream-primary">
                      Last Active
                    </TableHead>
                    <TableHead className="text-cream-primary">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow
                      key={agent.id}
                      className="border-input-border hover:bg-section-bg/50"
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-primary-text">
                            {agent.name}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-secondary-text">
                            <Mail className="h-3 w-3" />
                            <span>{agent.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-secondary-text">
                            <Phone className="h-3 w-3" />
                            <span>{agent.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      {/* <TableCell>
                      <Badge className={getPlanColor(agent.plan)}>
                        {agent.plan}
                      </Badge>
                    </TableCell> */}
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-primary-text font-medium">
                            {agent.assignedLeads}/{agent.maxLeads} leads
                          </div>
                          <div className="w-full bg-section-bg rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                agent.assignedLeads / agent.maxLeads > 0.8
                                  ? "bg-theme-danger"
                                  : agent.assignedLeads / agent.maxLeads > 0.6
                                  ? "bg-yellow-500"
                                  : "bg-theme-success"
                              }`}
                              style={{
                                width: `${
                                  (agent.assignedLeads / agent.maxLeads) * 100
                                }%`,
                              }}
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
                        <div className="text-primary-text font-medium">
                          {agent.totalSales} sales
                        </div>
                        <div className="text-secondary-text text-sm">
                          Joined {new Date(agent.joinDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-secondary-text">
                        {new Date(agent.lastActive).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedAgent(agent);
                              setIsModalOpen(true);
                            }}
                            className="border-cream-primary text-cream-primary hover:text-cream-primary hover:bg-blue-500/10"
                          >
                            <Eye className="h-3 w-3" /> Info
                          </Button>

                          {agent.status === "active" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleStatusChange(agent.id, "suspended")
                              }
                              className="border-theme-danger/50 text-theme-danger hover:bg-theme-danger/20"
                            >
                              <UserX className="h-3 w-3 mr-1" /> Suspend
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleStatusChange(agent.id, "active")
                              }
                              className="border-theme-success/50 text-theme-success hover:bg-theme-success/20"
                            >
                              <UserCheck className="h-3 w-3 mr-1" /> Activate
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-primary-text">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    const newPage = Math.max(1, currentPage - 1);
                    setCurrentPage(newPage);
                    fetchAgents(newPage, searchTerm, statusFilter);
                  }}
                  disabled={currentPage === 1}
                  className="bg-cream-primary text-dark-base"
                >
                  Previous
                </Button>

                <Button
                  onClick={() => {
                    const newPage = Math.min(totalPages, currentPage + 1);
                    setCurrentPage(newPage);
                    fetchAgents(newPage, searchTerm, statusFilter);
                  }}
                  disabled={currentPage === totalPages}
                  className="bg-cream-primary text-dark-base"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isModalOpen && selectedAgent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-full max-w-lg bg-elevated-bg border border-input-border rounded-2xl p-6 shadow-2xl">
            {/* Close Icon */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-secondary-text hover:text-cream-primary"
            >
              <span className="text-2xl font-bold">×</span>
            </button>

            {/* Modal Header */}
            <h3 className="text-xl font-semibold text-cream-primary mb-4">
              Agent Info: {selectedAgent?.name}
            </h3>

            {/* Info Content */}
            <div className="space-y-3 text-sm text-primary-text">
              <p>
                <strong className="text-secondary-text">IMO:</strong>{" "}
                {selectedAgent?.currentIMO || "N/A"}
              </p>
              <p>
                <strong className="text-secondary-text">Direct Upline:</strong>{" "}
                {selectedAgent?.directUpline || "N/A"}
              </p>
              <p>
                <strong className="text-secondary-text">
                  Experience in Mortgage Protection:
                </strong>{" "}
                {selectedAgent?.experienceInMortgageProtection || "N/A"}
              </p>
              <p>
                <strong className="text-secondary-text">
                  Protection Duration:
                </strong>{" "}
                {selectedAgent?.mortgageProtectionDuration
                  ? `${selectedAgent?.mortgageProtectionDuration} `
                  : "N/A"}
              </p>
              <p>
                <strong className="text-secondary-text">Regions:</strong>{" "}
                {selectedAgent?.regions?.length
                  ? selectedAgent?.regions.join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
