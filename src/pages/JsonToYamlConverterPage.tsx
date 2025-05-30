import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Note: This component requires a library to convert JSON to YAML, e.g., 'js-yaml'.
// You might need to install it: npm install js-yaml
// For now, this component uses a placeholder conversion.

const JsonToYamlConverterPage = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [yamlOutput, setYamlOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const convertJsonToYaml = (jsonString: string): string => {
    setError(null);
    if (!jsonString.trim()) {
      return '';
    }

    try {
      // **TODO:** Implement actual JSON to YAML conversion using a library
      // Example using 'js-yaml':
      // import yaml from 'js-yaml';
      // const json = JSON.parse(jsonString);
      // return yaml.dump(json);

      // Simple placeholder conversion (basic structure)
      const json = JSON.parse(jsonString);
      let yaml = '';

      const buildYaml = (obj: any, indent: number = 0) => {
        const space = '  '.repeat(indent);
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            yaml += `${space}${key}:`;
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
              yaml += '\n';
              buildYaml(value, indent + 1);
            } else if (Array.isArray(value)) {
                yaml += '\n';
                value.forEach(item => {
                    yaml += `${space}  - ${item}\n`;
                });
            } else {
              yaml += ` ${value}\n`;
            }
          }
        }
      };

      buildYaml(json);

      return yaml.trim();
    } catch (e: any) {
      setError("Error parsing JSON or converting to YAML: " + e.message);
      return '';
    }
  };

  // Perform conversion whenever input changes
  useMemo(() => {
    setYamlOutput(convertJsonToYaml(jsonInput));
  }, [jsonInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlOutput);
    toast({
      title: "YAML Copied",
      description: "The generated YAML has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">JSON to YAML Converter</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* JSON Input Card */}
        <Card>
          <CardHeader><CardTitle>Enter JSON</CardTitle></CardHeader>
          <CardContent>
            <Label htmlFor="jsonInput">Paste your JSON data here:</Label>
            <Textarea
              id="jsonInput"
              placeholder="Paste JSON data..."
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={15}
              className="mt-1 font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* YAML Output Card */}
        <Card>
          <CardHeader><CardTitle>Generated YAML</CardTitle></CardHeader>
          <CardContent>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <Label htmlFor="yamlOutput">Generated YAML:</Label>
            <div className="relative mt-1">
              <Textarea
                id="yamlOutput"
                readOnly
                value={yamlOutput}
                rows={15}
                className="font-mono text-sm bg-slate-100 pr-12"
              />
              <Button 
                size="sm" 
                className="absolute top-2 right-2" 
                onClick={handleCopy}
                disabled={!!error || !yamlOutput}
              >
                <Copy className="h-4 w-4 mr-2" /> Copy YAML
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JsonToYamlConverterPage; 