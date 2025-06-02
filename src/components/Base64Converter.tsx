import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Base64Converter = () => {
  const [encodeInput, setEncodeInput] = useState("");
  const [decodeInput, setDecodeInput] = useState("");
  const [encodeOutput, setEncodeOutput] = useState("");
  const [decodeOutput, setDecodeOutput] = useState("");
  const { toast } = useToast();

  const encodeBase64 = (input: string) => {
    if (!input.trim()) {
      setEncodeOutput("");
      return;
    }
    setEncodeOutput(btoa(input));
  };

  const decodeBase64 = (input: string) => {
    if (!input.trim()) {
      setDecodeOutput("");
      return;
    }
    try {
      setDecodeOutput(atob(input));
    } catch (err) {
      setDecodeOutput("Invalid Base64 encoding");
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
          <span className="text-lg">Base64 Encode/Decode</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="encode" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>
          
          <TabsContent value="encode" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Text to encode:</label>
              <Textarea
                placeholder="Hello World!"
                value={encodeInput}
                onChange={(e) => {
                  setEncodeInput(e.target.value);
                  encodeBase64(e.target.value);
                }}
                className="font-mono text-sm"
                rows={3}
              />
            </div>

            {encodeOutput && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Base64 encoded:</label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(encodeOutput)}
                    className="h-7 px-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <Textarea
                  value={encodeOutput}
                  readOnly
                  className="font-mono text-sm bg-slate-50"
                  rows={3}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="decode" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Base64 to decode:</label>
              <Textarea
                placeholder="SGVsbG8gV29ybGQh"
                value={decodeInput}
                onChange={(e) => {
                  setDecodeInput(e.target.value);
                  decodeBase64(e.target.value);
                }}
                className="font-mono text-sm"
                rows={3}
              />
            </div>

            {decodeOutput && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Decoded text:</label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(decodeOutput)}
                    className="h-7 px-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <Textarea
                  value={decodeOutput}
                  readOnly
                  className="font-mono text-sm bg-muted"
                  rows={3}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Base64Converter;
