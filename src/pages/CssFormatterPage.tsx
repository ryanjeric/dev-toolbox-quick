import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Note: This component requires a CSS formatting library like 'prettier' or 'cssbeautify'.
// You might need to install it: npm install prettier
// For now, this component uses a placeholder conversion.

const CssFormatterPage = () => {
  const [cssInput, setCssInput] = useState('');
  const [formattedCssOutput, setFormattedCssOutput] = useState('');

  const { toast } = useToast();

  const formatCss = (css: string): string => {
    // **TODO:** Implement actual CSS formatting using a library
    // Example using 'prettier' (requires setup):
    // import prettier from 'prettier';
    // import parserCss from 'prettier/parser-css';
    // try {
    //   return prettier.format(css, { parser: 'css', plugins: [parserCss] });
    // } catch (e) {
    //   console.error("Formatting error:", e);
    //   return "Error formatting CSS: " + e.message;
    // }

    // Simple placeholder (basic indentation)
    if (!css.trim()) {
      return '';
    }
    
    let formatted = css.replace(/\{/g, ' {\n  ').replace(/;(?=\s*[^\}])|;(?=$)/g, ';\n  ').replace(/\}/g, '\n}\n').trim();
    return formatted;
  };

  // Perform formatting whenever input changes
  useMemo(() => {
    setFormattedCssOutput(formatCss(cssInput));
  }, [cssInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedCssOutput);
    toast({
      title: "CSS Copied",
      description: "The formatted CSS has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">CSS Formatter</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CSS Input Card */}
        <Card>
          <CardHeader><CardTitle>Enter CSS</CardTitle></CardHeader>
          <CardContent>
            <Label htmlFor="cssInput">Paste your CSS code here:</Label>
            <Textarea
              id="cssInput"
              placeholder="Paste CSS code..."
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              rows={15}
              className="mt-1 font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* Formatted CSS Output Card */}
        <Card>
          <CardHeader><CardTitle>Formatted CSS</CardTitle></CardHeader>
          <CardContent>
            <Label htmlFor="formattedCssOutput">Formatted CSS:</Label>
            <div className="relative mt-1">
              <Textarea
                id="formattedCssOutput"
                readOnly
                value={formattedCssOutput}
                rows={15}
                className="font-mono text-sm bg-muted pr-12"
              />
              <Button 
                size="sm" 
                className="absolute top-2 right-2" 
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4 mr-2" /> Copy CSS
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CssFormatterPage; 