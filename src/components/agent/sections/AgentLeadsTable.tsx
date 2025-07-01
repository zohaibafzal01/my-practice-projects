import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  RotateCcw,
  RefreshCw,
} from "lucide-react";
import { MarkAsSoldModal } from "../modals/MarkAsSoldModal";
import { useToast } from "@/hooks/use-toast";
import leadsApi from "@/api/leads";
import { RequestReplacementModal } from "../modals/RequestReplacementModal";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  region: string;
  zipCode?: string;
  leadType: "Fresh" | "Aged";
  status: "New" | "Sold" | "Replacement Requested" | "Requested";
  backendStatus: string;
  assignedDate: string;
  createdAt: string;
  updatedAt?: string;
  replacementStatus?: "Pending" | "Approved" | "Denied";
  // Additional fields from backend
  leadSource?: string;
  campaign?: string;
  assignedAgent?: any;
  purchase?: any;
  sold?: {
    zipCode: string;
    annualSubmitAmount: number;
    insuranceCompany: string;
    product: string;
    notes?: string;
    soldAt: string;
  };
}

interface SaleData {
  zipCode: string;
  annualSubmitAmount: string;
  insuranceCompany: string;
  product: string;
  notes: string;
}

interface ApiResponse {
  data?: any;
  items?: any[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  message?: string;
  success?: boolean;
}

export function AgentLeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showSoldModal, setShowSoldModal] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [showReplacementModal, setShowReplacementModal] = useState(false);
  const [selectedReplacementLeadId, setSelectedReplacementLeadId] = useState<
    string | null
  >(null);
  const [isSubmittingReplacement, setIsSubmittingReplacement] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const { toast } = useToast();

  // Get authentication token
  const getAuthToken = (): string | null => {
    // Adjust this based on how you store auth tokens
    return (
      localStorage.getItem("authToken") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("authToken")
    );
  };

  // Function to determine if lead is fresh or aged based on creation date
  const getLeadType = (createdAt: string): "Fresh" | "Aged" => {
    const createdDate = new Date(createdAt);
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    return createdDate >= oneDayAgo ? "Fresh" : "Aged";
  };

  // Function to map backend status to frontend display status
  const mapBackendStatusToDisplay = (
    backendStatus: string
  ): "New" | "Sold" | "Replacement Requested" | "Requested" => {
    switch (backendStatus?.toUpperCase()) {
      case "ASSIGNED":
      case "NEW":
      case "CONTACTED":
        return "New";
      case "SOLD":
        return "Sold";
      case "REPLACEMENT_REQUESTED":
        return "Replacement Requested";
      case "REQUESTED":
        return "Requested";
      default:
        return "New";
    }
  };

  // Function to transform backend lead data
  const transformLeadData = (backendLead: any): Lead => {
    return {
      id: backendLead._id || backendLead.id,
      firstName: backendLead.firstName || "",
      lastName: backendLead.lastName || "",
      email: backendLead.email || "",
      phone: backendLead.phone || "",
      region: backendLead.region || backendLead.state || "",
      zipCode: backendLead.zipCode,
      leadType: getLeadType(backendLead.createdAt),
      status: mapBackendStatusToDisplay(backendLead.status),
      backendStatus: backendLead.status,
      assignedDate:
        backendLead.assignedAt ||
        backendLead.assignedDate ||
        backendLead.createdAt,
      createdAt: backendLead.createdAt,
      updatedAt: backendLead.updatedAt,
      leadSource: backendLead.leadSource,
      campaign: backendLead.campaign,
      assignedAgent: backendLead.assignedAgent,
      purchase: backendLead.purchase,
      sold: backendLead.sold,
      replacementStatus: backendLead.replacementStatus,
    };
  };

  // Fetch leads from API
  const fetchLeads = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const token = getAuthToken();
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please log in to view your leads.",
          variant: "destructive",
        });
        return;
      }

      const params = {
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        ...(searchTerm?.trim() && { search: searchTerm.trim() }),
        ...(selectedStatus !== "all" && { status: selectedStatus }),
      };

      const response: ApiResponse = await leadsApi.getAllLeads(params);

      // Handle different response structures
      let leadsData = [];
      let paginationData = pagination;

      if (response.items) {
        // Paginated response
        leadsData = response.items;
        if (response.pagination) {
          paginationData = {
            currentPage: response.pagination.currentPage || 1,
            totalPages: response.pagination.totalPages || 1,
            totalItems: response.pagination.totalItems || 0,
            itemsPerPage: response.pagination.itemsPerPage || 10,
          };
        }
      } else if (response.data) {
        // Simple data response
        leadsData = Array.isArray(response.data)
          ? response.data
          : [response.data];
      } else if (Array.isArray(response)) {
        // Direct array response
        leadsData = response;
      }

      const transformedLeads = leadsData.map(transformLeadData);
      setLeads(transformedLeads);
      setPagination(paginationData);
    } catch (error: any) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Failed to fetch leads. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial fetch and when dependencies change
  useEffect(() => {
    fetchLeads();
  }, [pagination.currentPage, selectedStatus]); // Removed searchTerm from dependencies

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        setPagination((prev) => ({ ...prev, currentPage: 1 }));
        fetchLeads();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredLeads = leads.filter((lead) => {
    const fullName = `${lead.firstName} ${lead.lastName}`;
    const matchesSearch =
      searchTerm === "" ||
      `${fullName} ${lead.email} ${lead.region}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleMarkAsSold = (leadId: string) => {
    setSelectedLeadId(leadId);
    setShowSoldModal(true);
  };

  const handleSoldSubmit = async (saleData: SaleData) => {
    if (!selectedLeadId) return;

    try {
      const token = getAuthToken();
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please log in to perform this action.",
          variant: "destructive",
        });
        return;
      }

      // Convert annualSubmitAmount to number for API
      const apiSaleData = {
        zipCode: saleData.zipCode,
        annualSubmitAmount: parseFloat(saleData.annualSubmitAmount),
        insuranceCompany: saleData.insuranceCompany,
        product: saleData.product,
        notes: saleData.notes || undefined,
      };

      await leadsApi.markLeadAsSold(selectedLeadId, apiSaleData);

      // Update local state
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === selectedLeadId
            ? {
                ...lead,
                status: "Sold" as const,
                backendStatus: "SOLD",
                sold: {
                  ...apiSaleData,
                  soldAt: new Date().toISOString(),
                },
              }
            : lead
        )
      );

      setShowSoldModal(false);
      setSelectedLeadId(null);

      toast({
        title: "Sale Recorded",
        description: "The lead has been successfully marked as sold.",
      });

      // Optionally refresh the leads to get updated data from server
      fetchLeads(true);
    } catch (error: any) {
      console.error("Error marking lead as sold:", error);
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Failed to mark lead as sold. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRequestReplacement = async (leadId: string, reason: string) => {
    try {
      const token = getAuthToken();
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please log in to perform this action.",
          variant: "destructive",
        });
        return;
      }

      setIsSubmittingReplacement(true);

      await leadsApi.requestReplacement(leadId, reason);

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId
            ? {
                ...lead,
                status: "Replacement Requested" as const,
                backendStatus: "REPLACEMENT_REQUESTED",
                replacementStatus: "Pending",
              }
            : lead
        )
      );

      toast({
        title: "Replacement Requested",
        description:
          "Your replacement request has been submitted for admin approval.",
      });

      setShowReplacementModal(false);
      setSelectedReplacementLeadId(null);
    } catch (error: any) {
      console.error("Error requesting replacement:", error);
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to request replacement.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingReplacement(false);
    }
  };

  const handleRefresh = () => {
    fetchLeads(true);
  };

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "New":
        return "bg-blue-500/20 text-blue-300 border-blue-400/50";
      case "Sold":
        return "bg-green-500/20 text-green-300 border-green-400/50";
      case "Replacement Requested":
        return "bg-orange-500/20 text-orange-300 border-orange-400/50";
      case "Requested":
        return "bg-gray-500/20 text-gray-300 border-gray-400/50";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/50";
    }
  };

  const getLeadTypeColor = (type: Lead["leadType"]) => {
    return type === "Fresh"
      ? "bg-green-500/20 text-green-300 border-green-400/50"
      : "bg-yellow-500/20 text-yellow-300 border-yellow-400/50";
  };

  if (loading) {
    return (
      <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-2 text-cyan-100/70">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Loading leads...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                My Leads
              </CardTitle>
              <p className="text-cyan-100/70">
                Manage your assigned leads • Total: {pagination.totalItems}
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={refreshing}
                className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/20"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
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
                <option value="NEW">New</option>
                <option value="SOLD">Sold</option>
                <option value="REPLACEMENT_REQUESTED">
                  Replacement Requested
                </option>
                <option value="REQUESTED">Requested</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-700/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800/30 border-gray-700/50">
                  <th className="text-cyan-200 text-left p-3">Client Name</th>
                  <th className="text-cyan-200 text-left p-3">Contact Info</th>
                  <th className="text-cyan-200 text-left p-3">Region</th>
                  <th className="text-cyan-200 text-left p-3">Lead Type</th>
                  <th className="text-cyan-200 text-left p-3">Status</th>
                  <th className="text-cyan-200 text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-gray-700/50 hover:bg-gray-800/20 border-b"
                  >
                    <td className="p-3">
                      <div className="font-medium text-white">
                        {lead.firstName} {lead.lastName}
                      </div>
                      {lead.leadSource && (
                        <div className="text-xs text-gray-400">
                          Source: {lead.leadSource}
                        </div>
                      )}
                    </td>
                    <td className="p-3">
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
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-white">{lead.region}</span>
                        {lead.zipCode && (
                          <span className="text-gray-400">{lead.zipCode}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getLeadTypeColor(lead.leadType)}>
                        {lead.leadType}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                        {lead.replacementStatus && (
                          <div className="text-xs text-gray-400">
                            Status: {lead.replacementStatus}
                          </div>
                        )}
                        {lead.sold && (
                          <div className="text-xs text-gray-400">
                            Sold: $
                            {lead.sold.annualSubmitAmount?.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        {lead.status !== "Sold" &&
                          lead.status !== "Replacement Requested" && (
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
                                onClick={() => {
                                  setSelectedReplacementLeadId(lead?.id);
                                  setShowReplacementModal(true);
                                }}
                                className="border-orange-400/50 text-orange-300 hover:bg-orange-500/20"
                              >
                                <RotateCcw className="h-3 w-3 mr-1" />
                                Request Replacement
                              </Button>
                            </>
                          )}
                        {lead?.status === "Replacement Requested" && (
                          // <Badge className="bg-orange-500/20 text-orange-300">
                          //   {lead.replacementStatus}
                          // </Badge>
                          <Button
                            size="sm"
                            onClick={() => handleMarkAsSold(lead.id)}
                            className="bg-green-600/20 border border-green-500/50 text-green-300 hover:bg-green-500/30"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Mark Sold
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-400">
              {searchTerm || selectedStatus !== "all"
                ? "No leads found matching your criteria."
                : "No leads assigned to you yet."}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
              <div className="text-sm text-gray-400">
                Showing{" "}
                {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{" "}
                {Math.min(
                  pagination.currentPage * pagination.itemsPerPage,
                  pagination.totalItems
                )}{" "}
                of {pagination.totalItems} results
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      currentPage: prev.currentPage - 1,
                    }))
                  }
                  disabled={pagination.currentPage === 1}
                  className="border-cyan-400/50 text-cyan-300"
                >
                  Previous
                </Button>
                <span className="px-3 py-1 text-cyan-300">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      currentPage: prev.currentPage + 1,
                    }))
                  }
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="border-cyan-400/50 text-cyan-300"
                >
                  Next
                </Button>
              </div>
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

      <RequestReplacementModal
        isOpen={showReplacementModal}
        onClose={() => {
          setShowReplacementModal(false);
          setSelectedReplacementLeadId(null);
        }}
        onSubmit={(reason: string) => {
          if (selectedReplacementLeadId) {
            handleRequestReplacement(selectedReplacementLeadId, reason);
          }
        }}
        isSubmitting={isSubmittingReplacement}
      />
    </>
  );
}
