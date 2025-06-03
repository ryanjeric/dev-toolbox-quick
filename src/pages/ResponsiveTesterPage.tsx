import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";

interface Device {
  name: string;
  width: number;
  height: number;
}

const devices: Device[] = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 12 Pro', width: 390, height: 844 },
  { name: 'iPhone 12 Pro Max', width: 428, height: 926 },
  { name: 'Pixel 5', width: 393, height: 851 },
  { name: 'Samsung Galaxy S20', width: 360, height: 800 },
  { name: 'iPad Mini', width: 768, height: 1024 },
  { name: 'iPad Air', width: 820, height: 1180 },
  { name: 'iPad Pro', width: 1024, height: 1366 },
  { name: 'MacBook Air', width: 1280, height: 800 },
  { name: 'MacBook Pro', width: 1440, height: 900 },
  { name: 'Desktop', width: 1920, height: 1080 },
];

// List of proxy services that can be used
const proxyServices = [
  'https://api.allorigins.win/raw?url=',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.codetabs.com/v1/proxy?quest='
];

export default function ResponsiveTesterPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentProxyIndex, setCurrentProxyIndex] = useState(0);
  const [iframeErrors, setIframeErrors] = useState<{ [key: string]: boolean }>({});

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIframeErrors({});
    // Reset loading state after a short delay to ensure iframes have time to load
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleIframeError = (deviceName: string) => {
    setIframeErrors(prev => ({ ...prev, [deviceName]: true }));
    // Try next proxy if current one fails
    setCurrentProxyIndex((prev) => (prev + 1) % proxyServices.length);
  };

  const getProxiedUrl = (url: string) => {
    return proxyServices[currentProxyIndex] + encodeURIComponent(url);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Responsive Tester</h1>
      
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>
          Some websites may not load due to security restrictions (X-Frame-Options). We'll try to use different proxy services to bypass this, but it may not work for all websites.
        </AlertDescription>
      </Alert>

      <Card className="p-6 mb-6">
        <form onSubmit={handleUrlSubmit} className="space-y-4">
          <div>
            <Label>URL to Test</Label>
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Test'}
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {url && (
        <div className="grid grid-cols-1 gap-6">
          {devices.map((device) => (
            <Card key={device.name} className="p-4">
              <div className="mb-2">
                <h3 className="font-semibold">{device.name}</h3>
                <p className="text-sm text-gray-500">{device.width}x{device.height}</p>
                {device.name === 'Desktop' && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                    Note: Desktop preview accuracy may vary on smaller screens.
                  </p>
                )}
              </div>
              <div 
                className="border rounded-lg overflow-auto bg-white"
                style={{ 
                  width: '100%',
                  height: '500px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {iframeErrors[device.name] ? (
                  <div className="h-full flex items-center justify-center p-4 text-center">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        Unable to load this website. It may have security restrictions that prevent it from being displayed in an iframe.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                    <iframe
                      src={getProxiedUrl(url)}
                      style={{
                        width: `${device.width}px`,
                        height: `${device.height}px`,
                        border: 'none'
                      }}
                      title={`${device.name} preview`}
                      onError={() => handleIframeError(device.name)}
                    />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 