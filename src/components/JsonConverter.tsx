
import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const JsonConverter = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [stringInput, setStringInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [stringOutput, setStringOutput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const { toast } = useToast();

  const formatJson = (input: string) => {
    if (!input.trim()) {
      setJsonOutput("");
      setJsonError("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setJsonOutput(JSON.stringify(parsed, null, 2));
      setJsonError("");
    } catch (err) {
      setJsonError("Invalid JSON format");
      setJsonOutput("");
    }
  };

  const stringifyJson = (input: string) => {
    if (!input.trim()) {
      setStringOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setStringOutput(JSON.stringify(parsed));
    } catch (err) {
      setStringOutput(JSON.stringify(input));
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard!",
      duration: 2000,
    });
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">JSON ⇄ String</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* JSON Formatter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Paste JSON to format:</label>
          <Textarea
            placeholder='{"name": "value"}'
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value);
              formatJson(e.target.value);
            }}
            className="font-mono text-sm"
            rows={3}
          />
          {jsonError && <p className="text-red-500 text-xs mt-1">{jsonError}</p>}
        </div>

        {jsonOutput && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Formatted JSON:</label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(jsonOutput)}
                className="h-7 px-2"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <Textarea
              value={jsonOutput}
              readOnly
              className="font-mono text-sm bg-slate-50"
              rows={5}
            />
          </div>
        )}

        {/* JSON to String */}
        <div>
          <label className="text-sm font-medium mb-2 block">JSON to stringify:</label>
          <Textarea
            placeholder='{"key": "value"}'
            value={stringInput}
            onChange={(e) => {
              setStringInput(e.target.value);
              stringifyJson(e.target.value);
            }}
            className="font-mono text-sm"
            rows={3}
          />
        </div>

        {stringOutput && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">String output:</label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(stringOutput)}
                className="h-7 px-2"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <Textarea
              value={stringOutput}
              readOnly
              className="font-mono text-sm bg-slate-50"
              rows={2}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JsonConverter;
