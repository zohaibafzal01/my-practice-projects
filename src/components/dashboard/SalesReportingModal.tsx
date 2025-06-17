
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface SalesReportingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const insuranceCompanies = [
  'State Farm', 'Geico', 'Progressive', 'Allstate', 'USAA', 
  'Liberty Mutual', 'Travelers', 'Nationwide', 'American Family', 'Farmers'
];

const productTypes = [
  'Auto Insurance', 'Home Insurance', 'Life Insurance', 'Health Insurance',
  'Business Insurance', 'Renters Insurance', 'Umbrella Policy', 'Motorcycle Insurance'
];

const SalesReportingModal = ({ isOpen, onClose }: SalesReportingModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    clientZipCode: '',
    annualPremium: '',
    insuranceCompany: '',
    productName: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.clientZipCode || !formData.annualPremium || !formData.insuranceCompany || !formData.productName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    console.log('Sales Report Submitted:', formData);
    
    toast({
      title: "Sale Recorded!",
      description: `Successfully recorded sale of $${parseFloat(formData.annualPremium).toLocaleString()} annual premium.`,
      variant: "default"
    });

    // Reset form and close modal
    setFormData({
      clientZipCode: '',
      annualPremium: '',
      insuranceCompany: '',
      productName: '',
      notes: ''
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-black/90 backdrop-blur-md border border-cyan-400/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
            Record New Sale
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="zipcode" className="text-cyan-200">Client Zip Code *</Label>
            <Input
              id="zipcode"
              value={formData.clientZipCode}
              onChange={(e) => handleInputChange('clientZipCode', e.target.value)}
              placeholder="12345"
              className="bg-gray-800/50 border-cyan-400/30 text-white placeholder-gray-400"
              maxLength={5}
              pattern="[0-9]{5}"
            />
          </div>

          <div>
            <Label htmlFor="premium" className="text-cyan-200">Annual Premium Amount * ($)</Label>
            <Input
              id="premium"
              type="number"
              value={formData.annualPremium}
              onChange={(e) => handleInputChange('annualPremium', e.target.value)}
              placeholder="2500.00"
              className="bg-gray-800/50 border-cyan-400/30 text-white placeholder-gray-400"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <Label htmlFor="company" className="text-cyan-200">Insurance Company *</Label>
            <Select onValueChange={(value) => handleInputChange('insuranceCompany', value)}>
              <SelectTrigger className="bg-gray-800/50 border-cyan-400/30 text-white">
                <SelectValue placeholder="Select insurance company" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-cyan-400/30">
                {insuranceCompanies.map((company) => (
                  <SelectItem key={company} value={company} className="text-white hover:bg-cyan-500/20">
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="product" className="text-cyan-200">Product Type *</Label>
            <Select onValueChange={(value) => handleInputChange('productName', value)}>
              <SelectTrigger className="bg-gray-800/50 border-cyan-400/30 text-white">
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-cyan-400/30">
                {productTypes.map((product) => (
                  <SelectItem key={product} value={product} className="text-white hover:bg-cyan-500/20">
                    {product}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes" className="text-cyan-200">Policy Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional details about the policy..."
              className="bg-gray-800/50 border-cyan-400/30 text-white placeholder-gray-400"
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold"
            >
              Record Sale
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SalesReportingModal;
