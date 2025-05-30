import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ParsedUrl {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  searchParams: URLSearchParams;
}

const UrlParserPage = () => {
  const [urlInput, setUrlInput] = useState<string>("");
  const [parsedUrl, setParsedUrl] = useState<ParsedUrl | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseUrl = (url: string) => {
    try {
      // Add protocol if missing
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      const urlObj = new URL(url);
      const parsed: ParsedUrl = {
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port,
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
        searchParams: urlObj.searchParams
      };
      setParsedUrl(parsed);
      setError(null);
    } catch (e) {
      setParsedUrl(null);
      setError("Invalid URL format");
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrlInput(value);
    if (value.trim()) {
      parseUrl(value);
    } else {
      setParsedUrl(null);
      setError(null);
    }
  };

  const handleClear = () => {
    setUrlInput("");
    setParsedUrl(null);
    setError(null);
  };

  const copyToClipboard = (text: string, message: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>URL Parser</CardTitle>
          <CardDescription>
            Parse URLs and view their components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
              <Label htmlFor="urlInput">Enter URL:</Label>
              <Input
                id="urlInput"
                type="text"
                value={urlInput}
                onChange={handleUrlChange}
                placeholder="e.g., https://example.com:8080/path?query=value#hash"
                className="font-mono"
              />
            </div>

            {/* Parsed URL Components */}
            {parsedUrl && (
              <div className="space-y-4">
                <Card className="bg-muted">
                  <CardContent className="p-4 space-y-3">
                    {/* Protocol */}
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Protocol:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{parsedUrl.protocol}</span>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(parsedUrl.protocol, "Protocol copied!")}>
                          Copy
                        </Button>
                      </div>
                    </div>

                    {/* Hostname */}
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Hostname:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{parsedUrl.hostname}</span>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(parsedUrl.hostname, "Hostname copied!")}>
                          Copy
                        </Button>
                      </div>
                    </div>

                    {/* Port */}
                    {parsedUrl.port && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Port:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{parsedUrl.port}</span>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(parsedUrl.port, "Port copied!")}>
                            Copy
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Pathname */}
                    {parsedUrl.pathname !== '/' && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Pathname:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{parsedUrl.pathname}</span>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(parsedUrl.pathname, "Pathname copied!")}>
                            Copy
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Search Parameters */}
                    {parsedUrl.search && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Search Parameters:</span>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(parsedUrl.search, "Search parameters copied!")}>
                            Copy All
                          </Button>
                        </div>
                        <div className="space-y-1 pl-4">
                          {Array.from(parsedUrl.searchParams.entries()).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-muted-foreground">{key}:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono">{value}</span>
                                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(value, "Parameter value copied!")}>
                                  Copy
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Hash */}
                    {parsedUrl.hash && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Hash:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{parsedUrl.hash}</span>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(parsedUrl.hash, "Hash copied!")}>
                            Copy
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Clear Button */}
            <div>
              <Button variant="outline" onClick={handleClear} disabled={!urlInput}>
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UrlParserPage; 