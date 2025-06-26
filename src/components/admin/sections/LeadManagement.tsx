import { agentApi } from "@/api/agent";
import { leadsApi } from "@/api/leads";
import LeadForm from "@/components/leads/LeadForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ViewModal from "@/components/view-modal/ViewModal";
import { selectUserInfo } from "@/redux/selectors/userSelectors";
import { RotateCcw, Search, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function LeadManagement() {

  const [agents, setAgents] = useState<{ id: string; name: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [totalLeads, setTotalLeads] = useState(0);

  const [leads, setLeads] = useState<any[]>([]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterState, setFilterState] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || lead.status === filterStatus;
    const matchesState = filterState === "all" || lead.state === filterState;
    return matchesSearch && matchesStatus && matchesState;
  });

  const userInfo = useSelector(selectUserInfo);
  const token = userInfo?.token;

  useEffect(() => {
    const fetchAgentsAndLeads = async () => {
      if (!token) return;

      try {
        // Step 1: Fetch all agents
        const agentResponse = await agentApi.getAllAgents(token);
        const fetchedAgents = agentResponse.items.map((agent: any) => ({
          id: agent._id,
          name: `${agent.firstName} ${agent.lastName}`,
        }));
        setAgents(fetchedAgents);

        // Step 2: Fetch all leads
        const leadResponse = await leadsApi.getAllLeads(token);
        const apiLeads = leadResponse?.items || [];

        // Step 3: Map agentRef to name
        const formattedLeads = apiLeads.map((lead: any) => {
          const assignedAgentName = fetchedAgents.find(
            (agent) => agent.id === lead.agentRef
          )?.name;

          return {
            id: lead._id,
            name: `${lead.firstName} ${lead.lastName}`,
            email: lead.email,
            phone: lead.phone,
            state: lead.region,
            status: lead.status.toLowerCase(),
            assignedTo: assignedAgentName || null,
            type: "Standard",
          };
        });

        setLeads(formattedLeads);
        setTotalLeads(leadResponse?.total || apiLeads.length);
      } catch (err) {
        console.error("❌ Failed to fetch agents or leads:", err);
      }
    };

    fetchAgentsAndLeads();
  }, [token]);

  const refreshLeads = async () => {
    if (!token) return;

    try {
      const leadResponse = await leadsApi.getAllLeads(token);
      const apiLeads = leadResponse?.items || [];

      const formattedLeads = apiLeads.map((lead: any) => {
        const assignedAgentName = agents.find(
          (agent) => agent.id === lead.agentRef
        )?.name;

        return {
          id: lead._id,
          name: `${lead.firstName} ${lead.lastName}`,
          email: lead.email,
          phone: lead.phone,
          state: lead.region,
          status: lead.status.toLowerCase(),
          assignedTo: assignedAgentName || null,
          type: "Standard",
        };
      });

      setLeads(formattedLeads);
    } catch (err) {
      console.error("❌ Failed to refresh leads:", err);
    }
  };

  const handleAssignLead = async (leadId: string, agentId: string) => {
    try {
      if (!token) return;
      await leadsApi.leadsAssign(leadId, agentId, token);
      await refreshLeads();
    } catch (err) {
      console.error("Failed to assign lead:", err);
    }
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        if (!token) return;
        const response = await agentApi.getAllAgents(token);
        const fetchedAgents = response.items.map((agent: any) => ({
          id: agent._id,
          name: `${agent.firstName} ${agent.lastName}`,
        }));
        setAgents(fetchedAgents);
      } catch (err) {
        console.error("Failed to fetch agents:", err);
      }
    };

    fetchAgents();
  }, [token]);

  const getStatusBadge = (status: string) => {
    const colors = {
      assigned: "bg-blue-500/20 text-blue-400 border-blue-400/50",
      unassigned: "bg-yellow-500/20 text-yellow-400 border-yellow-400/50",
      sold: "bg-green-500/20 text-green-400 border-green-400/50",
      replaced: "bg-red-500/20 text-red-400 border-red-400/50",
    };
    return (
      <Badge
        className={
          colors[status as keyof typeof colors] ||
          "bg-gray-500/20 text-gray-400"
        }
      >
        {status}
      </Badge>
    );
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-cream-primary">
              Lead Management
            </h2>
            <p className="text-secondary-text">
              Manage and assign leads to agents
            </p>
          </div>
          <Button
            className="bg-cream-primary hover:bg-cream-hover text-dark-base font-semibold"
            onClick={() => setIsOpen(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Create Leads
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-elevated-bg border-input-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-secondary-text">
                Total Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cream-primary">
                {totalLeads}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-elevated-bg border-input-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-secondary-text">
                Assigned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">
                {leads.filter((l) => l.status === "assigned").length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-elevated-bg border-input-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-secondary-text">
                Unassigned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">
                {leads.filter((l) => l.status === "unassigned").length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-elevated-bg border-input-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-secondary-text">
                Sold
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-theme-success">
                {leads.filter((l) => l.status === "sold").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader>
            <CardTitle className="text-cream-primary">
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-cream-primary" />
                  <Input
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-section-bg border-input-border text-primary-text"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px] bg-section-bg border-input-border text-primary-text">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="replaced">Replaced</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterState} onValueChange={setFilterState}>
                <SelectTrigger className="w-[150px] bg-section-bg border-input-border text-primary-text">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader>
            <CardTitle className="text-cream-primary">All Leads</CardTitle>
            <CardDescription className="text-secondary-text">
              Showing {filteredLeads.length} of {leads.length} leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-input-border">
                    <TableHead className="text-cream-primary">Name</TableHead>
                    <TableHead className="text-cream-primary">
                      Contact
                    </TableHead>
                    <TableHead className="text-cream-primary">State</TableHead>
                    <TableHead className="text-cream-primary">Type</TableHead>
                    <TableHead className="text-cream-primary">Status</TableHead>
                    <TableHead className="text-cream-primary">
                      Assigned To
                    </TableHead>
                    <TableHead className="text-cream-primary">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="border-input-border">
                      <TableCell className="text-primary-text font-medium">
                        {lead.name}
                      </TableCell>
                      <TableCell className="text-secondary-text">
                        <div className="text-sm">
                          <div>{lead.email}</div>
                          <div>{lead.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-primary-text">
                        {lead.state}
                      </TableCell>
                      <TableCell className="text-primary-text">
                        {lead.type}
                      </TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>
                      <TableCell className="text-primary-text">
                        {lead?.assignedTo || "Unassigned"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {lead.status === "unassigned" && (
                            <Select
                              onValueChange={(agentId) =>
                                handleAssignLead(lead.id, agentId)
                              }
                            >
                              <SelectTrigger className="w-[120px] h-8 bg-section-bg border-input-border text-primary-text">
                                <SelectValue placeholder="Assign" />
                              </SelectTrigger>
                              <SelectContent>
                                {agents.map((agent) => (
                                  <SelectItem key={agent?.id} value={agent?.id}>
                                    {agent?.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-input-border text-secondary-text hover:bg-cream-primary/20 hover:text-cream-primary"
                          >
                            <RotateCcw className="w-3 h-3" />
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
      <ViewModal
        show={isOpen}
        onClose={() => setIsOpen(false)}
        size="lg"
        title="Create New Lead"
      >
        <LeadForm setIsOpen={setIsOpen} refreshLeads={refreshLeads} />
      </ViewModal>
    </>
  );
}
