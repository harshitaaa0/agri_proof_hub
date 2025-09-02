import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Mic, Upload, CheckCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";

interface VerificationResult {
  crop: string;
  status: string;
  proofId: string;
}

const FarmerInput = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "Photo uploaded successfully",
        description: `${file.name} is ready for verification`,
      });
    }
  };

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Speak clearly about your farming practices",
      });
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        toast({
          title: "Recording completed",
          description: "Voice note saved successfully",
        });
      }, 3000);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile && !isRecording) {
      toast({
        title: "No data to submit",
        description: "Please upload a photo or record a voice note first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult: VerificationResult = {
        crop: "Wheat",
        status: "Verified",
        proofId: Math.random().toString(36).substring(2, 8).toUpperCase()
      };
      
      setVerificationResult(mockResult);
      setIsLoading(false);
      
      toast({
        title: "Verification completed",
        description: `Your ${mockResult.crop} crop has been verified`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPath="/farmer-input" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
            Farmer Data Collection
          </h1>

          <div className="space-y-6">
            {/* Photo Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Upload Crop Photo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label htmlFor="photo-upload">Select your crop image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="flex-1"
                    />
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                  {selectedFile && (
                    <div className="p-3 bg-gradient-card rounded-lg border border-border">
                      <p className="text-sm text-foreground font-medium">
                        File selected: {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Ready for verification
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Voice Recording Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-primary" />
                  Record Voice Note
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Record details about your farming practices
                  </p>
                  <Button
                    onClick={handleVoiceRecording}
                    variant={isRecording ? "destructive" : "secondary"}
                    className="w-full"
                  >
                    <Mic className={`w-4 h-4 mr-2 ${isRecording ? 'animate-pulse' : ''}`} />
                    {isRecording ? "Recording... (Click to stop)" : "Start Recording"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Submit for Verification"}
            </Button>

            {/* Verification Result */}
            {verificationResult && (
              <Card className="border-status-verified">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-status-verified">
                    <CheckCircle className="w-5 h-5" />
                    Verification Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Detected Crop:</span>
                      <span className="text-sm text-foreground font-semibold">
                        {verificationResult.crop}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Status:</span>
                      <span className="text-sm text-status-verified font-semibold flex items-center gap-1">
                        ✅ {verificationResult.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Proof ID:</span>
                      <span className="text-sm text-foreground font-mono bg-muted px-2 py-1 rounded">
                        {verificationResult.proofId}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmerInput;