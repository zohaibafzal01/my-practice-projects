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
import { Eye, Mail, Phone, UserCheck, UserX } from "lucide-react";
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
  status: "active" | "suspended" | "inactive";
  joinDate: string;
  lastActive: string;
  totalSales: number;
}

export function UserManagement() {
  const userInfo = useSelector(selectUserInfo);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const fetchAgents = async (page = 1) => {
    try {
      if (!userInfo?.token) return;
      const response = await agentApi.getAllAgents(page);

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
    fetchAgents(currentPage);
  }, [userInfo, currentPage]);

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
      case "suspended":
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
                <option value="suspended">Suspended</option>
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
                  <TableHead className="text-cream-primary">Plan</TableHead>
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
                  <TableHead className="text-cream-primary">Actions</TableHead>
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
                    <TableCell>
                      <Badge className={getPlanColor(agent.plan)}>
                        {agent.plan}
                      </Badge>
                    </TableCell>
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
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="bg-cream-primary text-dark-base"
              >
                Previous
              </Button>

              <Button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
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
  );
}
