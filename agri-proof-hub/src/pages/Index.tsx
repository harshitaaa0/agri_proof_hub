import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Mic, FileText, BarChart3 } from "lucide-react";
import heroImage from "@/assets/agri-hero.jpg";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const navigate = useNavigate();

  const navigationCards = [
    {
      title: "Upload Crop Photo",
      description: "Capture and verify your crop images",
      icon: Camera,
      path: "/farmer-input",
      color: "bg-gradient-primary"
    },
    {
      title: "Record Voice Note", 
      description: "Document your farming practices",
      icon: Mic,
      path: "/farmer-input", 
      color: "bg-forest-green"
    },
    {
      title: "My Proofs",
      description: "View your verification history",
      icon: FileText,
      path: "/proofs",
      color: "bg-leaf-green"
    },
    {
      title: "NABARD Dashboard",
      description: "Monitor farming metrics and impact",
      icon: BarChart3,
      path: "/dashboard",
      color: "bg-earth-brown"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPath="/" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <img 
              src={heroImage} 
              alt="Agricultural monitoring and sustainable farming"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero opacity-75"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-center p-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  AgriMRV-Lite
                </h1>
                <p className="text-lg md:text-xl opacity-95">
                  Monitoring for Smallholder Farmers
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            "Giving every farmer a voice, every practice a proof, and every effort a climate impact."
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {navigationCards.map((card, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => navigate(card.path)}
            >
              <CardContent className="p-6 text-center">
                <div className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-status-verified mb-2">1,250+</div>
              <div className="text-sm text-muted-foreground">Verified Farmers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-wheat-gold mb-2">30%</div>
              <div className="text-sm text-muted-foreground">Water Savings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-leaf-green mb-2">500</div>
              <div className="text-sm text-muted-foreground">Carbon Credits</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;