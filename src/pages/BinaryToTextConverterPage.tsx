import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const BinaryToTextConverterPage = () => {
  const [binaryInput, setBinaryInput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const convertBinaryToText = (binary: string): string => {
    setError(null);
    if (!binary.trim()) {
      return '';
    }

    try {
      // Remove any whitespace
      const cleanBinary = binary.replace(/\s/g, '');

      // Check if the binary string length is a multiple of 8
      if (cleanBinary.length % 8 !== 0) {
        setError("Invalid binary input length. Must be a multiple of 8.");
        return '';
      }

      let text = '';
      for (let i = 0; i < cleanBinary.length; i += 8) {
        const byte = cleanBinary.substring(i, i + 8);
        // Convert the 8-bit binary string to an integer, then to a character
        const charCode = parseInt(byte, 2);
        if (isNaN(charCode)){
            setError("Invalid binary sequence found.");
            return '';
        }
        text += String.fromCharCode(charCode);
      }
      return text;
    } catch (e: any) {
        setError("Error converting binary: " + e.message);
        return '';
    }
  };

  // Perform conversion whenever input changes
  useMemo(() => {
    setTextOutput(convertBinaryToText(binaryInput));
  }, [binaryInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(textOutput);
    toast({
      title: "Text Copied",
      description: "The generated text has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Binary to Text Converter</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Binary Input Card */}
        <Card>
          <CardHeader><CardTitle>Enter Binary</CardTitle></CardHeader>
          <CardContent>
            <Label htmlFor="binaryInput">Paste your binary code here (separated by spaces or not):</Label>
            <Textarea
              id="binaryInput"
              placeholder="e.g., 01001000 01100101 01101100 01101100 01101111"
              value={binaryInput}
              onChange={(e) => setBinaryInput(e.target.value)}
              rows={15}
              className="mt-1 font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* Text Output Card */}
        <Card>
          <CardHeader><CardTitle>Generated Text</CardTitle></CardHeader>
          <CardContent>
             {error && <div className="text-red-500 mb-4">{error}</div>}
            <Label htmlFor="textOutput">Generated Text:</Label>
            <div className="relative mt-1">
              <Textarea
                id="textOutput"
                readOnly
                value={textOutput}
                rows={15}
                className="font-mono text-sm bg-slate-100 pr-12"
              />
              <Button 
                size="sm" 
                className="absolute top-2 right-2" 
                onClick={handleCopy}
                disabled={!!error || !textOutput}
              >
                <Copy className="h-4 w-4 mr-2" /> Copy Text
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BinaryToTextConverterPage; 