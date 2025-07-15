import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { testimonialsApi } from "@/api/testimonials";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  _id: string;
  companyName: string;
  designation: string;
  notes: string;
  stars: number;
  status: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();

  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchReviews = async (page = 1, search = "") => {
    try {
      const response = await testimonialsApi.getTestimonials(page, search);
      setReviews(response.items || []);
      setCurrentPage(response.page || 1);
      setTotalPages(response.totalPages || 1);
    } catch (error: any) {
      toast({
        title: "Failed to fetch reviews",
        description: error?.response?.data?.message || error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchReviews(currentPage, searchTerm);
  }, [currentPage]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchReviews(1, searchTerm);
    }, 400);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleReviewStatusUpdate = async (
    id: string,
    status: "APPROVED" | "REJECTED",
    reason?: string
  ) => {
    try {
      const payload: any = { status };
      if (status === "REJECTED" && reason) payload.rejectionReason = reason;
      await testimonialsApi.approveAndRejectTestimonials(
        id,
        payload.status,
        payload.rejectionReason
      );
      setReviews((prev) =>
        prev.map((review) =>
          review._id === id ? { ...review, status: payload.status } : review
        )
      );
      toast({
        title: `Review ${status.toLowerCase()}`,
        description: `Review has been ${status.toLowerCase()}.`,
      });
    } catch (error: any) {
      toast({
        title: "Action failed",
        description: error?.response?.data?.message || error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500/20 text-green-300 border-green-400/50";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/50";
      case "REJECTED":
        return "bg-red-500/20 text-red-300 border-red-400/50";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/50";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-cream-primary mb-2">
          Review Management
        </h2>
        <p className="text-secondary-text">
          Manage and moderate user testimonials
        </p>
      </div>

      <Card className="bg-elevated-bg border-input-border shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-cream-primary">
              Testimonials ({reviews.length})
            </CardTitle>
            <Input
              placeholder="Search by company or designation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-section-bg border-input-border text-primary-text placeholder-secondary-text"
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border border-input-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-section-bg border-input-border">
                  <TableHead className="text-cream-primary">Company</TableHead>
                  <TableHead className="text-cream-primary">
                    Designation
                  </TableHead>
                  <TableHead className="text-cream-primary">Feedback</TableHead>
                  <TableHead className="text-cream-primary">Status</TableHead>
                  <TableHead className="text-cream-primary">Date</TableHead>
                  <TableHead className="text-cream-primary">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow
                    key={review._id}
                    className="border-input-border hover:bg-section-bg/50"
                  >
                    <TableCell className="text-primary-text font-medium">
                      {review.companyName}
                    </TableCell>
                    <TableCell className="text-secondary-text">
                      {review.designation}
                    </TableCell>
                    <TableCell className="text-secondary-text">
                      {review.notes}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(review.status)}>
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-secondary-text">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {review.status === "PENDING" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-theme-success hover:bg-theme-success text-white"
                            onClick={() =>
                              handleReviewStatusUpdate(review._id, "APPROVED")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedReviewId(review._id);
                              setOpenRejectModal(true);
                            }}
                            className="border-theme-danger/50 text-theme-danger hover:bg-theme-danger/10"
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-primary-text">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-2">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="bg-cream-primary text-dark-base"
              >
                Previous
              </Button>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
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

      {/* Rejection Modal */}
      <Dialog open={openRejectModal} onOpenChange={setOpenRejectModal}>
        <DialogContent className="border border-gray-600 bg-black/90 text-cream-primary">
          <DialogHeader>
            <DialogTitle className="text-cream-primary">
              Reject Testimonial
            </DialogTitle>
          </DialogHeader>
          <Textarea
            className="border !border-gray-600 text-white bg-transparent"
            placeholder="Enter reason for rejection..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
          <DialogFooter>
            <Button
              className=" bg-transparent"
              variant="outline"
              onClick={() => {
                setOpenRejectModal(false);
                setRejectionReason("");
                setSelectedReviewId(null);
              }}
            >
              Cancel
            </Button>
            <Button
              className=" bg-gray-600 text-white"
              onClick={() => {
                if (selectedReviewId && rejectionReason.trim()) {
                  handleReviewStatusUpdate(
                    selectedReviewId,
                    "REJECTED",
                    rejectionReason
                  );
                }
                setOpenRejectModal(false);
                setRejectionReason("");
                setSelectedReviewId(null);
              }}
              disabled={!rejectionReason.trim()}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
