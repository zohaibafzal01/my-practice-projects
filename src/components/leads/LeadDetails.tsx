
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Calendar, User, FileText } from 'lucide-react';

interface LeadDetailsProps {
  leadId: string | null;
}

const LeadDetails = ({ leadId }: LeadDetailsProps) => {
  if (!leadId) {
    return (
      <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-cyan-100/70">Select a lead from the queue to view details</p>
        </CardContent>
      </Card>
    );
  }

  // Mock lead detail data
  const leadDetail = {
    id: leadId,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    state: 'CA',
    zipCode: '90210',
    city: 'Beverly Hills',
    address: '123 Main Street',
    dateOfBirth: '1985-03-15',
    maritalStatus: 'Married',
    occupation: 'Software Engineer',
    insuranceType: 'Auto',
    currentInsurer: 'State Farm',
    currentPremium: '$1,200/year',
    desiredCoverage: 'Full Coverage',
    notes: 'Interested in bundling auto and home insurance. Currently paying too much with current provider.',
    leadSource: 'Web Form',
    assignedDate: '2024-01-15',
    lastContact: null,
    contactHistory: [
      { date: '2024-01-15', type: 'email', note: 'Initial welcome email sent' },
      { date: '2024-01-14', type: 'call', note: 'Left voicemail - no answer' }
    ]
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Personal Information */}
      <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Full Name</label>
              <p className="text-white font-medium">{leadDetail.firstName} {leadDetail.lastName}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Date of Birth</label>
              <p className="text-white">{leadDetail.dateOfBirth}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <p className="text-cyan-300">{leadDetail.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Phone</label>
              <p className="text-cyan-300">{leadDetail.phone}</p>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400">Address</label>
            <p className="text-white">{leadDetail.address}</p>
            <p className="text-white">{leadDetail.city}, {leadDetail.state} {leadDetail.zipCode}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Marital Status</label>
              <p className="text-white">{leadDetail.maritalStatus}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Occupation</label>
              <p className="text-white">{leadDetail.occupation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insurance Information */}
      <Card className="bg-black/40 backdrop-blur-md border border-green-400/30 shadow-xl shadow-green-500/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Insurance Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Insurance Type</label>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/50">
                {leadDetail.insuranceType}
              </Badge>
            </div>
            <div>
              <label className="text-sm text-gray-400">Lead Source</label>
              <p className="text-white">{leadDetail.leadSource}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Current Insurer</label>
              <p className="text-white">{leadDetail.currentInsurer}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Current Premium</label>
              <p className="text-white">{leadDetail.currentPremium}</p>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400">Desired Coverage</label>
            <p className="text-white">{leadDetail.desiredCoverage}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400">Notes</label>
            <p className="text-white text-sm">{leadDetail.notes}</p>
          </div>
        </CardContent>
      </Card>

      {/* Contact History */}
      <Card className="lg:col-span-2 bg-black/40 backdrop-blur-md border border-purple-400/30 shadow-xl shadow-purple-500/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Contact History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leadDetail.contactHistory.map((contact, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800/30 border border-gray-700/50">
                <div className="flex-shrink-0">
                  {contact.type === 'email' ? (
                    <Mail className="h-4 w-4 text-blue-400" />
                  ) : (
                    <Phone className="h-4 w-4 text-green-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{contact.type.toUpperCase()}</span>
                    <span className="text-gray-400 text-sm">{contact.date}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{contact.note}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadDetails;
