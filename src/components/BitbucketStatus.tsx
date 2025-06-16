import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, GitBranch } from "lucide-react";

export function BitbucketStatus() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-blue-600" />
            Bitbucket Service Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative" style={{ height: '70vh' }}>
            <iframe 
              src="https://bitbucket.status.atlassian.com/"
              title="Bitbucket Service Status Page"
              className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
              loading="lazy"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={() => window.open("https://bitbucket.status.atlassian.com/", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Bitbucket Status
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.open("https://support.atlassian.com/bitbucket-cloud/", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Support Site
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground p-4 bg-muted rounded-lg">
            <p><strong>Real-time Status:</strong> Monitor the operational status of Bitbucket Cloud services.</p>
            <p className="mt-2"><strong>Service Coverage:</strong> Website, API, Git via SSH/HTTPS, Pipelines, Webhooks, Authentication, and more.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 