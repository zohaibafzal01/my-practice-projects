import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  isSubmitting: boolean;
}

export function RequestReplacementModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: Props) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#1F2937] border border-cyan-500/30 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">
          Request Replacement
        </h2>

        <div>
          <label
            htmlFor="reason"
            className="flex items-center text-cyan-200 text-sm font-medium mb-2"
          >
            <FileText className="h-4 w-4 mr-2" />
            Reason
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-gray-800/50 border border-cyan-400/30 text-white rounded-md px-3 py-2 resize-none focus:border-cyan-400 focus:outline-none"
            placeholder="Additional reason about this sale..."
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex space-x-3 pt-4 border-t border-gray-700/50 mt-6">
          <Button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => onSubmit(reason)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !reason.trim()}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Requesting...
              </div>
            ) : (
              "Request Replacement"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
