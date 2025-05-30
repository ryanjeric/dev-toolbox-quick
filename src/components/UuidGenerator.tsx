
import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const UuidGenerator = () => {
  const [uuid, setUuid] = useState("");
  const { toast } = useToast();

  const generateUuid = () => {
    const newUuid = crypto.randomUUID();
    setUuid(newUuid);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      description: "UUID copied to clipboard!",
      duration: 2000,
    });
  };

  // Generate initial UUID
  useState(() => {
    generateUuid();
  });

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">UUID Generator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Generated UUID v4:</label>
          <div className="flex gap-2">
            <Input
              value={uuid}
              readOnly
              className="font-mono text-sm bg-slate-50"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(uuid)}
              className="px-3"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button 
          onClick={generateUuid}
          className="w-full"
          variant="outline"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate New UUID
        </Button>

        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded">
          <strong>Use cases:</strong> Database IDs, API keys, session tokens, unique identifiers
        </div>
      </CardContent>
    </Card>
  );
};

export default UuidGenerator;
