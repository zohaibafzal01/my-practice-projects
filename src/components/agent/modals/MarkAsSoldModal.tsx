
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface MarkAsSoldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SaleData) => void;
  leadId: string | null;
}

interface SaleData {
  zipCode: string;
  annualSubmitAmount: string;
  insuranceCompany: string;
  product: string;
  notes: string;
}

export function MarkAsSoldModal({ isOpen, onClose, onSubmit, leadId }: MarkAsSoldModalProps) {
  const [formData, setFormData] = useState<SaleData>({
    zipCode: '',
    annualSubmitAmount: '',
    insuranceCompany: '',
    product: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      zipCode: '',
      annualSubmitAmount: '',
      insuranceCompany: '',
      product: '',
      notes: ''
    });
  };

  const handleInputChange = (field: keyof SaleData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-elevated-bg border border-input-border text-primary-text max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-cream-primary">
            Mark as Sold
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="zipCode" className="text-primary-text">Client ZIP Code *</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              className="bg-section-bg border-input-border text-primary-text focus:border-cream-primary"
              placeholder="12345"
              required
            />
          </div>

          <div>
            <Label htmlFor="annualSubmitAmount" className="text-primary-text">Annual Submit Amount *</Label>
            <Input
              id="annualSubmitAmount"
              type="number"
              value={formData.annualSubmitAmount}
              onChange={(e) => handleInputChange('annualSubmitAmount', e.target.value)}
              className="bg-section-bg border-input-border text-primary-text focus:border-cream-primary"
              placeholder="25000"
              required
            />
          </div>

          <div>
            <Label htmlFor="insuranceCompany" className="text-primary-text">Insurance Company *</Label>
            <Input
              id="insuranceCompany"
              value={formData.insuranceCompany}
              onChange={(e) => handleInputChange('insuranceCompany', e.target.value)}
              className="bg-section-bg border-input-border text-primary-text focus:border-cream-primary"
              placeholder="ABC Insurance Co."
              required
            />
          </div>

          <div>
            <Label htmlFor="product" className="text-primary-text">Product *</Label>
            <select
              id="product"
              value={formData.product}
              onChange={(e) => handleInputChange('product', e.target.value)}
              className="w-full bg-section-bg border border-input-border text-primary-text rounded-md px-3 py-2 focus:border-cream-primary focus:outline-none"
              required
            >
              <option value="">Select Product</option>
              <option value="Auto Insurance">Auto Insurance</option>
              <option value="Home Insurance">Home Insurance</option>
              <option value="Life Insurance">Life Insurance</option>
              <option value="Health Insurance">Health Insurance</option>
              <option value="Business Insurance">Business Insurance</option>
            </select>
          </div>

          <div>
            <Label htmlFor="notes" className="text-primary-text">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="bg-section-bg border-input-border text-primary-text resize-none focus:border-cream-primary"
              placeholder="Additional notes about this sale..."
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 border-input-border text-secondary-text hover:bg-section-bg">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-theme-success hover:bg-theme-success-hover text-white">
              Mark as Sold
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
