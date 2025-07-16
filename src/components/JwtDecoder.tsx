import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Key, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JwtPayload {
  [key: string]: any;
}

interface JwtHeader {
  alg: string;
  typ: string;
  [key: string]: any;
}

interface DecodedJwt {
  header: JwtHeader;
  payload: JwtPayload;
  signature: string;
}

export default function JwtDecoder() {
  const [inputToken, setInputToken] = useState('');
  const [decodedToken, setDecodedToken] = useState<DecodedJwt | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [secret, setSecret] = useState('');
  const [customPayload, setCustomPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
  const [customHeader, setCustomHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [encodedToken, setEncodedToken] = useState('');
  const { toast } = useToast();

  const decodeToken = (token: string) => {
    try {
      // Remove any whitespace
      const cleanToken = token.trim();
      
      if (!cleanToken) {
        setDecodedToken(null);
        setIsValid(null);
        return;
      }

      // Check if it looks like a JWT (3 parts separated by dots)
      const parts = cleanToken.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Expected 3 parts separated by dots.');
      }

      const [headerB64, payloadB64, signature] = parts;

      // Decode header and payload
      const header = JSON.parse(atob(headerB64.replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));

      const decoded: DecodedJwt = {
        header,
        payload,
        signature
      };

      setDecodedToken(decoded);
      setIsValid(true);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      setDecodedToken(null);
      setIsValid(false);
      toast({
        title: "Decode Error",
        description: error instanceof Error ? error.message : "Failed to decode JWT token",
        variant: "destructive",
      });
    }
  };

  const encodeToken = () => {
    try {
      const header = JSON.parse(customHeader);
      const payload = JSON.parse(customPayload);

      // Create base64 encoded header and payload
      const headerB64 = btoa(JSON.stringify(header)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      const payloadB64 = btoa(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

      // For demo purposes, we'll create a mock signature
      // In a real implementation, you'd use a proper JWT library with the secret
      const signature = btoa('mock-signature-for-demo').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

      const token = `${headerB64}.${payloadB64}.${signature}`;
      setEncodedToken(token);
      
      toast({
        title: "Token Encoded",
        description: "JWT token has been encoded successfully",
      });
    } catch (error) {
      console.error('Error encoding JWT:', error);
      toast({
        title: "Encode Error",
        description: "Failed to encode JWT token. Check your JSON format.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  const formatJson = (obj: any): string => {
    return JSON.stringify(obj, null, 2);
  };

  const getExpirationStatus = (payload: JwtPayload) => {
    if (!payload.exp) return null;
    
    const now = Math.floor(Date.now() / 1000);
    const exp = payload.exp;
    
    if (exp < now) {
      return { status: 'expired', text: 'Expired', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' };
    } else if (exp - now < 300) { // 5 minutes
      return { status: 'expiring', text: 'Expiring Soon', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' };
    } else {
      return { status: 'valid', text: 'Valid', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' };
    }
  };

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          JWT Token Decoder/Encoder
        </h1>
        <p className="text-muted-foreground">
          Decode and encode JSON Web Tokens (JWT) with ease
        </p>
      </div>

      <Tabs defaultValue="decode" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="decode" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Decode Token
          </TabsTrigger>
          <TabsTrigger value="encode" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Encode Token
          </TabsTrigger>
        </TabsList>

        <TabsContent value="decode" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Input JWT Token</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your JWT token here..."
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                className="min-h-[120px] font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={() => decodeToken(inputToken)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Decode Token
                </Button>
                <Button variant="outline" onClick={() => setInputToken('')}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {isValid !== null && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Decoded Token
                  {isValid ? (
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Valid Format
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Invalid Token</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {decodedToken && (
                  <>
                    {/* Header */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Header</h3>
                      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                        <pre className="text-sm font-mono overflow-x-auto">
                          {formatJson(decodedToken.header)}
                        </pre>
                      </div>
                    </div>

                    {/* Payload */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">Payload</h3>
                        {decodedToken.payload.exp && (
                          <Badge className={getExpirationStatus(decodedToken.payload)?.color}>
                            {getExpirationStatus(decodedToken.payload)?.text}
                          </Badge>
                        )}
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                        <pre className="text-sm font-mono overflow-x-auto">
                          {formatJson(decodedToken.payload)}
                        </pre>
                      </div>
                      
                      {/* Payload Details */}
                      {decodedToken.payload.exp && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          Expires: {formatTimestamp(decodedToken.payload.exp)}
                        </div>
                      )}
                      {decodedToken.payload.iat && (
                        <div className="text-sm text-muted-foreground">
                          Issued: {formatTimestamp(decodedToken.payload.iat)}
                        </div>
                      )}
                    </div>

                    {/* Signature */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Signature</h3>
                      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                        <code className="text-sm font-mono break-all">
                          {decodedToken.signature}
                        </code>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(formatJson(decodedToken))}
                      className="w-full"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Decoded JSON
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="encode" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Header</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter JWT header..."
                  value={customHeader}
                  onChange={(e) => setCustomHeader(e.target.value)}
                  className="min-h-[120px] font-mono text-sm"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payload</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter JWT payload..."
                  value={customPayload}
                  onChange={(e) => setCustomPayload(e.target.value)}
                  className="min-h-[120px] font-mono text-sm"
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Secret (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <input
                  type={showSecret ? "text" : "password"}
                  placeholder="Enter secret for signing..."
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  className="w-full p-3 border rounded-lg pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button onClick={encodeToken} className="w-full">
                <Key className="h-4 w-4 mr-2" />
                Encode Token
              </Button>
            </CardContent>
          </Card>

          {encodedToken && (
            <Card>
              <CardHeader>
                <CardTitle>Encoded Token</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                  <code className="text-sm font-mono break-all">
                    {encodedToken}
                  </code>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => copyToClipboard(encodedToken)}
                  className="w-full"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Token
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 