import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface SecondModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  onSubmit: (data: SecondModalData) => Promise<void>;
}

interface SecondModalData {
  notes: string;
  starRating: number;
  designation: string;
  companyName: string;
}

export const TestemonialsDataModal = ({
  isOpen,
  onClose,
  companyName,
  onSubmit,
}: SecondModalProps) => {
  const [formData, setFormData] = useState<SecondModalData>({
    notes: "",
    starRating: 0,
    designation: "",
    companyName: companyName,
  });

  useEffect(() => {
    if (isOpen && companyName) {
      setFormData((prev) => ({
        ...prev,
        companyName: companyName,
      }));
    }
  }, [isOpen, companyName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit(formData);
      setFormData({
        notes: "",
        starRating: 0,
        designation: "",
        companyName: companyName,
      });
      onClose();
    } catch (error) {
      console.error("Testimonial submit failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gray-700/50 rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div>
            <h2 className="text-xl font-bold text-white">Review Details</h2>
            <p className="text-gray-400 text-sm mt-1">
              Enter additional details for the review
            </p>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white hover:text-white hover:bg-gray-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Company Name (Editable) */}
          <div>
            <label
              htmlFor="companyName"
              className="text-sm font-medium text-white"
            >
              Company Name
            </label>
            <Input
              id="companyName"
              value={formData.companyName} // Bind the companyName state here
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              } // Allow editing
              className="bg-gray-800/50 text-white"
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="text-sm font-medium text-white">
              Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full bg-gray-800/50 text-white border-gray-700/50 p-2 rounded-md"
              placeholder="Additional notes about this sale..."
            />
          </div>

          {/* Star Rating */}
          <div>
            <label className="text-sm font-medium text-white">
              Star Rating
            </label>
            <div className="flex space-x-1">
              <div className="flex justify-center items-center space-x-2 w-full">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, starRating: rating })
                    }
                    className="focus:outline-none bg-transparent p-1"
                    aria-label={`Rate ${rating} star${rating > 1 ? "s" : ""}`}
                  >
                    <svg
                      className={`w-8 h-8 transition-colors duration-150 ${
                        formData.starRating >= rating
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                      fill={
                        formData.starRating >= rating ? "currentColor" : "none"
                      }
                      stroke="currentColor"
                      strokeWidth={formData.starRating >= rating ? 0 : 2}
                      viewBox="0 0 24 24"
                    >
                      <polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Designation */}
          <div>
            <label
              htmlFor="designation"
              className="text-sm font-medium text-white"
            >
              Designation
            </label>
            <Input
              id="designation"
              value={formData.designation}
              onChange={(e) =>
                setFormData({ ...formData, designation: e.target.value })
              }
              className="bg-gray-800/50 text-white"
              placeholder="Enter your designation"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-700/50">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
