
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Wand2, Minimize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JsonBeautifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const beautifyJson = () => {
    try {
      setError("");
      if (!input.trim()) {
        setOutput("");
        return;
      }
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (err) {
      setError("Invalid JSON format");
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      setError("");
      if (!input.trim()) {
        setOutput("");
        return;
      }
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err) {
      setError("Invalid JSON format");
      setOutput("");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({ description: "JSON copied to clipboard!" });
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            JSON Beautifier / Minifier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="input" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>
            
            <TabsContent value="input" className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">JSON Input</label>
                <Textarea
                  placeholder="Paste your JSON here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button onClick={beautifyJson} className="flex-1">
                  <Wand2 className="mr-2 h-4 w-4" />
                  Beautify
                </Button>
                <Button onClick={minifyJson} variant="outline" className="flex-1">
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Minify
                </Button>
                <Button onClick={clearAll} variant="outline">
                  Clear
                </Button>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="output" className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">JSON Output</label>
                {output && (
                  <Button onClick={copyOutput} variant="outline" size="sm">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                )}
              </div>
              <Textarea
                readOnly
                value={output}
                className="min-h-[300px] font-mono text-sm bg-gray-50"
                placeholder="Formatted JSON will appear here..."
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonBeautifier;
