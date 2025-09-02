import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Droplets, Leaf, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface FarmerData {
  id: string;
  name: string;
  crop: string;
  status: 'verified' | 'pending' | 'rejected';
  proofId: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  // Mock data - in real app this would come from API/database
  const mockFarmers: FarmerData[] = [
    {
      id: "1",
      name: "Sunita Sharma",
      crop: "Wheat", 
      status: "verified",
      proofId: "ABC123"
    },
    {
      id: "2",
      name: "Ramesh Kumar",
      crop: "Rice",
      status: "pending", 
      proofId: "DEF456"
    },
    {
      id: "3",
      name: "Priya Patel",
      crop: "Corn",
      status: "verified",
      proofId: "GHI789"
    },
    {
      id: "4", 
      name: "Arjun Singh",
      crop: "Cotton",
      status: "rejected",
      proofId: "JKL012"
    },
    {
      id: "5",
      name: "Meera Devi",
      crop: "Soybean", 
      status: "verified",
      proofId: "MNO345"
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

  const verifiedCount = mockFarmers.filter(f => f.status === 'verified').length;
  const pendingCount = mockFarmers.filter(f => f.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <Navigation currentPath="/dashboard" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with User Info */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-forest-green mb-2">
                NABARD MRV Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Welcome {user?.email}
              </p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white"
            >
              Logout
            </Button>
          </div>

          {/* Key Metrics Summary */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Droplets className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">20%</div>
                <div className="text-sm text-muted-foreground">Water Saved</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Leaf className="w-8 h-8 text-leaf-green" />
                </div>
                <div className="text-2xl font-bold text-leaf-green mb-1">3 Units</div>
                <div className="text-sm text-muted-foreground">Carbon Credits</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-status-verified" />
                </div>
                <div className="text-2xl font-bold text-status-verified mb-1">{verifiedCount}</div>
                <div className="text-sm text-muted-foreground">Verified Farmers</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <BarChart3 className="w-8 h-8 text-status-pending" />
                </div>
                <div className="text-2xl font-bold text-status-pending mb-1">{pendingCount}</div>
                <div className="text-sm text-muted-foreground">Pending Review</div>
              </CardContent>
            </Card>
          </div>

          {/* Farmers Data Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Farmer Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Farmer Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Crop Type
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                        Proof ID
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockFarmers.map((farmer) => (
                      <tr key={farmer.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {farmer.name.charAt(0)}
                            </div>
                            <span className="font-medium text-foreground">
                              {farmer.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {farmer.crop}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getStatusIcon(farmer.status)}</span>
                            {getStatusBadge(farmer.status)}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                            {farmer.proofId}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Additional Insights */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Regional Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Hectares Monitored</span>
                    <span className="font-semibold">2,450 ha</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Yield Improvement</span>
                    <span className="font-semibold text-status-verified">+15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sustainable Practices Adopted</span>
                    <span className="font-semibold text-leaf-green">85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">New Registrations</span>
                    <span className="font-semibold">124</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed Verifications</span>
                    <span className="font-semibold text-status-verified">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending Reviews</span>
                    <span className="font-semibold text-status-pending">35</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;