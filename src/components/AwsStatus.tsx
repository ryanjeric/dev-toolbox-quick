import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Cloud } from "lucide-react";

export function AwsStatus() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-orange-500" />
            AWS Service Health Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative" style={{ height: '70vh' }}>
            <iframe 
              src="https://health.aws.amazon.com/health/status"
              title="AWS Service Health Dashboard"
              className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
              loading="lazy"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={() => window.open("https://health.aws.amazon.com/health/status", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open AWS Health Dashboard
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.open("https://status.aws.amazon.com/", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Historical Status
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground p-4 bg-muted rounded-lg">
            <p><strong>Real-time Status:</strong> Monitor the current operational status of AWS services across all regions.</p>
            <p className="mt-2"><strong>Service Coverage:</strong> EC2, S3, RDS, Lambda, CloudFront, Route 53, and many more AWS services.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 