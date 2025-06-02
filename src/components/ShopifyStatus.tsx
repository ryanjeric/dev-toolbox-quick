import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldAlert } from "lucide-react";

export function ShopifyStatus() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src="https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-primary-logo-456baa801ee66a0a435671082365958316831c9960c480451dd0330bcdae304f.svg" 
                 alt="Shopify Logo" 
                 className="h-6" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-950/50 p-4 rounded-lg">
            <ShieldAlert className="h-5 w-5" />
            <p className="text-sm">
              Shopify's security is so good, they won't even let us embed their status page! 
              (They're using X-Frame-Options to prevent iframe embedding)
            </p>
          </div>
          
          <Button 
            className="w-full"
            onClick={() => window.open("https://www.shopifystatus.com", "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Check Shopify Status
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 