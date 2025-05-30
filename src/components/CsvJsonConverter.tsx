
import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const CsvJsonConverter = () => {
  const [csvInput, setCsvInput] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const { toast } = useToast();

  const csvToJson = (csv: string) => {
    if (!csv.trim()) {
      setJsonOutput("");
      return;
    }

    try {
      const lines = csv.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const result = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });
        return obj;
      });
      setJsonOutput(JSON.stringify(result, null, 2));
    } catch (err) {
      setJsonOutput("Error parsing CSV");
    }
  };

  const jsonToCsv = (json: string) => {
    if (!json.trim()) {
      setCsvOutput("");
      return;
    }

    try {
      const data = JSON.parse(json);
      if (!Array.isArray(data) || data.length === 0) {
        setCsvOutput("JSON must be an array of objects");
        return;
      }

      const headers = Object.keys(data[0]);
      const csvHeaders = headers.join(',');
      const csvRows = data.map(row => 
        headers.map(header => `"${row[header] || ''}"`).join(',')
      );
      setCsvOutput([csvHeaders, ...csvRows].join('\n'));
    } catch (err) {
      setCsvOutput("Error parsing JSON");
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
          <span className="text-lg">CSV ⇄ JSON</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* CSV to JSON */}
        <div>
          <label className="text-sm font-medium mb-2 block">CSV input:</label>
          <Textarea
            placeholder="name,email,age&#10;John,john@email.com,30&#10;Jane,jane@email.com,25"
            value={csvInput}
            onChange={(e) => {
              setCsvInput(e.target.value);
              csvToJson(e.target.value);
            }}
            className="font-mono text-sm"
            rows={4}
          />
        </div>

        {jsonOutput && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">JSON output:</label>
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

        {/* JSON to CSV */}
        <div>
          <label className="text-sm font-medium mb-2 block">JSON array input:</label>
          <Textarea
            placeholder='[{"name":"John","email":"john@email.com"}]'
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value);
              jsonToCsv(e.target.value);
            }}
            className="font-mono text-sm"
            rows={3}
          />
        </div>

        {csvOutput && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">CSV output:</label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(csvOutput)}
                className="h-7 px-2"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <Textarea
              value={csvOutput}
              readOnly
              className="font-mono text-sm bg-slate-50"
              rows={4}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CsvJsonConverter;
