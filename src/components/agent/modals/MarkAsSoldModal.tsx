import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  X,
  DollarSign,
  Building2,
  Package,
  MapPin,
  FileText,
} from "lucide-react";

interface MarkAsSoldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SaleData) => Promise<void>;
  leadId: string | null;
}

interface SaleData {
  zipCode: string;
  annualSubmitAmount: string;
  insuranceCompany: string;
  product: string;
  notes: string;
}

export function MarkAsSoldModal({
  isOpen,
  onClose,
  onSubmit,
  leadId,
}: MarkAsSoldModalProps) {
  const [formData, setFormData] = useState<SaleData>({
    zipCode: "",
    annualSubmitAmount: "",
    insuranceCompany: "",
    product: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<SaleData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<SaleData> = {};

    // ZIP Code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
      newErrors.zipCode = "Enter a valid ZIP code (e.g., 12345 or 12345-6789)";
    }

    // Annual Submit Amount validation
    if (!formData.annualSubmitAmount.trim()) {
      newErrors.annualSubmitAmount = "Annual submit amount is required";
    } else {
      const amount = parseFloat(formData.annualSubmitAmount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.annualSubmitAmount = "Enter a valid amount greater than 0";
      }
    }

    // Insurance Company validation
    if (!formData.insuranceCompany.trim()) {
      newErrors.insuranceCompany = "Insurance company is required";
    } else if (formData.insuranceCompany.trim().length < 2) {
      newErrors.insuranceCompany =
        "Insurance company name must be at least 2 characters";
    }

    // Product validation
    if (!formData.product) {
      newErrors.product = "Product selection is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      // Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error("Error submitting sale data:", error);
      // Error handling is done in parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof SaleData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const resetForm = () => {
    setFormData({
      zipCode: "",
      annualSubmitAmount: "",
      insuranceCompany: "",
      product: "",
      notes: "",
    });
    setErrors({});
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    const number = parseFloat(numericValue);

    if (!isNaN(number)) {
      return number.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    }
    return value;
  };

  const handleAmountChange = (value: string) => {
    // Remove formatting and keep only numbers and decimal
    const cleanValue = value.replace(/[^0-9.]/g, "");
    handleInputChange("annualSubmitAmount", cleanValue);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gray-700/50 rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div>
            <h2 className="text-xl font-bold text-white">Mark Lead as Sold</h2>
            <p className="text-gray-400 text-sm mt-1">
              Enter the sale details for this lead
            </p>
          </div>
          <Button
            onClick={handleClose}
            variant="ghost"
            size="sm"
            disabled={isSubmitting}
            className="text-white hover:text-white hover:bg-gray-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* ZIP Code */}
          <div>
            <label
              htmlFor="zipCode"
              className="flex items-center text-white text-sm font-medium mb-2"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Client ZIP Code *
            </label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              className={`bg-gray-800/50 border-gray-700/50 text-white focus:border-cyan-400 ${
                errors.zipCode ? "border-red-400 focus:border-red-400" : ""
              }`}
              placeholder="12345 or 12345-6789"
              disabled={isSubmitting}
            />
            {errors.zipCode && (
              <p className="text-red-400 text-xs mt-1">{errors.zipCode}</p>
            )}
          </div>

          {/* Annual Submit Amount */}
          <div>
            <label
              htmlFor="annualSubmitAmount"
              className="flex items-center text-white text-sm font-medium mb-2"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Annual Submit Amount *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                $
              </span>
              <Input
                id="annualSubmitAmount"
                type="text"
                value={
                  formData.annualSubmitAmount
                    ? formatCurrency(formData.annualSubmitAmount)
                    : ""
                }
                onChange={(e) => handleAmountChange(e.target.value)}
                className={`bg-gray-800/50 border-gray-700/50 text-white focus:border-cyan-400 pl-8 ${
                  errors.annualSubmitAmount
                    ? "border-red-400 focus:border-red-400"
                    : ""
                }`}
                placeholder="25,000"
                disabled={isSubmitting}
              />
            </div>
            {errors.annualSubmitAmount && (
              <p className="text-red-400 text-xs mt-1">
                {errors.annualSubmitAmount}
              </p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Enter the total annual premium amount
            </p>
          </div>

          {/* Insurance Company */}
          <div>
            <label
              htmlFor="insuranceCompany"
              className="flex items-center text-white text-sm font-medium mb-2"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Insurance Company *
            </label>
            <Input
              id="insuranceCompany"
              value={formData.insuranceCompany}
              onChange={(e) =>
                handleInputChange("insuranceCompany", e.target.value)
              }
              className={`bg-gray-800/50 border-gray-700/50 text-white focus:border-cyan-400 ${
                errors.insuranceCompany
                  ? "border-red-400 focus:border-red-400"
                  : ""
              }`}
              placeholder="ABC Insurance Co."
              disabled={isSubmitting}
            />
            {errors.insuranceCompany && (
              <p className="text-red-400 text-xs mt-1">
                {errors.insuranceCompany}
              </p>
            )}
          </div>

          {/* Product */}
          <div>
            <label
              htmlFor="product"
              className="flex items-center text-white text-sm font-medium mb-2"
            >
              <Package className="h-4 w-4 mr-2" />
              Product *
            </label>
            <select
              id="product"
              value={formData.product}
              onChange={(e) => handleInputChange("product", e.target.value)}
              className={`w-full bg-gray-800/50 border border-gray-700/50 text-white rounded-md px-3 py-2 focus:border-cyan-400 focus:outline-none ${
                errors.product ? "border-red-400 focus:border-red-400" : ""
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select Product</option>
              <option value="Auto Insurance">Auto Insurance</option>
              <option value="Home Insurance">Home Insurance</option>
              <option value="Life Insurance">Life Insurance</option>
              <option value="Health Insurance">Health Insurance</option>
              <option value="Business Insurance">Business Insurance</option>
              <option value="Motorcycle Insurance">Motorcycle Insurance</option>
              <option value="Renters Insurance">Renters Insurance</option>
              <option value="Umbrella Insurance">Umbrella Insurance</option>
              <option value="Other">Other</option>
            </select>
            {errors.product && (
              <p className="text-red-400 text-xs mt-1">{errors.product}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="flex items-center text-white text-sm font-medium mb-2"
            >
              <FileText className="h-4 w-4 mr-2" />
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700/50 text-white rounded-md px-3 py-2 resize-none focus:border-cyan-400 focus:outline-none"
              placeholder="Additional notes about this sale..."
              rows={3}
              disabled={isSubmitting}
            />
            <p className="text-gray-500 text-xs mt-1">
              Add any additional details about the sale or customer
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-700/50">
            <Button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                "Mark as Sold"
              )}
            </Button>
          </div>
        </form>

        {/* Form Summary */}
        {formData.annualSubmitAmount &&
          formData.insuranceCompany &&
          formData.product && (
            <div className="px-6 pb-6">
              <div className="bg-cyan-900/20 border border-cyan-400/30 rounded-lg p-4">
                <h3 className="text-cyan-300 font-medium mb-2">Sale Summary</h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>Company: {formData.insuranceCompany}</div>
                  <div>Product: {formData.product}</div>
                  <div>
                    Amount: $
                    {formData.annualSubmitAmount
                      ? formatCurrency(formData.annualSubmitAmount)
                      : "0"}
                  </div>
                  {formData.zipCode && <div>ZIP: {formData.zipCode}</div>}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
