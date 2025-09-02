import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";

interface Proof {
  id: string;
  crop: string;
  status: 'verified' | 'pending' | 'rejected';
  date: string;
  proofId: string;
}

const ProofPage = () => {
  // Mock data - in real app this would come from API/database
  const mockProofs: Proof[] = [
    {
      id: "1",
      crop: "Wheat",
      status: "verified",
      date: "2024-01-15",
      proofId: "ABC123"
    },
    {
      id: "2", 
      crop: "Rice",
      status: "pending",
      date: "2024-01-10",
      proofId: "DEF456"
    },
    {
      id: "3",
      crop: "Corn",
      status: "verified", 
      date: "2024-01-08",
      proofId: "GHI789"
    },
    {
      id: "4",
      crop: "Soybean",
      status: "rejected",
      date: "2024-01-05", 
      proofId: "JKL012"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <Badge className="bg-status-verified text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-status-pending text-white">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-status-warning text-white">
            <AlertCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return '🟢';
      case 'pending':
        return '🟡';
      case 'rejected':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPath="/proofs" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
            My Proofs
          </h1>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-status-verified mb-2">
                  {mockProofs.filter(p => p.status === 'verified').length}
                </div>
                <div className="text-sm text-muted-foreground">Verified Proofs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-status-pending mb-2">
                  {mockProofs.filter(p => p.status === 'pending').length}
                </div>
                <div className="text-sm text-muted-foreground">Pending Review</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-foreground mb-2">
                  {mockProofs.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Submissions</div>
              </CardContent>
            </Card>
          </div>

          {/* Proofs List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Proof History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProofs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No proofs found</p>
                    <p className="text-sm">Start by uploading your first crop photo</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">
                            Proof ID
                          </th>
                          <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">
                            Crop Type
                          </th>
                          <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">
                            Status
                          </th>
                          <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockProofs.map((proof) => (
                          <tr key={proof.id} className="border-b border-border hover:bg-muted/50">
                            <td className="py-3 px-2">
                              <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                                {proof.proofId}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-sm font-medium">
                              {proof.crop}
                            </td>
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{getStatusIcon(proof.status)}</span>
                                {getStatusBadge(proof.status)}
                              </div>
                            </td>
                            <td className="py-3 px-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(proof.date).toLocaleDateString()}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProofPage;