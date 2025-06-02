import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Basic mapping of HTTP status codes to explanations
const httpStatusCodes: { [key: number]: string } = {
  // 1xx Informational
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',

  // 2xx Success
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  208: 'Already Reported',
  226: 'IM Used',

  // 3xx Redirection
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',

  // 4xx Client Error
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a teapot',
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  425: 'Too Early',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',

  // 5xx Server Error
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required',
};

const HttpStatusCodeExplainerPage = () => {
  const [statusCode, setStatusCode] = useState<string>('');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const explainCode = () => {
    setError(null);
    setExplanation(null);

    const code = parseInt(statusCode, 10);

    if (isNaN(code)) {
      setError('Please enter a valid number.');
      return;
    }

    if (httpStatusCodes[code]) {
      setExplanation(`${code}: ${httpStatusCodes[code]}`);
    } else {
      setError(`No explanation found for status code ${code}.`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">HTTP Status Code Explainer</h1>
      
      <Card>
        <CardHeader><CardTitle>Enter Status Code</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="statusCode">HTTP Status Code:</Label>
            <Input
              id="statusCode"
              type="number"
              value={statusCode}
              onChange={(e) => setStatusCode(e.target.value)}
              placeholder="e.g., 200, 404, 500"
              className="mt-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  explainCode();
                }
              }}
            />
          </div>

          <Button onClick={explainCode} disabled={!statusCode.trim()}>Explain Code</Button>

          {error && <div className="text-red-500">{error}</div>}
          {explanation && (
            <div className="mt-4">
              <Label>Explanation:</Label>
              <div className="bg-muted p-3 rounded-md mt-1">
                {explanation}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HttpStatusCodeExplainerPage; 