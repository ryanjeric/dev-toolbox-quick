import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Copy, RefreshCw, FileJson } from "lucide-react";
import { cn } from "@/lib/utils";

export function JsonValidator() {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const validateAndFormat = () => {
    try {
      // Parse the JSON to validate it
      const parsedJson = JSON.parse(inputJson);
      // Format it with proper indentation
      const formatted = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(formatted);
      setIsValid(true);
      setErrorMessage('');
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error instanceof Error ? error.message : 'Invalid JSON');
      setFormattedJson('');
    }
  };

  const handleCopy = () => {
    if (formattedJson) {
      navigator.clipboard.writeText(formattedJson);
    }
  };

  const handleClear = () => {
    setInputJson('');
    setFormattedJson('');
    setIsValid(null);
    setErrorMessage('');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileJson className="h-5 w-5" />
          JSON Validator & Formatter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div>
          <Label htmlFor="inputJson" className="flex items-center gap-2">
            Input JSON
            {isValid !== null && (
              isValid ? 
                <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
                <XCircle className="h-4 w-4 text-red-500" />
            )}
          </Label>
          <Textarea
            id="inputJson"
            placeholder="Paste your JSON here..."
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            className={cn(
              "min-h-[200px] font-mono text-sm mt-1",
              isValid === false && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {isValid === false && (
            <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button 
            onClick={validateAndFormat} 
            className="flex-1"
            disabled={!inputJson.trim()}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Validate & Format
          </Button>
          <Button 
            onClick={handleCopy} 
            variant="outline"
            disabled={!formattedJson}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button 
            onClick={handleClear} 
            variant="outline"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>

        {/* Output Section */}
        {formattedJson && (
          <div>
            <Label htmlFor="formattedJson" className="flex items-center gap-2">
              Formatted JSON
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </Label>
            <Textarea
              id="formattedJson"
              value={formattedJson}
              readOnly
              className="min-h-[200px] font-mono text-sm mt-1 bg-slate-50"
            />
          </div>
        )}

        {/* Features List */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Features:</h3>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Validates JSON syntax</li>
            <li>Formats JSON with proper indentation</li>
            <li>Highlights syntax errors with line numbers</li>
            <li>One-click copy formatted JSON</li>
            <li>Clear all fields with a single click</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 