import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const JsonConverter = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [stringInput, setStringInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [stringOutput, setStringOutput] = useState("");
  const { toast } = useToast();

  const jsonToString = (input: string) => {
    if (!input.trim()) {
      setJsonOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      // Convert JSON to escaped string format that can be used in code
      const jsonString = JSON.stringify(parsed);
      const escapedString = JSON.stringify(jsonString);
      setJsonOutput(escapedString);
    } catch (err) {
      setJsonOutput("Invalid JSON");
    }
  };

  const stringToJson = (input: string) => {
    if (!input.trim()) {
      setStringOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setStringOutput(JSON.stringify(parsed, null, 2));
    } catch (err) {
      setStringOutput("Invalid JSON string");
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
          <span className="text-lg">JSON Converter</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="json-to-string" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="json-to-string">JSON → Escaped String</TabsTrigger>
            <TabsTrigger value="string-to-json">String → JSON</TabsTrigger>
          </TabsList>
          
          <TabsContent value="json-to-string" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">JSON input:</label>
              <Textarea
                placeholder='{"name": "John", "age": 30}'
                value={jsonInput}
                onChange={(e) => {
                  setJsonInput(e.target.value);
                  jsonToString(e.target.value);
                }}
                className="font-mono text-sm"
                rows={4}
              />
            </div>

            {jsonOutput && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Escaped string output:</label>
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
                  rows={3}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="string-to-json" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">JSON string input:</label>
              <Textarea
                placeholder='{"name":"John","age":30}'
                value={stringInput}
                onChange={(e) => {
                  setStringInput(e.target.value);
                  stringToJson(e.target.value);
                }}
                className="font-mono text-sm"
                rows={4}
              />
            </div>

            {stringOutput && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Formatted JSON:</label>
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
                  className="font-mono text-sm bg-muted"
                  rows={6}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default JsonConverter;
